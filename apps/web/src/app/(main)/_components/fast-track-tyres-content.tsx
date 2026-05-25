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

type FastTrackTyresContentProps = {
  nextProjectDrawerId?: string;
  onOpenNextProject?: (drawerId: string) => void;
};

export const FastTrackTyresContent = ({
  nextProjectDrawerId,
  onOpenNextProject,
}: FastTrackTyresContentProps) => (
  <>
    <div className="px-6 md:px-16">
      <Photo
        src="/fast-track-tyres/car-wrap.jpg"
        alt="Fast Track Tyres car wrap"
        priority
        roundedClassName="rounded-[66px]"
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
          { label: "What the Client Says", id: "testimonial" },
        ]} accentColor="#FF1901" />
      </div>
    </div>

    <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-6 py-14 md:gap-16 md:px-16 md:py-20">

      <section id="overview" className="scroll-mt-20 flex flex-col gap-3">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
          Overview
        </h2>
        <h3 className="font-semibold text-base text-white md:text-lg">
          About Fast Track Tyres
        </h3>
        <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
          Fast Track Tyres is a high-performance tire service based in Albania. The owner came in with no brand identity and a clear ask: make it look premium, make it look fast. The work covered logo design, color system, typography, van wraps, lobby signage, and billboard applications. The result was a race-inspired visual system built around speed, precision, and automotive authority that customers notice the moment they pull up.
        </p>
      </section>

      <section id="what-i-did" className="scroll-mt-20 flex flex-col gap-3">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
          What I Did
        </h2>
        <ul className="mt-1 flex flex-col gap-1.5 text-[14px] leading-[1.8] md:text-[15px]">
          <li className="text-white/50">
            <span className="font-semibold text-white">Logo Design: </span>
            Built the mark from zero, combining a rotating tire symbol with red speed lines to convey velocity and precision.
          </li>
          <li className="text-white/50">
            <span className="font-semibold text-white">Color System: </span>
            Locked the Ferrari Red, Vampire Black, and Washed White palette that carries the brand across every surface.
          </li>
          <li className="text-white/50">
            <span className="font-semibold text-white">Typography: </span>
            Selected and paired the type system to hold up at billboard scale and small-print clarity.
          </li>
          <li className="text-white/50">
            <span className="font-semibold text-white">Brand Applications: </span>
            Applied the identity to van wraps, lobby signage, and billboards so the brand reads the same moment a customer pulls up.
          </li>
        </ul>
      </section>

      <section id="branding" className="scroll-mt-20 flex flex-col gap-8">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
          Branding
        </h2>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Logo Design
          </h3>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            The Fast Track Tyres mark combines a rotating tire/circular motion
            symbol with red speed lines, suggesting velocity, momentum, and
            performance. The design communicates:
          </p>
          <ul className="mt-1 flex flex-col gap-1.5 text-[14px] leading-[1.8] md:text-[15px]">
            <li className="text-white/50">
              <span className="font-semibold text-white">Speed: </span>
              Dynamic movement through trailing lines
            </li>
            <li className="text-white/50">
              <span className="font-semibold text-white">Precision: </span>
              Perfect circular form reflects tire geometry
            </li>
            <li className="text-white/50">
              <span className="font-semibold text-white">Energy: </span>
              Forward thrust conveys urgency and efficiency
            </li>
          </ul>
        </div>

        <Photo
          src="/fast-track-tyres/logo-variations.jpg"
          alt="Fast Track Tyres logo variations"
        />

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Color System
          </h3>
          <div className="flex flex-col gap-4 text-[14px] leading-[1.8] md:text-[15px]">
            <div>
              <p className="font-semibold text-white">
                Primary: Ferrari Red (#FF1901)
              </p>
              <p className="text-white/50">
                Bold, aggressive red that signals speed, passion, and
                performance. The Ferrari association reinforces premium
                automotive positioning.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">
                Secondary: Vampire Black (#0A0A0A)
              </p>
              <p className="text-white/50">
                Deep, near-pure black for sophistication and technical
                authority. Creates dramatic contrast with the red accent.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">
                Tertiary: Washed White (#F3F2F1)
              </p>
              <p className="text-white/50">
                Soft off-white for backgrounds and text contrast. Maintains
                readability while avoiding harsh pure white.
              </p>
            </div>
          </div>
        </div>

        <Photo
          src="/fast-track-tyres/color-system.jpg"
          alt="Fast Track Tyres color system"
        />
      </section>

      <section id="typography" className="scroll-mt-20 flex flex-col gap-6">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
          Typography
        </h2>
        <Photo
          src="/fast-track-tyres/typography.jpg"
          alt="Fast Track Tyres typography"
        />
      </section>

      <section id="brand-applications" className="scroll-mt-20 flex flex-col gap-6">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
          Brand Applications
        </h2>
        <div className="flex flex-col gap-4">
          <Photo
            src="/fast-track-tyres/lobby.jpg"
            alt="Fast Track Tyres lobby signage"
          />
          <Photo
            src="/fast-track-tyres/billboard.jpg"
            alt="Fast Track Tyres billboard"
          />
          <Photo
            src="/fast-track-tyres/van-wrap.jpg"
            alt="Fast Track Tyres van wrap"
          />
        </div>
      </section>

      {/* Testimonial */}
      <section id="testimonial" className="scroll-mt-20 flex flex-col gap-6">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
          What the Client Says
        </h2>
        <div className="rounded-[20px] border border-white/[0.07] bg-white/[0.03] px-6 py-8 md:px-10 md:py-10">
          <blockquote className="flex flex-col gap-5">
            <p className="text-[15px] text-white/70 italic leading-[1.8] md:text-[17px]">
              "We needed a brand that hit as hard as the tyres we sell. Mario delivered something that feels like it belongs on a Formula 1 grid, not a local shop. The logo, the colors, the way it all works across the van wraps, the signage, the billboards, customers notice it immediately. People walk in and say we look like a premium brand now. That's exactly what we wanted."
            </p>
            <footer className="flex flex-col gap-0.5">
              <span className="font-semibold text-[15px] text-white">Deivid Preka</span>
              <span className="text-[13px] text-white/40">Owner, Fast Track Tyres</span>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
          Next Project
        </h2>
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
              <source src="/zerapy/thumbnail.mp4" type="video/mp4" />
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
