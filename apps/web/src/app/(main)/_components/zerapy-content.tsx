"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Palette, ClipboardList, Coins, Dumbbell, CircleCheck, TrendingUp, MessageSquare, CalendarDays, Bell, FolderOpen, FileText, Lightbulb, Clapperboard, Globe } from "lucide-react";

const accentColor = "#14B8A6";

type PhotoProps = {
  src: string;
  alt: string;
  aspect?: string;
  priority?: boolean;
  roundedClassName?: string;
  objectPosition?: string;
  bgClassName?: string;
};

const Photo = ({
  src,
  alt,
  aspect,
  priority = false,
  roundedClassName = "rounded-[24px]",
  objectPosition,
  bgClassName = "border border-white/[0.07] bg-[#111]",
}: PhotoProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative w-full overflow-hidden ${bgClassName} ${aspect ?? ""} ${roundedClassName}`}
    >
      {hasError ? (
        <div className="flex h-48 w-full items-center justify-center px-6 text-center">
          <div className="max-w-sm">
            <p className="font-semibold text-sm text-white">Image missing</p>
            <p className="mt-2 text-[13px] text-white/45 leading-6">{src}</p>
          </div>
        </div>
      ) : aspect ? (
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

const Placeholder = ({
  label,
  aspect = "aspect-[16/9]",
  roundedClassName = "rounded-[24px]",
}: {
  label: string;
  aspect?: string;
  roundedClassName?: string;
}) => (
  <div
    className={`relative flex w-full items-center justify-center overflow-hidden border border-white/[0.07] bg-[#111] ${aspect} ${roundedClassName}`}
  >
    <span className="text-center font-semibold text-sm text-white/20 tracking-widest uppercase">
      {label}
    </span>
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

const InfoCard = ({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon?: React.ReactNode;
}) => (
  <div className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-5 md:p-6">
    {icon ? (
      <div className="mb-4 flex" style={{ color: accentColor }}>
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: "rgba(20, 184, 166, 0.14)" }}
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

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col gap-1 rounded-[20px] border border-white/[0.06] bg-white/[0.02] px-5 py-4">
    <span
      className="font-bold font-header text-3xl tracking-[-0.03em]"
      style={{ color: accentColor }}
    >
      {value}
    </span>
    <span className="text-[13px] text-white/45 leading-[1.6]">{label}</span>
  </div>
);

const RTMCodeRow = ({
  code,
  title,
  description,
}: {
  code: string;
  title: string;
  description: string;
}) => (
  <div className="flex gap-4 border-b border-white/[0.05] pb-4 last:border-0 last:pb-0">
    <div
      className="self-start shrink-0 rounded-[10px] px-2.5 py-1 font-mono text-[12px] font-semibold tracking-wide"
      style={{
        backgroundColor: "rgba(20, 184, 166, 0.12)",
        color: accentColor,
      }}
    >
      {code}
    </div>
    <div className="flex flex-col gap-0.5">
      <span className="font-semibold text-[14px] text-white">{title}</span>
      <span className="text-[13px] text-white/45 leading-[1.7]">
        {description}
      </span>
    </div>
  </div>
);

type FlowSlide = {
  src: string;
  alt: string;
  step: string;
  title: string;
  body: string;
};

const flowSlides: FlowSlide[] = [
  {
    src: "/zerapy/flow-dashboard.png",
    alt: "Zerapy dashboard",
    step: "Step 01: Dashboard",
    title: "The Command Center",
    body: "Designed to be simple and uncluttered. Only the essentials a therapist needs every day: total patients, overall streak and score, engagement trends, upcoming schedule, messages, and patients requiring immediate attention.",
  },
  {
    src: "/zerapy/flow-patients.png",
    alt: "Zerapy patients table",
    step: "Step 02: Patients",
    title: "Full Patient List",
    body: "A complete view of the caseload with status, scores, pain trends, and insurance at a glance. Click any patient to view or update their status. Click 'Add New Participant' to start onboarding someone new.",
  },
  {
    src: "/zerapy/flow-add-participant.png",
    alt: "Zerapy add new participant",
    step: "Step 03: Add Participant",
    title: "Creating a Patient",
    body: "A popup collects personal details plus a pathology field where the doctor describes the condition in 2-3 key notes. Zera AI reads this and recommends the most suitable exercise pack for that specific patient.",
  },
  {
    src: "/zerapy/flow-zera-ai.png",
    alt: "Zera AI analysis",
    step: "Step 04: Zera AI",
    title: "AI at Work",
    body: "After clicking 'Analyze by Zera AI', the system processes the patient's pathology, age, gender, and the doctor's clinical notes to generate a personalized exercise recommendation. No manual search required.",
  },
  {
    src: "/zerapy/flow-pack-manager-1.png",
    alt: "Zerapy Pack Manager",
    step: "Step 05: Pack Manager",
    title: "AI-Recommended Exercises",
    body: "Pack Manager opens as a sophisticated sidebar. Zerapy has already surfaced the exercises most suitable for this patient based on pathology and profile. Add any of them via drag and drop or the plus button.",
  },
  {
    src: "/zerapy/flow-pack-manager-2.png",
    alt: "Zerapy Pack Manager assigned",
    step: "Step 06: Assign Pack",
    title: "Send or Save as Draft",
    body: "Once the pack is built with the right exercises and scheduled dates, the doctor sends it directly to the patient or saves it as a draft. Maximum flexibility, full control over when and how treatment is administered.",
  },
  {
    src: "/zerapy/flow-hep.png",
    alt: "Zerapy Home Exercise Program",
    step: "Step 07: HEP",
    title: "Patient's Exercise Program",
    body: "The patient's personal Home Exercise Program opens immediately. The therapist sees score, pain level, streak, RTM panel, messages, and pack ratings. The intuitive calendar shows assigned pack counts per day.",
  },
  {
    src: "/zerapy/flow-exercise-card.png",
    alt: "Zerapy exercise analytics",
    step: "Step 08: Exercise Analytics",
    title: "Deep Exercise Insight",
    body: "Clicking the info icon on any exercise opens a detailed popup: score and pain trend graphs, range of motion data, Zera AI conclusions, and the patient's pain map with marked locations and personal notes.",
  },
];

const FlowCarousel = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };
  const prev = () => go((index - 1 + flowSlides.length) % flowSlides.length);
  const next = () => go((index + 1) % flowSlides.length);
  const slide = flowSlides[index];

  return (
    <div className="rounded-[24px] border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      {/* Image */}
      <div className="p-4 pb-0">
        <div className="relative overflow-hidden rounded-[8px]" style={{ paddingTop: "56.25%" }}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={index}
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: `${d * 100}%` }),
                center: { x: "0%" },
                exit: (d: number) => ({ x: `${d * -100}%` }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={slide?.src ?? ""}
                alt={slide?.alt ?? ""}
                fill
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1400px"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-3">
            <button
              type="button"
              onClick={prev}
              className="glass !rounded-full pointer-events-auto flex size-9 shrink-0 cursor-pointer items-center justify-center outline-none transition-all duration-300 hover:scale-105"
              aria-label="Previous"
            >
              <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M8 1L3 6.5L8 12" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              className="glass !rounded-full pointer-events-auto flex size-9 shrink-0 cursor-pointer items-center justify-center outline-none transition-all duration-300 hover:scale-105"
              aria-label="Next"
            >
              <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M5 1L10 6.5L5 12" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 pt-5 pb-1">
        {flowSlides.map((_, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            initial={false}
            animate={i === index ? { scale: 1.5, opacity: 1 } : { scale: 1, opacity: 0.3 }}
            transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
            style={{
              width: 8,
              height: 8,
              minWidth: 8,
              minHeight: 8,
              borderRadius: "50%",
              background: "white",
              border: "none",
              padding: 0,
              cursor: "pointer",
              outline: "none",
              display: "block",
              boxShadow: i === index ? "0 0 8px 2px rgba(255,255,255,0.5)" : "none",
            }}
          />
        ))}
      </div>

      {/* Text */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          className="flex flex-col gap-1.5 p-6 pt-4"
        >
          <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: accentColor }}>
            {slide?.step}
          </span>
          <h3 className="font-semibold text-base text-white md:text-lg">{slide?.title}</h3>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">{slide?.body}</p>
        </motion.div>
      </AnimatePresence>
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

