"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { AddCarContent } from "./addcar-content";
import { AvatidContent } from "./avatid-content";
import { DardanairContent } from "./dardanair-content";
import { EcenticContent } from "./ecentic-content";
import { FastTrackTyresContent } from "./fast-track-tyres-content";
import { LookUpParkingContent } from "./lookup-parking-content";
// import { ProjectCaseStudyContent } from "./project-case-study-content"; // mektrin hidden
import { ZerapyContent } from "./zerapy-content";
import { ProjectDrawer } from "./project-drawer";
import { ZennitContent } from "./zennit-content";

type Project = {
  title: string;
  service: string;
  thumbnail?: string;
  video?: string;
  videoSpeed?: number;
  videoLoopEndTime?: number;
  videoLoopEndOffset?: number;
  videoScale?: number;
  videoPosition?: string;
  background?: string;
  accentColor?: string;
  drawerId?: string;
};

const projects: Project[] = [
  {
    title: "Zerapy.ai",
    service: "UI/UX Design",
    video: "/zerapy/thumbnail.mp4",
    background: "radial-gradient(ellipse at top left, #0D9488 0%, #0F172A 70%)",
    accentColor: "#14B8A6",
    drawerId: "zerapy",
  },
  {
    title: "LookUp Parking",
    service: "Product Design",
    video: "/lookup.mp4",
    thumbnail: "/lookup.png",
    accentColor: "#39B54A",
    drawerId: "lookup",
  },
  {
    title: "avatid",
    service: "Product Design",
    thumbnail: "/avatid-thumbnail.png",
    accentColor: "#EAB308",
    drawerId: "avatid",
  },
  {
    title: "ecéntic",
    service: "Product Design",
    video: "/ecentic-thumbnail.mp4",
    background:
      "radial-gradient(ellipse at top left, #93C5FD 0%, #0F172A 68%, #020617 100%)",
    accentColor: "#3B82F6",
    drawerId: "ecentic",
  },
  {
    title: "addCar",
    service: "Brand Identity",
    video: "/addcar/thumbnail.mp4",
    background: "radial-gradient(ellipse at top left, #E8001D 0%, #1A0000 70%)",
    accentColor: "#E8001D",
    drawerId: "addcar",
  },
  {
    title: "zennit",
    service: "Brand + Product",
    video: "/zennit.mp4",
    videoSpeed: 1.5,
    videoLoopEndTime: 9,
    thumbnail: "/zennit.png",
    accentColor: "#A855F7",
    drawerId: "zennit",
  },
  {
    title: "dardanair",
    service: "Brand Identity",
    video: "/dardanair.mp4",
    videoSpeed: 0.8,
    videoScale: 1.1,
    videoPosition: "center 46%",
    thumbnail: "/vatra.png",
    accentColor: "#1D4ED8",
    drawerId: "dardanair",
  },
  // mektrin hidden — uncomment to restore
  // {
  //   title: "mektrin",
  //   service: "Product Design",
  //   video: "/mektrin.mp4",
  //   background: "radial-gradient(ellipse at top left, #4B5563 0%, #111827 70%)",
  //   accentColor: "#9CA3AF",
  //   drawerId: "mektrin",
  // },
  {
    title: "Fast Track Tyres",
    service: "Brand Identity",
    video: "/fast-track-tyres/thumbnail.mp4",
    background: "radial-gradient(ellipse at top left, #FF1901 0%, #0A0A0A 70%)",
    accentColor: "#FF1901",
    drawerId: "fast-track-tyres",
  },
];

const experience = [
  {
    role: "Lead Product Designer at Zerapy.ai",
    impact: "Leading AI product design and brand direction",
    period: "Mar 2025 - Present",
    initials: "Z",
    logo: "/zerapy-logo.png",
  },
  {
    role: "Co-Founder at zennit",
    impact: "Design-engineering studio, full-stack product builds",
    period: "Nov 2023 - Present",
    initials: "Z",
    logo: "/zennit.png",
  },
  {
    role: "Chief Creative Officer at LookUp Parking",
    impact: "Built the product and brand from zero",
    period: "Jul 2024 - Present",
    initials: "LU",
    logo: "/lookup.png",
  },
  {
    role: "UI/UX Designer at Oval.al",
    impact: "Shipped client sites end-to-end, concept to production",
    period: "Sep 2024 - Mar 2025",
    initials: "O",
    logo: "/oval.jpeg",
  },
  {
    role: "UI/UX & Graphic Designer at Vatra Agency",
    impact: "Created brand systems for hospitality clients",
    period: "Sep 2023 - Jun 2024",
    initials: "V",
    logo: "/vatra.jpeg",
  },
  {
    role: "UI/UX Designer at Altech Solutions",
    impact: "Defined visual identity for AI wellness platform",
    period: "Feb 2022 - Jun 2023",
    initials: "AS",
    logo: "/altech.jpeg",
  },
  {
    role: "UI/UX & Graphic Designer at Polpetto Shoes",
    impact: "Brand identity and product design for footwear brand",
    period: "Feb 2021 - Dec 2021",
    initials: "P",
    logo: "/polpetto.png",
  },
];

