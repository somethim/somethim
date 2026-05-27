"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const orbs = [
  {
    key: "blue",
    color: "#74D4FF",
    size: { desktop: 1400, mobile: 600 },
    blur: 120,
    opacity: { desktop: 0.55, mobile: 0.7 },
    initial: { top: "80%", left: "10%" },
    x: { from: "0%", to: "55%", duration: 55 },
    y: { from: "0%", to: "-50%", duration: 72 },
  },
  {
    key: "violet",
    color: "#DAB2FF",
    size: { desktop: 1500, mobile: 650 },
    blur: 130,
    opacity: { desktop: 0.45, mobile: 0.6 },
    initial: { top: "0%", left: "70%" },
    x: { from: "0%", to: "-55%", duration: 68 },
    y: { from: "0%", to: "50%", duration: 50 },
  },
  {
    key: "white",
    color: "#FFFFFF",
    size: { desktop: 900, mobile: 400 },
    blur: 110,
    opacity: { desktop: 0.12, mobile: 0.15 },
    initial: { top: "50%", left: "50%" },
    x: { from: "0%", to: "-20%", duration: 80 },
    y: { from: "0%", to: "-30%", duration: 60 },
  },
] as const;

export const Background = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#0d0d14]">
      {mounted
        ? orbs.map((orb) => (
            <motion.div
              key={orb.key}
              aria-hidden
              className="pointer-events-none absolute"
              style={{
                top: orb.initial.top,
                left: orb.initial.left,
                willChange: "transform",
              }}
              animate={{ x: [orb.x.from, orb.x.to, orb.x.from] }}
              transition={{
                duration: orb.x.duration,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <motion.div
                style={{ willChange: "transform" }}
                animate={{ y: [orb.y.from, orb.y.to, orb.y.from] }}
                transition={{
                  duration: orb.y.duration,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <div
                  style={{
                    width: isMobile ? orb.size.mobile : orb.size.desktop,
                    height: isMobile ? orb.size.mobile : orb.size.desktop,
                    borderRadius: "50%",
                    background: isMobile
                      ? `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`
                      : orb.color,
                    filter: isMobile ? "none" : `blur(${orb.blur}px)`,
                    opacity: isMobile
                      ? orb.opacity.mobile
                      : orb.opacity.desktop,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </motion.div>
            </motion.div>
          ))
        : null}
    </div>
  );
};
