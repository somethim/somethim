"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SIGNATURE_PATH } from "@/constants/signature";
import { setCookie } from "@/lib/utils/cookie";

export const Intro = () => {
  const [phase, setPhase] = useState<"signing" | "filling" | "exit">("signing");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("exit");
      return;
    }

    setCookie("intro_seen", "1", 7);
  }, []);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="intro"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#080810",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          exit={{
            opacity: 0,
            filter: "blur(20px)",
            scale: 1.05,
            transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          <div
            style={{
              position: "relative",
              width: "clamp(320px, 55vw, 720px)",
              filter:
                "drop-shadow(0 0 40px rgba(255,255,255,0.35)) drop-shadow(0 0 80px rgba(255,255,255,0.15))",
            }}
          >
            <svg
              viewBox="0 0 1973 1203"
              aria-label="Arbi Kullakshi"
              style={{ width: "100%", display: "block" }}
              fill="none"
            >
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <motion.path
                d={SIGNATURE_PATH}
                fill="white"
                stroke="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "filling" ? 1 : 0 }}
                transition={{ duration: 0.15 }}
                onAnimationComplete={() => {
                  if (phase === "filling") setPhase("exit");
                }}
              />

              <motion.path
                d={SIGNATURE_PATH}
                stroke="white"
                strokeWidth={10}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  pathLength: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
                }}
                onAnimationComplete={() => {
                  if (phase === "signing") setPhase("filling");
                }}
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
