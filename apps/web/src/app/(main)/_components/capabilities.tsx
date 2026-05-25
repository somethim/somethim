"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const capabilities = [
  {
    number: "01",
    title: "Brand Identity",
    description:
      "Complete identity systems that make your brand unmistakable, from strategy to every visual touchpoint.",
    color: "#e63946",
  },
  {
    number: "02",
    title: "Product Design",
    description:
      "User interfaces that drive engagement and retention. Research-backed, pixel-obsessed.",
    color: "#2a9d8f",
  },
  {
    number: "03",
    title: "Motion Design",
    description:
      "Purposeful animation that elevates the experience, from micro-interactions to full campaigns.",
    color: "#e9c46a",
  },
  {
    number: "04",
    title: "Web Development",
    description:
      "High-performance websites built in code. Designed and developed, not just mocked up.",
    color: "#6a4c93",
  },
] as const;

const ITEM_EXITS = [
  { x: -55, y: -35, rotate: -14 },
  { x: -42, y: 28, rotate: 10 },
  { x: 48, y: -30, rotate: 18 },
  { x: 62, y: 38, rotate: -12 },
] as const;

export const Capabilities = () => {
  const ref = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>(Array(4).fill(null));
  const [bounds, setBounds] = useState({ top: 0, height: 0 });
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [itemsActive, setItemsActive] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const imgX = useSpring(rawX, { stiffness: 200, damping: 28 });
  const imgY = useSpring(rawY, { stiffness: 200, damping: 28 });

  const headingX = useMotionValue(0);
  const headingBlur = useMotionValue(20);
  const headingOp = useMotionValue(0);
  const headingFilter = useTransform(headingBlur, (v) => `blur(${v}px)`);

  const { scrollY } = useScroll();

  useEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      setBounds({
        top: ref.current.offsetTop,
        height: ref.current.offsetHeight,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      const { top, height } = bounds;
      if (!height) return;
      const end = top + height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, (latest - top) / (end - top)));

      const headingIn = Math.max(0, Math.min(1, progress / 0.15));
      const headingSlide = Math.max(0, Math.min(1, (progress - 0.42) / 0.18));
      headingBlur.set(20 * (1 - headingIn));
      headingOp.set(headingIn);
      headingX.set(-headingSlide * window.innerWidth * 1.2);

      const ITEM_START = 0.5;
      const ITEM_RANGE = 0.28;
      const STAGGER = 0.08;
      const FADE_WIN = 0.2;
      const SCATTER_START = 0.86;
      const SCATTER_END = 0.98;

      const scatterProg = Math.max(
        0,
        Math.min(1, (progress - SCATTER_START) / (SCATTER_END - SCATTER_START)),
      );
      setItemsActive(progress >= 0.66 && scatterProg === 0);
      const revealProg = Math.max(
        0,
        Math.min(1, (progress - ITEM_START) / ITEM_RANGE),
      );

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        if (scatterProg > 0) {
          const exit = ITEM_EXITS[i];
          const xPx = (scatterProg * exit.x * window.innerWidth) / 100;
          const yPx = (scatterProg * exit.y * window.innerHeight) / 100;
          el.style.transform = `translateX(${xPx}px) translateY(${yPx}px) rotate(${scatterProg * exit.rotate}deg)`;
          el.style.opacity = String(Math.max(0, 1 - scatterProg * 2.5));
          el.style.filter = `blur(${scatterProg * 20}px)`;
          el.style.pointerEvents = "none";
        } else {
          const ep = Math.max(
            0,
            Math.min(1, (revealProg - i * STAGGER) / FADE_WIN),
          );
          el.style.transform = "none";
          el.style.opacity = String(ep);
          el.style.filter = `blur(${20 * (1 - ep)}px)`;
          el.style.pointerEvents = ep > 0.5 ? "auto" : "none";
        }
      });
    });
    return unsubscribe;
  }, [scrollY, bounds, headingX, headingBlur, headingOp]);

  return (
    <div ref={ref} data-snap className="relative h-[200vh] md:h-[280vh]">
      <div className="sticky top-0 flex h-screen w-full items-center">
        {/* WHAT I DO heading */}
        <motion.h1
          className="absolute top-1/2 left-1/2 whitespace-nowrap font-bold font-header text-[clamp(24px,7.5vw,42px)] text-white leading-[0.85] tracking-[-0.03em] md:text-[9vw]"
          style={{
            x: headingX,
            translateX: "-50%",
            translateY: "-50%",
            opacity: headingOp,
            filter: headingFilter,
            padding: "40px 60px",
          }}
        >
          WHAT I DO
        </motion.h1>

        {/* Capability items */}
        <div className="absolute inset-0 flex items-center px-[5vw]">
          <div className="flex w-full flex-col">
            {capabilities.map((cap, i) => (
              <button
                type="button"
                key={cap.number}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                onMouseEnter={() => setHoveredColor(cap.color)}
                onMouseLeave={() => setHoveredColor(null)}
                onFocus={() => setHoveredColor(cap.color)}
                onBlur={() => setHoveredColor(null)}
                onMouseMove={(e) => {
                  rawX.set(e.clientX + 24);
                  rawY.set(e.clientY - 80);
                }}
                className="pointer-events-none grid cursor-default grid-cols-[8vw_1fr] items-center gap-[4vw] border-white/[0.08] border-t py-[18px] opacity-0 blur-[20px] will-change-[transform,opacity,filter] md:grid-cols-[6vw_1fr_1fr] md:py-[30px]"
              >
                <span className="font-bold font-header text-[11px] text-white/[0.28] tracking-[0.08em] md:text-[clamp(11px,0.9vw,15px)]">
                  {cap.number}
                </span>
                <span className="font-bold font-header text-left text-[clamp(20px,2.4vw,40px)] text-white tracking-[-0.02em]">
                  {cap.title}
                </span>
                <span className="hidden text-[clamp(14px,1.05vw,18px)] text-white/45 leading-[1.7] md:inline">
                  {cap.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Hover image, follows cursor */}
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-50 h-[180px] w-[260px] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
          style={{
            x: imgX,
            y: imgY,
            opacity: itemsActive && hoveredColor ? 1 : 0,
            scale: itemsActive && hoveredColor ? 1 : 0.88,
            background: hoveredColor ?? "transparent",
            transition: "opacity 0.25s ease, scale 0.25s ease",
          }}
        />
      </div>
    </div>
  );
};
