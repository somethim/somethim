"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import posthog from "posthog-js";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogClose, DialogPopup } from "@/ui/components/dialog";
import { Sheet, SheetClose, SheetPopup } from "@/ui/components/sheet";
import { sendMessage } from "./action";
import { type ContactFormData, contactSchema } from "./fields";
import { IncomingLetter, letsLetters, workLetters } from "./letter";
import { MagneticButton, MagneticSubmitButton } from "./magnetic";
import { Particles } from "./particles";

const inputClass =
  "w-full border border-white/10 bg-white/5 px-4.5 py-3.5 text-[15px] text-white outline-none transition-colors duration-200 placeholder:text-white/25 focus:border-white/30 focus:bg-white/[0.07]";

export const Contact = () => {
  const reference = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useMotionValue(0);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [particlesVisible, setParticlesVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const ctaOpacity = useTransform(progress, [0.38, 0.58], [0, 1]);
  const ctaBlurValue = useTransform(progress, [0.38, 0.58], [20, 0]);
  const ctaFilter = useTransform(ctaBlurValue, (v) => `blur(${v}px)`);
  const ctaY = useTransform(progress, [0.38, 0.58], ["20px", "0px"]);

  const { scrollY } = useScroll();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) =>
      event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (!reference.current) return;
      const top = reference.current.offsetTop;
      const height = reference.current.offsetHeight;
      const end = top + height - window.innerHeight;
      const prog = Math.max(0, Math.min(1, (latest - top) / (end - top)));
      progress.set(prog);
      const nowVisible = prog > 0.05;
      if (nowVisible && !particlesVisible)
        (
          canvasRef.current as
            | (HTMLCanvasElement & { _spawn?: () => void })
            | null
        )?._spawn?.();
      setParticlesVisible(nowVisible);
    });
  }, [scrollY, progress, particlesVisible]);

  const onSubmit = async (data: ContactFormData) => {
    setSending(true);
    const result = await sendMessage({
      name: data.name,
      email: data.email,
      message: data.message,
    });
    setSending(false);
    posthog.capture("contact_form_submitted", { success: result.success });
    if (!result.success) return;
    posthog.identify(data.email, { name: data.name, email: data.email });
    setSent(true);
    setTimeout(() => {
      setOpen(false);
      setSent(false);
    }, 2000);
  };

  const formFooter = isMobile ? (
    <div className="col-span-full flex flex-col items-stretch gap-3">
      <span className="text-[13px] text-white/22">
        contact@arbikullakshi.com
      </span>
      <MagneticSubmitButton sending={sending} sent={sent} />
    </div>
  ) : (
    <div className="col-span-full flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between md:gap-0">
      <span className="text-[13px] text-white/22">
        contact@arbikullakshi.com
      </span>
      <MagneticSubmitButton sending={sending} sent={sent} />
    </div>
  );

  const formHeader = (closeButton: ReactNode) => (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <h2 className="font-bold font-header text-[clamp(22px,2.4vw,34px)] text-white leading-[1.2] tracking-[-0.02em]">
          We are close to
          <br />
          something big.
        </h2>
        <p className="mt-2.5 text-sm text-white/40 leading-[1.6]">
          Send a message. I don't leave things unanswered.
        </p>
      </div>
      {closeButton}
    </div>
  );

  const glassOverlay = (rounded: string) => (
    <div
      className={`pointer-events-none absolute inset-0 ${rounded}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%)",
      }}
      aria-hidden="true"
    />
  );

  const closeSvg = (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 1L12 12M12 1L1 12"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );

  const formFields = (
    <>
      <div className="col-span-1">
        <input
          placeholder="Name"
          disabled={sending}
          style={{ borderRadius: 16 }}
          className={inputClass}
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-red-400 text-xs">{errors.name.message}</p>
        )}
      </div>
      <div className="col-span-1">
        <input
          type="email"
          placeholder="Email"
          disabled={sending}
          style={{ borderRadius: 16 }}
          className={inputClass}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-red-400 text-xs">{errors.email.message}</p>
        )}
      </div>
      <div className="col-span-full">
        <textarea
          placeholder="Tell me about your project..."
          rows={5}
          disabled={sending}
          style={{ borderRadius: 16 }}
          className={`${inputClass} resize-none`}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-red-400 text-xs">{errors.message.message}</p>
        )}
      </div>
    </>
  );

  return (
    <div ref={reference} data-snap className="relative h-[150vh] md:h-[170vh]">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <Particles visible={particlesVisible} canvasRef={canvasRef} />

        <motion.p
          className="relative z-10 mb-[2vh] text-[clamp(11px,0.9vw,14px)] text-white/85 uppercase tracking-[0.14em]"
          style={{ opacity: ctaOpacity, filter: ctaFilter }}
        >
          Let's build something that holds.
        </motion.p>

        <div className="relative z-10 text-center leading-none">
          <h1 className="font-bold font-header text-[clamp(80px,13vw,200px)] text-white uppercase leading-[0.85] tracking-[-0.03em]">
            {letsLetters.map((letter) => (
              <IncomingLetter
                key={letter.char}
                progress={progress}
                {...letter}
              />
            ))}
          </h1>
          <h1 className="font-bold font-header text-[clamp(80px,13vw,200px)] text-white uppercase leading-[0.85] tracking-[-0.03em]">
            {workLetters.map((letter) => (
              <IncomingLetter
                key={letter.char}
                progress={progress}
                {...letter}
              />
            ))}
          </h1>
        </div>

        <motion.div
          className="relative z-10 mt-[4vh] flex flex-col items-center gap-5"
          style={{ opacity: ctaOpacity, filter: ctaFilter, y: ctaY }}
        >
          <MagneticButton
            onClickAction={() => {
              setOpen(true);
              posthog.capture("contact_form_opened");
            }}
          />

          <a
            href="https://cal.com/arbikullakshi/intro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[clamp(11px,0.9vw,14px)] text-white underline underline-offset-4 transition-colors duration-200 hover:text-white/80"
            onClick={() => posthog.capture("book_a_call_clicked")}
          >
            or book a call
          </a>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/somethim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-opacity duration-200 hover:opacity-60"
              onClick={() =>
                posthog.capture("social_link_clicked", { platform: "github" })
              }
            >
              <span className="sr-only">GitHub</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/arbi-kullakshi-214986222/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-opacity duration-200 hover:opacity-60"
              onClick={() =>
                posthog.capture("social_link_clicked", { platform: "linkedin" })
              }
            >
              <span className="sr-only">LinkedIn</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="2"
                  y="9"
                  width="4"
                  height="12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="4"
                  cy="4"
                  r="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetPopup
            side="bottom"
            data-lenis-prevent
            style={{ borderRadius: "28px 28px 0 0" }}
            className="max-h-[90dvh] overflow-y-auto border border-white/12 bg-[rgba(18,18,22,0.82)] px-6 pt-6 pb-12 text-white shadow-[0_-8px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[52px] backdrop-saturate-[1.8]"
            classList={{
              backdrop: "bg-black/55 backdrop-blur-[10px]",
              close: { root: "hidden" },
            }}
          >
            {glassOverlay("rounded-t-[28px]")}
            <div className="mb-6 flex justify-center">
              <div className="h-1.25 w-10 rounded-full bg-white/25" />
            </div>
            {formHeader(
              <SheetClose className="glass flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full! outline-none transition-opacity duration-200 hover:opacity-70">
                {closeSvg}
              </SheetClose>,
            )}
            <form
              className="grid grid-cols-1 gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              {formFields}
              {formFooter}
            </form>
          </SheetPopup>
        </Sheet>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogPopup
            data-lenis-prevent
            style={{ borderRadius: 28 }}
            className="mt-0 w-[min(720px,90vw)] border border-white/12 bg-[rgba(18,18,22,0.82)] px-12 py-12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] outline-none backdrop-blur-[52px] backdrop-saturate-[1.8]"
            classList={{ backdrop: "bg-black/55 backdrop-blur-[10px]" }}
          >
            {glassOverlay("rounded-[28px]")}
            {formHeader(
              <DialogClose className="glass flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full! outline-none transition-opacity duration-200 hover:opacity-70">
                {closeSvg}
              </DialogClose>,
            )}
            <form
              className="grid grid-cols-1 gap-3 md:grid-cols-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              {formFields}
              {formFooter}
            </form>
          </DialogPopup>
        </Dialog>
      )}
    </div>
  );
};
