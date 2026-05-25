"use client";

import Image from "next/image";
import { Fragment } from "react";
import type { ReactNode } from "react";
import { useState } from "react";
import { IconSuitcaseOutline18, IconScissorsOutline18, IconShopOutline18 } from "nucleo-ui-outline-18";

type PhotoProps = {
  src: string;
  alt: string;
  priority?: boolean;
  roundedClassName?: string;
};

type IconProps = {
  className?: string;
};

const accentColor = "#F6D36A";

const Photo = ({
  src,
  alt,
  priority = false,
  roundedClassName = "rounded-[24px]",
}: PhotoProps) => {
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

const SectionTitle = ({ children }: { children: string }) => (
  <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
    {children}
  </h2>
);

const SectionIntro = ({ title, body }: { title: string; body: string }) => (
  <div className="flex flex-col gap-2">
    <h3 className="font-semibold text-base text-white md:text-lg">{title}</h3>
    <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
      {body}
    </p>
  </div>
);

const SparklesIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 18 18" className={className} fill="none" aria-hidden="true">
    <path
      d="M9 1.75L10.55 6.45L15.25 8L10.55 9.55L9 14.25L7.45 9.55L2.75 8L7.45 6.45L9 1.75Z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M9 1.75L10.55 6.45L15.25 8L10.55 9.55L9 14.25L7.45 9.55L2.75 8L7.45 6.45L9 1.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ScissorsIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 18 18" className={className} fill="none" aria-hidden="true">
    <path
      d="M5 7C6.24264 7 7.25 5.99264 7.25 4.75C7.25 3.50736 6.24264 2.5 5 2.5C3.75736 2.5 2.75 3.50736 2.75 4.75C2.75 5.99264 3.75736 7 5 7Z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M5 15.5C6.24264 15.5 7.25 14.4926 7.25 13.25C7.25 12.0074 6.24264 11 5 11C3.75736 11 2.75 12.0074 2.75 13.25C2.75 14.4926 3.75736 15.5 5 15.5Z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M15.25 3.25L6.75 11.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M15.25 14.75L8.75 8.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M5 7C6.24264 7 7.25 5.99264 7.25 4.75C7.25 3.50736 6.24264 2.5 5 2.5C3.75736 2.5 2.75 3.50736 2.75 4.75C2.75 5.99264 3.75736 7 5 7Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M5 15.5C6.24264 15.5 7.25 14.4926 7.25 13.25C7.25 12.0074 6.24264 11 5 11C3.75736 11 2.75 12.0074 2.75 13.25C2.75 14.4926 3.75736 15.5 5 15.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const BuildingIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 18 18" className={className} fill="none" aria-hidden="true">
    <path
      d="M3.75 15.25H14.25V4.75L9 1.75L3.75 4.75V15.25Z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M3.75 15.25H14.25V4.75L9 1.75L3.75 4.75V15.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M7 7H8.5M9.5 7H11M7 10H8.5M9.5 10H11M8 15.25V12.5H10V15.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ShieldIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 18 18" className={className} fill="none" aria-hidden="true">
    <path
      d="M9.305 1.848L14.555 3.528C14.969 3.661 15.25 4.046 15.25 4.48V11C15.25 14.03 10.566 15.748 9.308 16.155C9.105 16.221 8.895 16.221 8.692 16.155C7.434 15.748 2.75 14.03 2.75 11V4.48C2.75 4.045 3.031 3.66 3.445 3.528L8.695 1.848C8.893 1.785 9.106 1.785 9.305 1.848Z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M9.305 1.848L14.555 3.528C14.969 3.661 15.25 4.046 15.25 4.48V11C15.25 14.03 10.566 15.748 9.308 16.155C9.105 16.221 8.895 16.221 8.692 16.155C7.434 15.748 2.75 14.03 2.75 11V4.48C2.75 4.045 3.031 3.66 3.445 3.528L8.695 1.848C8.893 1.785 9.106 1.785 9.305 1.848Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 9L8.25 10.25L11 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BellIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 18 18" className={className} fill="none" aria-hidden="true">
    <path
      d="M9 16.25C9.9665 16.25 10.75 15.4665 10.75 14.5H7.25C7.25 15.4665 8.0335 16.25 9 16.25Z"
      fill="currentColor"
    />
    <path
      d="M4.25 12.75H13.75L12.5 11V7.75C12.5 5.817 10.933 4.25 9 4.25C7.067 4.25 5.5 5.817 5.5 7.75V11L4.25 12.75Z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M4.25 12.75H13.75L12.5 11V7.75C12.5 5.817 10.933 4.25 9 4.25C7.067 4.25 5.5 5.817 5.5 7.75V11L4.25 12.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChartIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 18 18" className={className} fill="none" aria-hidden="true">
    <path
      d="M3 15.25H15.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M5 13.75V9.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M9 13.75V6.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M13 13.75V4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const InfoCard = ({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon?: ReactNode;
}) => (
  <div className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-5 md:p-6">
    {icon ? (
      <div className="mb-4 flex" style={{ color: accentColor }}>
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: "rgba(246, 211, 106, 0.14)" }}
        >
          {icon}
        </div>
      </div>
    ) : null}
    <h4 className="font-semibold text-white text-xl tracking-[-0.02em]">
      {title}
    </h4>
    <p className="mt-2 text-[14px] text-white/50 leading-[1.75] md:text-[15px]">
      {body}
    </p>
  </div>
);

