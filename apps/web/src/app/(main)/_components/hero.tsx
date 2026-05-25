"use client";

import {
  type MotionValue,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

namespace Letter {
  export type Props = {
    char: string;
    progress: MotionValue<number>;
    exitX: string;
    exitY: string;
    exitRotate: number;
  };
}

const Letter = ({ char, progress, exitX, exitY, exitRotate }: Letter.Props) => {
  const x = useTransform(progress, [0, 0.6], ["0%", exitX]);
  const y = useTransform(progress, [0, 0.6], ["0%", exitY]);
  const rotate = useTransform(progress, [0, 0.6], [0, exitRotate]);
  const opacity = useTransform(progress, [0, 0.35], [1, 0]);
  const blur = useTransform(progress, [0, 0.6], [0, 20]);
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <motion.span
      className="inline-block font-header"
      style={{ x, y, rotate, opacity, filter }}
    >
      {char}
    </motion.span>
  );
};
namespace ScatterWord {
  export type Props = {
    word: string;
    progress: MotionValue<number>;
    exitX: string;
    exitY: string;
    exitRotate: number;
  };
}
const ScatterWord = ({
  word,
  progress,
  exitX,
  exitY,
  exitRotate,
}: ScatterWord.Props) => {
  const x = useTransform(progress, [0, 0.6], ["0%", exitX]);
  const y = useTransform(progress, [0, 0.6], ["0%", exitY]);
  const rotate = useTransform(progress, [0, 0.6], [0, exitRotate]);
  const opacity = useTransform(progress, [0, 0.35], [1, 0]);
  const blur = useTransform(progress, [0, 0.6], [0, 20]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.span
      className="mr-[0.28em] inline-block"
      style={{ x, y, rotate, opacity, filter }}
    >
      {word}
    </motion.span>
  );
};

const name = [
  { char: "M", exitX: "-8vw", exitY: "-130vh", exitRotate: -12 },
  { char: "A", exitX: "-3vw", exitY: "-150vh", exitRotate: 8 },
  { char: "R", exitX: "2vw", exitY: "-140vh", exitRotate: -6 },
  { char: "I", exitX: "5vw", exitY: "-155vh", exitRotate: 10 },
  { char: "O", exitX: "10vw", exitY: "-125vh", exitRotate: -9 },
] as const;

const surname = [
  { char: "V", exitX: "-10vw", exitY: "-120vh", exitRotate: 8 },
  { char: "U", exitX: "-5vw", exitY: "-145vh", exitRotate: -10 },
  { char: "K", exitX: "0vw", exitY: "-130vh", exitRotate: 6 },
  { char: "Z", exitX: "4vw", exitY: "-150vh", exitRotate: -7 },
  { char: "A", exitX: "8vw", exitY: "-135vh", exitRotate: 9 },
  { char: "J", exitX: "12vw", exitY: "-120vh", exitRotate: -8 },
] as const;

const punchlines = [
  { word: "Designing", exitX: "-6vw", exitY: "-90vh", exitRotate: -8 },
  { word: "and", exitX: "-2vw", exitY: "-110vh", exitRotate: 5 },
  { word: "building", exitX: "2vw", exitY: "-95vh", exitRotate: -4 },
  { word: "brands", exitX: "-4vw", exitY: "-115vh", exitRotate: 7 },
  { word: "and", exitX: "3vw", exitY: "-100vh", exitRotate: -6 },
  { word: "products", exitX: "6vw", exitY: "-105vh", exitRotate: 4 },
  { word: "people", exitX: "-3vw", exitY: "-90vh", exitRotate: -5 },
  { word: "can't", exitX: "5vw", exitY: "-108vh", exitRotate: 6 },
  { word: "ignore.", exitX: "8vw", exitY: "-95vh", exitRotate: -4 },
] as const;

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const punchlineY = useTransform(scrollYProgress, [0, 0.75], ["0%", "-60vh"]);
  const punchlineX = useTransform(scrollYProgress, [0, 0.75], ["0%", "15vw"]);
  const punchlineOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const punchlineRotate = useTransform(scrollYProgress, [0, 0.75], [0, 12]);
  const punchlineBlur = useTransform(scrollYProgress, [0, 0.75], [0, 16]);
  const punchlineFilter = useTransform(punchlineBlur, (v) => `blur(${v}px)`);

  return (
    <section ref={ref} className="relative h-[160vh] w-full md:h-[220vh]">
      <div className="sticky top-0 relative flex h-screen w-full flex-col items-start justify-center px-5 md:px-0">
        <div className="relative z-10 w-full leading-none">
          {/* Mobile layout */}
          <div className="md:hidden">
            <h1 className="font-bold font-header text-[clamp(48px,15vw,64px)] text-white uppercase leading-[0.85] tracking-[-0.03em]">
              {name.map((letter) => (
                <Letter
                  key={letter.char}
                  progress={scrollYProgress}
                  {...letter}
                />
              ))}
            </h1>
            <h1 className="font-bold font-header text-[clamp(48px,15vw,64px)] text-white uppercase leading-[0.85] tracking-[-0.03em]">
              {surname.map((letter) => (
                <Letter
                  key={letter.char}
                  progress={scrollYProgress}
                  {...letter}
                />
              ))}
            </h1>
            <p className="mt-[18px] flex flex-wrap text-[clamp(13px,3.5vw,17px)] text-white leading-[1.5]">
              {punchlines.map((w) => (
                <ScatterWord key={w.word} progress={scrollYProgress} {...w} />
              ))}
            </p>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:block">
            <div className="flex items-end">
              <h1 className="shrink-0 font-bold font-header text-[16vw] text-white uppercase leading-[0.85] tracking-[-0.03em]">
                {name.map((letter) => (
                  <Letter
                    key={letter.char}
                    progress={scrollYProgress}
                    {...letter}
                  />
                ))}
              </h1>
              <motion.p
                className="ml-6 max-w-[520px] text-[clamp(18px,1.8vw,28px)] text-white leading-snug"
                style={{
                  y: punchlineY,
                  x: punchlineX,
                  opacity: punchlineOpacity,
                  rotate: punchlineRotate,
                  filter: punchlineFilter,
                }}
              >
                Designing and building brands
                <br />
                and products people can't ignore.
              </motion.p>
            </div>
            <h1 className="ml-[14vw] font-bold font-header text-[16vw] text-white uppercase leading-[0.85] tracking-[-0.03em]">
              {surname.map((letter) => (
                <Letter
                  key={letter.char}
                  progress={scrollYProgress}
                  {...letter}
                />
              ))}
            </h1>
          </div>
        </div>
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3, duration: 1, ease: "easeOut" }}
          >
            <div
              className="relative w-px overflow-hidden rounded-full"
              style={{
                height: 96,
                background: "rgba(255,255,255,0.08)",
              }}
            >
              {/* Comet glow bloom */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                animate={{ y: ["-100%", "180%"] }}
                transition={{
                  duration: 1.4,
                  ease: [0.4, 0, 0.5, 1],
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 0.6,
                }}
                style={{
                  width: 10,
                  height: "50%",
                  background:
                    "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.15) 40%, white 100%)",
                  filter: "blur(4px)",
                }}
              />
              {/* Main comet */}
              <motion.div
                className="absolute left-0 w-full"
                animate={{ y: ["-100%", "180%"] }}
                transition={{
                  duration: 1.4,
                  ease: [0.4, 0, 0.5, 1],
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 0.6,
                }}
                style={{
                  height: "50%",
                  background:
                    "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.6) 50%, white 100%)",
                  boxShadow: "0 0 6px 1px rgba(255,255,255,0.9)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