const getCaseStudyContent = (
  drawerId: string,
  onOpenNextProject: (id: string) => void,
) => {
  const nextDrawerId = NEXT_PROJECT_MAP[drawerId as keyof typeof NEXT_PROJECT_MAP];

  switch (drawerId) {
    case "lookup":
      return <LookUpParkingContent nextProjectDrawerId={nextDrawerId} onOpenNextProject={onOpenNextProject} />;
    case "zennit":
      return <ZennitContent nextProjectDrawerId={nextDrawerId} onOpenNextProject={onOpenNextProject} />;
    case "dardanair":
      return <DardanairContent nextProjectDrawerId={nextDrawerId} onOpenNextProject={onOpenNextProject} />;
    case "avatid":
      return <AvatidContent nextProjectDrawerId={nextDrawerId} onOpenNextProject={onOpenNextProject} />;
    case "ecentic":
      return <EcenticContent nextProjectDrawerId={nextDrawerId} onOpenNextProject={onOpenNextProject} />;
    // mektrin case hidden — uncomment to restore
    case "fast-track-tyres":
      return <FastTrackTyresContent nextProjectDrawerId={nextDrawerId} onOpenNextProject={onOpenNextProject} />;
    case "addcar":
      return <AddCarContent nextProjectDrawerId={nextDrawerId} onOpenNextProject={onOpenNextProject} />;
    case "zerapy":
      return <ZerapyContent nextProjectDrawerId={nextDrawerId} onOpenNextProject={onOpenNextProject} />;
    default:
      return null;
  }
};

const NEXT_PROJECT_MAP = {
  zerapy: "lookup",
  lookup: "avatid",
  avatid: "ecentic",
  ecentic: "addcar",
  addcar: "zennit",
  zennit: "dardanair",
  dardanair: "fast-track-tyres",
  // mektrin: "fast-track-tyres", // hidden
  "fast-track-tyres": "zerapy",
} as const;

const SNAKE_OFFSETS = [-1, 1, -1, 1, -1, 1, -1, 1];

// Content elements order: bio heading, para1, para2, exp label, exp rows 0-6
const CONTENT_COUNT = 11;
const CONTENT_START = 0.78;
const CONTENT_RANGE = 0.2;
const STAGGER = 0.05;
const FADE_WINDOW = 0.25;
const SCATTER_START = 0.95;
const SCATTER_END = 1.0;

const CONTENT_EXITS = [
  { x: -45, y: -50, rotate: -18 },
  { x: -55, y: -20, rotate: 12 },
  { x: -40, y: 30, rotate: -8 },
  { x: 50, y: -40, rotate: 20 },
  { x: 60, y: -30, rotate: -15 },
  { x: 70, y: 0, rotate: 10 },
  { x: 55, y: 25, rotate: -22 },
  { x: -30, y: 45, rotate: 14 },
  { x: 20, y: -60, rotate: -30 },
  { x: 65, y: 40, rotate: 18 },
  { x: -50, y: 55, rotate: -12 },
] as const;

const TILT_LIMIT = 14;

