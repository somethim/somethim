"use client";

import {
  type FormEntries,
  field,
  type GenericForm,
  InferredForm,
} from "@zenncore/web/components/inferred-form";
import {
  type MotionValue,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Dialog, DialogClose, DialogPopup } from "@zenncore/web/components/dialog";
import { Sheet, SheetClose, SheetPopup } from "@zenncore/web/components/sheet";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { sendMessage } from "@/server/app/contact";

// ── Incoming letter ────────────────────────────────────────────────────────
type IncomingLetterProps = {
  char: string;
  progress: MotionValue<number>;
  startX: string;
  startY: string;
  startRotate: number;
};

const IncomingLetter = ({
  char,
  progress,
  startX,
  startY,
  startRotate,
}: IncomingLetterProps) => {
  const x = useTransform(progress, [0, 0.4], [startX, "0%"]);
  const y = useTransform(progress, [0, 0.4], [startY, "0%"]);
  const rotate = useTransform(progress, [0, 0.4], [startRotate, 0]);
  const opacity = useTransform(progress, [0.02, 0.35], [0, 1]);
  const blurV = useTransform(progress, [0, 0.4], [20, 0]);
  const filter = useTransform(blurV, (v) => `blur(${v}px)`);
  return (
    <motion.span
      className="inline-block"
      style={{ x, y, rotate, opacity, filter }}
    >
      {char}
    </motion.span>
  );
};

const letsLetters = [
  { char: "L", startX: "-45vw", startY: "65vh", startRotate: -28 },
  { char: "E", startX: "-18vw", startY: "80vh", startRotate: 18 },
  { char: "T", startX: "2vw", startY: "70vh", startRotate: -12 },
  { char: "'", startX: "18vw", startY: "55vh", startRotate: 8 },
  { char: "S", startX: "35vw", startY: "75vh", startRotate: -22 },
] as const;

const workLetters = [
  { char: "W", startX: "-52vw", startY: "50vh", startRotate: 25 },
  { char: "O", startX: "-20vw", startY: "62vh", startRotate: -15 },
  { char: "R", startX: "10vw", startY: "68vh", startRotate: 18 },
  { char: "K", startX: "40vw", startY: "52vh", startRotate: -20 },
] as const;

// ── Physics particles canvas ───────────────────────────────────────────────
const BUNDLE_COUNT = 6;
const BUNDLE_DELAY = 320;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  twinkle: number;
  twinkleSpeed: number;
  bundle: number;
  born: number;
  hx: number;
  hy: number;
  floatOffset: number;
  floatSpeed: number;
  floatRadius: number;
};

