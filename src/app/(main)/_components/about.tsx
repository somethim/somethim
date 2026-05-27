"use client";

import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { EXPERIENCE } from "./project-data";

const CONTENT_COUNT = 8;
const CONTENT_START = 0.14;
const CONTENT_RANGE = 0.2;
const STAGGER = 0.05;
const FADE_WINDOW = 0.25;
const SCATTER_START = 0.34;
const SCATTER_END = 0.4;

const CONTENT_EXITS = [
  { x: -45, y: -50, rotate: -18 },
  { x: -55, y: -20, rotate: 12 },
  { x: -40, y: 30, rotate: -8 },
  { x: 50, y: -40, rotate: 20 },
  { x: 60, y: -30, rotate: -15 },
  { x: 70, y: 0, rotate: 10 },
  { x: 55, y: 25, rotate: -22 },
  { x: -30, y: 45, rotate: 14 },
] as const;

export const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ top: 0, height: 0 });

  const content = useRef<Array<HTMLDivElement | null>>(
    Array(CONTENT_COUNT).fill(null),
  );

  const aboutBlur = useMotionValue(12);
  const aboutOp = useMotionValue(0);
  const aboutFilter = useTransform(aboutBlur, (v) => `blur(${v}px)`);

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
    return scrollY.on("change", (latest) => {
      const { top, height } = bounds;
      const end = top + height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, (latest - top) / (end - top)));

      const aboutIn = Math.max(0, Math.min(1, progress / 0.08));
      const aboutOut = Math.max(0, Math.min(1, (progress - 0.1) / 0.04));
      aboutBlur.set(12 * (1 - aboutIn) + 12 * aboutOut);
      aboutOp.set(aboutIn * (1 - aboutOut));

      const contentProg = Math.max(
        0,
        Math.min(1, (progress - CONTENT_START) / CONTENT_RANGE),
      );
      const scatterProg = Math.max(
        0,
        Math.min(1, (progress - SCATTER_START) / (SCATTER_END - SCATTER_START)),
      );

      content.current.forEach((el, i) => {
        if (!el) return;
        if (scatterProg > 0) {
          const exit = CONTENT_EXITS[i] ?? { x: 0, y: -50, rotate: 0 };
          const xPx = (scatterProg * exit.x * window.innerWidth) / 100;
          const yPx = (scatterProg * exit.y * window.innerHeight) / 100;
          el.style.transform = `translateX(${xPx}px) translateY(${yPx}px) rotate(${scatterProg * exit.rotate}deg)`;
          el.style.opacity = String(Math.max(0, 1 - scatterProg * 2.5));
          el.style.filter = `blur(${scatterProg * 12}px)`;
        } else {
          const ep = Math.max(
            0,
            Math.min(1, (contentProg - i * STAGGER) / FADE_WINDOW),
          );
          el.style.transform = "none";
          el.style.opacity = String(ep);
          el.style.filter = `blur(${12 * (1 - ep)}px)`;
        }
      });
    });
  }, [scrollY, bounds, aboutBlur, aboutOp]);

  const setContentRef = (i: number) => (el: HTMLDivElement | null) => {
    content.current[i] = el;
  };

  return (
    <div ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen w-full items-center">
        <motion.h1
          className="absolute top-1/2 left-1/2 whitespace-nowrap font-bold font-header text-[clamp(36px,11vw,60px)] text-white leading-[0.85] tracking-[-0.03em] md:text-[13vw]"
          style={{
            translateX: "-50%",
            translateY: "-50%",
            opacity: aboutOp,
            filter: aboutFilter,
            padding: "40px 60px",
          }}
        >
          WHO I AM
        </motion.h1>

        <div className="pointer-events-none absolute inset-0 flex items-center px-[5vw]">
          <div className="flex w-full flex-col items-start gap-5 md:flex-row md:gap-[5vw]">
            <div className="flex w-full flex-none flex-col gap-1.5 md:w-auto md:flex-[0_0_42%] md:gap-5">
              <div
                ref={setContentRef(0)}
                className="opacity-0 blur-md will-change-[transform,opacity,filter]"
              >
                <h2 className="font-bold font-header text-[clamp(18px,5.5vw,28px)] text-white leading-[1.2] tracking-[-0.02em] md:text-[clamp(24px,3vw,48px)]">
                  From backend architecture to browser, end-to-end.
                </h2>
              </div>
              <div
                ref={setContentRef(1)}
                className="hidden opacity-0 blur-md will-change-[transform,opacity,filter] md:block"
              >
                <p className="text-[clamp(13px,3.8vw,16px)] text-white leading-[1.6] md:text-[clamp(14px,1.05vw,17px)] md:leading-[1.75]">
                  I'm Arbi. I build production systems that go all the way —
                  REST APIs, auth, permissions, real-time, and the web apps that
                  run on top of them.
                </p>
              </div>
              <div
                ref={setContentRef(2)}
                className="hidden opacity-0 blur-md will-change-[transform,opacity,filter] md:block"
              >
                <p className="text-[clamp(14px,1.05vw,17px)] text-white leading-[1.75]">
                  Currently at zennit, working on SaaS infrastructure, open
                  source packages, and client products. I care about
                  reliability, ownership, and shipping things that hold.
                </p>
              </div>
            </div>

            <div className="flex w-full flex-1 flex-col md:w-auto">
              <div
                ref={setContentRef(3)}
                className="mb-1 opacity-0 blur-md will-change-[transform,opacity,filter] md:mb-4"
              >
                <span className="block text-left font-bold font-header text-[13px] text-white tracking-[0.06em] md:text-right md:text-[clamp(14px,1.1vw,18px)]">
                  Experience
                </span>
              </div>
              {EXPERIENCE.map((item, i) => (
                <div
                  key={`${item.role}-${item.period}`}
                  ref={setContentRef(4 + i)}
                  className="flex items-center justify-between border-white/8 border-t py-1.5 opacity-0 blur-md will-change-[transform,opacity,filter] md:py-3.5"
                >
                  <div className="flex items-center gap-2.5 md:gap-3.5">
                    <div className="relative flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.14] bg-white/6 backdrop-blur-md md:size-9">
                      {"logo" in item && item.logo ? (
                        <Image
                          src={item.logo}
                          alt={item.role}
                          fill
                          className="object-contain p-0.75"
                          sizes="36px"
                        />
                      ) : (
                        <span className="font-bold font-header text-[9px] text-white tracking-[-0.02em]">
                          {item.initials}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-white md:text-[clamp(14px,1.15vw,18px)]">
                        {item.role}
                      </span>
                      <span className="text-[10px] text-white md:text-[clamp(11px,0.85vw,14px)]">
                        {item.impact}
                      </span>
                    </div>
                  </div>
                  <span className="ml-2 whitespace-nowrap font-semibold text-[12px] text-white md:ml-8 md:text-[clamp(12px,1.05vw,17px)]">
                    {item.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