type ZerapyContentProps = {
  nextProjectDrawerId?: string;
  onOpenNextProject?: (drawerId: string) => void;
};

export const ZerapyContent = ({
  nextProjectDrawerId,
  onOpenNextProject,
}: ZerapyContentProps) => (
  <>
    {/* Hero */}
    <div className="px-6 md:px-16">
      <div className="relative w-full overflow-hidden rounded-[24px] md:rounded-[66px] aspect-[16/9] bg-[#111]">
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
    </div>

    <div className="hidden xl:block sticky top-20 h-0 overflow-visible">
      <div className="absolute right-12 top-4">
        <QuickLinks links={[
          { label: "Overview", id: "overview" },
          { label: "Brand Identity", id: "brand-identity" },
          { label: "Mobile App", id: "mobile-app" },
          { label: "Web App", id: "web-app" },
          { label: "RTM", id: "rtm" },
          { label: "Website", id: "website" },
          { label: "Workers' Comp Video", id: "workers-comp" },
          { label: "By the Numbers", id: "by-the-numbers" },
          { label: "Live Product", id: "live-product" },
          { label: "What Came Next", id: "what-came-next" },
        ]} accentColor="#14B8A6" />
      </div>
    </div>

    <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-6 py-14 md:gap-16 md:px-16 md:py-20">

      {/* Overview */}
      <section id="overview" className="scroll-mt-20 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <SectionTitle>Overview</SectionTitle>
          <SectionIntro
            title="About Zerapy"
            body="Zerapy is an AI-powered clinical platform built specifically for physical therapy practices in the United States. It helps clinics manage patients remotely, automate the documentation that takes up half a therapist's day, and actually prove that therapy is working, with measurable outcomes that payors and patients can both see. The product was designed from the ground up around the workflows of real clinicians: the front desk staff overwhelmed by paperwork, the therapist squeezing notes between sessions, the clinic owner trying to figure out why RTM billing keeps falling through the cracks."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <StatCard value="RTM" label="Remote Therapeutic Monitoring built in" />
          <StatCard value="~$900" label="Per-patient RTM revenue per year" />
          <StatCard value="2–3×" label="More time clinicians reclaim from paperwork" />
          <StatCard value="US" label="Primary market: American PT clinics" />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base text-white md:text-lg">What We Solved</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard
              title="No Identity"
              body="Zerapy came to us with a working product and zero brand presence. The visual language was inconsistent, the color system was undefined, and the first impression it made didn't match the quality of what the software actually did. We built the identity from scratch."
              icon={<Palette className="size-5" />}
            />
            <InfoCard
              title="Paperwork Overload"
              body="Physical therapists were spending up to 40% of their time on documentation, session notes, home exercise program updates, outcome tracking, insurance forms. None of it was connected. Zerapy's platform brought it all into one place with AI-assisted generation at every step."
              icon={<ClipboardList className="size-5" />}
            />
            <InfoCard
              title="Lost RTM Revenue"
              body="Most clinics had no idea they were eligible to bill for Remote Therapeutic Monitoring, or if they did, they couldn't keep up with the compliance requirements manually. Zerapy built RTM directly into the product so billing happens automatically, not as an afterthought."
              icon={<Coins className="size-5" />}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base text-white md:text-lg">What I Did</h3>
          <div className="flex flex-col gap-3">
            <BulletRow
              label="Brand Identity"
              body="Built the entire visual system from scratch, logomark, color palette, typography, iconography, and a full brand book used across product, marketing, and clinical collateral."
            />
            <BulletRow
              label="Patient Mobile App"
              body="Designed the iOS and Android app end-to-end: home exercise program, daily check-ins, outcome tracking, and HIPAA-compliant messaging for patient ages ranging from teens to post-surgical seniors."
            />
            <BulletRow
              label="Clinician Web App"
              body="Designed the full clinic-facing dashboard: patient management, exercise assignment via Pack Manager, AI-assisted documentation, and RTM compliance tracking."
            />
            <BulletRow
              label="Design System"
              body="Established a shared token and component library spanning mobile and web so the product could scale consistently as new features shipped."
            />
          </div>
        </div>
      </section>

      {/* Brand Identity */}
      <section id="brand-identity" className="scroll-mt-20 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <SectionTitle>Brand Identity</SectionTitle>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            The brief was specific: look professional without feeling clinical. Healthcare brands have a tendency to default to sterile whites, cold blues, and stock photography of smiling doctors. Zerapy needed to feel trustworthy and credible, but warm enough that a patient would actually want to open the app, and modern enough that a clinic owner would be proud to show it to their staff.
          </p>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            The solution was teal on dark. A deep near-black background gives the brand weight and calm. The teal primary, drawn from the intersection of clinical green and tech blue, carries authority without aggression. Paired with a structured sans-serif wordmark and generous whitespace, the system reads as precise, modern, and human at the same time.
          </p>
        </div>

        <Photo src="/zerapy/brand-book.png" alt="Zerapy brand book spread" aspect="aspect-[16/9]" />

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base text-white md:text-lg">System Elements</h3>
          <div className="flex flex-col gap-3">
            <BulletRow
              label="Color"
              body="Teal (#14B8A6) as the primary action color against a near-black background (#0B1120). Secondary tones from the same hue family keep the palette cohesive across every context, from print collateral to the app's dark UI."
            />
            <BulletRow
              label="Typography"
              body="A geometric sans-serif for headings paired with a high-legibility text face for body copy. Both were chosen for readability at small sizes in clinical environments where screens are often viewed at a distance or in poor lighting."
            />
            <BulletRow
              label="Logomark"
              body="A custom mark that abstracts the idea of a therapeutic arc, motion, recovery, and measurement, into a single symbol that scales from app icon to large-format signage without losing clarity."
            />
            <BulletRow
              label="Iconography"
              body="A proprietary icon set that replaces generic medical clip-art with a consistent, purposeful visual language. Every icon in the product and marketing materials follows the same stroke weight, corner radius, and optical balance."
            />
          </div>
        </div>

      </section>

      {/* Mobile App */}
      <section id="mobile-app" className="scroll-mt-20 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <SectionTitle>Mobile App</SectionTitle>
          <SectionIntro
            title="Patient-Facing iOS & Android"
            body="The patient app is the front door to the entire Zerapy ecosystem. When a clinic onboards a patient, that patient receives an invitation to download the app, from there, everything their therapist assigns them lives in one place: their home exercise program, their scheduled check-ins, their outcome questionnaires, and their progress over time. The design challenge was making it genuinely usable for patients who range from 18-year-old athletes to 72-year-old post-surgical recovery cases."
          />
        </div>

        <Photo src="/zerapy/mobile-app-screens.png" alt="Zerapy mobile app screens" bgClassName="bg-transparent" />

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base text-white md:text-lg">Core Patient Flows</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              title="Home Exercise Program"
              body="Patients receive their full HEP with video demonstrations, rep/set targets, and difficulty progressions, all assigned directly by their therapist in the web app. Completion is tracked automatically and synced back to the clinic's dashboard in real time."
              icon={<Dumbbell className="size-5" />}
            />
            <InfoCard
              title="Daily Check-Ins"
              body="Brief push-prompted daily questionnaires, pain level, function, mood, that take under 30 seconds to complete. Each response contributes to the patient's outcome score and, critically, counts as an RTM-qualifying data collection day."
              icon={<CircleCheck className="size-5" />}
            />
            <InfoCard
              title="Outcome Tracking"
              body="Validated clinical scales (PSFS, NPRS, GROC, OPTIMAL, DASH, LEFS) presented in plain language so patients understand what they're measuring. Progress is visualized as a trend chart, giving patients a sense of momentum even on hard days."
              icon={<TrendingUp className="size-5" />}
            />
            <InfoCard
              title="Messaging"
              body="HIPAA-compliant asynchronous messaging between patient and therapist. No third-party apps, no missing context. Every message is logged, timestamped, and attached to the patient's record, which also counts toward RTM interactive communication requirements."
              icon={<MessageSquare className="size-5" />}
            />
          </div>
        </div>

        <Photo src="/zerapy/mobile-hep-progress.png" alt="Zerapy mobile HEP and progress screens" bgClassName="bg-transparent" />
      </section>

      {/* Web App */}
      <section id="web-app" className="scroll-mt-20 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <SectionTitle>Web App</SectionTitle>
          <SectionIntro
            title="Clinic-Facing Dashboard"
            body="The web application is where the clinical work happens. Therapists manage their entire caseload from a single screen: assign exercises, review patient responses, send messages, generate notes, and track RTM compliance, all without switching tools or copying data between systems."
          />
        </div>
        <FlowCarousel />
      </section>

      {/* RTM Section */}
      <section id="rtm" className="scroll-mt-20 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <SectionTitle>Remote Therapeutic Monitoring</SectionTitle>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            RTM is the single biggest untapped revenue opportunity in physical therapy right now, and most clinics are leaving it entirely on the table. When CMS introduced the RTM billing codes in 2022, they created a reimbursement pathway for therapists to get paid for the work they were already doing: checking in on patients between sessions, reviewing home exercise adherence, responding to messages. The problem is that claiming RTM requires strict documentation compliance, and doing that manually is worse than not doing it at all.
          </p>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            Zerapy was built around RTM from the beginning. Not as a feature bolted on later, as the underlying reason the product exists. Every interaction in the patient app that qualifies as an RTM data collection day is tracked automatically. Every therapist-patient message that counts as an interactive communication session is logged with a timestamp. The billing window, the day count, the threshold warnings, all of it is handled by the platform so the clinic's staff can stay focused on clinical care.
          </p>
        </div>

        <div className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
          <h3 className="mb-6 font-semibold text-base text-white md:text-lg">RTM Billing Codes</h3>
          <div className="flex flex-col gap-4">
            <RTMCodeRow
              code="98975"
              title="RTM Setup"
              description="Initial setup and patient education for remote therapeutic monitoring. Billed once per episode of care when the patient is enrolled in the monitoring program."
            />
            <RTMCodeRow
              code="98976"
              title="Respiratory System Monitoring"
              description="Monthly supply of a software device for monitoring therapeutic response in respiratory conditions. Requires 16+ days of data collection in a 30-day period."
            />
            <RTMCodeRow
              code="98977"
              title="Musculoskeletal System Monitoring"
              description="The primary RTM code for physical therapy. Monthly supply of a software device for musculoskeletal monitoring. Requires 16+ qualifying data collection days per month."
            />
            <RTMCodeRow
              code="98980"
              title="Treatment Management, First 20 Minutes"
              description="Therapist time spent reviewing RTM data and communicating with the patient. Requires at least one interactive communication session in the 30-day period. Billable monthly."
            />
            <RTMCodeRow
              code="98981"
              title="Treatment Management, Additional 20 Minutes"
              description="Additional therapy management time beyond the initial 20 minutes. Each unit requires documented review activity and communication. Stackable within the same billing period."
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base text-white md:text-lg">How Zerapy Automates RTM</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              title="Automatic Day Counting"
              body="Every time a patient logs a check-in, completes an HEP session, or records a symptom entry through the app, Zerapy marks that as a qualifying RTM data collection day. The counter is visible to both the therapist and the front desk in real time, no spreadsheet, no manual tally."
              icon={<CalendarDays className="size-5" />}
            />
            <InfoCard
              title="Compliance Alerts"
              body="If a patient is at 10 days with only 8 days left in their billing window, the system flags it automatically. The therapist gets a nudge to prompt the patient. The front desk sees a risk indicator on the patient's row. Nobody misses a billing period because they forgot to check."
              icon={<Bell className="size-5" />}
            />
            <InfoCard
              title="Interactive Communication Logging"
              body="Every message thread, every video check-in, every phone note logged through the system is tagged as an interactive communication event. The billing report at the end of the period pulls these automatically, with timestamps, duration, and the therapist's name already filled in."
              icon={<FolderOpen className="size-5" />}
            />
            <InfoCard
              title="One-Click Billing Reports"
              body="When the 30-day window closes, the clinic can generate a complete RTM billing report for every eligible patient in under 30 seconds. The report is pre-formatted for submission, with the correct CPT codes, patient IDs, qualifying day counts, and communication logs already compiled."
              icon={<FileText className="size-5" />}
            />
          </div>
        </div>

        <div className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
          <h3 className="mb-4 font-semibold text-base text-white md:text-lg">The Revenue Math</h3>
          <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            A clinic with 50 active RTM patients billing a conservative combination of 98977 + 98980 every 30 days is looking at roughly $45,000–$60,000 in additional annual revenue, with zero additional clinical hours. The documentation already existed. The patient interactions were already happening. Zerapy connects the dots so the clinic actually captures what they've already earned.
          </p>
          <p className="mt-3 text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
            The bigger shift is behavioral. Once a clinic sees their RTM dashboard working, day counts ticking up, alerts firing before windows close, billing reports generating themselves, they stop thinking of remote monitoring as a compliance burden and start treating it as a core service line. That changes how they onboard patients, how they structure their HEP assignments, and how they communicate between sessions. The platform makes better habits feel effortless.
          </p>
        </div>


      </section>

      {/* Website */}
      <section id="website" className="scroll-mt-20 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <SectionTitle>Website</SectionTitle>
          <SectionIntro
            title="Digital Storefront for the American Market"
            body="The Zerapy website had to do real work. Not just exist, convert. The target audience is a PT clinic owner or practice manager who has roughly 90 seconds before their next patient arrives. They landed on the site from a LinkedIn post or a Google search. They need to understand what Zerapy does, why it matters for their practice, and whether it's worth scheduling a demo. That decision happens above the fold."
          />
        </div>
        <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
          The homepage opens with the RTM angle front and center, not as a feature, but as a statement of lost revenue. The number is specific and uncomfortable in the right way. Below it, the product shows itself: actual interface screenshots, actual workflow steps, actual outcomes from early clinic partners. Social proof from clinicians, not investors. Pricing that's visible without a sales call.
        </p>
        <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
          The site is built on Next.js with a focus on Core Web Vitals, because slow healthcare sites lose trust before a visitor reads a single word. Accessibility was treated as a first-class requirement, not an afterthought. WCAG 2.1 AA compliance throughout, with contrast ratios that hold up even on older clinical monitors.
        </p>
        <Photo src="/zerapy/website-hero.png" alt="Zerapy website hero" bgClassName="bg-transparent" />
      </section>

      {/* Video */}
      <section id="workers-comp" className="scroll-mt-20 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <SectionTitle>Workers' Compensation Video</SectionTitle>
          <SectionIntro
            title="From Paperwork Chaos to One-Click Calm"
            body="The video brief was specific: Workers' Compensation. It's one of the most paperwork-intensive billing contexts in physical therapy, multiple payors, strict documentation requirements, case managers who want regular updates, attorneys who need functional outcome reports. Clinics that treat workers' comp patients are often drowning in forms."
          />
        </div>
        <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
          The spot opens in the chaos: a front desk overflowing with paper, a therapist typing at 11pm, a phone ringing with a case manager on the line. No voiceover. Just the ambient noise of a practice that's barely keeping up. Then one click. The interface appears. The forms are already filled. The outcome report generates itself. The phone stops ringing, because the case manager already has what they need.
        </p>
        <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
          Concept, storyboard, character design, animation, all built in-house. The visual style carries the Zerapy brand into motion: teal accents on dark backgrounds, clean transitions, moments of stillness that let the relief land. The video ran as a paid social spot targeting clinic owners and office managers in workers' comp-heavy markets across the US.
        </p>
        <div className="relative w-full overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#111]" style={{ paddingTop: "56.25%" }}>
          <iframe
            src="https://player.vimeo.com/video/1182275760?badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            title="Zerapy Workers Comp"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <InfoCard
            title="Concept"
            body="Before/after, the contrast between the administrative chaos of workers' comp billing and the calm that Zerapy creates. Emotional before intellectual. The viewer feels the problem before they understand the solution."
            icon={<Lightbulb className="size-5" />}
          />
          <InfoCard
            title="Production"
            body="Full in-house production: storyboard, character design, environment illustration, motion design, sound design, and final delivery in multiple aspect ratios for social, web, and presentation use. No external vendors."
            icon={<Clapperboard className="size-5" />}
          />
          <InfoCard
            title="Distribution"
            body="Paid social campaigns targeting LinkedIn and Meta, aimed at PT clinic owners and practice managers in workers' comp-heavy states: California, Texas, Florida, and New York. A/B tested against a more feature-forward variant."
            icon={<Globe className="size-5" />}
          />
        </div>
      </section>

      {/* Launch Metrics */}
      <section id="by-the-numbers" className="scroll-mt-20 flex flex-col gap-6">
        <SectionTitle>By the Numbers</SectionTitle>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { value: "60+", label: "Partner clinics onboarded" },
            { value: "1,800+", label: "Active patients on the platform" },
            { value: "$2.1M+", label: "RTM revenue tracked for clinics" },
            { value: "40%", label: "Reduction in documentation time" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col gap-1.5 rounded-[20px] border border-[#14B8A6]/20 bg-[#14B8A6]/[0.04] px-5 py-5"
            >
              <span className="font-bold font-header text-[clamp(24px,3vw,36px)] text-[#14B8A6] tracking-[-0.03em]">
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
            <span className="font-semibold text-white text-lg">Zerapy: AI Physical Therapy Platform</span>
            <span className="text-[14px] text-white/40">Live on iOS and Android for US-based PT clinics and their patients.</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://apps.apple.com/by/app/zerapy/id1600787059"
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
              href="https://play.google.com/store/apps/details?id=ai.zerapy.android.app"
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

      {/* Conclusion */}
      <section id="what-came-next" className="scroll-mt-20 flex flex-col gap-6">
        <SectionTitle>What Came Next</SectionTitle>
        <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
          The first project opened a door. The brand gave Zerapy something to stand behind. The product design gave clinicians something they actually wanted to use. The pitch deck helped them tell a story that investors and partners could follow. And the RTM system gave clinics a concrete reason to switch that paid for itself in the first billing cycle.
        </p>
        <p className="text-[14px] text-white/50 leading-[1.8] md:text-[15px]">
          The ongoing engagement moved from launch to growth: feature expansion, onboarding optimization, a referral program for clinic networks, and marketing assets for the enterprise sales motion. The relationship continues because the work continues to compound.
        </p>
        <div className="flex flex-col gap-3">
          <BulletRow
            label="Brand"
            body="A full visual identity that reads professional without feeling clinical. Teal on dark. Modern, trustworthy, and scalable across every context from mobile app to pitch deck to print collateral."
          />
          <BulletRow
            label="Product"
            body="A mobile app patients actually complete their HEP on, and a web dashboard therapists actually prefer over their EMR for daily patient management. Interfaces that doctors get without a manual and patients use without thinking."
          />
          <BulletRow
            label="RTM"
            body="An automated RTM compliance engine that tracks data collection days, flags at-risk billing windows, logs interactive communication sessions, and generates billing-ready reports, turning a missed revenue stream into a reliable income line."
          />
          <BulletRow
            label="Revenue Impact"
            body="Early clinic partners reported capturing RTM revenue within the first 30 days of using the platform, in most cases more than enough to cover the annual subscription cost before the first month ended."
          />
        </div>
      </section>

      {/* Next Project */}
      <section className="flex flex-col gap-6">
        <SectionTitle>Next Project</SectionTitle>
        <button
          type="button"
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
              <source src="/lookup.mp4" type="video/mp4" />
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
