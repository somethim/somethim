"use client";

import type { EXPERIENCE } from "@/constants/expiriences";

type Props = {
  experience: (typeof EXPERIENCE)[number];
};

export const ExperienceContent = ({ experience }: Props) => (
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
      <section key={section.title} className="flex flex-col gap-3">
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

    <footer className="border-white/[0.07] border-t pt-6 text-center">
      <p className="text-[13px] text-white/30">© 2026 Arbi Kullakshi.</p>
    </footer>
  </div>
);