const WorksCard = ({
  project,
  cardY,
  onOpen,
}: {
  project: Project;
  cardY: ReturnType<typeof useMotionValue<number>>;
  onOpen: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const scaleRaw = useMotionValue(1);

  const rotateX = useSpring(rotateXRaw, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 180, damping: 18 });
  const scale = useSpring(scaleRaw, { stiffness: 220, damping: 20 });

  const updateTilt = (event: ReactPointerEvent<HTMLButtonElement>) => {
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
    videoRef.current.playbackRate = project.videoSpeed ?? 1;
  }, [project.videoSpeed]);

  const handleVideoTimeUpdate = () => {
    if (!videoRef.current) return;

    const { currentTime, duration } = videoRef.current;
    if (!duration || Number.isNaN(duration)) return;

    const loopEnd =
      project.videoLoopEndTime ??
      (project.videoLoopEndOffset
        ? duration - project.videoLoopEndOffset
        : null);

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
      className="group pointer-events-auto relative z-30 aspect-[16/9] w-[72vw] shrink-0 cursor-pointer overflow-hidden rounded-[32px] bg-center bg-cover text-left shadow-[0_20px_60px_rgba(0,0,0,0.32)] ring-1 ring-white/[0.05] md:w-[28vw]"
      style={{
        y: cardY,
        rotateX,
        rotateY,
        scale,
        transformPerspective: 1400,
        backgroundImage:
          project.background || project.thumbnail
            ? (project.background ?? `url(${project.thumbnail})`)
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
      {project.video ? (
        <video
          ref={videoRef}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop={!project.videoLoopEndOffset && !project.videoLoopEndTime}
          playsInline
          preload="metadata"
          onEnded={handleVideoEnded}
          onTimeUpdate={handleVideoTimeUpdate}
          style={{
            transform: project.videoScale
              ? `scale(${project.videoScale})`
              : undefined,
            objectPosition: project.videoPosition,
          }}
        >
          <source src={project.video} type="video/mp4" />
        </video>
      ) : null}
      <div
        className={`pointer-events-none absolute inset-0 rounded-[32px] transition-opacity duration-300 ${
          project.video ? "group-hover:opacity-0" : ""
        }`}
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 45%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px] transition-colors duration-300"
        style={{
          backgroundColor: project.video ? "transparent" : "rgba(0,0,0,0)",
        }}
      />
      <div
        className={`pointer-events-none absolute inset-0 rounded-[32px] opacity-0 transition-opacity duration-300 ${
          project.video ? "" : "group-hover:opacity-100"
        }`}
        style={{
          background:
            "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.18), transparent 32%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-4 md:p-5">
        <div className="flex flex-col gap-0.5">
          <span className="font-bold font-header text-base text-white leading-tight tracking-[-0.01em] md:text-lg">
            {project.title}
          </span>
          <span className="text-[11px] text-white/50 uppercase tracking-[0.06em]">
            {project.service}
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

  const content = useRef<Array<HTMLDivElement | null>>(
    Array(CONTENT_COUNT).fill(null),
  );

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
  const cardY5 = useMotionValue(0);
  const cardY6 = useMotionValue(0);
  const cardY7 = useMotionValue(0);
  // cardY8 removed — mektrin hidden
  const cardYValues = [cardY0, cardY1, cardY2, cardY3, cardY4, cardY5, cardY6, cardY7];

  const aboutBlur = useMotionValue(12);
  const aboutOp = useMotionValue(0);
  const aboutFilter = useTransform(aboutBlur, (v) => `blur(${v}px)`);

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
    const unsubscribe = scrollY.on("change", (latest) => {
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

      // ABOUT ME heading: blur in 64-72%, hold, blur out 74-78%
      const aboutIn = Math.max(0, Math.min(1, (progress - 0.64) / 0.08));
      const aboutOut = Math.max(0, Math.min(1, (progress - 0.74) / 0.04));
      aboutBlur.set(12 * (1 - aboutIn) + 12 * aboutOut);
      aboutOp.set(aboutIn * (1 - aboutOut));

      // About content: reveal then scatter
      const contentProg = Math.max(
        0,
        Math.min(1, (progress - CONTENT_START) / CONTENT_RANGE),
      );
      const scatterProg = Math.max(
        0,
        Math.min(1, (progress - SCATTER_START) / (SCATTER_END - SCATTER_START)),
      );

      content.current.forEach((el, i) => {
        if (!el) return;
        if (scatterProg > 0) {
          const exit = CONTENT_EXITS[i] ?? { x: 0, y: -50, rotate: 0 };
          const xPx = (scatterProg * exit.x * window.innerWidth) / 100;
          const yPx = (scatterProg * exit.y * window.innerHeight) / 100;
          el.style.transform = `translateX(${xPx}px) translateY(${yPx}px) rotate(${scatterProg * exit.rotate}deg)`;
          el.style.opacity = String(Math.max(0, 1 - scatterProg * 2.5));
          el.style.filter = `blur(${scatterProg * 12}px)`;
        } else {
          const ep = Math.max(
            0,
            Math.min(1, (contentProg - i * STAGGER) / FADE_WINDOW),
          );
          el.style.transform = "none";
          el.style.opacity = String(ep);
          el.style.filter = `blur(${12 * (1 - ep)}px)`;
        }
      });
    });
    return unsubscribe;
  }, [
    scrollY,
    bounds,
    worksX,
    worksBlur,
    worksOp,
    cardsX,
    aboutBlur,
    aboutOp,
    cardYValues.forEach,
    cardYValues.length,
  ]);

  const setContentRef = (i: number) => (el: HTMLDivElement | null) => {
    content.current[i] = el;
  };

  const activeProject = projects.find(
    (project) => project.drawerId === openDrawer,
  );
  const activeGenericContent = openDrawer
    ? getCaseStudyContent(openDrawer, setOpenDrawer)
    : null;

  return (
    <div ref={ref} className="relative h-[600vh] md:h-[700vh]">
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
          {projects.map((project, index) => (
            <WorksCard
              key={project.title}
              project={project}
              cardY={cardYValues[index] ?? cardY0}
              onOpen={() => project.drawerId && setOpenDrawer(project.drawerId)}
            />
          ))}
        </motion.div>

        {/* WHO I AM heading */}
        <motion.h1
          className="absolute top-1/2 left-1/2 whitespace-nowrap font-bold font-header text-[clamp(36px,11vw,60px)] text-white leading-[0.85] tracking-[-0.03em] md:text-[13vw]"
          style={{
            translateX: "-50%",
            translateY: "-50%",
            opacity: aboutOp,
            filter: aboutFilter,
            padding: "40px 60px",
          }}
        >
          WHO I AM
        </motion.h1>

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

        {/* About content */}
        <div className="pointer-events-none absolute inset-0 flex items-center px-[5vw]">
          <div className="flex w-full flex-col items-start gap-5 md:flex-row md:gap-[5vw]">
            {/* Bio */}
            <div className="flex w-full flex-none flex-col gap-1.5 md:w-auto md:flex-[0_0_42%] md:gap-5">
              <div
                ref={setContentRef(0)}
                className="opacity-0 blur-[12px] will-change-[transform,opacity,filter]"
              >
                <h2 className="font-bold font-header text-[clamp(18px,5.5vw,28px)] text-white leading-[1.2] tracking-[-0.02em] md:text-[clamp(24px,3vw,48px)]">
                  Brand. Product. Code. Always with something to prove.
                </h2>
              </div>
              <div
                ref={setContentRef(1)}
                className="hidden opacity-0 blur-[12px] will-change-[transform,opacity,filter] md:block"
              >
                <p className="text-[clamp(13px,3.8vw,16px)] text-white leading-[1.6] md:text-[clamp(14px,1.05vw,17px)] md:leading-[1.75]">
                  I'm Mario. I design and build: brand systems, product
                  interfaces, and the code that ships them. From first concept
                  to production, every layer gets the same obsession.
                </p>
              </div>
              <div
                ref={setContentRef(2)}
                className="hidden opacity-0 blur-[12px] will-change-[transform,opacity,filter] md:block"
              >
                <p className="text-[clamp(14px,1.05vw,17px)] text-white leading-[1.75]">
                  Currently co-founding zennit and leading creative at LookUp.
                  I work in React, Next.js, and TypeScript. At my best where
                  design meets engineering.
                </p>
              </div>
            </div>

            {/* Experience */}
            <div className="flex w-full flex-1 flex-col md:w-auto">
              <div
                ref={setContentRef(3)}
                className="mb-1 opacity-0 blur-[12px] will-change-[transform,opacity,filter] md:mb-4"
              >
                <span className="block text-left font-bold font-header text-[13px] text-white tracking-[0.06em] md:text-right md:text-[clamp(14px,1.1vw,18px)]">
                  Experience
                </span>
              </div>
              {experience.map((item, i) => (
                <div
                  key={`${item.role}-${item.period}`}
                  ref={setContentRef(4 + i)}
                  className="flex items-center justify-between border-white/[0.08] border-t py-1.5 opacity-0 blur-[12px] will-change-[transform,opacity,filter] md:py-3.5"
                >
                  <div className="flex items-center gap-2.5 md:gap-3.5">
                    <div className="relative flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.14] bg-white/[0.08] backdrop-blur-[12px] md:size-9">
                      {"logo" in item && item.logo ? (
                        <Image
                          src={item.logo}
                          alt={item.role}
                          fill
                          className="object-cover"
                          sizes="36px"
                        />
                      ) : (
                        <span className="font-bold font-header text-[9px] text-white tracking-[-0.02em]">
                          {item.initials}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-white md:text-[clamp(14px,1.15vw,18px)]">
                        {item.role}
                      </span>
                      <span className="text-[10px] text-white md:text-[clamp(11px,0.85vw,14px)]">
                        {item.impact}
                      </span>
                    </div>
                  </div>
                  <span className="ml-2 whitespace-nowrap font-semibold text-[12px] text-white md:ml-8 md:text-[clamp(12px,1.05vw,17px)]">
                    {item.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



