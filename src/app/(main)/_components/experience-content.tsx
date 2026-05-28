"use client";

import Image from "next/image";
import type { EXPERIENCE } from "@/constants/expiriences";

type Props = {
  experience: (typeof EXPERIENCE)[number];
  nextExperience?: (typeof EXPERIENCE)[number];
  onOpenNextExperienceAction?: () => void;
};

const QuickLinks = ({
  links,
  accentColor,
}: {
  links: { label: string; id: string }[];
  accentColor: string;
}) => (
  <div className="flex flex-col border-white/10 border-l pl-3">
    <p
      className="mb-2.5 font-bold text-[10px] uppercase tracking-[0.14em]"
      style={{ color: accentColor }}
    >
      Contents
    </p>
    {links.map(({ label, id }) => (
      <button
        key={id}
        type="button"
        onClick={() =>
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        className="cursor-pointer py-0.75 text-left text-[12px] text-white/35 leading-snug transition-colors duration-200 hover:text-white/75"
      >
        {label}
      </button>
    ))}
  </div>
);

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const ExperienceContent = ({
  experience,
  nextExperience,
  onOpenNextExperienceAction,
}: Props) => {
  const quickLinks = experience.sections.map((s) => ({
    label: s.title,
    id: slugify(s.title),
  }));

  return (
    <>
      <div className="sticky top-20 hidden h-0 overflow-visible xl:block">
        <div className="absolute top-4 right-12">
          <QuickLinks links={quickLinks} accentColor={experience.accentColor} />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-6 py-14 md:gap-16 md:px-16 md:py-20">
        <section className="flex flex-col gap-4">
          <p className="text-[14px] text-white/55 leading-[1.85] md:text-[15px]">
            {experience.overview}
          </p>
          <p className="text-[12px] text-white/30 uppercase tracking-widest">
            {experience.period}
          </p>
        </section>

        {experience.sections.map((section) => (
          <section
            key={section.title}
            id={slugify(section.title)}
            className="flex scroll-mt-20 flex-col gap-3"
          >
            <h2 className="font-bold font-header text-[clamp(22px,3.5vw,34px)] text-white tracking-tight">
              {section.title}
            </h2>
            <p className="text-[14px] text-white/50 leading-[1.85] md:text-[15px]">
              {section.body}
            </p>
          </section>
        ))}

        <section className="flex flex-col gap-3">
          <h2 className="font-bold font-header text-[clamp(22px,3.5vw,34px)] text-white tracking-tight">
            Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {experience.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[13px] text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {nextExperience && onOpenNextExperienceAction && (
          <section className="flex flex-col">
            <span className="mb-1 block font-bold font-header text-[13px] text-white tracking-[0.06em] md:mb-4 md:text-[clamp(14px,1.1vw,18px)]">
              Next
            </span>
            <button
              type="button"
              onClick={onOpenNextExperienceAction}
              className="group flex w-full cursor-pointer items-center justify-between border-white/8 border-t py-1.5 transition-opacity duration-200 hover:opacity-70 md:py-3.5"
            >
              <div className="flex items-center gap-2.5 md:gap-3.5">
                <div className="relative flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.14] bg-white/6 backdrop-blur-md md:size-9">
                  {"logo" in nextExperience && nextExperience.logo ? (
                    <Image
                      src={nextExperience.logo}
                      alt={nextExperience.role}
                      fill
                      className="object-contain p-0.75"
                      sizes="36px"
                    />
                  ) : (
                    <span className="font-bold font-header text-[9px] text-white tracking-[-0.02em]">
                      {nextExperience.initials}
                    </span>
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[13px] text-white md:text-[clamp(14px,1.15vw,18px)]">
                    {nextExperience.role}
                    <span className="text-white/40">
                      {" "}
                      · {nextExperience.company}
                    </span>
                  </span>
                  <span className="text-[10px] text-white/50 md:text-[clamp(11px,0.85vw,14px)]">
                    {nextExperience.impact}
                  </span>
                </div>
              </div>
              <div className="ml-2 flex items-center gap-3 md:ml-8">
                <span className="whitespace-nowrap font-semibold text-[12px] text-white md:text-[clamp(12px,1.05vw,17px)]">
                  {nextExperience.period}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-60"
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
            </button>
          </section>
        )}
      </div>

      <footer className="border-white/[0.07] border-t px-6 py-6 text-center md:px-16">
        <p className="text-[13px] text-white/30">© 2026 Arbi Kullakshi.</p>
      </footer>
    </>
  );
};
