"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { type MouseEvent, useRef } from "react";

const useMagnet = () => {
  const reference = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 180, damping: 18, mass: 0.6 });

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = reference.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((event.clientX - (rect.left + rect.width / 2)) * 0.35);
    rawY.set((event.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { ref: reference, x, y, onMove, onLeave };
};

export const MagneticButton = ({ onClickAction }: MagneticButton.Props) => {
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
        onClick={onClickAction}
        style={{ borderRadius: 9999 }}
        className="relative cursor-pointer border-none bg-white px-11 py-4.5 font-bold font-header text-[clamp(13px,1.1vw,17px)] text-black tracking-[0.01em] outline-none transition-[opacity,box-shadow] duration-200 hover:opacity-90 hover:shadow-[0_0_24px_rgba(255,255,255,0.35)]"
      >
        Start a project →
      </button>
    </motion.div>
  );
};
export namespace MagneticButton {
  export type Props = { onClickAction: () => void };
}

export const MagneticSubmitButton = ({
  sending,
  sent,
}: MagneticSubmitButton.Props) => {
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
        className="relative cursor-pointer overflow-hidden border-none bg-white px-8 py-3.5 font-bold font-header text-black text-sm tracking-[0.01em] transition-[opacity,box-shadow] duration-200 disabled:cursor-default disabled:opacity-60 group-hover:opacity-90 group-hover:shadow-[0_0_24px_rgba(255,255,255,0.35)]"
      >
        {sent ? "Sent!" : sending ? "Sending..." : "Send message →"}
      </button>
    </motion.div>
  );
};
export namespace MagneticSubmitButton {
  export type Props = { sending: boolean; sent: boolean };
}
