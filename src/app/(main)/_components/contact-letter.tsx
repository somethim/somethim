import { type MotionValue, motion, useTransform } from "motion/react";

export const IncomingLetter = ({
  char,
  progress,
  startX,
  startY,
  startRotate,
}: IncomingLetter.Props) => {
  const x = useTransform(progress, [0, 0.4], [startX, "0%"]);
  const y = useTransform(progress, [0, 0.4], [startY, "0%"]);
  const rotate = useTransform(progress, [0, 0.4], [startRotate, 0]);
  const opacity = useTransform(progress, [0.02, 0.35], [0, 1]);
  const blurValue = useTransform(progress, [0, 0.4], [20, 0]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);
  return (
    <motion.span
      className="inline-block"
      style={{ x, y, rotate, opacity, filter }}
    >
      {char}
    </motion.span>
  );
};
export namespace IncomingLetter {
  export type Props = {
    char: string;
    progress: MotionValue<number>;
    startX: string;
    startY: string;
    startRotate: number;
  };
}

export const letsLetters = [
  { char: "L", startX: "-45vw", startY: "65vh", startRotate: -28 },
  { char: "E", startX: "-18vw", startY: "80vh", startRotate: 18 },
  { char: "T", startX: "2vw", startY: "70vh", startRotate: -12 },
  { char: "'", startX: "18vw", startY: "55vh", startRotate: 8 },
  { char: "S", startX: "35vw", startY: "75vh", startRotate: -22 },
] as const;

export const workLetters = [
  { char: "W", startX: "-52vw", startY: "50vh", startRotate: 25 },
  { char: "O", startX: "-20vw", startY: "62vh", startRotate: -15 },
  { char: "R", startX: "10vw", startY: "68vh", startRotate: 18 },
  { char: "K", startX: "40vw", startY: "52vh", startRotate: -20 },
] as const;
