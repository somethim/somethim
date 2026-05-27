"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SIGNATURE_PATH } from "./signature";

export const Intro = () => {
  const [phase, setPhase] = useState<"signing" | "filling" | "exit">("signing");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("exit");
      return;
    }
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
          <svg
            viewBox="0 0 1973 1203"
            aria-label="Arbi Kullakshi"
            style={{
              width: "clamp(240px, 38vw, 480px)",
              filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))",
            }}
            fill="none"
          >
            <motion.path
              d={SIGNATURE_PATH}
              stroke="white"
              strokeWidth={10}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{
                pathLength: phase === "signing" ? 1 : 1,
                opacity: phase === "filling" ? 0 : 1,
              }}
              transition={{
                pathLength: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] },
                opacity: { duration: 0.15 },
              }}
              onAnimationComplete={() => {
                if (phase === "signing") setPhase("filling");
              }}
            />
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
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
