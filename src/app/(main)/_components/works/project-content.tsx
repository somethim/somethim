"use client";

import { PROJECTS, type ProjectData } from "@/constants/projects";
import { BlockRenderer } from "./block-renderer";

export const PROJECT_MAP = Object.fromEntries(
  PROJECTS.map((p) => [p.drawerId, p]),
) as Record<string, ProjectData>;

const SectionTitle = ({ children }: { children: string }) => (
  <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-tight">
    {children}
  </h2>
);

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

export const ProjectContent = ({
  project,
  onOpenNextProjectAction,
}: {
  project: ProjectData;
  onOpenNextProjectAction: (drawerId: string) => void;
}) => {
  const nextProject = PROJECT_MAP[project.nextDrawerId];
  const nextCard = nextProject?.card;

  return (
    <>
      <div className="sticky top-20 hidden h-0 overflow-visible xl:block">
        <div className="absolute top-4 right-12">
          <QuickLinks
            links={project.quickLinks}
            accentColor={project.accentColor}
          />
        </div>
      </div>

<div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-6 py-14 md:gap-16 md:px-16 md:py-20">
        {project.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="flex scroll-mt-20 flex-col gap-3"
          >
            <SectionTitle>{section.title}</SectionTitle>
            {section.blocks.map((block, i) => {
              const blockKey = `${section.id}-b${i}`;
              if (block.type === "decision-list") {
                return (
                  <div key={blockKey} className="flex flex-col gap-4">
                    <BlockRenderer block={block} />
                  </div>
                );
              }
              return <BlockRenderer key={blockKey} block={block} />;
            })}
          </section>
        ))}

        <section className="flex flex-col gap-6">
          <SectionTitle>Next Project</SectionTitle>
          <button
            type="button"
            onClick={() => onOpenNextProjectAction(project.nextDrawerId)}
            className="group block w-full cursor-pointer"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/[0.07] bg-[#111] transition-colors duration-300 group-hover:border-white/20">
              {nextCard?.video ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: "center top" }}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={nextCard.video} type="video/mp4" />
                </video>
              ) : nextCard?.background ? (
                <div
                  className="absolute inset-0"
                  style={{ background: nextCard.background }}
                />
              ) : null}
              {!nextCard?.video && nextCard?.thumbnail && (
                <div
                  className="absolute inset-0 bg-center bg-cover"
                  style={{ backgroundImage: `url(${nextCard.thumbnail})` }}
                />
              )}
              <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/60 to-transparent p-6">
                <span className="font-bold font-header text-white text-xl">
                  {nextProject?.title ?? project.nextDrawerId} →
                </span>
              </div>
            </div>
          </button>
        </section>
      </div>

      <footer className="border-white/[0.07] border-t px-6 py-6 text-center md:px-16">
        <p className="text-[13px] text-white/30">
          © 2026 Arbi Kullakshi. All Rights Reserved.
        </p>
      </footer>
    </>
  );
};