const BulletRow = ({ label, body }: { label: string; body: string }) => (
  <div className="flex gap-3">
    <span
      className="mt-[7px] block h-2.5 w-2.5 shrink-0 rounded-full"
      style={{ backgroundColor: accentColor }}
    />
    <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
      <span className="font-semibold text-white">{label}: </span>
      {body}
    </p>
  </div>
);

const CompetitorCard = ({
  title,
  strength,
  weakness,
  insight,
  logoSrc,
  logoAlt,
}: {
  title: string;
  strength: string;
  weakness: string;
  insight: string;
  logoSrc: string;
  logoAlt: string;
}) => (
  <div className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-5 md:p-6">
    <div className="mb-4">
      <div className="relative size-10 overflow-hidden rounded-[10px]">
        <Image
          src={logoSrc}
          alt={logoAlt}
          fill
          quality={82}
          sizes="40px"
          className="object-cover"
        />
      </div>
    </div>
    <h4 className="font-semibold text-2xl text-white tracking-[-0.02em]">
      {title}
    </h4>
    <div className="mt-3 flex flex-col gap-1.5 text-[14px] text-white/50 leading-[1.75] md:text-[15px]">
      <p>
        <span className="font-semibold text-white">Strength: </span>
        {strength}
      </p>
      <p>
        <span className="font-semibold text-white">Weakness: </span>
        {weakness}
      </p>
      <p>
        <span className="font-semibold text-white">Insight: </span>
        {insight}
      </p>
    </div>
  </div>
);

// ── Flow Diagram ──────────────────────────────────────────────────────────────

const FlowNode = ({ label, accent }: { label: string; accent: string }) => (
  <div
    className="flex min-w-[90px] flex-1 items-center justify-center rounded-[10px] border px-3 py-2.5 text-center font-semibold text-[12px] text-white leading-snug md:text-[13px]"
    style={{ borderColor: `${accent}55`, background: `${accent}0C` }}
  >
    {label}
  </div>
);

const FlowArrow = ({ accent }: { accent: string }) => (
  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="shrink-0" aria-hidden="true">
    <path d="M0 5H11" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
    <path d="M7 1.5L12 5L7 8.5" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" />
  </svg>
);

type FlowGroupData = { label: string; rows: string[][] };

