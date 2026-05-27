"use client";

import type { ReactNode } from "react";

const SvgArrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const AbacEvaluationGraph = () => (
  <svg
    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.13]"
    viewBox="0 0 280 158"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="8"
      y="58"
      width="64"
      height="42"
      rx="6"
      stroke="white"
      strokeWidth="1.2"
    />
    <text
      x="40"
      y="75"
      textAnchor="middle"
      fill="white"
      fontSize="7"
      fontWeight="600"
    >
      Policy
    </text>
    <text
      x="40"
      y="87"
      textAnchor="middle"
      fill="white"
      fontSize="5.5"
      opacity="0.7"
    >
      method + resource
    </text>
    <line x1="72" y1="79" x2="92" y2="79" stroke="white" strokeWidth="1.2" />
    <path
      d="M88 75 L92 79 L88 83"
      stroke="white"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <rect
      x="92"
      y="58"
      width="68"
      height="42"
      rx="6"
      stroke="white"
      strokeWidth="1.2"
    />
    <text
      x="126"
      y="75"
      textAnchor="middle"
      fill="white"
      fontSize="7"
      fontWeight="600"
    >
      ConditionGroup
    </text>
    <text
      x="126"
      y="87"
      textAnchor="middle"
      fill="white"
      fontSize="5.5"
      opacity="0.7"
    >
      AND / OR logic
    </text>
    <line x1="160" y1="79" x2="180" y2="79" stroke="white" strokeWidth="1.2" />
    <path
      d="M176 75 L180 79 L176 83"
      stroke="white"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <rect
      x="180"
      y="58"
      width="60"
      height="42"
      rx="6"
      stroke="white"
      strokeWidth="1.2"
    />
    <text
      x="210"
      y="75"
      textAnchor="middle"
      fill="white"
      fontSize="7"
      fontWeight="600"
    >
      Check
    </text>
    <text
      x="210"
      y="87"
      textAnchor="middle"
      fill="white"
      fontSize="5.5"
      opacity="0.7"
    >
      key op value
    </text>
    <line
      x1="140"
      y1="100"
      x2="140"
      y2="116"
      stroke="white"
      strokeWidth="1"
      strokeDasharray="3 2"
    />
    <path
      d="M136 112 L140 116 L144 112"
      stroke="white"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <rect
      x="70"
      y="116"
      width="140"
      height="28"
      rx="5"
      stroke="white"
      strokeWidth="1"
    />
    <text
      x="140"
      y="128"
      textAnchor="middle"
      fill="white"
      fontSize="6.5"
      fontWeight="600"
    >
      evaluate()
    </text>
    <text
      x="140"
      y="138"
      textAnchor="middle"
      fill="white"
      fontSize="5.5"
      opacity="0.7"
    >
      → Scoped Query, not boolean
    </text>
  </svg>
);

const NotifyreArchFlow = () => (
  <svg
    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.13]"
    viewBox="0 0 280 158"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="8"
      y="64"
      width="56"
      height="30"
      rx="5"
      stroke="white"
      strokeWidth="1.2"
    />
    <text
      x="36"
      y="81"
      textAnchor="middle"
      fill="white"
      fontSize="7"
      fontWeight="600"
    >
      App
    </text>
    <line x1="64" y1="79" x2="82" y2="79" stroke="white" strokeWidth="1.2" />
    <path
      d="M78 75 L82 79 L78 83"
      stroke="white"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <rect
      x="82"
      y="64"
      width="60"
      height="30"
      rx="5"
      stroke="white"
      strokeWidth="1.2"
    />
    <text
      x="112"
      y="77"
      textAnchor="middle"
      fill="white"
      fontSize="7"
      fontWeight="600"
    >
      Notifyre
    </text>
    <text
      x="112"
      y="87"
      textAnchor="middle"
      fill="white"
      fontSize="5.5"
      opacity="0.7"
    >
      Channel
    </text>
    <line x1="142" y1="79" x2="162" y2="79" stroke="white" strokeWidth="1.2" />
    <path
      d="M158 75 L162 79 L158 83"
      stroke="white"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <rect
      x="162"
      y="64"
      width="50"
      height="30"
      rx="5"
      stroke="white"
      strokeWidth="1.2"
    />
    <text
      x="187"
      y="77"
      textAnchor="middle"
      fill="white"
      fontSize="7"
      fontWeight="600"
    >
      Driver
    </text>
    <text
      x="187"
      y="87"
      textAnchor="middle"
      fill="white"
      fontSize="5.5"
      opacity="0.7"
    >
      swappable
    </text>
    <line x1="212" y1="79" x2="232" y2="79" stroke="white" strokeWidth="1.2" />
    <path
      d="M228 75 L232 79 L228 83"
      stroke="white"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <rect
      x="232"
      y="64"
      width="40"
      height="30"
      rx="5"
      stroke="white"
      strokeWidth="1.2"
    />
    <text
      x="252"
      y="81"
      textAnchor="middle"
      fill="white"
      fontSize="7"
      fontWeight="600"
    >
      SMS
    </text>
    <line
      x1="112"
      y1="94"
      x2="112"
      y2="110"
      stroke="white"
      strokeWidth="1"
      strokeDasharray="3 2"
    />
    <path
      d="M108 106 L112 110 L116 106"
      stroke="white"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <rect
      x="48"
      y="110"
      width="130"
      height="24"
      rx="4"
      stroke="white"
      strokeWidth="0.8"
    />
    <text
      x="113"
      y="121"
      textAnchor="middle"
      fill="white"
      fontSize="5.5"
      fontWeight="600"
    >
      DB Persistence · Webhook Callbacks
    </text>
    <text
      x="113"
      y="129"
      textAnchor="middle"
      fill="white"
      fontSize="5"
      opacity="0.7"
    >
      optional · typed DTOs
    </text>
  </svg>
);

