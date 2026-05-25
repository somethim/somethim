"use client";

import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const cards = [
  { label: "Based in",     value: "New York"            },
  { label: "Discipline",   value: "UI / UX Design"      },
  { label: "Experience",   value: "5+ Years"            },
  { label: "Availability", value: "Open to work"        },
] as const;

const SNAKE_OFFSETS = [-1, 1, -1, 1];

export const About = () => {
  const ref      = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ top: 0, height: 0, trackWidth: 0 });

  const headingX       = useMotionValue(0);
  const headingBlur    = useMotionValue(20);
  const headingOpacity = useMotionValue(0);
  const headingFilter  = useTransform(headingBlur, (v) => `blur(${v}px)`);
  const cardsX         = useMotionValue(typeof window !== "undefined" ? window.innerWidth : 1920);

  const cardY0 = useMotionValue(0);
  const cardY1 = useMotionValue(0);
  const cardY2 = useMotionValue(0);
  const cardY3 = useMotionValue(0);
  const cardYValues = [cardY0, cardY1, cardY2, cardY3];

  const { scrollY } = useScroll();

  useEffect(() => {
    const measure = () => {
      if (!ref.current || !trackRef.current) return;
      setBounds({
        top:        ref.current.offsetTop,
        height:     ref.current.offsetHeight,
        trackWidth: trackRef.current.scrollWidth - window.innerWidth,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      const { top, height, trackWidth } = bounds;
      const end      = top + height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, (latest - top) / (end - top)));

      const blurIn = Math.min(1, progress / 0.2);
      headingBlur.set(20 - blurIn * 20);
      headingOpacity.set(blurIn);

      const slide = Math.max(0, Math.min(1, (progress - 0.4) / 0.2));
      headingX.set(-slide * window.innerWidth * 1.2);

      const cards = Math.max(0, (progress - 0.6) / 0.4);
      cardsX.set(window.innerWidth - cards * (trackWidth + window.innerWidth));

      const amplitude = window.innerHeight * 0.22;
      const stagger   = 0.18;
      cardYValues.forEach((cardY, i) => {
        const cardProgress = Math.max(0, Math.min(1, (cards - i * stagger) / (1 - (cardYValues.length - 1) * stagger)));
        cardY.set(SNAKE_OFFSETS[i] * amplitude * cardProgress);
      });
    });
    return unsubscribe;
  }, [scrollY, bounds, headingX, cardsX, cardY0, cardY1, cardY2, cardY3]);

  return (
    <div ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">

        {/* ABOUT ME heading */}
        <motion.h1
          className="absolute left-1/2 top-1/2"
          style={{
            x: headingX,
            translateX: "-50%",
            translateY: "-50%",
            opacity: headingOpacity,
            filter: headingFilter,
            fontFamily: "RFDewiExpanded",
            fontWeight: 700,
            fontSize: "13vw",
            letterSpacing: "-0.03em",
            lineHeight: 0.85,
            color: "white",
            whiteSpace: "nowrap",
          }}
        >
          ABOUT ME
        </motion.h1>

        {/* Cards track */}
        <motion.div
          ref={trackRef}
          style={{
            x: cardsX,
            display: "flex",
            gap: "20px",
            paddingLeft: "48px",
            alignItems: "center",
          }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              style={{
                flexShrink: 0,
                width: "34vw",
                height: "28vh",
                y: cardYValues[index],
                borderRadius: "28px",
                background: "rgba(20, 20, 24, 0.85)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "28px",
              }}
            >
              <span
                className="text-white/40 text-sm uppercase tracking-widest mb-1"
                style={{ fontFamily: "RFDewi", fontWeight: 600 }}
              >
                {card.label}
              </span>
              <span
                className="text-white text-2xl font-semibold"
                style={{ fontFamily: "RFDewi", fontWeight: 700 }}
              >
                {card.value}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};