const FlowGroup = ({ group, accent }: { group: FlowGroupData; accent: string }) => (
  <div className="flex flex-col gap-3">
    <p className="font-bold text-base" style={{ color: accent }}>{group.label}</p>
    {group.rows.map((row, ri) => (
      <div key={ri} className="flex items-center gap-1.5">
        {row.map((step, si) => (
          <Fragment key={step}>
            <FlowNode label={step} accent={accent} />
            {si < row.length - 1 && <FlowArrow accent={accent} />}
          </Fragment>
        ))}
      </div>
    ))}
  </div>
);

// ── Persona Cards ─────────────────────────────────────────────────────────────

type PersonaField = { label: string; value: string };

const PersonaFieldGrid = ({ fields, accent }: { fields: PersonaField[]; accent: string }) => (
  <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[14px] border border-white/[0.07] sm:grid-cols-6">
    {fields.map(({ label, value }) => (
      <div key={label} className="flex flex-col gap-1 bg-white/[0.025] px-3 py-3">
        <span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: accent }}>{label}</span>
        <span className="font-semibold text-[12px] text-white leading-tight">{value}</span>
      </div>
    ))}
  </div>
);

const PersonaBlock = ({
  label,
  body,
  accent,
  highlight = false,
}: {
  label: string;
  body: string;
  accent: string;
  highlight?: boolean;
}) => (
  <div
    className="rounded-[12px] px-4 py-3.5"
    style={
      highlight
        ? { border: `1px solid ${accent}35`, background: `${accent}0A` }
        : { border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }
    }
  >
    <p className="mb-1 text-[10px] uppercase tracking-[0.14em]" style={{ color: highlight ? accent : `${accent}90` }}>{label}</p>
    <p className="text-[13px] text-white/60 leading-[1.7]">{body}</p>
  </div>
);

type PersonaData = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  accent: string;
  fields: PersonaField[];
  hobbies: string;
  workMethod: string;
  personality: string;
  painPoints: string;
  solutionLabel: string;
  solution: string;
};

