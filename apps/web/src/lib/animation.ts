import type { Transition } from "motion/react";

export const spring = {
  type: "spring",
  damping: 15,
  stiffness: 60,
  mass: 0.8,
  restDelta: 0.001,
} satisfies Transition;

export const easeIn = {
  type: "tween",
  ease: [0.3, 0.12, 0.25, 1],
  duration: 0.32,
} satisfies Transition;

export const easeOut = {
  type: "tween",
  ease: [0.45, 0.0, 0.8, 0.2],
  duration: 0.32,
} satisfies Transition;
