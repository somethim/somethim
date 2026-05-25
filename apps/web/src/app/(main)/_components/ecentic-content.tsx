"use client";

type PhotoProps = {
  src: string;
  alt: string;
  roundedClassName?: string;
};

const Photo = ({
  src,
  alt,
  roundedClassName = "rounded-[24px]",
}: PhotoProps) => (
  <div
    className={`relative w-full overflow-hidden border border-white/[0.07] bg-[#111] ${roundedClassName}`}
  >
    <img src={src} alt={alt} className="h-auto w-full" />
  </div>
);

type VideoProps = {
  src: string;
  roundedClassName?: string;
};

const VideoFrame = ({
  src,
  roundedClassName = "rounded-[24px]",
}: VideoProps) => (
  <div
    className={`relative w-full overflow-hidden border border-white/[0.07] bg-[#111] ${roundedClassName}`}
  >
    <video
      className="h-auto w-full"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
    </video>
  </div>
);

const stackHighlights = [
  { layer: "Framework", tech: "Next.js 16, React 19" },
  { layer: "Styling", tech: "Tailwind CSS 4, Motion" },
  { layer: "Charts", tech: "Recharts" },
  { layer: "Forms", tech: "react-hook-form + Zod" },
  { layer: "State", tech: "nuqs (URL state)" },
  { layer: "Smooth Scroll", tech: "Lenis" },
];

