"use client";

import type { ReactNode } from "react";
import type { SectionBlock } from "@/constants/projects";
import { Arrow } from "@/lib/icons/arrow";

const InlineBlock = ({
  block,
}: {
  block: Extract<SectionBlock, { type: "p-inline" }>;
}) => (
  <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
    {block.children.map((part, i) => {
      const k = `part-${i}`;
      if (typeof part === "string") return <span key={k}>{part}</span>;
      if ("highlight" in part)
        return (
          <span key={k} className="text-white/70">
            {part.highlight}
          </span>
        );
      if ("code" in part)
        return (
          <span key={k} className="mx-1 font-mono text-[13px] text-white/60">
            {part.code}
          </span>
        );
      return null;
    })}
  </p>
);

const GridCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-xl border border-white/[0.07] bg-white/3 p-3 ${className ?? ""}`}
  >
    {children}
  </div>
);

export const BlockRenderer = ({ block }: { block: SectionBlock }) => {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
          {block.children}
        </p>
      );
    case "p-inline":
      return (
        <InlineBlock
          block={block as Extract<SectionBlock, { type: "p-inline" }>}
        />
      );
    case "link":
      return (
        <a
          href={block.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center gap-2 text-[13px] text-white/40 transition-colors duration-200 hover:text-white/70"
        >
          <Arrow />
          {block.label}
        </a>
      );
    case "model-grid":
      return (
        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          {block.items.map((item) => (
            <GridCard key={item.model}>
              <p className="font-mono text-[11px] text-white/60">
                {item.model}
              </p>
              <p className="mt-1 text-[11px] text-white/35 leading-[1.6]">
                {item.detail}
              </p>
            </GridCard>
          ))}
        </div>
      );
    case "decision-list":
      return (
        <div className="flex flex-col gap-3">
          {block.items.map((item) => (
            <div
              key={item.decision}
              className="rounded-2xl border border-white/[0.07] bg-white/3 p-5"
            >
              <p className="font-semibold text-[13px] text-white/80 leading-snug md:text-[14px]">
                {item.decision}
              </p>
              <p className="mt-2 text-[13px] text-white/40 leading-[1.7] md:text-[14px]">
                {item.rationale}
              </p>
            </div>
          ))}
        </div>
      );
    case "tech-stack":
      return (
        <div className="flex flex-wrap gap-2">
          {block.items.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[13px] text-white/70"
            >
              {tech}
            </span>
          ))}
        </div>
      );
    case "stat-grid":
      return (
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {block.items.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.07] bg-white/3 p-4"
            >
              <div className="font-bold font-header text-2xl text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-[11px] text-white/40 uppercase tracking-[0.06em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      );
    case "field-table":
      return (
        <>
          {block.caption && (
            <p className="mb-3 text-[11px] text-white/30 uppercase tracking-widest">
              {block.caption}
            </p>
          )}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {block.items.map((item) => (
              <GridCard key={item.table}>
                <p className="font-mono font-semibold text-[12px] text-white/70">
                  {item.table}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {item.fields.map((f) => (
                    <span
                      key={f}
                      className="rounded bg-white/4 px-1.5 py-0.5 font-mono text-[10px] text-white/30"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-white/35 leading-[1.6]">
                  {item.desc}
                </p>
              </GridCard>
            ))}
          </div>
        </>
      );
    case "cmd-grid":
      return (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {block.items.map((item) => (
            <GridCard key={item.cmd} className="p-3">
              <p className="font-mono text-[12px] text-violet-300/70">
                php artisan {item.cmd}
              </p>
              <p className="mt-1 text-[11px] text-white/35 leading-[1.6]">
                {item.desc}
              </p>
            </GridCard>
          ))}
        </div>
      );
    case "endpoint-list":
      return (
        <div className="rounded-2xl border border-white/[0.07] bg-white/3 p-5">
          {block.caption && (
            <p className="mb-3 text-[11px] text-white/30 uppercase tracking-widest">
              {block.caption}
            </p>
          )}
          <div className="flex flex-col gap-2">
            {block.items.map((ep) => (
              <div key={ep.path} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 rounded px-1.5 py-0.5 font-mono font-semibold text-[10px] ${
                    ep.method === "POST"
                      ? "bg-emerald-500/10 text-emerald-300/70"
                      : "bg-blue-500/10 text-blue-300/60"
                  }`}
                >
                  {ep.method}
                </span>
                <div>
                  <p className="font-mono text-[11px] text-white/60">
                    {ep.path}
                  </p>
                  <p className="text-[11px] text-white/30">{ep.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case "info-grid":
      return (
        <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3">
          {block.items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/[0.07] bg-white/3 p-4"
            >
              <div className="font-bold font-header text-base text-white leading-snug">
                {item.value}
              </div>
              <div className="mt-1 text-[11px] text-white/40 uppercase tracking-[0.06em]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      );
    case "feature-badges":
      return (
        <div className="mt-3 flex flex-wrap gap-2">
          {block.items.map((f) => (
            <span
              key={f.label}
              className={`rounded-full border px-2.5 py-1 text-[11px] ${f.className}`}
            >
              {f.label}
            </span>
          ))}
        </div>
      );
    case "app-grid":
      return (
        <>
          {block.caption && (
            <p className="mb-3 text-[11px] text-white/30 uppercase tracking-widest">
              {block.caption}
            </p>
          )}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {block.items.map((item) => (
              <GridCard key={item.app}>
                <p className="font-mono text-[12px] text-white/70">
                  {item.app}
                </p>
                <p className="mt-1 text-[11px] text-white/35 leading-snug">
                  {item.desc}
                </p>
              </GridCard>
            ))}
          </div>
        </>
      );
    case "flow":
      return (
        <div className="rounded-2xl border border-white/[0.07] bg-white/3 p-5">
          {block.caption && (
            <p className="mb-3 text-[11px] text-white/30 uppercase tracking-widest">
              {block.caption}
            </p>
          )}
          <div className="flex flex-wrap items-start gap-3">
            {block.items.map((level) => (
              <div key={level.name} className="flex items-center gap-3">
                <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <p className="font-semibold text-[12px] text-white/75">
                    {level.name}
                  </p>
                  <p className="mt-0.5 text-[10px] text-white/35">
                    {level.detail}
                  </p>
                </div>
                {level.arrow && (
                  <span className="text-lg text-white/25">→</span>
                )}
              </div>
            ))}
          </div>
          {block.bottom && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-white/20">↓</span>
              <div
                className={`rounded-lg border px-3 py-2 ${block.bottom.color}`}
              >
                <p
                  className="font-semibold text-[12px]"
                  style={{ color: "inherit", opacity: 0.8 }}
                >
                  {block.bottom.label}
                </p>
                <p className="mt-0.5 text-[10px] text-white/35">
                  {block.bottom.detail}
                </p>
              </div>
            </div>
          )}
        </div>
      );
    case "module-chain":
      return (
        <div className="flex flex-wrap items-center gap-1.5">
          {block.items.map((mod, i, arr) => (
            <div key={mod} className="flex items-center gap-1.5">
              <span className="rounded-lg border border-white/10 bg-white/4 px-3 py-1.5 font-mono text-[11px] text-white/60">
                {mod}
              </span>
              {i < arr.length - 1 && (
                <span className="text-[11px] text-white/20">→</span>
              )}
            </div>
          ))}
        </div>
      );
    case "custom":
      return <>{block.children}</>;
    default:
      return null;
  }
};
