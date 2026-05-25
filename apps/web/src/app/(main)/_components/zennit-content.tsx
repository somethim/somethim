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

type ZennitContentProps = {
  nextProjectDrawerId?: string;
  onOpenNextProject?: (drawerId: string) => void;
};

export const ZennitContent = ({
  nextProjectDrawerId,
  onOpenNextProject,
}: ZennitContentProps) => (
  <>
    <div className="px-6 md:px-16">
      <Photo
        src="/zennit-study/hero.png"
        alt="zennit hero"
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
          { label: "Website Design", id: "website-design" },
          { label: "Brand Applications", id: "brand-applications" },
        ]} accentColor="#A855F7" />
      </div>
    </div>

    <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-6 py-14 md:gap-16 md:px-16 md:py-20">

      <section id="overview" className="scroll-mt-20 flex flex-col gap-3">
        <SectionTitle>Overview</SectionTitle>
        <h3 className="font-semibold text-base text-white md:text-lg">
          About zennit
        </h3>
        <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
          zennit is a software development and design agency I co-founded in 2023. As both co-founder and lead designer, I built the brand from scratch: naming, logo system, color palette, website, and all client-facing materials. The identity needed to communicate equal credibility on the engineering and creative sides without leaning into clichés from either camp.
        </p>
      </section>

      <section id="what-i-did" className="scroll-mt-20 flex flex-col gap-3">
        <SectionTitle>What I Did</SectionTitle>
        <ul className="mt-1 flex flex-col gap-1.5 text-[14px] leading-[1.8] md:text-[15px]">
          <li className="text-white/50">
            <span className="font-semibold text-white">Co-Founder: </span>
            Started the studio in 2023 and shaped its positioning as a design-engineering partner that can ship both sides of a product.
          </li>
          <li className="text-white/50">
            <span className="font-semibold text-white">Brand Identity: </span>
            Built the brand from scratch, naming, logo system, color palette, typography, and the collateral used across every client engagement.
          </li>
          <li className="text-white/50">
            <span className="font-semibold text-white">Website: </span>
            Designed and built the zennit website end-to-end as the studio's primary acquisition surface.
          </li>
          <li className="text-white/50">
            <span className="font-semibold text-white">Client Work: </span>
            Lead designer across client engagements, covering brand, product design, and frontend delivery.
          </li>
        </ul>
      </section>

      <section id="branding" className="scroll-mt-20 flex flex-col gap-8">
        <SectionTitle>Branding</SectionTitle>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Problem
          </h3>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            Zennit needed a brand identity that reflected their dual expertise
            in software development and graphic design. The challenge was to
            create a visual system that communicated both technical precision
            and creative excellence without favoring one over the other.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Brand Strategy
          </h3>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            zennit is where technology meets creativity. The brand positions the company as a collaborative partner that elevates client visions to their fullest potential. The name itself carries a dual meaning: "together" in Albanian, and "to the highest point" in English.
          </p>
          <ul className="mt-1 flex flex-col gap-1.5 text-[14px] leading-[1.8] md:text-[15px]">
            <li className="text-white/50">
              <span className="font-semibold text-white">Innovation: </span>
              Through cutting-edge technology
            </li>
            <li className="text-white/50">
              <span className="font-semibold text-white">Precision: </span>
              In execution
            </li>
            <li className="text-white/50">
              <span className="font-semibold text-white">
                Creative Excellence:{" "}
              </span>
              Design-forward thinking with strong craft
            </li>
            <li className="text-white/50">
              <span className="font-semibold text-white">Collaboration: </span>A
              true working partnership with clients
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Logo Design
          </h3>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            The zennit logo is built on a geometric flower or mandala pattern
            composed of overlapping circles. It works as a visual metaphor for
            interconnection, growth, and balance where mathematical precision
            meets organic beauty.
          </p>
        </div>

        <Photo
          src="/zennit-study/office-signage.png"
          alt="zennit office signage"
        />

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Color System
          </h3>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            Zennit Purple leads the identity with a vivid, premium energy that
            feels both digital and expressive. Supporting gradients and darker
            neutrals give the system depth without losing clarity.
          </p>
        </div>

        <Photo
          src="/zennit-study/color-system.png"
          alt="zennit logo and color system"
        />
      </section>

      <section id="website-design" className="scroll-mt-20 flex flex-col gap-8">
        <SectionTitle>Website Design</SectionTitle>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Website Overview
          </h3>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            Text-driven, experimental layout where the experience itself demonstrates capability. The site doesn't describe what zennit does, it shows it. Three core service pillars (Engineering, Planning, and Designing) are expressed through direct, actionable messaging and geometric rhythm pulled from the identity system. Typography is the hero, supported by petal motifs and rose-blue gradient arcs that carry the brand into motion without overpowering the content.
          </p>
        </div>

        <Photo
          src="/zennit-study/website-design.png"
          alt="zennit website design"
        />
      </section>

      <section id="brand-applications" className="scroll-mt-20 flex flex-col gap-6">
        <SectionTitle>Brand Applications</SectionTitle>
        <Photo
          src="/zennit-study/brand-applications.png"
          alt="zennit brand applications"
        />
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
              style={{ objectPosition: "center top" }}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/dardanair.mp4" type="video/mp4" />
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