const dashboardPages = [
  {
    name: "Overview",
    description: "Aggregated win rates, trend charts, and activity feed",
  },
  {
    name: "Products",
    description:
      "Catalog with per-agent win rates (GPT-4, Claude, Gemini), data quality scores, and optimization status",
  },
  {
    name: "Product Detail",
    description:
      "Tabbed deep-dive with Win Rate trends, Agent Replay transcripts, Attribute Gap analysis, Competitive Battlecards, and an Optimize panel",
  },
  {
    name: "Competitors",
    description: "Competitor tracking with head-to-head comparison",
  },
  {
    name: "Simulations",
    description: "Full simulation history with live streaming results",
  },
  {
    name: "Optimize",
    description: "Approval queue for AI-generated listing improvements",
  },
  {
    name: "UCP",
    description:
      "Universal Commerce Protocol profile editor for structured agent-readable product data",
  },
  {
    name: "Settings",
    description: "Account, integrations, and billing management",
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

type EcenticContentProps = {
  nextProjectDrawerId?: string;
  onOpenNextProject?: (drawerId: string) => void;
};

export const EcenticContent = ({
  nextProjectDrawerId,
  onOpenNextProject,
}: EcenticContentProps) => (
  <>
    {/* Hero */}
    <div className="px-6 md:px-16">
      <VideoFrame
        src="/ecentic-thumbnail.mp4"
        roundedClassName="rounded-[66px]"
      />
    </div>

    <div className="hidden xl:block sticky top-20 h-0 overflow-visible">
      <div className="absolute right-12 top-4">
        <QuickLinks links={[
          { label: "Overview", id: "overview" },
          { label: "What I Did", id: "what-i-did" },
          { label: "Design", id: "design" },
          { label: "Onboarding", id: "onboarding" },
          { label: "Dashboard", id: "dashboard" },
          { label: "Results", id: "results" },
          { label: "Stack", id: "stack" },
          { label: "What the Founder Says", id: "testimonial" },
        ]} accentColor="#3B82F6" />
      </div>
    </div>

    <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-6 py-14 md:gap-16 md:px-16 md:py-20">

      {/* Overview */}
      <section id="overview" className="scroll-mt-20 flex flex-col gap-3">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
          Overview
        </h2>
        <h3 className="font-semibold text-base text-white md:text-lg">
          About Ecentic
        </h3>
        <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
          Ecentic is an e-commerce optimization platform built for the AI agent
          economy. As AI shopping agents (GPT-4, Claude, Gemini, Perplexity)
          increasingly make purchase decisions on behalf of consumers, merchants
          risk being silently excluded. Ecentic simulates how these agents
          compare products, diagnoses why listings win or lose, and
          auto-optimizes them to get picked first.
        </p>
      </section>

      {/* What I Did */}
      <section id="what-i-did" className="scroll-mt-20 flex flex-col gap-4">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
          What I Did
        </h2>
        <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
          As{" "}
          <span className="font-semibold text-white">
            designer and frontend developer
          </span>
          , I owned this product from first wireframe to shipped code.
        </p>
        <ul className="mt-1 flex flex-col gap-1.5 text-[14px] leading-[1.8] md:text-[15px]">
          <li className="text-white/50">
            <span className="font-semibold text-white">Product Design: </span>
            Designed every screen, from onboarding through the full dashboard, with a data-dense layout system built for scannability.
          </li>
          <li className="text-white/50">
            <span className="font-semibold text-white">Brand Identity: </span>
            Built the visual language, logo lockups, color tokens, typography (LT Superior), and marketing collateral.
          </li>
          <li className="text-white/50">
            <span className="font-semibold text-white">Frontend Development: </span>
            Shipped the onboarding flow and the complete dashboard on Next.js 16 (App Router, PPR, Suspense streaming), React 19, Tailwind CSS 4, Recharts, and Motion.
          </li>
          <li className="text-white/50">
            <span className="font-semibold text-white">Integrations: </span>
            Wired Shopify OAuth, WooCommerce API, and custom product feed URLs into the onboarding, with real-time streamed simulation results.
          </li>
        </ul>
      </section>

      {/* Design */}
      <section id="design" className="scroll-mt-20 flex flex-col gap-8">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
          Design
        </h2>
        <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
          I owned the entire design process from wireframes through final UI.
          The visual language is clean and data-dense, built around a neutral
          background with semantic color tokens, a custom typeface (LT
          Superior), and a component system designed for clarity at scale. Every
          screen prioritizes scannability: win rates, agent verdicts, and
          optimization status are always visible at a glance.
        </p>
        <Photo
          src="/ecentic/logo-lockups.png"
          alt="Ecentic logo lockups on dark and light backgrounds"
        />
        <Photo
          src="/ecentic/brand-jacket.png"
          alt="Ecentic branded jacket with embroidered logo"
        />
      </section>

      {/* Onboarding */}
      <section id="onboarding" className="scroll-mt-20 flex flex-col gap-8">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
          Onboarding
        </h2>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Frontend Development
          </h3>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            A four-step guided flow that takes merchants from zero to their
            first AI simulation. The onboarding is built as a multi-step client
            flow with step validation, animated transitions, and live progress
            indicators that stream simulation results as they complete.
          </p>
          <ul className="mt-1 flex flex-col gap-1.5 text-[14px] leading-[1.8] md:text-[15px]">
            <li className="text-white/50">
              <span className="font-semibold text-white">Connect, </span>
              Platform integration via Shopify OAuth, WooCommerce API, or custom
              product feed URL
            </li>
            <li className="text-white/50">
              <span className="font-semibold text-white">
                Select Products:{" "}
              </span>
              Choose which imported products to include in simulations
            </li>
            <li className="text-white/50">
              <span className="font-semibold text-white">
                Add Competitors:{" "}
              </span>
              Benchmark against competitor listings
            </li>
            <li className="text-white/50">
              <span className="font-semibold text-white">First Scan, </span>
              Triggers a live AI simulation sweep with real-time progress
              streaming
            </li>
          </ul>
        </div>
        <Photo
          src="/ecentic/shopify-oauth.png"
          alt="Ecentic Shopify OAuth onboarding screen on desktop"
        />
      </section>

      {/* Dashboard */}
      <section id="dashboard" className="scroll-mt-20 flex flex-col gap-8">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
          Dashboard
        </h2>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Frontend Development
          </h3>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            The dashboard is the core product surface. Built with Next.js 16
            (App Router, PPR, Suspense streaming), React 19, Tailwind CSS 4,
            Recharts, and Motion for animations. Data fetching uses server
            components with skeleton-based streaming for fast perceived load
            times.
          </p>
        </div>

        <Photo
          src="/ecentic/dashboard-overview-new.png"
          alt="Ecentic dashboard overview page"
        />

        {/* Dashboard pages list */}
        <div className="flex flex-col gap-3">
          {dashboardPages.map((page) => (
            <div
              key={page.name}
              className="flex flex-col gap-0.5 border-t border-white/[0.07] pt-3"
            >
              <span className="font-semibold text-[14px] text-white md:text-[15px]">
                {page.name}
              </span>
              <span className="text-[13px] text-white/40 leading-[1.7] md:text-[14px]">
                {page.description}
              </span>
            </div>
          ))}
        </div>

        <Photo
          src="/ecentic/dashboard-simulations.png"
          alt="Ecentic simulations dashboard page"
        />

        <Photo
          src="/ecentic/dashboard-settings.png"
          alt="Ecentic dashboard settings page"
        />
      </section>

      {/* Results */}
      <section id="results" className="scroll-mt-20 flex flex-col gap-6">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
          Results
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { value: "Solo", label: "Designer and frontend developer across the entire product" },
            { value: "3 AIs", label: "GPT-4, Claude, and Gemini simulated per product listing" },
            { value: "<5 min", label: "From account creation to first AI simulation running" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col gap-1.5 rounded-[20px] border border-[#3B82F6]/20 bg-[#3B82F6]/[0.04] px-5 py-5"
            >
              <span className="font-bold font-header text-[clamp(28px,3.5vw,40px)] text-[#3B82F6] tracking-[-0.03em]">
                {metric.value}
              </span>
              <span className="text-[13px] text-white/50 leading-[1.5]">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section id="stack" className="scroll-mt-20 flex flex-col gap-6">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
          Stack
        </h2>
        <div className="flex flex-col overflow-hidden rounded-[16px] border border-white/[0.07]">
          {stackHighlights.map((item, index) => (
            <div
              key={item.layer}
              className={`flex items-center justify-between px-5 py-3.5 ${
                index > 0 ? "border-t border-white/[0.07]" : ""
              }`}
            >
              <span className="text-[13px] text-white/40 uppercase tracking-[0.06em] md:text-[14px]">
                {item.layer}
              </span>
              <span className="font-semibold text-[14px] text-white md:text-[15px]">
                {item.tech}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section id="testimonial" className="scroll-mt-20 flex flex-col gap-6">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] text-white tracking-[-0.025em]">
          What the Founder Says
        </h2>
        <div className="rounded-[20px] border border-white/[0.07] bg-white/[0.03] px-6 py-8 md:px-10 md:py-10">
          <blockquote className="flex flex-col gap-5">
            <p className="text-[15px] text-white/70 italic leading-[1.8] md:text-[17px]">
              "Mario took a complex product idea, simulating how AI agents evaluate e-commerce listings, and turned it into something merchants can actually understand and use. The dashboard he designed and built is dense with data but never overwhelming. He handled everything from the Shopify OAuth flow to the simulation result pages, and every screen feels intentional. Having someone who can design at this level and then ship the frontend themselves is rare."
            </p>
            <footer className="flex flex-col gap-0.5">
              <span className="font-semibold text-[15px] text-white">Iseld Muca</span>
              <span className="text-[13px] text-white/40">Founder, Ecentic</span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Next Project */}
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
              <source src="/addcar/thumbnail.mp4" type="video/mp4" />
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
