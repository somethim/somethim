"use client";

import Image from "next/image";
import { useState } from "react";

type PhotoProps = {
  src: string;
  alt: string;
  priority?: boolean;
  roundedClassName?: string;
};

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

type DardanairContentProps = {
  nextProjectDrawerId?: string;
  onOpenNextProject?: (drawerId: string) => void;
};

export const DardanairContent = ({
  nextProjectDrawerId,
  onOpenNextProject,
}: DardanairContentProps) => (
  <>
    <div className="px-6 md:px-16">
      <Photo
        src="/dardanair/hero.png"
        alt="dardanair hero"
        roundedClassName="rounded-[66px]"
        priority
      />
    </div>

    <div className="hidden xl:block sticky top-20 h-0 overflow-visible">
      <div className="absolute right-12 top-4">
        <QuickLinks links={[
          { label: "Overview", id: "overview" },
          { label: "What I Did", id: "what-i-did" },
          { label: "Branding", id: "branding" },
          { label: "Typography", id: "typography" },
          { label: "Brand Applications", id: "brand-applications" },
        ]} accentColor="#1D4ED8" />
      </div>
    </div>

    <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-6 py-14 md:gap-16 md:px-16 md:py-20">

      <section id="overview" className="scroll-mt-20 flex flex-col gap-3">
        <SectionTitle>Overview</SectionTitle>
        <h3 className="font-semibold text-base text-white md:text-lg">
          About dardanair
        </h3>
        <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
          dardanair is a concept airline brand created as a speculative branding exercise. The brief: design a Kosovar-Albanian carrier that embodies aspiration, freedom, and national pride without defaulting to flag-carrier clichés. The identity combines a dynamic bird-in-flight symbol with bold typography to create a modern aviation brand rooted in Illyrian heritage.
        </p>
      </section>

      <section id="what-i-did" className="scroll-mt-20 flex flex-col gap-3">
        <SectionTitle>What I Did</SectionTitle>
        <ul className="mt-1 flex flex-col gap-1.5 text-[14px] leading-[1.8] md:text-[15px]">
          <li className="text-white/50">
            <span className="font-semibold text-white">Brand Concept: </span>
            Shaped the positioning, a Kosovar-Albanian carrier grounded in Illyrian heritage, aspiration, and freedom, without leaning on flag-carrier clichés.
          </li>
          <li className="text-white/50">
            <span className="font-semibold text-white">Logo System: </span>
            Designed the abstract bird-in-flight mark and the angular wordmark that carry the brand across digital and physical touchpoints.
          </li>
          <li className="text-white/50">
            <span className="font-semibold text-white">Color & Typography: </span>
            Built the color system and type hierarchy, balancing premium trust with the pace and precision of modern aviation.
          </li>
          <li className="text-white/50">
            <span className="font-semibold text-white">Brand Applications: </span>
            Applied the identity across livery, boarding passes, signage, and marketing collateral to show the system at scale.
          </li>
        </ul>
      </section>

      <section id="branding" className="scroll-mt-20 flex flex-col gap-8">
        <SectionTitle>Branding</SectionTitle>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Logo Design
          </h3>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            The dardanair mark features an abstract bird in dynamic flight, a
            sleek, angular symbol suggesting speed, grace, and upward
            trajectory. The design communicates:
          </p>
          <ul className="mt-1 flex flex-col gap-1.5 text-[14px] leading-[1.8] md:text-[15px]">
            <li className="text-white/50">
              <span className="font-semibold text-white">Movement: </span>
              Forward momentum and progress
            </li>
            <li className="text-white/50">
              <span className="font-semibold text-white">Freedom: </span>
              Open skies and limitless possibility
            </li>
            <li className="text-white/50">
              <span className="font-semibold text-white">Precision: </span>
              Clean geometry reflecting aviation engineering excellence
            </li>
          </ul>
        </div>

        <Photo
          src="/dardanair/logo-design.png"
          alt="dardanair logo design"
        />

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Color System
          </h3>
          <div className="flex flex-col gap-4 text-[14px] leading-[1.8] md:text-[15px]">
            <div>
              <p className="font-semibold text-white">
                Primary: Cetacean Blue (#000D5A)
              </p>
              <p className="text-white/50">
                Deep, authoritative navy that conveys trust, professionalism,
                and premium service.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">
                Secondary: Dark Imperial Blue (#001075)
              </p>
              <p className="text-white/50">
                Slightly lighter blue for layering and visual depth.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">
                Tertiary: Bright Gray (#EAEAEA)
              </p>
              <p className="text-white/50">
                Clean neutral for backgrounds, text contrast, and balancing the
                bold blue palette.
              </p>
            </div>
          </div>
        </div>

        <Photo
          src="/dardanair/brand-colors.png"
          alt="dardanair brand colors"
        />
      </section>

      <section id="typography" className="scroll-mt-20 flex flex-col gap-6">
        <SectionTitle>Typography</SectionTitle>
        <Photo
          src="/dardanair/typography.png"
          alt="dardanair typography"
        />
      </section>

      <section id="brand-applications" className="scroll-mt-20 flex flex-col gap-6">
        <SectionTitle>Brand Applications</SectionTitle>
        <div className="flex flex-col gap-4">
          <Photo
            src="/dardanair/mountain-application.png"
            alt="dardanair mountain brand application"
          />
          <Photo
            src="/dardanair/boarding-pass.png"
            alt="dardanair boarding pass application"
          />
          <Photo
            src="/dardanair/brand-applications.png"
            alt="dardanair application system"
          />
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
              <source src="/fast-track-tyres/thumbnail.mp4" type="video/mp4" />
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
