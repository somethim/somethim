"use client";

import Image from "next/image";
import { Fragment } from "react";
import type { ReactNode } from "react";
import { useState } from "react";
import { IconCarSideOutline18, IconHouseOutline18 } from "nucleo-ui-outline-18";

type PhotoProps = {
  src: string;
  alt: string;
  priority?: boolean;
  roundedClassName?: string;
  bgClassName?: string;
};

type PlaceholderProps = {
  label: string;
  aspect: string;
  kind?: "image" | "video";
};

type IconProps = {
  className?: string;
};

const frameClassName =
  "relative w-full overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#111]";

const Photo = ({
  src,
  alt,
  priority = false,
  roundedClassName = "rounded-[24px]",
  bgClassName = "border border-white/[0.07] bg-[#111]",
}: PhotoProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative w-full overflow-hidden ${bgClassName} ${roundedClassName}`}>
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

const Placeholder = ({ label, aspect, kind = "image" }: PlaceholderProps) => (
  <div className={`${frameClassName} ${aspect}`}>
    <div className="flex h-full w-full items-center justify-center p-8 text-center">
      <div>
        <p className="font-bold font-header text-[clamp(22px,3vw,34px)] text-white/18 tracking-[-0.025em]">
          {kind === "video" ? "Video Placeholder" : "Image Placeholder"}
        </p>
        <p className="mt-2 text-[12px] text-white/35 uppercase tracking-[0.18em]">
          {label}
        </p>
      </div>
    </div>
  </div>
);

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

const WalletCoinsIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 18 18" className={className} fill="none" aria-hidden="true">
    <path
      d="m11.25 15.25h3.5c.552 0 1-.448 1-1v-6.5c0-.552-.448-1-1-1H4.25c-1.105 0-2-.895-2-2v2.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m2.25 4.75c0-1.105.895-2 2-2h8.5c.552 0 1 .448 1 1v.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m12.5 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1Z"
      fill="currentColor"
    />
    <path
      d="m6.25 10.25H1.75c-.552 0-1 .448-1 1v1c0 .552.448 1 1 1h4.5c.552 0 1-.448 1-1v-1c0-.552-.448-1-1-1Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m7.25 13.25H2.75c-.552 0-1 .448-1 1v1c0 .552.448 1 1 1h4.5c.552 0 1-.448 1-1v-1c0-.552-.448-1-1-1Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CarIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 18 18" className={className} fill="none" aria-hidden="true">
    <path
      d="M13.25 13.25V14.25C13.25 14.8023 13.6977 15.25 14.25 15.25H15.25C15.8023 15.25 16.25 14.8023 16.25 14.25V9.85C16.25 9.2205 15.9536 8.6277 15.45 8.25L14.45 7.5L13.7087 4.2988C13.4987 3.3921 12.691 2.75 11.7603 2.75H6.23979C5.30909 2.75 4.50129 3.392 4.29139 4.2988L3.55009 7.5L2.55009 8.25C2.04649 8.6277 1.75009 9.2205 1.75009 9.85V14.25C1.75009 14.8023 2.19779 15.25 2.75009 15.25H3.75009C4.30239 15.25 4.75009 14.8023 4.75009 14.25V13.25H13.25Z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M13.25 13.25V14.25C13.25 14.8023 13.6977 15.25 14.25 15.25H15.25C15.8023 15.25 16.25 14.8023 16.25 14.25V9.85C16.25 9.2205 15.9536 8.6277 15.45 8.25L14.45 7.5L13.7087 4.2988C13.4987 3.3921 12.691 2.75 11.7603 2.75H6.23979C5.30909 2.75 4.50129 3.392 4.29139 4.2988L3.55009 7.5L2.55009 8.25C2.04649 8.6277 1.75009 9.2205 1.75009 9.85V14.25C1.75009 14.8023 2.19779 15.25 2.75009 15.25H3.75009C4.30239 15.25 4.75009 14.8023 4.75009 14.25V13.25H13.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 11.5C5.55228 11.5 6 11.0523 6 10.5C6 9.94772 5.55228 9.5 5 9.5C4.44772 9.5 4 9.94772 4 10.5C4 11.0523 4.44772 11.5 5 11.5Z"
      fill="currentColor"
    />
    <path
      d="M13 11.5C13.5523 11.5 14 11.0523 14 10.5C14 9.94772 13.5523 9.5 13 9.5C12.4477 9.5 12 9.94772 12 10.5C12 11.0523 12.4477 11.5 13 11.5Z"
      fill="currentColor"
    />
    <path
      d="M12.2565 8L11.6958 5.5806C11.6172 5.2408 11.3145 5 10.9653 5H7.0346C6.6855 5 6.3827 5.2407 6.3041 5.5806L5.7431 8H12.2565Z"
      fill="currentColor"
    />
  </svg>
);

const HouseLockIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 18 18" className={className} fill="none" aria-hidden="true">
    <path
      d="M16.25 13.75H12.25C11.6977 13.75 11.25 14.1977 11.25 14.75V16.25C11.25 16.8023 11.6977 17.25 12.25 17.25H16.25C16.8023 17.25 17.25 16.8023 17.25 16.25V14.75C17.25 14.1977 16.8023 13.75 16.25 13.75Z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M8.39453 1.96006C8.75253 1.68806 9.24847 1.68806 9.60547 1.96006L14.8555 5.95029C15.1042 6.13931 15.25 6.43438 15.25 6.74619V8.36374C15.25 8.45388 15.1708 8.61378 15.0829 8.59376C14.815 8.53275 14.5363 8.5001 14.25 8.5001C12.2613 8.5001 10.6336 10.049 10.5078 12.006C9.60138 12.5826 9 13.5962 9 14.7501V16.2501H4.75C3.64503 16.2501 2.75006 15.355 2.75 14.2501V6.74619C2.75 6.43338 2.8958 6.1393 3.14453 5.95029L8.39453 1.96006Z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M16.25 13.75H12.25C11.6977 13.75 11.25 14.1977 11.25 14.75V16.25C11.25 16.8023 11.6977 17.25 12.25 17.25H16.25C16.8023 17.25 17.25 16.8023 17.25 16.25V14.75C17.25 14.1977 16.8023 13.75 16.25 13.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.75 13.75V12.25C12.75 11.422 13.422 10.75 14.25 10.75C15.078 10.75 15.75 11.422 15.75 12.25V13.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.25 7.8757V6.747C15.25 6.435 15.104 6.14009 14.855 5.95089L9.605 1.9609C9.247 1.6889 8.752 1.6889 8.395 1.9609L3.145 5.9499C2.896 6.1389 2.75 6.434 2.75 6.746V14.2499C2.75 15.3539 3.645 16.2499 4.75 16.2499H8.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MapLockIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 18 18" className={className} fill="none" aria-hidden="true">
    <path
      d="M5.965 2.81297L2.533 3.57597C2.076 3.67697 1.75 4.08297 1.75 4.55197V13.004C1.75 13.644 2.342 14.119 2.967 13.98L5.965 13.314C6.151 13.272 6.345 13.285 6.524 13.35C6.74317 13.4287 9.02406 14.3142 9.05718 14.1398C9.22733 13.244 9.76519 12.4784 10.5078 12.0059C10.6336 10.049 12.2614 8.49997 14.25 8.49997C14.8483 8.49997 15.4139 8.64018 15.9158 8.88953C16.4615 9.1606 16.2599 5.3387 16.25 4.99597C16.25 4.35597 15.658 3.88097 15.033 4.01997L12.035 4.68597C11.849 4.72797 11.655 4.71497 11.476 4.64997L6.524 2.84897C6.345 2.78397 6.151 2.77197 5.965 2.81297Z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M16.25 13.75H12.25C11.6977 13.75 11.25 14.1977 11.25 14.75V16.25C11.25 16.8023 11.6977 17.25 12.25 17.25H16.25C16.8023 17.25 17.25 16.8023 17.25 16.25V14.75C17.25 14.1977 16.8023 13.75 16.25 13.75Z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M16.25 13.75H12.25C11.6977 13.75 11.25 14.1977 11.25 14.75V16.25C11.25 16.8023 11.6977 17.25 12.25 17.25H16.25C16.8023 17.25 17.25 16.8023 17.25 16.25V14.75C17.25 14.1977 16.8023 13.75 16.25 13.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.75 13.75V12.25C12.75 11.422 13.422 10.75 14.25 10.75C15.078 10.75 15.75 11.422 15.75 12.25V13.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.25 8.24219V4.99709C16.25 4.35699 15.658 3.88209 15.033 4.02099L12.035 4.68699C11.849 4.72799 11.655 4.71608 11.476 4.65088L6.52399 2.85009C6.34499 2.78489 6.151 2.77198 5.965 2.81398L2.533 3.57689C2.075 3.67899 1.75 4.08498 1.75 4.55298V13.003C1.75 13.6431 2.342 14.118 2.967 13.9791L5.965 13.3131C6.151 13.2721 6.34499 13.284 6.52399 13.3492L8.32761 14.0054"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserShieldIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 18 18" className={className} fill="none" aria-hidden="true">
    <path
      d="M9 7.25C10.5188 7.25 11.75 6.01878 11.75 4.5C11.75 2.98122 10.5188 1.75 9 1.75C7.48122 1.75 6.25 2.98122 6.25 4.5C6.25 6.01878 7.48122 7.25 9 7.25Z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M9 7.25C10.5188 7.25 11.75 6.01878 11.75 4.5C11.75 2.98122 10.5188 1.75 9 1.75C7.48122 1.75 6.25 2.98122 6.25 4.5C6.25 6.01878 7.48122 7.25 9 7.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 10.7505L11.75 12.0005V14.9405C11.75 16.4805 14.5 17.2505 14.5 17.2505V10.7505Z"
      fill="currentColor"
    />
    <path
      d="M9.71799 9.80029C9.48289 9.76909 9.24379 9.75049 8.99999 9.75049C6.44899 9.75049 4.26099 11.2805 3.29099 13.4705C2.92599 14.2955 3.37799 15.2444 4.23799 15.5157C5.45279 15.8983 7.05878 16.2418 8.95398 16.2476"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 10.7505L17.25 12.0005V14.9405C17.25 16.4805 14.5 17.2505 14.5 17.2505C14.5 17.2505 11.75 16.4805 11.75 14.9405V12.0005L14.5 10.7505Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShieldCheckIcon = ({ className }: IconProps) => (
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
      d="M6.49701 9.75L8.10601 11.25L11.503 6.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
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
      <div className="mb-4 flex text-[#39B54A]">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-[#39B54A]/10">
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
    <span className="mt-[7px] block h-2.5 w-2.5 shrink-0 rounded-full bg-[#39B54A]" />
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

const lookupPersonas: PersonaData[] = [
  {
    icon: <IconCarSideOutline18 className="size-5" />,
    title: "The Commuter",
    subtitle: "Driver",
    accent: "#39B54A",
    fields: [
      { label: "Name", value: "John M." },
      { label: "Age", value: "38" },
      { label: "Job", value: "Finance Specialist" },
      { label: "Sector", value: "Technology / Sales" },
      { label: "Location", value: "Mississauga, ON" },
      { label: "Education", value: "Bachelor's Degree" },
    ],
    hobbies: "Listens to business podcasts during his commute, values efficiency, attends Blue Jays games.",
    workMethod: "Hybrid, but in-office 3–4 days a week for client-facing meetings.",
    personality: "Ambitious, pragmatic, time-conscious, tech-savvy.",
    painPoints: "Wastes 30–40 minutes every day searching for parking. High cost and stress of being late for important meetings. Has received tickets after using confusing competitor apps. Daily garage rates are expensive and unpredictable.",
    solutionLabel: "What LookUp does for him",
    solution: "We provide John with a guaranteed, reservable spot near his office. One-tap access via the app saves him precious minutes every morning. Our system is reliable, transparent, and eliminates the risk of unfair tickets.",
  },
  {
    icon: <IconHouseOutline18 className="size-5" />,
    title: "The Condo Owner",
    subtitle: "Provider",
    accent: "#39B54A",
    fields: [
      { label: "Name", value: "Ann C." },
      { label: "Age", value: "42" },
      { label: "Job", value: "Finance Specialist" },
      { label: "Sector", value: "Technology / Sales" },
      { label: "Location", value: "Toronto, ON" },
      { label: "Education", value: "College Diploma" },
    ],
    hobbies: "Enjoys exploring local neighborhoods, actively seeks ways to optimize her finances.",
    workMethod: "Works at a downtown agency, commutes via car.",
    personality: "Financially savvy, security-conscious, values convenience.",
    painPoints: "Her condo parking spot sits empty while she's at work, despite high monthly fees. She's reluctant to rent it out due to security concerns and lacks the time to manage listings, payments, or access.",
    solutionLabel: "What LookUp does for her",
    solution: "We offer Ann a fully automated, set-it-and-forget-it solution. Our secure hardware gives her full control while we handle marketing, bookings, payments, and support, she just sets availability and earns passive income.",
  },
];

const lookupFlows: FlowGroupData[] = [
  {
    label: "Driver",
    rows: [
      ["Search map", "Filter spots", "Select spot", "Book & pay"],
      ["Navigate", "Unlock", "Park", "Rate"],
    ],
  },
  {
    label: "Provider",
    rows: [
      ["Create Account", "Upload Photo", "Set Location", "Add Pricing"],
      ["Define Availability", "Install Lock (Optional)", "Publish Listing", "Manage Bookings"],
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

type LookUpParkingContentProps = {
  nextProjectDrawerId?: string;
  onOpenNextProject?: (drawerId: string) => void;
};

export const LookUpParkingContent = ({
  nextProjectDrawerId,
  onOpenNextProject,
}: LookUpParkingContentProps) => (
  <>
    <div className="px-6 md:px-16">
      <Photo
        src="/lookup-parking/hero.jpg"
        alt="LookUp Parking hero preview"
        priority
        roundedClassName="rounded-[66px]"
        bgClassName="bg-transparent"
      />
    </div>

    <div className="hidden xl:block sticky top-20 h-0 overflow-visible">
      <div className="absolute right-12 top-4">
        <QuickLinks links={[
          { label: "Overview", id: "overview" },
          { label: "Competitive Analysis", id: "competitive-analysis" },
          { label: "Branding", id: "branding" },
          { label: "Mobile App", id: "mobile-app" },
          { label: "User Personas", id: "user-personas" },
          { label: "User Flows", id: "user-flows" },
          { label: "App Sketches", id: "app-sketches" },
          { label: "App Designs", id: "app-designs" },
          { label: "Website Design", id: "website-design" },
          { label: "Launch Numbers", id: "launch-numbers" },
          { label: "Live Product", id: "live-product" },
          { label: "What the Founder Says", id: "testimonial" },
        ]} accentColor="#39B54A" />
      </div>
    </div>

    <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-6 py-14 md:gap-16 md:px-16 md:py-20">

      <section id="overview" className="scroll-mt-20 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <SectionTitle>Overview</SectionTitle>
          <SectionIntro
            title="About LookUp Parking"
            body="LookUp Parking is Albania's first smart parking marketplace that connects drivers searching for parking with property owners who have unused spaces. The platform combines a mobile app (iOS/Android), IoT smart parking locks, and a comprehensive brand system to solve urban parking chaos in Tirana."
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Goals
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard
              title="Business"
              body="Launch Albania's first two-sided parking marketplace and build trust in digital payments."
              icon={<WalletCoinsIcon className="size-5" />}
            />
            <InfoCard
              title="Drivers"
              body="Find, reserve, and navigate to a guaranteed spot in under 2 minutes."
              icon={<CarIcon className="size-5" />}
            />
            <InfoCard
              title="Providers"
              body="Monetize unused spaces with total control over pricing and availability."
              icon={<HouseLockIcon className="size-5" />}
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
              body="Tirana suffers from extreme vehicle density with zero digital booking infrastructure. With 85% of the market on Android and low trust in online payments, the product required heavy emphasis on security and immediate proof of availability."
              icon={<MapLockIcon className="size-5" />}
            />
            <InfoCard
              title="Driver Behavior"
              body="Drivers spend nearly half an hour circling blocks, with 73% willing to pay more for a guaranteed spot. The core friction isn't the cost, it's the fear of a spot being occupied despite paying for it."
              icon={<CarIcon className="size-5" />}
            />
            <InfoCard
              title="Property Owner Concerns"
              body="Owners possess high-value, underused real estate but fear liability and payment issues. They prioritize control and passive coordination over maximum occupancy."
              icon={<HouseLockIcon className="size-5" />}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base text-white md:text-lg">What I Did</h3>
          <div className="flex flex-col gap-3">
            <BulletRow
              label="Brand Identity"
              body="Created the full visual system from zero, logomark, color palette, typography, and marketing collateral, positioning LookUp as the trustworthy default for urban parking in Albania."
            />
            <BulletRow
              label="Driver Mobile App"
              body="Designed the iOS and Android app end-to-end: discovery, real-time availability, reservation, in-app payment, and turn-by-turn handoff to navigation."
            />
            <BulletRow
              label="Provider Dashboard"
              body="Designed the web dashboard property owners use to list, price, and manage their spaces, with availability control and payout tracking."
            />
            <BulletRow
              label="IoT Smart Lock"
              body="Led the product design of the physical smart parking lock, covering the device UX, app pairing flow, and the access-on-arrival experience that guarantees the spot."
            />
            <BulletRow
              label="Marketplace UX"
              body="Mapped the two-sided flows between drivers and providers, reducing friction on both sides so first-time users could reserve a spot in under two minutes."
            />
          </div>
        </div>
      </section>

      <section id="competitive-analysis" className="scroll-mt-20 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <SectionTitle>Competitive Analysis</SectionTitle>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-base text-white md:text-lg">
              Direct Competitors: None
            </h3>
            <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
              No smart parking solutions exist in Albania. This is a greenfield
              opportunity but also means no established user behavior to
              leverage.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base text-white md:text-lg">
            International Benchmarks
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <CompetitorCard
              title="SpotHero"
              strength="Large inventory & simple booking."
              weakness="No access guarantee."
              insight="Reservations fail if the spot isn't physically protected."
              logoSrc="/lookup-parking/competitors/spothero.png"
              logoAlt="SpotHero logo"
            />
            <CompetitorCard
              title="JustPark"
              strength="Strong P2P model."
              weakness="No hardware; relies on owner."
              insight="Manual coordination creates trust issues."
              logoSrc="/lookup-parking/competitors/justpark.png"
              logoAlt="JustPark logo"
            />
            <CompetitorCard
              title="ParkWhiz"
              strength="Efficient for commercial lots."
              weakness="No private/residential inventory."
              insight="Users prefer small, local lots over corporate garages."
              logoSrc="/lookup-parking/competitors/parkwhiz.png"
              logoAlt="ParkWhiz logo"
            />
            <CompetitorCard
              title="EasyPark"
              strength="Market leader in mobile payments."
              weakness="Limited to street parking."
              insight="Payments don't solve the 'last mile' search for space."
              logoSrc="/lookup-parking/competitors/easypark.png"
              logoAlt="EasyPark logo"
            />
          </div>
        </div>

        <div id="branding" className="scroll-mt-20 flex flex-col gap-6">
          <SectionTitle>Branding</SectionTitle>
          <Photo
            src="/lookup-parking/brand-system.png"
            alt="LookUp Parking brand system"
          />
        </div>
      </section>

      <section id="mobile-app" className="scroll-mt-20 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <SectionTitle>Mobile App</SectionTitle>
          <SectionIntro
            title="About LookUp App"
            body="LookUp Parking is a dual-sided mobile application (iOS/Android) that connects drivers searching for parking with property owners offering unused spaces. The app integrates real-time availability, navigation, secure payments, and IoT smart lock control to create a seamless, hardware-backed reservation experience. Drivers can search, book, and unlock spots in under 2 minutes, while providers manage listings, pricing, and earnings from a single dashboard."
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base text-white md:text-lg">
            How It Solves Problems
          </h3>
          <div className="flex flex-col gap-4">
            <InfoCard
              title="For Drivers"
              body="The app eliminates the 20+ minute search loop by showing real-time availability on an interactive map. Users can filter by price, distance, and time, then reserve a spot with transparent upfront pricing. Navigation guides them directly to the location, and the smart lock guarantees physical access removing the fear of 'paying for nothing.' In-app time extensions and chat support handle edge cases without friction."
              icon={<CarIcon className="size-5" />}
            />
            <InfoCard
              title="For Property Owners"
              body="Listing a space takes under 3 minutes: upload a photo, set hourly/daily rates, mark availability windows, and confirm the location. The app handles all coordination drivers book directly, payments process automatically, and the smart lock manages access. Providers see real-time booking stats, earnings breakdowns, and occupancy trends without manual intervention."
              icon={<UserShieldIcon className="size-5" />}
            />
            <InfoCard
              title="Trust Infrastructure"
              body="Every high-stakes moment is designed for clarity. Booking confirmations show exactly what was paid for (spot, time, price). Lock status updates in real-time with visual feedback (locked/unlocked + LED sync). Transparent cancellation policies, ratings/reviews, and in-app chat create accountability on both sides."
              icon={<ShieldCheckIcon className="size-5" />}
            />
          </div>
        </div>
      </section>

      <section id="user-personas" className="scroll-mt-20 flex flex-col gap-8">
        <SectionTitle>User Personas</SectionTitle>
        <div className="flex flex-col gap-6">
          {lookupPersonas.map((p) => (
            <PersonaCard key={p.title} persona={p} />
          ))}
        </div>
      </section>

      <section id="user-flows" className="scroll-mt-20 flex flex-col gap-8">
        <SectionTitle>User Flows</SectionTitle>
        <div className="flex flex-col gap-8 rounded-[24px] border border-white/[0.07] bg-white/[0.015] p-5 md:p-8">
          {lookupFlows.map((group, i) => (
            <Fragment key={group.label}>
              {i > 0 && <div className="border-t border-white/[0.07]" />}
              <FlowGroup group={group} accent="#39B54A" />
            </Fragment>
          ))}
        </div>
      </section>

      <section id="app-sketches" className="scroll-mt-20 flex flex-col gap-6">
        <SectionTitle>App Sketches</SectionTitle>
        <Photo
          src="/lookup-parking/app-sketches.jpg"
          alt="LookUp Parking app sketches"
        />
      </section>

      <section id="app-designs" className="scroll-mt-20 flex flex-col gap-6">
        <SectionTitle>App Designs</SectionTitle>
        <Photo
          src="/lookup-parking/app-designs.png"
          alt="LookUp Parking app designs"
        />
      </section>

      <section id="website-design" className="scroll-mt-20 flex flex-col gap-8">
        <SectionTitle>Website Design</SectionTitle>
        <div className={`${frameClassName} aspect-[16/9]`}>
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/lookup.mp4" type="video/mp4" />
          </video>
        </div>
        <SectionIntro
          title="Website Overview"
          body="The LookUp Parking website (lookup-parking.com) is the primary acquisition platform for drivers and property owners. It establishes brand credibility, explains the hardware-software integration, and drives app downloads through a conversion-focused structure."
        />
        <Photo
          src="/lookup-parking/brand-campaign.png"
          alt="LookUp Parking campaign boards"
        />
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Design Decisions
          </h3>
          <div className="flex flex-col gap-3">
            <BulletRow
              label="Clarity first"
              body="Each section answers one question (What? Why trust? How? Where?)"
            />
            <BulletRow
              label="Hardware visibility"
              body="Lock imagery featured prominently to communicate differentiation"
            />
            <BulletRow
              label="Persistent CTA"
              body="Download button fixed in hero, nav, and footer with no competing actions"
            />
            <BulletRow
              label="Localized trust"
              body="Albanian/English toggle, Tirana address, local contact email"
            />
            <BulletRow
              label="Mobile-first"
              body="Responsive design prioritizes smartphone users (85% of market)"
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <SectionTitle>Conclusion</SectionTitle>

          {/* Metrics */}
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { value: "0 → 1", label: "First smart parking platform in Albania" },
              { value: "<2 min", label: "Average time to find & book a spot" },
              { value: "3 min", label: "Provider onboarding time" },
              { value: "85%", label: "Mobile-first audience reached" },
            ].map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col gap-1.5 rounded-[20px] border border-[#39B54A]/20 bg-[#39B54A]/[0.04] px-5 py-5"
              >
                <span className="font-bold font-header text-[clamp(28px,3.5vw,40px)] text-[#39B54A] tracking-[-0.03em]">
                  {metric.value}
                </span>
                <span className="text-[13px] text-white/50 leading-[1.5]">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-base text-white md:text-lg">
              Impact
            </h3>
            <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
              Launched Albania's first smart parking marketplace (March 2025)
              with full brand identity, website, and iOS/Android app.
              Successfully introduced digital parking and IoT trust in a market
              with no prior infrastructure and low adoption of online payments.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-base text-white md:text-lg">
              What I Delivered
            </h3>
            <div className="flex flex-col gap-3">
              <BulletRow
                label="Brand Strategy"
                body="Positioning, visual identity, messaging"
              />
              <BulletRow
                label="Website"
                body="Dual-audience acquisition site optimized for app downloads"
              />
              <BulletRow
                label="Mobile App"
                body="Complete driver and provider flows with booking, payments, and smart lock integration"
              />
              <BulletRow
                label="Design System"
                body="Scalable components across iOS, Android, and web"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-base text-white md:text-lg">
              Key Insight
            </h3>
            <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
              In emerging markets, trust is the product. Hardware-backed
              guarantees and transparent UX removed the core barrier "What if I
              pay and the spot is taken?", allowing new digital behaviors to
              take root.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-base text-white md:text-lg">
              Why It Matters
            </h3>
            <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
              This work demonstrates how thoughtful design introduces new
              infrastructure in skeptical markets. From brand strategy to final
              pixels, I created an experience that makes urban parking
              predictable and stress-free for a city that desperately needed it.
            </p>
          </div>
        </div>
      </section>

      {/* Launch Metrics */}
      <section id="launch-numbers" className="scroll-mt-20 flex flex-col gap-6">
        <SectionTitle>Launch Numbers</SectionTitle>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { value: "400+", label: "Parking spots listed at launch" },
            { value: "3,200+", label: "App downloads in first 60 days" },
            { value: "4.7★", label: "Average rating on Google Play" },
            { value: "Mar 2025", label: "Public launch date" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col gap-1.5 rounded-[20px] border border-[#39B54A]/20 bg-[#39B54A]/[0.04] px-5 py-5"
            >
              <span className="font-bold font-header text-[clamp(24px,3vw,36px)] text-[#39B54A] tracking-[-0.03em]">
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
            <span className="font-semibold text-white text-lg">LookUp Parking</span>
            <span className="text-[14px] text-white/40">Albania's first smart parking marketplace. Live on iOS and Android.</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://apps.apple.com/us/app/lookup-parking/id6743082932"
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
              href="https://play.google.com/store/apps/details?id=com.zennit.lookup"
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

      {/* Testimonial */}
      <section id="testimonial" className="scroll-mt-20 flex flex-col gap-6">
        <SectionTitle>What the Founder Says</SectionTitle>
        <div className="rounded-[20px] border border-white/[0.07] bg-white/[0.03] px-6 py-8 md:px-10 md:py-10">
          <blockquote className="flex flex-col gap-5">
            <p className="text-[15px] text-white/70 italic leading-[1.8] md:text-[17px]">
              "Mario didn't just design LookUp, he understood the problem before we even finished explaining it. He built the brand, the product, and the entire frontend from nothing, and he did it with a level of care that made it feel like his own company. Every decision, from the IoT lock integration to the onboarding flow, came from genuine understanding of what drivers and property owners actually need. I've never worked with someone who operates across brand, product, and code at this level."
            </p>
            <footer className="flex flex-col gap-0.5">
              <span className="font-semibold text-[15px] text-white">Xhurian Shaba</span>
              <span className="text-[13px] text-white/40">Founder & CEO, LookUp Parking</span>
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
            <Image
              src="/avatid-thumbnail.png"
              alt="avatid next project thumbnail"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 60vw"
            />
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
