"use client";

import { AnimatePresence, motion } from "motion/react";
import { type PropsWithChildren, useEffect } from "react";
import { GlassIconButton } from "./glass-icon-button";

type Props = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title: string;
  accentColor?: string;
}>;

export const ProjectDrawer = ({
  open,
  onClose,
  title,
  accentColor = "#FF1901",
  children,
}: Props) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col bg-[#0A0A0A]"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Accent gradient — covers the whole drawer, non-scrolling */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${accentColor}55 0%, transparent 55%)`,
            }}
          />

          {/* Scrollable content */}
          <div className="relative z-10 flex-1 overflow-y-auto" data-lenis-prevent>
            {/* Close button — sticky to top-right as content scrolls */}
            <div className="sticky top-0 z-20 flex justify-end px-4 pt-4 md:px-6 md:pt-6">
              <GlassIconButton onClick={onClose} className="size-10" aria-label="Close">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M1 1L12 12M12 1L1 12" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </GlassIconButton>
            </div>

            <div className="px-6 pb-10 pt-6 md:px-16 md:pt-8">
              <h1 className="font-bold font-header text-[clamp(40px,9vw,96px)] leading-[0.88] tracking-[-0.03em] text-white">
                {title}
              </h1>
            </div>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
