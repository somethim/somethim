"use client";

import Image from "next/image";
import { useState } from "react";

type PhotoConfig = {
  src: string;
  alt: string;
  priority?: boolean;
  roundedClassName?: string;
};

type TextSection = {
  title: string;
  subtitle?: string;
  body: string;
  bullets?: { label: string; text: string }[];
  photo?: PhotoConfig;
};

type Props = {
  hero: PhotoConfig;
  overviewTitle: string;
  overviewBody: string;
  sections: TextSection[];
  nextProjectLabel?: string;
  nextProjectVideo?: string;
  nextProjectDrawerId?: string;
  onOpenNextProject?: (drawerId: string) => void;
};

const Photo = ({
  src,
  alt,
  priority = false,
  roundedClassName = "rounded-[24px]",
}: PhotoConfig) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative w-full overflow-hidden border border-white/[0.07] bg-[#111] ${roundedClassName}`}
    >
      {hasError ? (
        <div className="flex h-full w-full items-center justify-center px-6 text-center">
          <div className="max-w-sm">
            <p className="font-semibold text-sm text-white">Image missing</p>
            <p className="mt-2 text-[13px] text-white/45 leading-6">{src}</p>
          </div>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={1400}
          height={0}
          quality={82}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1400px"
          className="h-auto w-full"
          priority={priority}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
};

export const ProjectCaseStudyContent = ({
  hero,
  overviewTitle,
  overviewBody,
  sections,
  nextProjectLabel = "THUMBNAIL\nOF THE OTHER\nPROJECT",
  nextProjectVideo,
  nextProjectDrawerId,
  onOpenNextProject,
}: Props) => (
  <>
    <div className="px-6 md:px-16">
      <Photo {...hero} roundedClassName="rounded-[66px]" />
    </div>

    <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-6 py-14 md:gap-16 md:px-16 md:py-20">
      <section className="flex flex-col gap-3">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
          Overview
        </h2>
        <h3 className="font-semibold text-base text-white md:text-lg">
          {overviewTitle}
        </h3>
        <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
          {overviewBody}
        </p>
      </section>

      {sections.map((section) => (
        <section key={section.title} className="flex flex-col gap-8">
          <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
            {section.title}
          </h2>

          {section.subtitle || section.body ? (
            <div className="flex flex-col gap-2">
              {section.subtitle ? (
                <h3 className="font-semibold text-base text-white md:text-lg">
                  {section.subtitle}
                </h3>
              ) : null}
              <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
                {section.body}
              </p>
              {section.bullets ? (
                <ul className="mt-1 flex flex-col gap-1.5 text-[14px] leading-[1.8] md:text-[15px]">
                  {section.bullets.map((bullet) => (
                    <li key={bullet.label} className="text-white/50">
                      <span className="font-semibold text-white">
                        {bullet.label}:{" "}
                      </span>
                      {bullet.text}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          {section.photo ? <Photo {...section.photo} /> : null}
        </section>
      ))}

      <section className="flex flex-col gap-6">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
          Next Project
        </h2>
        <button
          onClick={() => nextProjectDrawerId && onOpenNextProject?.(nextProjectDrawerId)}
          className="group block w-full cursor-pointer"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#111] transition-colors duration-300 group-hover:border-white/20">
            {nextProjectVideo ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={nextProjectVideo} type="video/mp4" />
              </video>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="whitespace-pre-line text-center font-bold font-header text-white/20 text-xl leading-relaxed tracking-widest">
                  {nextProjectLabel}
                </span>
              </div>
            )}
          </div>
        </button>
      </section>
    </div>

    <footer className="border-white/[0.07] border-t px-6 py-6 text-center md:px-16">
      <p className="text-[13px] text-white/30">
        © 2026 Mario Vukzaj. All Rights Reserved.
      </p>
    </footer>
  </>
);