// --- Block types ---

export type SectionBlock =
  | { type: "p"; children: string }
  | {
      type: "p-inline";
      children: (string | { highlight: string } | { code: string })[];
    }
  | { type: "link"; href: string; label: string }
  | { type: "model-grid"; items: { model: string; detail: string }[] }
  | { type: "decision-list"; items: { decision: string; rationale: string }[] }
  | { type: "tech-stack"; items: string[] }
  | { type: "stat-grid"; items: { label: string; value: string }[] }
  | {
      type: "field-table";
      caption?: string;
      items: { table: string; fields: string[]; desc: string }[];
    }
  | { type: "cmd-grid"; items: { cmd: string; desc: string }[] }
  | {
      type: "endpoint-list";
      caption?: string;
      items: { method: string; path: string; desc: string }[];
    }
  | { type: "info-grid"; items: { label: string; value: string }[] }
  | { type: "feature-badges"; items: { label: string; className: string }[] }
  | {
      type: "app-grid";
      caption?: string;
      items: { app: string; desc: string }[];
    }
  | {
      type: "flow";
      caption?: string;
      items: { name: string; detail: string; arrow: boolean }[];
      bottom?: { label: string; detail: string; color: string };
    }
  | { type: "module-chain"; items: string[] }
  | { type: "custom"; children: ReactNode };

export type ProjectSection = {
  id: string;
  title: string;
  blocks: SectionBlock[];
};

export type ProjectCard = {
  video?: string;
  videoSpeed?: number;
  videoLoopEndTime?: number;
  videoLoopEndOffset?: number;
  videoScale?: number;
  videoPosition?: string;
  thumbnail?: string;
  background?: string;
  svgOverlay?: ReactNode;
};

export type ProjectData = {
  drawerId: string;
  title: string;
  service: string;
  accentColor: string;
  quickLinks: { label: string; id: string }[];
  sections: ProjectSection[];
  nextDrawerId: string;
  card: ProjectCard;
};

// --- Block renderers ---

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

