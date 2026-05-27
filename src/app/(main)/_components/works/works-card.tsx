import { motion, useMotionValue, useSpring } from "motion/react";
import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
} from "react";
import type { ProjectData } from "@/constants/projects";

const TILT_LIMIT = 14;

export const WorksCard = ({
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
      ) : card.thumbnail ? (
        <div
          className="pointer-events-none absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${card.thumbnail})` }}
        />
      ) : null}
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
