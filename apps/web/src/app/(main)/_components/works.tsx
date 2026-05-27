"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import posthog from "posthog-js";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import type { ProjectData } from "./project-data";
import { PROJECT_MAP, PROJECTS, ProjectContent } from "./project-data";
import { ProjectDrawer } from "./project-drawer";

const SNAKE_OFFSETS = [-1, 1, -1, 1, -1];

const TILT_LIMIT = 14;

const WorksCard = ({
  data,
  cardY,
  onOpen,
}: {
  data: ProjectData;
  cardY: ReturnType<typeof useMotionValue<number>>;
  onOpen: () => void;
}) => {
  const { card } = data;
  const videoRef = useRef<HTMLVideoElement>(null);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const scaleRaw = useMotionValue(1);

  const rotateX = useSpring(rotateXRaw, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 180, damping: 18 });
  const scale = useSpring(scaleRaw, { stiffness: 220, damping: 20 });

  const updateTilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width;
    const relativeY = (event.clientY - bounds.top) / bounds.height;

    rotateYRaw.set((relativeX - 0.5) * TILT_LIMIT * 2);
    rotateXRaw.set((0.5 - relativeY) * TILT_LIMIT * 1.3);
    scaleRaw.set(1.025);
  };

  const resetTilt = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    scaleRaw.set(1);
  };

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = card.videoSpeed ?? 1;
  }, [card.videoSpeed]);

  const handleVideoTimeUpdate = () => {
    if (!videoRef.current) return;

    const { currentTime, duration } = videoRef.current;
    if (!duration || Number.isNaN(duration)) return;

    const loopEnd =
      card.videoLoopEndTime ??
      (card.videoLoopEndOffset ? duration - card.videoLoopEndOffset : null);

    if (loopEnd && currentTime >= loopEnd) {
      videoRef.current.currentTime = 0.05;
      void videoRef.current.play();
    }
  };

  const handleVideoEnded = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0.05;
    void videoRef.current.play();
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      className="group pointer-events-auto relative z-30 aspect-video w-[72vw] shrink-0 cursor-pointer overflow-hidden rounded-4xl bg-center bg-cover text-left shadow-[0_20px_60px_rgba(0,0,0,0.32)] ring-1 ring-white/5 md:w-[28vw]"
      style={{
        y: cardY,
        rotateX,
        rotateY,
        scale,
        transformPerspective: 1400,
        backgroundImage:
          card.background || card.thumbnail
            ? (card.background ?? `url(${card.thumbnail})`)
            : undefined,
      }}
      onPointerMove={updateTilt}
      onPointerEnter={updateTilt}
      onPointerLeave={resetTilt}
      onBlur={resetTilt}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      {card.video ? (
        <video
          ref={videoRef}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop={!card.videoLoopEndOffset && !card.videoLoopEndTime}
          playsInline
          preload="metadata"
          onEnded={handleVideoEnded}
          onTimeUpdate={handleVideoTimeUpdate}
          style={{
            transform: card.videoScale
              ? `scale(${card.videoScale})`
              : undefined,
            objectPosition: card.videoPosition,
          }}
        >
          <source src={card.video} type="video/mp4" />
        </video>
      ) : null}
      {card.svgOverlay}
      <div
        className={`pointer-events-none absolute inset-0 rounded-4xl transition-opacity duration-300 ${
          card.video ? "group-hover:opacity-0" : ""
        }`}
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 45%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-4xl transition-colors duration-300"
        style={{
          backgroundColor: card.video ? "transparent" : "rgba(0,0,0,0)",
        }}
      />
      <div
        className={`pointer-events-none absolute inset-0 rounded-4xl opacity-0 transition-opacity duration-300 ${
          card.video ? "" : "group-hover:opacity-100"
        }`}
        style={{
          background:
            "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.18), transparent 32%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-4 md:p-5">
        <div className="flex flex-col gap-0.5">
          <span className="font-bold font-header text-base text-white leading-tight tracking-[-0.01em] md:text-lg">
            {data.title}
          </span>
          <span className="text-[11px] text-white/50 uppercase tracking-[0.06em]">
            {data.service}
          </span>
        </div>
        <div
          aria-hidden="true"
          className="glass flex shrink-0 cursor-pointer items-center justify-center rounded-full p-2.5 outline-none transition-all duration-300"
        >
          <svg
            className="transition-transform duration-300 group-hover:rotate-45"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 12L12 2M12 2H5M12 2V9"
              stroke="white"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

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
    <div ref={ref} className="relative h-[400vh] md:h-[500vh]">
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
                posthog.capture("project_viewed", {
                  project: project.title,
                  service: project.service,
                });
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