const BlockRenderer = ({ block }: { block: SectionBlock }) => {
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
          <SvgArrow />
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

// --- Section renderer ---

const SectionTitle = ({ children }: { children: string }) => (
  <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
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

// --- Project data ---

export const PROJECTS: ProjectData[] = [
  {
    drawerId: "zennstream",
    title: "Zennstream",
    service: "Full Stack · Backend Platform",
    accentColor: "#A855F7",
    nextDrawerId: "mektrin",
    card: {
      video: "/zennit.mp4",
      videoSpeed: 1.5,
      videoLoopEndTime: 9,
      thumbnail: "/zennit.png",
    },
    quickLinks: [
      { label: "Overview", id: "overview" },
      { label: "Architecture", id: "architecture" },
      { label: "Multi-tenancy", id: "multitenancy" },
      { label: "Auth", id: "auth" },
      { label: "Access Control", id: "access-control" },
      { label: "AI", id: "ai" },
      { label: "Sync & Social", id: "sync" },
      { label: "Design Decisions", id: "design" },
      { label: "Stack", id: "stack" },
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            children:
              "Zennstream is the core infrastructure layer of the Zennit SaaS platform — a multi-tenant backend that organizations use to manage their workforce, projects, time, leave, events, and AI-assisted workflows in one place. It serves HR teams, project leads, and individual contributors, with product modules that can be enabled or disabled per tenant. Other products built on Zennit plug into Zennstream as a composable foundation rather than rebuilding tenant, auth, and permission logic from scratch.",
          },
        ],
      },
      {
        id: "architecture",
        title: "Architecture",
        blocks: [
          {
            type: "p",
            children:
              "Modular Laravel monolith with 10 independently scoped modules, auto-loaded at boot. Each module is fully self-contained — routes, migrations, models, services, jobs, and notifications live within it. Composable, not independently deployable.",
          },
          {
            type: "field-table",
            items: [
              {
                table: "Common",
                fields: ["—"],
                desc: "Base classes, shared macros, Blueprint extensions",
              },
              {
                table: "Auth",
                fields: [
                  "users",
                  "auth_accounts",
                  "mfas",
                  "session_audits",
                  "personal_access_tokens",
                ],
                desc: "Identity, credentials, MFA, audit log, passwordless",
              },
              {
                table: "Organization",
                fields: [
                  "organizations",
                  "profiles",
                  "modules",
                  "organization_modules",
                  "brand_colors",
                ],
                desc: "Multi-tenancy, profile-based membership, feature flags",
              },
              {
                table: "Leave",
                fields: [
                  "profile_contracts",
                  "pto_types",
                  "vacations",
                  "holidays",
                  "holiday_groups",
                ],
                desc: "Contracts, PTO types, leave requests, holiday calendar",
              },
              {
                table: "Projects",
                fields: [
                  "projects",
                  "tasks",
                  "task_lists",
                  "teams",
                  "dependent_tasks",
                  "tags",
                ],
                desc: "Projects, task graph, teams, dependencies, tagging",
              },
              {
                table: "Time",
                fields: ["work_sessions", "break_sessions"],
                desc: "Session start/stop, break tracking",
              },
              {
                table: "Events",
                fields: [
                  "events",
                  "event_participants",
                  "event_attribute_schemas",
                ],
                desc: "Typed events with runtime-validated JSON attribute payloads",
              },
              {
                table: "Sync",
                fields: ["—"],
                desc: "Batch sync endpoint — named reads and typed mutations in one request, per-item error isolation",
              },
              {
                table: "AI",
                fields: [
                  "ai_conversations",
                  "ai_messages",
                  "ai_documents",
                  "ai_user_preferences",
                ],
                desc: "Multi-provider chat, fork graph, vector embeddings, MCP",
              },
              {
                table: "Social",
                fields: ["social_accounts", "social_posts"],
                desc: "Encrypted OAuth tokens for 5 platforms, scheduled post dispatch, status tracking",
              },
            ],
          },
        ],
      },
      {
        id: "multitenancy",
        title: "Multi-tenancy",
        blocks: [
          {
            type: "p",
            children:
              "A user can belong to multiple organizations simultaneously through independent profile records. Every request is scoped to an active organization, anchoring all downstream queries — leave, projects, time, permissions — to that context rather than raw user identity. Feature modules are enabled or disabled per organization, gating entire product areas without per-route conditionals.",
          },
        ],
      },
      {
        id: "auth",
        title: "Auth",
        blocks: [
          {
            type: "p",
            children:
              "Identity and credentials are separated — one user can hold multiple credential accounts (email/password plus any of 12 OAuth providers), each independently verified. MFA is tracked per credential rather than per user. Every login event writes a full audit record: session fingerprint, IP, platform, and location — without storing the session token in plaintext. Passwordless entry uses time-limited signed links.",
          },
        ],
      },
      {
        id: "access-control",
        title: "Access Control",
        blocks: [
          {
            type: "p",
            children:
              "Access rules are stored in the database as a composable policy graph, not hard-coded in the application. Policies define what operation is permitted on what resource; condition groups attach AND/OR logic; individual checks compare actor and resource attributes. The evaluator returns a scoped query rather than a boolean — listing endpoints automatically return only rows the caller is permitted to see, with no separate filtering step needed.",
          },
        ],
      },
      {
        id: "ai",
        title: "AI",
        blocks: [
          {
            type: "p",
            children:
              "12 LLM providers selectable per conversation or per user preference. Conversations can be forked at any message, with the branch point stored as an exact reference so it remains stable as the parent thread grows — designed for exploratory workflows where users try alternate continuations. Documents are stored as 1536-dim vector embeddings for semantic retrieval during conversations. An MCP server exposes the AI layer to compatible clients natively. Sharing uses a two-phase model: owners grant access directly; non-owners submit a request that goes through an approval flow.",
          },
        ],
      },
      {
        id: "sync",
        title: "Sync & Social Publishing",
        blocks: [
          {
            type: "p",
            children:
              "A single batch endpoint accepts named reads and typed mutations (insert, update, delete) in one request. Mutations are routed through the same validation and business logic as standard REST calls, with per-item error isolation in the response. Designed for clients that queue operations offline and replay them on reconnect.",
          },
          {
            type: "p",
            children:
              "OAuth tokens for 5 social platforms are stored encrypted per organization with proactive refresh before expiry. Posts are scheduled and dispatched with full status tracking and error capture per platform.",
          },
        ],
      },
      {
        id: "design",
        title: "Design Decisions",
        blocks: [
          {
            type: "decision-list",
            items: [
              {
                decision: "Uniform schema conventions at the framework level",
                rationale:
                  "Primary key format, timestamp fields, and foreign key naming are standardized as infrastructure across all tables — enforced by custom Blueprint macros, not documentation.",
              },
              {
                decision:
                  "All many-to-many relationships are first-class models",
                rationale:
                  "Every pivot has its own primary key and soft deletes, making each relationship independently auditable and extensible without retrofitting a join table later.",
              },
              {
                decision: "Task dependencies encoded as a directed graph",
                rationale:
                  "Dependency edges are their own model, making the graph independently queryable, auditable, and extensible to multi-level blocking chains.",
              },
              {
                decision:
                  "Event types carry a JSON attributes payload validated against a separate schema definition",
                rationale:
                  "New event types can be added without a migration — the schema definition is a separate record, not a code enum.",
              },
              {
                decision:
                  "Leave requests tied to a specific contract allowance",
                rationale:
                  "Quota enforcement is exact per employment period rather than per profile — a contract change doesn't retroactively affect past or parallel leave allocations.",
              },
            ],
          },
          {
            type: "module-chain",
            items: [
              "Common",
              "Auth",
              "Organization",
              "Leave",
              "Projects",
              "Time",
              "Events",
              "Sync",
              "AI",
              "Social",
            ],
          },
        ],
      },
      {
        id: "stack",
        title: "Stack",
        blocks: [
          {
            type: "tech-stack",
            items: [
              "PHP 8.5",
              "Laravel 13",
              "PostgreSQL",
              "pgvector",
              "Redis",
              "Laravel Horizon",
              "Laravel Reverb",
              "Laravel Octane",
              "Laravel Passport",
              "Laravel Sanctum",
              "Laravel Socialite",
              "TOTP",
              "Twilio",
              "Resend",
              "Laravel Scout",
            ],
          },
          {
            type: "stat-grid",
            items: [
              { label: "Modules", value: "10" },
              { label: "DB Tables", value: "~65" },
              { label: "API Endpoints", value: "~140" },
              { label: "AI Providers", value: "12" },
              { label: "OAuth Providers", value: "12" },
              { label: "Social Platforms", value: "5" },
              { label: "Background Jobs", value: "8" },
              { label: "MCP Components", value: "3" },
            ],
          },
        ],
      },
    ],
  },
  {
    drawerId: "mektrin",
    title: "Mektrin Motors",
    service: "Full Stack",
    accentColor: "#9CA3AF",
    nextDrawerId: "lookup",
    card: {
      video: "/mektrin.mp4",
      thumbnail: "/mektrin-thumb.png",
    },
    quickLinks: [
      { label: "Overview", id: "overview" },
      { label: "Frontend", id: "frontend" },
      { label: "Backend", id: "backend" },
      { label: "Infrastructure", id: "infrastructure" },
      { label: "Design Decisions", id: "design" },
      { label: "Stack", id: "stack" },
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            children:
              "Mektrin Motors is a bilingual (Albanian/English) vehicle dealership platform serving a high-end multi-brand dealership in Albania. It replaces a manually-managed showroom workflow with a full product and CRM system: staff upload listings, manage pricing and discounts, publish blog articles, post job openings, and handle inbound customer inquiries — all from a role-gated internal dashboard. Customers browse a public storefront surfacing cars, trucks, and yachts with faceted filtering, book test drives, apply for jobs, and chat live with sales agents.",
          },
        ],
      },
      {
        id: "frontend",
        title: "Frontend",
        blocks: [
          {
            type: "p",
            children:
              "Next.js 14 App Router with two route groups: a public storefront and a protected staff CMS. The storefront covers vehicle listings for three vehicle types, a merchandise store, blog, service pages, test drive booking, and an about section. The CMS covers listings, templates, store items, staff management, job postings, applications, blog posts, and live chat.",
          },
          {
            type: "p",
            children:
              "Faceted filtering returns distinct attribute values narrowed by the current filter context server-side — selecting one filter prunes available options for every other filter automatically, in a single round trip. All filter state lives in the URL, making filtered views shareable and bookmarkable. Drag-and-drop image ordering is persisted server-side. PDF offer sheets are generated client-side. Blog posts are authored in a rich MDX editor. Role authorization runs at the edge in middleware before any React code executes — no flash of unauthorized content.",
          },
        ],
      },
      {
        id: "backend",
        title: "Backend",
        blocks: [
          {
            type: "p",
            children:
              "Django 5.0 + Django REST Framework, six self-contained apps. The server runs in dual mode: one process handles HTTP/REST, a separate one handles WebSocket — deployed as independent containers behind the same proxy. Auto-generated OpenAPI schema is exposed for the full API surface.",
          },
          {
            type: "p",
            children:
              "Live chat encrypts messages per room using a unique symmetric key stored with the room record. Messages buffer in Redis during an active session and flush to the database on disconnect — still encrypted. Staff connect with an authenticated WebSocket; anonymous sessions are finalized on disconnect. Historical messages are replayed in order on reconnect.",
          },
          {
            type: "p",
            children:
              "The vehicle catalog splits into Templates (master product catalog, staff-only) and Listings (published inventory, public read). Three vehicle types share a common attribute shape with type-specific fields added where needed. A shared filtering implementation across all vehicle endpoints handles multi-value params, range filters, text search, and sort via inheritance — no duplicated logic per type.",
          },
          {
            type: "model-grid",
            items: [
              {
                model: "vehicles_cars / cartemplates",
                detail:
                  "Listing + template split per vehicle type · drag-sort images · sale price computed on save",
              },
              {
                model: "vehicles_trucks / trucktemplates",
                detail: "Same shape as cars, type-specific fields",
              },
              {
                model: "vehicles_yachts / yachttemplates",
                detail: "Adds length, capacity, cabin count",
              },
              {
                model: "chat_chatroom + chat_message",
                detail:
                  "Per-room Fernet symmetric key · bytea encrypted messages · Redis buffer",
              },
              {
                model: "accounts_user",
                detail:
                  "name as login identifier · role enum drives API access + superuser status",
              },
              {
                model: "articles_article",
                detail: "Markdown file on disk · tags M2M · thumbnail",
              },
              {
                model: "clients_driverequests + jobapplications",
                detail: "CRM inbound leads — test drives and job applications",
              },
              {
                model: "store_store",
                detail:
                  "Price + sale percentage → discounted price auto-computed on save",
              },
            ],
          },
        ],
      },
      {
        id: "infrastructure",
        title: "Infrastructure & Deployment",
        blocks: [
          {
            type: "p",
            children:
              "Single bare-metal VPS. Seven Docker containers managed via Ansible: reverse proxy with Let's Encrypt TLS, PostgreSQL, Redis, HTTP API server, WebSocket server, static file server, and Next.js frontend. Hardware metrics collected via Prometheus Node Exporter as a systemd service.",
          },
          {
            type: "p",
            children:
              "Two CI workflows trigger on semver tags scoped to path filters: one builds three backend images from a multi-stage Dockerfile and pushes to GHCR; the other builds the frontend image. Deployment runs an Ansible playbook that pulls images, recreates containers, and runs database migrations — no manual steps on the server. All credentials are managed with Ansible Vault and injected as container environment variables at deploy time.",
          },
        ],
      },
      {
        id: "design",
        title: "Design Decisions",
        blocks: [
          {
            type: "decision-list",
            items: [
              {
                decision: "Separate HTTP and WebSocket server processes",
                rationale:
                  "REST gets a mature process model optimized for throughput; WebSocket gets its own isolated process. Stability trade-off for a system where HTTP traffic vastly outnumbers WebSocket connections.",
              },
              {
                decision: "Redis as hot buffer, Postgres as cold archive",
                rationale:
                  "Chat messages buffer in Redis during an active session and flush to the database on disconnect. Avoids write contention under concurrent WebSocket sessions — acceptable durability trade-off for a support chat context.",
              },
              {
                decision:
                  "Per-room symmetric encryption with no external key management",
                rationale:
                  "Each chat room gets a unique Fernet key stored with the room record. Message content is protected against database dumps without the operational complexity of a dedicated key store.",
              },
              {
                decision: "Context-aware filter options computed server-side",
                rationale:
                  "Each attribute's available values are computed with all other active filters applied except its own, so the UI stays coherent with the current selection — and it happens in one server round trip.",
              },
              {
                decision: "Role authorization at the edge in middleware",
                rationale:
                  "The role is read from a cookie and matched against allowed path sets before any React code executes — no flash of unauthorized content, and no per-page access checks.",
              },
            ],
          },
          {
            type: "app-grid",
            caption: "Django app structure",
            items: [
              { app: "accounts", desc: "Custom user model, auth, roles" },
              { app: "vehicles", desc: "Cars, trucks, yachts + templates" },
              { app: "chat", desc: "Encrypted WebSocket live chat" },
              { app: "articles", desc: "MDX blog, tags, photos" },
              { app: "clients", desc: "Test drives, job applications" },
              { app: "store", desc: "Merchandise catalog, pricing" },
            ],
          },
        ],
      },
      {
        id: "stack",
        title: "Stack",
        blocks: [
          {
            type: "tech-stack",
            items: [
              "Next.js 14",
              "React 18",
              "TypeScript",
              "TailwindCSS",
              "Framer Motion",
              "TanStack Query v5",
              "TanStack Table v8",
              "@dnd-kit",
              "MDXEditor",
              "@react-pdf/renderer",
              "next-intl",
              "PostHog",
              "Django 5.0",
              "Django REST Framework",
              "Django Channels",
              "PostgreSQL 16",
              "Redis 7",
              "Fernet encryption",
              "Docker",
              "Traefik",
              "Nginx",
              "Ansible",
              "GitHub Actions",
              "Prometheus",
            ],
          },
          {
            type: "stat-grid",
            items: [
              { label: "Pages", value: "49" },
              { label: "Components", value: "130" },
              { label: "Server Actions", value: "76" },
              { label: "REST Endpoints", value: "~55" },
              { label: "Backend Apps", value: "6" },
              { label: "DB Tables", value: "~23" },
              { label: "Docker Containers", value: "7" },
              { label: "Locales", value: "2" },
            ],
          },
        ],
      },
    ],
  },
  {
    drawerId: "lookup",
    title: "LookUp",
    service: "Machine Learning · BSc Thesis",
    accentColor: "#39B54A",
    nextDrawerId: "abac",
    card: {
      video: "/lookup.mp4",
      thumbnail: "/lookup.png",
    },
    quickLinks: [
      { label: "Overview", id: "overview" },
      { label: "Research", id: "research" },
      { label: "Thesis", id: "thesis" },
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            children:
              "ML research project developed as part of the LookUp smart parking platform and as the basis of my BSc thesis at the European University of Tirana. The core problem: most traffic prediction models perform well under normal conditions but degrade when traffic is disrupted by planned public events — concerts, sports matches, large gatherings — because those spikes can't be inferred from historical data alone.",
          },
        ],
      },
      {
        id: "research",
        title: "Research",
        blocks: [
          {
            type: "p",
            children:
              "The research investigates whether incorporating event-related signals alongside historical traffic data meaningfully improves prediction accuracy. Event data — location, time, expected scale — is collected via web scraping and used as additional model input. A model trained on combined signals is evaluated against a baseline trained on historical data only, with accuracy, reliability, and response time as evaluation criteria.",
          },
          {
            type: "p",
            children:
              "The resulting predictions feed into the LookUp platform's pricing and availability surfaces, where demand spikes around nearby events are an important signal. Standard traffic models trained only on historical patterns systematically underperform during event-driven disruptions — exactly the scenario where accurate prediction most affects pricing and availability decisions.",
          },
        ],
      },
      {
        id: "thesis",
        title: "Thesis",
        blocks: [
          {
            type: "p-inline",
            children: [
              {
                highlight:
                  "Machine Learning-Based Traffic Prediction Using Historical Data and Event Information",
              },
              " — European University of Tirana, Faculty of Engineering, Informatics and Architecture. Supervisor: Dr. Jora Banda.",
            ],
          },
          {
            type: "info-grid",
            items: [
              { label: "Institution", value: "European University of Tirana" },
              {
                label: "Faculty",
                value: "Engineering, Informatics & Architecture",
              },
              { label: "Year", value: "2026" },
            ],
          },
        ],
      },
    ],
  },
  {
    drawerId: "abac",
    title: "ABAC",
    service: "Open Source · Laravel",
    accentColor: "#7C3AED",
    nextDrawerId: "notifyre",
    card: {
      background: "radial-gradient(ellipse at top left, #7C3AED 0%, #111 70%)",
      svgOverlay: <AbacEvaluationGraph />,
    },
    quickLinks: [
      { label: "Overview", id: "overview" },
      { label: "Design", id: "design" },
      { label: "Schema", id: "schema" },
      { label: "Tooling", id: "tooling" },
      { label: "Stack", id: "stack" },
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            children:
              "An attribute-based access control library for Laravel 13+, built as the permission layer for Zennstream and then extracted and open-sourced. RBAC assigns permissions to roles; ABAC attaches constraints to those permissions — a user can read a resource, but only if their attributes match the resource's attributes. Rules are stored in the database, not code, so they can be created and modified at runtime without a deployment.",
          },
          {
            type: "link",
            href: "https://github.com/zennit-dev/abac",
            label: "zennit-dev/abac",
          },
        ],
      },
      {
        id: "design",
        title: "Design",
        blocks: [
          {
            type: "flow",
            caption: "Evaluation graph",
            items: [
              { name: "Policy", detail: "method + resource type", arrow: true },
              {
                name: "ConditionGroup",
                detail: "AND / OR with nested sub-groups",
                arrow: true,
              },
              { name: "Check", detail: "key · operator · value", arrow: false },
            ],
            bottom: {
              label: "evaluate()",
              detail:
                "returns a scoped query, not a boolean — listing endpoints filter automatically",
              color: "border-violet-500/20 bg-violet-500/6 text-violet-300/80",
            },
          },
          {
            type: "p",
            children:
              'The key design decision is that evaluation returns a scoped query, not a boolean. Access control is embedded directly into the ORM layer — collection reads are automatically filtered to rows the caller is permitted to see, rather than blocking the request outright. A single evaluation call covers both "can this user access this resource" and "give me only what they\'re allowed to see."',
          },
          {
            type: "p",
            children:
              "Policies are evaluated through a composable three-level graph: a policy defines what operation is permitted on what resource type; condition groups attach AND/OR logic with nested sub-groups; individual checks compare actor and resource attributes. The evaluator is recursive — nested condition groups translate directly to nested query clauses, making complex multi-condition rules composable without code changes. Extra evaluation context can be injected at runtime without modifying the underlying model schema.",
          },
          {
            type: "p",
            children:
              "The service layer is built around swappable contracts for caching, metrics collection, and policy storage. Evaluation performance is monitored per call, with slow evaluations flagged in the log. The package ships with an Artisan command to generate a starter policy scaffold from existing route definitions, and a benchmarking suite.",
          },
        ],
      },
      {
        id: "schema",
        title: "Schema",
        blocks: [
          {
            type: "p",
            children:
              "Five tables back the full policy engine. Policies and chains are top-level records; checks attach to chains. Additional attribute tables extend actor and resource context at runtime without touching the underlying models.",
          },
          {
            type: "field-table",
            items: [
              {
                table: "abac_policies",
                fields: ["resource", "method"],
                desc: "One record per permission — what operation on what resource type",
              },
              {
                table: "abac_chains",
                fields: ["_policy", "_chain", "operator"],
                desc: "AND / OR condition groups; self-referential for nested sub-groups",
              },
              {
                table: "abac_checks",
                fields: ["_chain", "operator", "key", "value"],
                desc: "Leaf comparison — actor or resource attribute against a stored value",
              },
              {
                table: "abac_actor_additional_attributes",
                fields: ["key", "value"],
                desc: "Runtime context injected onto the actor without model changes",
              },
              {
                table: "abac_resource_additional_attributes",
                fields: ["model", "key", "value"],
                desc: "Runtime context injected onto a resource type without model changes",
              },
            ],
          },
        ],
      },
      {
        id: "tooling",
        title: "Tooling",
        blocks: [
          {
            type: "p",
            children:
              "The package ships an Artisan command that reads existing route definitions and generates a starter policy scaffold — each route becomes a policy stub with the resource and method pre-filled. A benchmarking suite measures evaluation performance per call, with slow evaluations automatically flagged in the log at a configurable threshold.",
          },
          {
            type: "cmd-grid",
            items: [
              {
                cmd: "abac:scaffold",
                desc: "Generate policy stubs from routes",
              },
              {
                cmd: "abac:benchmark",
                desc: "Run evaluation performance suite",
              },
              { cmd: "abac:cache", desc: "Warm the policy evaluation cache" },
            ],
          },
        ],
      },
      {
        id: "stack",
        title: "Stack",
        blocks: [
          {
            type: "tech-stack",
            items: [
              "PHP 8.3+",
              "Laravel 13",
              "PostgreSQL",
              "PHPStan",
              "Larastan",
              "Pest",
              "PHPBench",
            ],
          },
        ],
      },
    ],
  },
  {
    drawerId: "notifyre",
    title: "laravel-notifyre-sms",
    service: "Open Source · Laravel",
    accentColor: "#059669",
    nextDrawerId: "zennstream",
    card: {
      background: "radial-gradient(ellipse at top left, #059669 0%, #111 70%)",
      svgOverlay: <NotifyreArchFlow />,
    },
    quickLinks: [
      { label: "Overview", id: "overview" },
      { label: "Design", id: "design" },
      { label: "Configuration", id: "configuration" },
      { label: "Persistence & Webhooks", id: "persistence" },
      { label: "Stack", id: "stack" },
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            children:
              "A Laravel SMS notification package wrapping the Notifyre gateway, built during the Hire A Loo engagement when no maintained Notifyre Laravel SDK existed. Notifyre is a self-hostable SMS gateway — this package gives it first-class Laravel integration: a service facade, notification channel, Artisan commands, REST endpoints, and optional database persistence with webhook handling for delivery callbacks.",
          },
          {
            type: "link",
            href: "https://github.com/magic-systems-io/laravel-notifyre-sms",
            label: "magic-systems-io/laravel-notifyre-sms",
          },
        ],
      },
      {
        id: "design",
        title: "Design",
        blocks: [
          {
            type: "flow",
            caption: "Package architecture",
            items: [
              {
                name: "Laravel App",
                detail: "notification trigger",
                arrow: true,
              },
              {
                name: "Notifyre Channel",
                detail: "Laravel notification channel",
                arrow: true,
              },
              { name: "Driver", detail: "swappable transport", arrow: true },
              { name: "SMS Gateway", detail: "Notifyre API", arrow: false },
            ],
          },
          {
            type: "feature-badges",
            items: [
              {
                label: "DB Persistence",
                className:
                  "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-300/70",
              },
              {
                label: "Webhook Callbacks",
                className:
                  "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-300/70",
              },
              {
                label: "Typed DTOs",
                className: "border-white/[0.08] bg-white/[0.04] text-white/50",
              },
              {
                label: "Phone Validation",
                className: "border-white/[0.08] bg-white/[0.04] text-white/50",
              },
              {
                label: "Dedicated Log Channel",
                className: "border-white/[0.08] bg-white/[0.04] text-white/50",
              },
            ],
          },
          {
            type: "p",
            children:
              "The package uses a driver architecture so additional transport backends can be added without touching the service layer. Requests and responses are fully typed via DTOs. Phone number validation runs before any network call is made.",
          },
          {
            type: "p",
            children:
              "Optional database persistence stores sent messages and inbound delivery callbacks. A dedicated log channel with configurable verbosity captures all send and receive activity independently of the application log — useful for debugging delivery issues without polluting the main log stream.",
          },
        ],
      },
      {
        id: "configuration",
        title: "Configuration",
        blocks: [
          {
            type: "p-inline",
            children: [
              "Published via ",
              { code: "php artisan vendor:publish" },
              ". All options can be set through environment variables — no code changes needed between environments.",
            ],
          },
          {
            type: "model-grid",
            items: [
              { model: "NOTIFYRE_API_KEY", detail: "Gateway API credential" },
              {
                model: "NOTIFYRE_DEFAULT_FROM",
                detail: "Sender identifier / number",
              },
              {
                model: "NOTIFYRE_PERSIST",
                detail: "Enable DB persistence (true/false)",
              },
              {
                model: "NOTIFYRE_WEBHOOK_SECRET",
                detail: "Signed delivery callback verification",
              },
              {
                model: "NOTIFYRE_LOG_CHANNEL",
                detail: "Dedicated log channel name",
              },
              {
                model: "NOTIFYRE_LOG_LEVEL",
                detail: "Verbosity — info / debug / error",
              },
            ],
          },
        ],
      },
      {
        id: "persistence",
        title: "Persistence & Webhooks",
        blocks: [
          {
            type: "p-inline",
            children: [
              "When persistence is enabled, sent messages are written to a",
              { code: "notifyre_messages" },
              "table with status, recipient, and gateway reference. The package exposes a webhook endpoint that receives delivery callbacks from Notifyre, verifies the signature, and updates the message record with the final delivery status — useful for auditing delivery failures without polling the gateway.",
            ],
          },
          {
            type: "endpoint-list",
            caption: "REST endpoints (when persistence enabled)",
            items: [
              {
                method: "POST",
                path: "/notifyre/webhook",
                desc: "Delivery status callback from gateway",
              },
              {
                method: "GET",
                path: "/notifyre/messages",
                desc: "List sent messages with status",
              },
              {
                method: "GET",
                path: "/notifyre/messages/{id}",
                desc: "Single message detail and delivery log",
              },
            ],
          },
        ],
      },
      {
        id: "stack",
        title: "Stack",
        blocks: [
          {
            type: "tech-stack",
            items: ["PHP 8.3+", "Laravel 12.20+", "Pest", "PHPStan"],
          },
        ],
      },
    ],
  },
];

export type ExperienceItem = {
  role: string;
  impact: string;
  period: string;
  initials: string;
  logo: string;
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Full Stack Engineer at zennit",
    impact: "SaaS infrastructure, auth, CI/CD, mobile",
    period: "Jan 2024 – Present",
    initials: "Z",
    logo: "/zennit.png",
  },
  {
    role: "Backend Developer at Hire A Loo",
    impact: "Laravel APIs, full-text search, legacy migration",
    period: "Aug 2025 – Feb 2026",
    initials: "HL",
    logo: "/hirealoo.webp",
  },
  {
    role: "Full Stack Developer at Clickservice GmbH",
    impact: "Django backend, React frontend, workforce platform",
    period: "Jan 2023 – Jan 2024",
    initials: "CS",
    logo: "/clickservice.png",
  },
  {
    role: "Mobile Developer at Vodafone Albania",
    impact: "React Native iOS & Android, real-time features",
    period: "Jan 2022 – Dec 2022",
    initials: "V",
    logo: "/vodafone.png",
  },
];

export const PROJECT_MAP = Object.fromEntries(
  PROJECTS.map((p) => [p.drawerId, p]),
) as Record<string, ProjectData>;

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