const PersonaCard = ({ persona }: { persona: PersonaData }) => (
  <div className="flex flex-col gap-4 rounded-[24px] border border-white/[0.07] bg-white/[0.015] p-5 md:p-6">
    <div className="flex items-center gap-3">
      <div
        className="flex size-11 shrink-0 items-center justify-center rounded-full text-xl"
        style={{ background: `${persona.accent}18`, border: `1px solid ${persona.accent}30`, color: persona.accent }}
      >
        {persona.icon}
      </div>
      <div>
        <h3 className="font-bold text-base text-white tracking-[-0.02em] md:text-lg">{persona.title}</h3>
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: persona.accent }}>{persona.subtitle}</p>
      </div>
    </div>
    <PersonaFieldGrid fields={persona.fields} accent={persona.accent} />
    <div className="grid gap-3 sm:grid-cols-3">
      <PersonaBlock label="Hobbies & Habits" body={persona.hobbies} accent={persona.accent} />
      <PersonaBlock label="Work Method" body={persona.workMethod} accent={persona.accent} />
      <PersonaBlock label="Personality" body={persona.personality} accent={persona.accent} />
    </div>
    <div className="grid gap-3 sm:grid-cols-2">
      <PersonaBlock label="Pain Points" body={persona.painPoints} accent={persona.accent} />
      <PersonaBlock label={persona.solutionLabel} body={persona.solution} accent={persona.accent} highlight />
    </div>
  </div>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const avatidPersonas: PersonaData[] = [
  {
    icon: <IconSuitcaseOutline18 className="size-5" />,
    title: "The Busy Professional",
    subtitle: "Everyday User",
    accent: accentColor,
    fields: [
      { label: "Name", value: "Sarah K." },
      { label: "Age", value: "34" },
      { label: "Job", value: "Marketing Manager" },
      { label: "Sector", value: "Technology / Marketing" },
      { label: "Location", value: "London, UK" },
      { label: "Education", value: "Master's Degree" },
    ],
    hobbies: "Practices yoga, reads wellness blogs, values self-care but struggles to maintain consistency.",
    workMethod: "Full-time office-based with occasional remote days.",
    personality: "Health-conscious, tech-savvy, values convenience.",
    painPoints: "Forgets when she last had appointments across different services. Uses multiple apps and struggles to track everything. Missed a physiotherapy appointment and had to restart treatment. Feels guilty when wellness routines slip.",
    solutionLabel: "What avatid does for her",
    solution: "We provide Sarah with an AI avatar that tracks all appointments, learns her patterns, and proactively reminds her when to rebook. One-tap booking saves her time and eliminates the mental load of tracking multiple services.",
  },
  {
    icon: <IconScissorsOutline18 className="size-5" />,
    title: "The Freelance Stylist",
    subtitle: "Service Provider",
    accent: accentColor,
    fields: [
      { label: "Name", value: "Marcus T." },
      { label: "Age", value: "28" },
      { label: "Job", value: "Freelance Hairstylist" },
      { label: "Sector", value: "Beauty / Personal Care" },
      { label: "Location", value: "Manchester, UK" },
      { label: "Education", value: "Vocational Certificate" },
    ],
    hobbies: "Social media content creator, builds personal brand, values flexibility.",
    workMethod: "Works from multiple salons and does house calls.",
    personality: "Creative, entrepreneurial, values independence.",
    painPoints: "Hard to get discovered without agency backing. Clients don't follow him when he changes locations. Manual scheduling via WhatsApp is chaotic. Pays high commissions to booking platforms.",
    solutionLabel: "What avatid does for him",
    solution: "We offer Marcus a portable avatar profile that follows him anywhere. Clients find him based on services, not location. The app handles bookings, reminders, and payments automatically.",
  },
  {
    icon: <IconShopOutline18 className="size-5" />,
    title: "The Salon Owner",
    subtitle: "Business",
    accent: accentColor,
    fields: [
      { label: "Name", value: "Elena R." },
      { label: "Age", value: "45" },
      { label: "Job", value: "Beauty Salon Owner" },
      { label: "Sector", value: "Beauty / Wellness" },
      { label: "Location", value: "Birmingham, UK" },
      { label: "Education", value: "Master's Degree" },
    ],
    hobbies: "Attends industry conferences, focuses on operational efficiency.",
    workMethod: "Manages 8 staff members across 2 locations.",
    personality: "Business-minded, results-oriented, data-driven.",
    painPoints: "High no-show rates cost revenue. Doesn't understand why clients stop returning. Staff scheduling is inefficient during off-peak hours. Limited visibility into customer lifetime value.",
    solutionLabel: "What avatid does for her",
    solution: "We provide Elena with AI insights showing retention patterns, predicted no-shows, and at-risk clients. Staff can register as providers and freelancers can rent chair time seamlessly.",
  },
];

const avatidFlows: FlowGroupData[] = [
  {
    label: "Client",
    rows: [
      ["Download App", "Create Avatar", "Browse Providers", "Book Appointment"],
      ["Receive Reminder", "Confirm Session", "Rate Service", "View History"],
    ],
  },
  {
    label: "Business",
    rows: [
      ["Create Account", "Add Business Profile", "Set Services", "Set Availability"],
      ["Manage Bookings", "Client Messages", "View Analytics"],
    ],
  },
];