function createParticle(
  w: number,
  h: number,
  bundle: number,
  startTime: number,
): Particle {
  const hx = Math.random() * w;
  const hy = Math.random() * h;
  return {
    x: hx,
    y: hy,
    vx: 0,
    vy: 0,
    size: 1.5 + Math.random() * 3.5,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.008,
    opacity: 0.4 + Math.random() * 0.6,
    twinkle: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.003 + Math.random() * 0.005,
    bundle,
    born: startTime + bundle * BUNDLE_DELAY,
    hx,
    hy,
    floatOffset: Math.random() * Math.PI * 2,
    floatSpeed: 0.003 + Math.random() * 0.004,
    floatRadius: 4 + Math.random() * 8,
  };
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  p: Particle,
  tick: number,
  now: number,
) {
  const age = Math.max(0, now - p.born);
  const fadeIn = Math.min(1, age / 600);
  if (fadeIn === 0) return;

  const shimmer = 0.5 + 0.5 * Math.sin(p.twinkle + tick * p.twinkleSpeed);
  const alpha = p.opacity * shimmer * fadeIn;
  const s = p.size * (0.85 + 0.15 * shimmer);

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = alpha;

  const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 2.5);
  grd.addColorStop(0, `rgba(255,255,255,${alpha * 0.5})`);
  grd.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(0, 0, s * 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.beginPath();
  const pts = 4;
  const inner = s * 0.18;
  for (let j = 0; j < pts * 2; j++) {
    const angle = (j * Math.PI) / pts - Math.PI / 2;
    const radius = j % 2 === 0 ? s : inner;
    if (j === 0) ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    else ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
  }
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

const Particles = ({
  visible,
  canvasRef,
}: {
  visible: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}) => {
  const mouse = useRef({ x: -999, y: -999 });
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let spawnTime = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const spawn = () => {
      spawnTime = performance.now();
      particles.current = Array.from({ length: 120 }, (_, i) =>
        createParticle(
          canvas.width,
          canvas.height,
          i % BUNDLE_COUNT,
          spawnTime,
        ),
      );
    };
    resize();
    window.addEventListener("resize", resize);

    (canvasRef.current as HTMLCanvasElement & { _spawn?: () => void })._spawn =
      spawn;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let frame = 0;
    const tick = () => {
      raf.current = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      const now = performance.now();

      for (const p of particles.current) {
        const fx =
          p.hx + Math.cos(p.floatOffset + frame * p.floatSpeed) * p.floatRadius;
        const fy =
          p.hy +
          Math.sin(p.floatOffset + frame * p.floatSpeed * 0.7) * p.floatRadius;

        const dx = p.hx - mouse.current.x;
        const dy = p.hy - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let rx = 0;
        let ry = 0;
        if (dist < 150 && dist > 0) {
          const strength = (1 - dist / 150) * 28;
          rx = (dx / dist) * strength;
          ry = (dy / dist) * strength;
        }

        const tx = fx + rx;
        const ty = fy + ry;
        p.vx += (tx - p.x) * 0.06;
        p.vy += (ty - p.y) * 0.06;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        drawStar(ctx, p, frame, now);
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [canvasRef.current]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 transition-opacity duration-[600ms] ${visible ? "opacity-100" : "opacity-0"}`}
    />
  );
};

// ── Custom form field components ──────────────────────────────────────────
type ContactFieldProps = {
  value?: string | null;
  onValueChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  name?: string;
  disabled?: boolean;
};

const ContactInput = ({
  value,
  onValueChange,
  onBlur,
  placeholder,
  type = "text",
  name,
  disabled,
}: ContactFieldProps) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    disabled={disabled}
    value={value ?? ""}
    onChange={(e) => onValueChange?.(e.target.value)}
    onBlur={() => onBlur?.()}
    style={{ borderRadius: 16 }}
    className="w-full border border-white/[0.1] bg-white/[0.05] px-[18px] py-3.5 text-[15px] text-white placeholder:text-white/25 outline-none transition-colors duration-200 focus:border-white/30 focus:bg-white/[0.07]"
  />
);

const ContactTextarea = ({
  value,
  onValueChange,
  onBlur,
  placeholder,
  name,
  disabled,
}: Omit<ContactFieldProps, "type">) => (
  <textarea
    name={name}
    placeholder={placeholder}
    disabled={disabled}
    rows={5}
    value={value ?? ""}
    onChange={(e) => onValueChange?.(e.target.value)}
    onBlur={() => onBlur?.()}
    style={{ borderRadius: 16 }}
    className="w-full resize-none border border-white/[0.1] bg-white/[0.05] px-[18px] py-3.5 text-[15px] text-white placeholder:text-white/25 outline-none transition-colors duration-200 focus:border-white/30 focus:bg-white/[0.07]"
  />
);

// ── Contact form config ────────────────────────────────────────────────────
const contactConfig = {
  name: field({
    shape: "custom",
    validator: z.string().min(1),
    placeholder: "Name",
    Component: ContactInput,
    classList: {
      label: "hidden",
      field: "col-span-1",
      error: "mt-1 text-xs text-red-400",
    },
  }),
  email: field({
    shape: "custom",
    validator: z.string().email(),
    placeholder: "Email",
    type: "email",
    Component: ContactInput,
    classList: {
      label: "hidden",
      field: "col-span-1",
      error: "mt-1 text-xs text-red-400",
    },
  }),
  message: field({
    shape: "custom",
    validator: z.string().min(1),
    placeholder: "Tell me about your project...",
    Component: ContactTextarea,
    classList: {
      label: "hidden",
      field: "col-span-full",
      error: "mt-1 text-xs text-red-400",
    },
  }),
} satisfies GenericForm;

// ── Magnetic button ───────────────────────────────────────────────────────
const useMagnet = () => {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 180, damping: 18, mass: 0.6 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    rawY.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  const onLeave = () => { rawX.set(0); rawY.set(0); };

  return { ref, x, y, onMove, onLeave };
};

const MagneticButton = ({ onClick }: { onClick: () => void }) => {
  const { ref, x, y, onMove, onLeave } = useMagnet();

  return (
    <motion.div
      ref={ref}
      className="group inline-block"
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <button
        type="button"
        onClick={onClick}
        style={{ borderRadius: 9999 }}
        className="relative cursor-pointer border-none bg-white px-[44px] py-[18px] font-bold font-header text-[clamp(13px,1.1vw,17px)] text-black tracking-[0.01em] outline-none transition-[opacity,box-shadow] duration-200 hover:opacity-90 hover:shadow-[0_0_24px_rgba(255,255,255,0.35)]"
      >
        Start a project →
      </button>
    </motion.div>
  );
};

const MagneticSubmitButton = ({ sending, sent }: { sending: boolean; sent: boolean }) => {
  const { ref, x, y, onMove, onLeave } = useMagnet();

  return (
    <motion.div
      ref={ref}
      className="group inline-block"
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <button
        type="submit"
        disabled={sending || sent}
        style={{ borderRadius: 9999 }}
        className="relative cursor-pointer overflow-hidden border-none bg-white px-8 py-3.5 font-bold font-header text-black text-sm tracking-[0.01em] transition-[opacity,box-shadow] duration-200 group-hover:opacity-90 group-hover:shadow-[0_0_24px_rgba(255,255,255,0.35)] disabled:cursor-default disabled:opacity-60"
      >
        {sent ? "Sent!" : sending ? "Sending..." : "Send message →"}
      </button>
    </motion.div>
  );
};

// ── Contact ────────────────────────────────────────────────────────────────
export const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useMotionValue(0);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const ctaOp = useTransform(progress, [0.38, 0.58], [0, 1]);
  const ctaBlurV = useTransform(progress, [0.38, 0.58], [20, 0]);
  const ctaFilter = useTransform(ctaBlurV, (v) => `blur(${v}px)`);
  const ctaY = useTransform(progress, [0.38, 0.58], ["20px", "0px"]);

  const [particlesVisible, setParticlesVisible] = useState(false);

  const { scrollY } = useScroll();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const unsub = scrollY.on("change", (latest) => {
      if (!ref.current) return;
      const top = ref.current.offsetTop;
      const height = ref.current.offsetHeight;
      const end = top + height - window.innerHeight;
      const prog = Math.max(0, Math.min(1, (latest - top) / (end - top)));
      progress.set(prog);
      const nowVisible = prog > 0.05;
      if (nowVisible && !particlesVisible) {
        (
          canvasRef.current as
            | (HTMLCanvasElement & { _spawn?: () => void })
            | null
        )?._spawn?.();
      }
      setParticlesVisible(nowVisible);
    });
    return unsub;
  }, [scrollY, progress, particlesVisible]);

  return (
    <div ref={ref} data-snap className="relative h-[150vh] md:h-[170vh]">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        {/* Particles behind everything */}
        <Particles visible={particlesVisible} canvasRef={canvasRef} />

        {/* Tagline */}
        <motion.p
          className="relative z-10 mb-[2vh] text-[clamp(11px,0.9vw,14px)] text-white/85 uppercase tracking-[0.14em]"
          style={{ opacity: ctaOp, filter: ctaFilter }}
        >
          Is your big idea ready to go wild?
        </motion.p>

        {/* Heading — centered */}
        <div className="relative z-10 text-center leading-none">
          <h1 className="font-bold font-header text-[clamp(80px,13vw,200px)] text-white uppercase leading-[0.85] tracking-[-0.03em]">
            {letsLetters.map((l) => (
              <IncomingLetter key={l.char} progress={progress} {...l} />
            ))}
          </h1>
          <h1 className="font-bold font-header text-[clamp(80px,13vw,200px)] text-white uppercase leading-[0.85] tracking-[-0.03em]">
            {workLetters.map((l) => (
              <IncomingLetter key={l.char} progress={progress} {...l} />
            ))}
          </h1>
        </div>

        {/* CTA */}
        <motion.div
          className="relative z-10 mt-[4vh] flex flex-col items-center gap-5"
          style={{ opacity: ctaOp, filter: ctaFilter, y: ctaY }}
        >
          <MagneticButton onClick={() => setOpen(true)} />

          <a
            href="https://cal.com/mariovukzaj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[clamp(11px,0.9vw,14px)] text-white underline underline-offset-4 transition-colors duration-200 hover:text-white/80"
          >
            or book a call
          </a>

          <div className="flex items-center gap-5">
            <a
              href="https://x.com/mariovukzaj"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-white transition-opacity duration-200 hover:opacity-60"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/mariovukzaj/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white transition-opacity duration-200 hover:opacity-60"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/vukzajmario/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white transition-opacity duration-200 hover:opacity-60"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Contact drawer / modal ──────────────────────────────────────── */}
      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetPopup
            side="bottom"
            data-lenis-prevent
            style={{ borderRadius: "28px 28px 0 0" }}
            className="border border-white/[0.12] bg-[rgba(18,18,22,0.82)] px-6 pt-6 pb-12 text-white shadow-[0_-8px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[52px] backdrop-saturate-[1.8] max-h-[90dvh] overflow-y-auto"
            classList={{
              backdrop: "bg-black/55 backdrop-blur-[10px]",
              close: { root: "hidden" },
            }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-t-[28px]" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%)" }} aria-hidden="true" />
            <div className="mb-6 flex justify-center">
              <div className="h-[5px] w-10 rounded-full bg-white/25" />
            </div>
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h2 className="font-bold font-header text-[clamp(22px,2.4vw,34px)] text-white leading-[1.2] tracking-[-0.02em]">
                  We are close to<br />something big.
                </h2>
                <p className="mt-2.5 text-sm text-white/40 leading-[1.6]">Send a message. I don't leave things unanswered.</p>
              </div>
              <SheetClose className="glass !rounded-full flex size-10 shrink-0 cursor-pointer items-center justify-center outline-none transition-opacity duration-200 hover:opacity-70">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M1 1L12 12M12 1L1 12" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </SheetClose>
            </div>
            <InferredForm
              config={contactConfig}
              className="grid grid-cols-1 gap-3"
              onSubmit={async (data: FormEntries<typeof contactConfig>) => {
                setSending(true);
                const result = await sendMessage({ name: data.name, email: data.email, message: data.message });
                setSending(false);
                if (result.success) { setSent(true); setTimeout(() => { setOpen(false); setSent(false); }, 2000); }
              }}
            >
              <div className="col-span-full flex flex-col items-stretch gap-3">
                <span className="text-[13px] text-white/[0.22]">mvukzaj@outlook.com</span>
                <MagneticSubmitButton sending={sending} sent={sent} />
              </div>
            </InferredForm>
          </SheetPopup>
        </Sheet>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogPopup
            data-lenis-prevent
            style={{ borderRadius: 28 }}
            className="mt-0 w-[min(720px,90vw)] border border-white/[0.12] bg-[rgba(18,18,22,0.82)] px-12 py-12 text-white outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[52px] backdrop-saturate-[1.8]"
            classList={{
              backdrop: "bg-black/55 backdrop-blur-[10px]",
            }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[28px]" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%)" }} aria-hidden="true" />
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h2 className="font-bold font-header text-[clamp(22px,2.4vw,34px)] text-white leading-[1.2] tracking-[-0.02em]">
                  We are close to<br />something big.
                </h2>
                <p className="mt-2.5 text-sm text-white/40 leading-[1.6]">Send a message. I don't leave things unanswered.</p>
              </div>
              <DialogClose className="glass !rounded-full flex size-10 shrink-0 cursor-pointer items-center justify-center outline-none transition-opacity duration-200 hover:opacity-70">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M1 1L12 12M12 1L1 12" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </DialogClose>
            </div>
            <InferredForm
              config={contactConfig}
              className="grid grid-cols-1 gap-3 md:grid-cols-2"
              onSubmit={async (data: FormEntries<typeof contactConfig>) => {
                setSending(true);
                const result = await sendMessage({ name: data.name, email: data.email, message: data.message });
                setSending(false);
                if (result.success) { setSent(true); setTimeout(() => { setOpen(false); setSent(false); }, 2000); }
              }}
            >
              <div className="col-span-full flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between md:gap-0">
                <span className="text-[13px] text-white/[0.22]">mvukzaj@outlook.com</span>
                <MagneticSubmitButton sending={sending} sent={sent} />
              </div>
            </InferredForm>
          </DialogPopup>
        </Dialog>
      )}
    </div>
  );
};
