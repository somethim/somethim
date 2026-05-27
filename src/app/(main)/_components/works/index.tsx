"use client";

import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/constants/projects";
import { PROJECT_MAP, ProjectContent } from "./project-content";
import { ProjectDrawer } from "./project-drawer";
import { WorksCard } from "./works-card";

const SNAKE_OFFSETS = [-1, 1, -1, 1, -1];

export const Works = () => {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ top: 0, height: 0, trackWidth: 0 });
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);

  const worksX = useMotionValue(0);
  const worksBlur = useMotionValue(12);

  const worksOp = useMotionValue(0);
  const worksFilter = useTransform(worksBlur, (v) => `blur(${v}px)`);

  const cardsX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth : 1920,
  );
  const cardY0 = useMotionValue(0);
  const cardY1 = useMotionValue(0);
  const cardY2 = useMotionValue(0);
  const cardY3 = useMotionValue(0);
  const cardY4 = useMotionValue(0);
  const cardYValues = [cardY0, cardY1, cardY2, cardY3, cardY4];

  const { scrollY } = useScroll();

  useEffect(() => {
    const measure = () => {
      if (!ref.current || !track.current) return;
      setBounds({
        top: ref.current.offsetTop,
        height: ref.current.offsetHeight,
        trackWidth: track.current.scrollWidth - window.innerWidth,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const { top, height, trackWidth } = bounds;
      const end = top + height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, (latest - top) / (end - top)));

      // WORKS heading: blur in 0-10%, slide left 18-28%
      const worksBlurIn = Math.min(1, progress / 0.1);
      worksBlur.set(12 - worksBlurIn * 12);
      worksOp.set(worksBlurIn);
      const worksSlide = Math.max(0, Math.min(1, (progress - 0.18) / 0.1));
      worksX.set(-worksSlide * window.innerWidth * 1.2);

      // Project cards: slow enter 18-45%, no hold, exit 45-64%
      const cardsIn = Math.max(0, Math.min(1, (progress - 0.18) / 0.27));
      const cardsOut = Math.max(0, Math.min(1, (progress - 0.45) / 0.19));
      cardsX.set(
        window.innerWidth -
          cardsIn * (trackWidth + window.innerWidth) -
          cardsOut * (window.innerWidth + trackWidth),
      );

      const amplitude = window.innerHeight * 0.22;
      const stagger = 0.1;
      cardYValues.forEach((cardY, i) => {
        const ep = Math.max(
          0,
          Math.min(
            1,
            (cardsIn - i * stagger) / (1 - (cardYValues.length - 1) * stagger),
          ),
        );
        cardY.set((SNAKE_OFFSETS[i] ?? 1) * amplitude * ep);
      });
    });
  }, [
    scrollY,
    bounds,
    worksX,
    worksBlur,
    worksOp,
    cardsX,
    cardYValues.forEach,
    cardYValues.length,
  ]);

  const activeProject = openDrawer ? PROJECT_MAP[openDrawer] : undefined;
  const activeGenericContent = activeProject ? (
    <ProjectContent
      project={activeProject}
      onOpenNextProjectAction={setOpenDrawer}
    />
  ) : null;

  return (
    <div ref={ref} data-snap className="relative h-[300vh] md:h-[380vh]">
      <div className="sticky top-0 flex h-screen w-full items-center">
        {/* WORKS heading */}
        <motion.h1
          className="absolute top-1/2 left-1/2 whitespace-nowrap font-bold font-header text-[clamp(44px,14vw,72px)] text-white leading-[0.85] tracking-[-0.03em] md:text-[16vw]"
          style={{
            x: worksX,
            translateX: "-50%",
            translateY: "-50%",
            opacity: worksOp,
            filter: worksFilter,
            padding: "40px 60px",
          }}
        >
          WORKS
        </motion.h1>

        {/* Project cards */}
        <motion.div
          ref={track}
          className="pointer-events-none relative z-30 flex items-center gap-5 pl-6 md:pl-12"
          style={{ x: cardsX }}
        >
          {PROJECTS.map((project, index) => (
            <WorksCard
              key={project.title}
              data={project}
              cardY={cardYValues[index] ?? cardY0}
              onOpen={() => {
                if (!project.drawerId) return;
                setOpenDrawer(project.drawerId);
              }}
            />
          ))}
        </motion.div>

        {/* Project drawers */}
        {activeProject ? (
          <ProjectDrawer
            open={openDrawer !== null}
            onClose={() => setOpenDrawer(null)}
            title={activeProject.title}
            accentColor={activeProject.accentColor}
          >
            {activeGenericContent}
          </ProjectDrawer>
        ) : null}
      </div>
    </div>
  );
};
