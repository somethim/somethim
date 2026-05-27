"use client";

import { type RefObject, useEffect, useRef } from "react";

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

const createParticle = (
  width: number,
  height: number,
  bundle: number,
  startTime: number,
): Particle => {
  const hx = Math.random() * width;
  const hy = Math.random() * height;
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
};

const drawStar = (
  ctx: CanvasRenderingContext2D,
  particle: Particle,
  tick: number,
  now: number,
) => {
  const age = Math.max(0, now - particle.born);
  const fadeIn = Math.min(1, age / 600);
  if (fadeIn === 0) return;

  const shimmer =
    0.5 + 0.5 * Math.sin(particle.twinkle + tick * particle.twinkleSpeed);
  const alpha = particle.opacity * shimmer * fadeIn;
  const size = particle.size * (0.85 + 0.15 * shimmer);

  ctx.save();
  ctx.translate(particle.x, particle.y);
  ctx.rotate(particle.rotation);
  ctx.globalAlpha = alpha;

  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2.5);
  gradient.addColorStop(0, `rgba(255,255,255,${alpha * 0.5})`);
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, size * 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.beginPath();
  const points = 4;
  const inner = size * 0.18;
  for (const j of Array.from({ length: points * 2 }, (_, index) => index)) {
    const angle = (j * Math.PI) / points - Math.PI / 2;
    const radius = j % 2 === 0 ? size : inner;
    if (j === 0) ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    else ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

const useParticlesAnimation = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
) => {
  const mouse = useRef({ x: -999, y: -999 });
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const timing = { spawn: 0, frame: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const spawn = () => {
      timing.spawn = performance.now();
      particles.current = Array.from({ length: 120 }, (_, i) =>
        createParticle(
          canvas.width,
          canvas.height,
          i % BUNDLE_COUNT,
          timing.spawn,
        ),
      );
    };
    resize();
    window.addEventListener("resize", resize);

    (canvasRef.current as HTMLCanvasElement & { _spawn?: () => void })._spawn =
      spawn;

    const onMove = (event: globalThis.MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      raf.current = requestAnimationFrame(tick);
      context.clearRect(0, 0, canvas.width, canvas.height);
      timing.frame++;
      const now = performance.now();

      for (const particle of particles.current) {
        const floatX =
          particle.hx +
          Math.cos(particle.floatOffset + timing.frame * particle.floatSpeed) *
            particle.floatRadius;
        const floatY =
          particle.hy +
          Math.sin(
            particle.floatOffset + timing.frame * particle.floatSpeed * 0.7,
          ) *
            particle.floatRadius;

        const { rx, ry } = (() => {
          const dx = particle.hx - mouse.current.x;
          const dy = particle.hy - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= 150 || dist === 0) return { rx: 0, ry: 0 };
          const strength = (1 - dist / 150) * 28;
          return { rx: (dx / dist) * strength, ry: (dy / dist) * strength };
        })();

        particle.vx += (floatX + rx - particle.x) * 0.06;
        particle.vy += (floatY + ry - particle.y) * 0.06;
        particle.vx *= 0.82;
        particle.vy *= 0.82;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotSpeed;

        drawStar(context, particle, timing.frame, now);
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [canvasRef.current]);
};

export const Particles = ({ visible, canvasRef }: Particles.Props) => {
  useParticlesAnimation(canvasRef);
  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 transition-opacity duration-600 ${visible ? "opacity-100" : "opacity-0"}`}
    />
  );
};
export namespace Particles {
  export type Props = {
    visible: boolean;
    canvasRef: RefObject<HTMLCanvasElement | null>;
  };
}
