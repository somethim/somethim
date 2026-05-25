"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

type PhotoProps = {
  src: string;
  alt: string;
  aspect: string;
  priority?: boolean;
  roundedClassName?: string;
  objectPosition?: string;
};

const Photo = ({
  src,
  alt,
  aspect,
  priority = false,
  roundedClassName = "rounded-[24px]",
  objectPosition,
}: PhotoProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative w-full overflow-hidden border border-white/[0.07] bg-[#111] ${aspect} ${roundedClassName}`}
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
          fill
          quality={82}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1400px"
          className="object-cover"
          style={{ objectPosition }}
          priority={priority}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
};

type VideoProps = {
  src: string;
  poster?: string;
  aspect: string;
  roundedClassName?: string;
};

const Video = ({
  src,
  poster,
  aspect,
  roundedClassName = "rounded-[24px]",
}: VideoProps) => (
  <div
    className={`relative w-full overflow-hidden border border-white/[0.07] bg-[#111] ${aspect} ${roundedClassName}`}
  >
    <video
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  </div>
);

const SectionTitle = ({ children }: { children: string }) => (
  <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
    {children}
  </h2>
);

type CarouselProps = {
  images: { src: string; alt: string }[];
  aspect?: string;
};

const Carousel = ({ images, aspect = "aspect-[16/9]" }: CarouselProps) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };
  const prev = () => go((index - 1 + images.length) % images.length);
  const next = () => go((index + 1) % images.length);

  return (
    <div className="flex flex-col gap-4">
      <div className={`relative w-full overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#111] ${aspect}`}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d * 60, opacity: 0, scale: 0.97 }),
              center: { x: 0, opacity: 1, scale: 1 },
              exit: (d: number) => ({ x: d * -60, opacity: 0, scale: 0.97 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]?.src ?? ""}
              alt={images[index]?.alt ?? ""}
              fill
              quality={82}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1400px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none z-10">
          <button
            type="button"
            onClick={prev}
            className="glass !rounded-full pointer-events-auto flex size-10 shrink-0 cursor-pointer items-center justify-center outline-none transition-all duration-300 hover:scale-105"
            aria-label="Previous"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M8 1L3 6.5L8 12" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            className="glass !rounded-full pointer-events-auto flex size-10 shrink-0 cursor-pointer items-center justify-center outline-none transition-all duration-300 hover:scale-105"
            aria-label="Next"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M5 1L10 6.5L5 12" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2">
        {images.map((img, i) => (
          <motion.button
            key={img.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            animate={i === index ? { width: 24, opacity: 1 } : { width: 8, opacity: 0.35 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="h-2 cursor-pointer rounded-full outline-none"
            style={{
              background: "white",
              boxShadow: i === index ? "0 0 10px 2px rgba(255,255,255,0.6)" : "none",
            }}
          />
        ))}
      </div>
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

type AddCarContentProps = {
  nextProjectDrawerId?: string;
  onOpenNextProject?: (drawerId: string) => void;
};

export const AddCarContent = ({
  nextProjectDrawerId,
  onOpenNextProject,
}: AddCarContentProps) => (
  <>
    <div className="px-6 md:px-16">
      <Video
        src="/addcar/thumbnail.mp4"
        poster="/addcar/hero.png"
        aspect="aspect-[16/9]"
        roundedClassName="rounded-[24px] md:rounded-[66px]"
      />
    </div>

    <div className="hidden xl:block sticky top-20 h-0 overflow-visible">
      <div className="absolute right-12 top-4">
        <QuickLinks links={[
          { label: "Overview", id: "overview" },
          { label: "What I Did", id: "what-i-did" },
          { label: "Logo System", id: "logo-system" },
          { label: "Branch Applications", id: "branch-applications" },
          { label: "Brand Applications", id: "brand-applications" },
        ]} accentColor="#E8001D" />
      </div>
    </div>

    <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-6 py-14 md:gap-16 md:px-16 md:py-20">

      <section id="overview" className="scroll-mt-20 flex flex-col gap-3">
        <SectionTitle>Overview</SectionTitle>
        <h3 className="font-semibold text-base text-white md:text-lg">
          About addCar
        </h3>
        <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
          addCar is an Albanian car rental company built on a single brand promise: the smart way. Before this project they had no cohesive visual identity. The work covered brand strategy, logo system, interior design direction, and full application across fleet vehicles, signage, uniforms, and marketing materials. The identity is engineered from a single geometric detail: the 134.65° apex of the letter "D", which becomes a standalone symbol, a repeating pattern, and a spatial language that stretches across every touchpoint the brand occupies.
        </p>
      </section>

      <section id="what-i-did" className="scroll-mt-20 flex flex-col gap-3">
        <SectionTitle>What I Did</SectionTitle>
        <ul className="mt-1 flex flex-col gap-1.5 text-[14px] leading-[1.8] md:text-[15px]">
          <li className="text-white/50">
            <span className="font-semibold text-white">Brand Strategy: </span>
            Defined the "smart way" positioning and the visual territory that would carry it across every surface the company owns.
          </li>
          <li className="text-white/50">
            <span className="font-semibold text-white">Logo System: </span>
            Designed the wordmark and extracted the 134.65° apex of the "D" into a standalone symbol that doubles as an icon and a repeating pattern.
          </li>
          <li className="text-white/50">
            <span className="font-semibold text-white">Interior Design Direction: </span>
            Directed three branch concepts, from calm and precise to bold and graphic, translating the visual system into real-world space.
          </li>
          <li className="text-white/50">
            <span className="font-semibold text-white">Fleet & Signage: </span>
            Applied the identity across fleet vehicles, shuttle vans, lobby signage, and parking way-finding.
          </li>
          <li className="text-white/50">
            <span className="font-semibold text-white">Uniforms & Collateral: </span>
            Designed staff uniforms and the print and digital collateral that completes the brand experience.
          </li>
        </ul>
      </section>

      <section id="logo-system" className="scroll-mt-20 flex flex-col gap-8">
        <SectionTitle>Logo System</SectionTitle>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            From Logo to Visual System
          </h3>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            The AddCar identity is built on a clear, confident typographic
            foundation, fast, precise, and easy to recognise, while minimal
            enough to stay modern and adaptable. At the core lies one
            intentional detail: the apex of the letter "D." This single point
            becomes the starting point of an entire visual system.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Symbol Extraction
          </h3>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            The 134.65° apex separates from the wordmark and takes on a life of
            its own. It becomes a standalone icon that carries the same sense of
            direction, movement, and confidence in a simplified, recognisable
            form.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Pattern Development
          </h3>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            Through repetition, the symbol transforms into a dynamic pattern
            that adds rhythm and depth. Its composition subtly recalls carbon
            fibre textures and the checkered flag of victory, reinforcing
            addCar as a performance-driven brand.
          </p>
        </div>
      </section>

      <section id="branch-applications" className="scroll-mt-20 flex flex-col gap-8">
        <SectionTitle>Branch Applications</SectionTitle>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Version 1, A Lighter, Calmer Expression
          </h3>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            White takes the lead. The 134.65° angle stands out as a confident
            design gesture that guides the eye and anchors the spatial layout. A
            subtle UV-printed pattern adds sophistication and depth without
            overwhelming the space, calm in appearance, engineered with
            precision.
          </p>
        </div>

        <Carousel
          images={[
            { src: "/addcar/v1-plan.png", alt: "addCar V1 plan" },
            { src: "/addcar/v1-inside.png", alt: "addCar V1 interior" },
            { src: "/addcar/v1-outside.png", alt: "addCar V1 exterior" },
          ]}
        />

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Version 2, Built on a Precise Angle
          </h3>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            The 134.65° angle becomes a guiding structure across all brand
            applications. By anchoring the identity in this single, consistent
            detail, every element gains a sense of direction, continuity, and
            intention, creating a visual language that is both distinctive and
            unmistakably addCar.
          </p>
        </div>

        <Carousel
          images={[
            { src: "/addcar/v2-plan.png", alt: "addCar V2 plan" },
            { src: "/addcar/v2-inside.png", alt: "addCar V2 interior" },
            { src: "/addcar/v2-outside.png", alt: "addCar V2 exterior" },
          ]}
        />

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Version 3, A Bolder, More Expressive Identity
          </h3>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            The angle takes centre stage. Red and white meet in near-perfect
            balance, two equal forces held together by the precision of a
            single diagonal. A strong red field is cut by the white angle,
            which carries a subtle UV-printed pattern that adds depth and
            texture without breaking the composition's calm authority.
          </p>
        </div>

        <Carousel
          images={[
            { src: "/addcar/v3-plan.png", alt: "addCar V3 plan" },
            { src: "/addcar/v3-inside.png", alt: "addCar V3 interior" },
            { src: "/addcar/v3-outside.png", alt: "addCar V3 exterior" },
          ]}
        />
      </section>

      <section id="brand-applications" className="scroll-mt-20 flex flex-col gap-8">
        <SectionTitle>Brand Applications</SectionTitle>

        <div className="flex flex-col gap-4">
          <Photo
            src="/addcar/uniforms.png"
            alt="addCar staff uniforms"
            aspect="aspect-[16/9]"
          />
          <Photo
            src="/addcar/shuttle-van.png"
            alt="addCar shuttle van"
            aspect="aspect-[16/9]"
          />
          <Photo
            src="/addcar/parking-signage.png"
            alt="addCar parking signage"
            aspect="aspect-[16/9]"
          />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <SectionTitle>Next Project</SectionTitle>
        <button
          onClick={() =>
            nextProjectDrawerId && onOpenNextProject?.(nextProjectDrawerId)
          }
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
              <source src="/zennit.mp4" type="video/mp4" />
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