const QuickLinks = ({ links, accentColor }: { links: { label: string; id: string }[]; accentColor: string }) => (
  <div className="flex flex-col border-l border-white/[0.1] pl-3">
    <p className="mb-2.5 font-bold text-[10px] uppercase tracking-[0.14em]" style={{ color: accentColor }}>Contents</p>
    {links.map(({ label, id }) => (
      <button
        key={id}
        type="button"
        onClick={() =>
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        className="cursor-pointer py-[3px] text-left text-[12px] leading-snug text-white/35 transition-colors duration-200 hover:text-white/75"
      >
        {label}
      </button>
    ))}
  </div>
);

type AvatidContentProps = {
  nextProjectDrawerId?: string;
  onOpenNextProject?: (drawerId: string) => void;
};

export const AvatidContent = ({
  nextProjectDrawerId,
  onOpenNextProject,
}: AvatidContentProps) => (
  <>
    <div className="px-6 md:px-16">
      <Photo
        src="/avatid/hero.png"
        alt="avatid hero preview"
        priority
        roundedClassName="rounded-[66px]"
      />
    </div>

    <div className="hidden xl:block sticky top-20 h-0 overflow-visible">
      <div className="absolute right-12 top-4">
        <QuickLinks links={[
          { label: "Overview", id: "overview" },
          { label: "Competitive Analysis", id: "competitive-analysis" },
          { label: "Mobile App", id: "mobile-app" },
          { label: "User Personas", id: "user-personas" },
          { label: "User Flows", id: "user-flows" },
          { label: "App Sketches", id: "app-sketches" },
          { label: "App Designs", id: "app-designs" },
          { label: "By the Numbers", id: "by-the-numbers" },
          { label: "Live Product", id: "live-product" },
          { label: "What the Founder Says", id: "testimonial" },
        ]} accentColor="#EAB308" />
      </div>
    </div>

    <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-6 py-14 md:gap-16 md:px-16 md:py-20">

      <section id="overview" className="scroll-mt-20 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <SectionTitle>Overview</SectionTitle>
          <SectionIntro
            title="About avatid"
            body="avatid is an intelligent appointment management platform that uses personalized AI avatars to help users manage their beauty and health appointments. The mobile application (iOS/Android) creates a visual identity for each user: an avatar that remembers past treatments, tracks appointment history, and proactively reminds users when it's time for their next haircut, dentist visit, physiotherapy session, or self-care appointment."
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base text-white md:text-lg">Goals</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard
              title="Everyday Users"
              body="Find, track, and manage all beauty and health appointments in one place with intelligent reminders."
              icon={<SparklesIcon className="size-5" />}
            />
            <InfoCard
              title="Service Providers"
              body="Build a portable professional identity and manage bookings seamlessly across multiple locations."
              icon={<ScissorsIcon className="size-5" />}
            />
            <InfoCard
              title="Business Owners"
              body="Gain AI-powered insights into customer retention and maximize appointment utilization."
              icon={<BuildingIcon className="size-5" />}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Research Insights
          </h3>
          <div className="flex flex-col gap-4">
            <InfoCard
              title="Market Context"
              body="The beauty and health appointment space is fragmented across multiple platforms. Users struggle to track when they last visited different providers and often miss routine appointments. No unified system exists that learns from behavior to suggest when the next appointment should be."
              icon={<ChartIcon className="size-5" />}
            />
            <InfoCard
              title="User Behavior"
              body="68% of users miss routine appointments not because they don't value them, but because they forget or don't realize how much time has passed. The core friction isn't cost, it's the fear of forgetting or missing scheduled appointments."
              icon={<BellIcon className="size-5" />}
            />
            <InfoCard
              title="Privacy Concerns"
              body="Users possess valuable appointment data but fear how AI systems will use their information. They prioritize control and transparency over automated convenience."
              icon={<ShieldIcon className="size-5" />}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base text-white md:text-lg">What I Did</h3>
          <div className="flex flex-col gap-3">
            <BulletRow
              label="Concept & Product Strategy"
              body="Shaped the core idea: a personalized AI avatar that holds a user's appointment history across beauty and health providers and proactively prompts the next visit."
            />
            <BulletRow
              label="Brand Identity"
              body="Built the full visual language, logomark, color system, typography, and marketing collateral, aligned around the avatar as the product's central metaphor."
            />
            <BulletRow
              label="Mobile App Design"
              body="Designed the iOS and Android app end-to-end: avatar creation, appointment tracking, intelligent reminders, provider discovery, and privacy controls."
            />
            <BulletRow
              label="UX Research"
              body="Mapped the everyday-user, service-provider, and business-owner flows so each audience gets the value they need without the product feeling like three apps stitched together."
            />
          </div>
        </div>
      </section>

      <section id="competitive-analysis" className="scroll-mt-20 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <SectionTitle>Competitive Analysis</SectionTitle>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            The category already has strong booking products, but most of them solve appointment logistics instead of long-term relationship memory. avatid is positioned around proactive intelligence, continuity, and a user-owned history across providers.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <CompetitorCard
            title="Fresha"
            strength="Big marketplace with salon listings."
            weakness="Generic booking interface."
            insight="Users appreciate selection but want personalized guidance."
            logoSrc="/avatid/competitors/fresha.png"
            logoAlt="Fresha logo"
          />
          <CompetitorCard
            title="Treatwell"
            strength="Established brand with good coverage."
            weakness="No cross-category tracking."
            insight="Fragmented experience. Users want unified management."
            logoSrc="/avatid/competitors/treatwell.png"
            logoAlt="Treatwell logo"
          />
          <CompetitorCard
            title="Booksy"
            strength="Good for service providers."
            weakness="Provider-centric, not client-centric."
            insight="Focuses on helping providers, not users."
            logoSrc="/avatid/competitors/booksy.png"
            logoAlt="Booksy logo"
          />
          <CompetitorCard
            title="Google Calendar"
            strength="Universal tool users already have."
            weakness="Passive tracking only; requires manual input."
            insight="Users need proactive intelligence."
            logoSrc="/avatid/competitors/google-calendar.png"
            logoAlt="Google Calendar logo"
          />
        </div>
      </section>

      <section id="mobile-app" className="scroll-mt-20 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <SectionTitle>Mobile App</SectionTitle>
          <SectionIntro
            title="About avatid App"
            body="avatid turns booking into an ongoing relationship layer. Instead of only helping users find a slot, it remembers service history, learns timing patterns, and makes the next appointment feel naturally prompted rather than manually managed."
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base text-white md:text-lg">
            App Solution
          </h3>
          <div className="flex flex-col gap-4">
            <InfoCard
              title="For Clients"
              body="Users create an avatar, set preferences, discover providers, and book in a flow that feels organized and personal. The system reduces mental load by remembering treatment history and suggesting when to return."
              icon={<SparklesIcon className="size-5" />}
            />
            <InfoCard
              title="For Providers"
              body="Freelancers and service professionals get a portable profile that follows them across locations. avatid centralizes bookings, reminders, and profile visibility instead of making them depend on one salon or marketplace."
              icon={<ScissorsIcon className="size-5" />}
            />
            <InfoCard
              title="For Businesses"
              body="Salon owners and multi-staff operators gain scheduling control, retention visibility, and a better read on no-shows, repeat behavior, and service demand."
              icon={<BuildingIcon className="size-5" />}
            />
          </div>
        </div>
      </section>

      <section id="user-personas" className="scroll-mt-20 flex flex-col gap-8">
        <SectionTitle>User Personas</SectionTitle>
        <div className="flex flex-col gap-6">
          {avatidPersonas.map((p) => (
            <PersonaCard key={p.title} persona={p} />
          ))}
        </div>
      </section>

      <section id="user-flows" className="scroll-mt-20 flex flex-col gap-8">
        <SectionTitle>User Flows</SectionTitle>
        <div className="flex flex-col gap-8 rounded-[24px] border border-white/[0.07] bg-white/[0.015] p-5 md:p-8">
          {avatidFlows.map((group, i) => (
            <Fragment key={group.label}>
              {i > 0 && <div className="border-t border-white/[0.07]" />}
              <FlowGroup group={group} accent={accentColor} />
            </Fragment>
          ))}
        </div>
      </section>

      <section id="app-sketches" className="scroll-mt-20 flex flex-col gap-6">
        <SectionTitle>App Sketches</SectionTitle>
        <Photo
          src="/avatid/app-sketches.png"
          alt="avatid app sketches"
        />
      </section>

      <section id="app-designs" className="scroll-mt-20 flex flex-col gap-6">
        <SectionTitle>App Designs</SectionTitle>
        <Photo
          src="/avatid/app-designs.png"
          alt="avatid app designs"
        />
      </section>

      {/* Launch Metrics */}
      <section id="by-the-numbers" className="scroll-mt-20 flex flex-col gap-6">
        <SectionTitle>By the Numbers</SectionTitle>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { value: "3 sides", label: "Client, provider, and business experience designed end-to-end" },
            { value: "500+", label: "Beta users onboarded before public launch" },
            { value: "4.8★", label: "Average rating on App Store" },
            { value: "0 to launch", label: "Concept to live iOS and Android app" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col gap-1.5 rounded-[20px] border border-[#EAB308]/20 bg-[#EAB308]/[0.04] px-5 py-5"
            >
              <span className="font-bold font-header text-[clamp(24px,3vw,36px)] text-[#EAB308] tracking-[-0.03em]">
                {metric.value}
              </span>
              <span className="text-[13px] text-white/50 leading-[1.5]">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Live Product */}
      <section id="live-product" className="scroll-mt-20 flex flex-col gap-6">
        <SectionTitle>Live Product</SectionTitle>
        <div className="flex flex-col gap-4 rounded-[20px] border border-white/[0.07] bg-white/[0.02] px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10 md:py-8">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-white text-lg">avatid: Your Life, Organized</span>
            <span className="text-[14px] text-white/40">AI-powered appointment management. Live on iOS and Android.</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://apps.apple.com/us/app/avatid-your-life-organized/id6749532930"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-[14px] border border-white/[0.1] bg-white/[0.06] px-5 py-3 text-[14px] text-white transition-colors hover:bg-white/[0.1]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.19 1.28-2.17 3.81.03 3.02 2.65 4.03 2.68 4.04l-.06.27zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.mycompany.dua_flavour"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-[14px] border border-white/[0.1] bg-white/[0.06] px-5 py-3 text-[14px] text-white transition-colors hover:bg-white/[0.1]"
            >
              <img src="/icons8-google-play-50.png" alt="Google Play" width="18" height="18" />
              Google Play
            </a>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Conclusion
          </h3>

          <div className="flex flex-col gap-3">
            <BulletRow
              label="Product Value"
              body="Transforms appointments from isolated bookings into a remembered personal rhythm."
            />
            <BulletRow
              label="Provider Value"
              body="Gives service professionals a portable identity and steadier client continuity."
            />
            <BulletRow
              label="Business Value"
              body="Introduces retention intelligence, utilization insight, and better control over schedule performance."
            />
            <BulletRow
              label="Key Insight"
              body="The strongest differentiator is not booking speed alone, but AI-assisted memory that helps people and providers stay connected over time."
            />
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section id="testimonial" className="scroll-mt-20 flex flex-col gap-6">
        <SectionTitle>What the Founder Says</SectionTitle>
        <div className="rounded-[20px] border border-white/[0.07] bg-white/[0.03] px-6 py-8 md:px-10 md:py-10">
          <blockquote className="flex flex-col gap-5">
            <p className="text-[15px] text-white/70 italic leading-[1.8] md:text-[17px]">
              "I came to Mario with a vision for an AI-powered appointment platform but no idea how to make it feel human. He took the research seriously, the personas, the flows, the competitive gaps, and used all of it to design something that actually makes sense for real people. The way he thought about the provider side and the patient side separately, then unified them into one coherent product, was exactly what avatid needed. He didn't just make it look good, he made it make sense."
            </p>
            <footer className="flex flex-col gap-0.5">
              <span className="font-semibold text-[15px] text-white">Armir Celaj</span>
              <span className="text-[13px] text-white/40">Founder, avatid</span>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <SectionTitle>Next Project</SectionTitle>
        <button
          onClick={() => nextProjectDrawerId && onOpenNextProject?.(nextProjectDrawerId)}
          className="group block w-full cursor-pointer"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#111] transition-colors duration-300 group-hover:border-white/20">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/ecentic-thumbnail.mp4" type="video/mp4" />
            </video>
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
