import Link from "next/link";

const PhotoPlaceholder = ({
  aspect = "aspect-[16/9]",
}: {
  aspect?: string;
}) => (
  <div
    className={`w-full ${aspect} rounded-2xl border border-white/[0.07] bg-[#111] flex items-center justify-center`}
  >
    <span className="font-bold font-header text-xl tracking-widest text-white/20">
      PHOTO
    </span>
  </div>
);

export const FastTrackTyresPage = () => (
  <main className="min-h-screen overflow-x-hidden">
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_0%_0%,_#FF1901_0%,_transparent_60%)]" />
      <div className="relative z-10 px-6 pb-0 pt-20 md:px-16 md:pt-28">
        <h1 className="mb-10 font-bold font-header text-[clamp(40px,9vw,96px)] leading-[0.88] tracking-[-0.03em] text-white md:mb-14">
          Fast Track Tyres
        </h1>
        <PhotoPlaceholder aspect="aspect-[16/9]" />
      </div>
    </section>

    <div className="mx-auto flex w-2/3 flex-col gap-14 py-14 md:gap-16 md:py-20">
      <section className="flex flex-col gap-3">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] tracking-[-0.025em] text-white">
          Overview
        </h2>
        <h3 className="font-semibold text-base text-white md:text-lg">
          About Fast Track Tyres
        </h3>
        <p className="text-[14px] leading-[1.8] text-white/50 md:text-[15px]">
          Fast Track Tyres is a high-performance tire service brand built on
          speed, precision, and automotive excellence. The identity features a
          dynamic circular motion symbol with speed lines, creating an
          aggressive, race-inspired visual system that communicates urgency and
          technical expertise.
        </p>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] tracking-[-0.025em] text-white">
          Branding
        </h2>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white md:text-lg">
            Logo Design
          </h3>
          <p className="text-[14px] leading-[1.8] text-white/50 md:text-[15px]">
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

        <PhotoPlaceholder />

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

        <PhotoPlaceholder />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] tracking-[-0.025em] text-white">
          Typography
        </h2>
        <PhotoPlaceholder />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] tracking-[-0.025em] text-white">
          Brand Applications
        </h2>
        <div className="flex flex-col gap-4">
          <PhotoPlaceholder />
          <PhotoPlaceholder />
          <PhotoPlaceholder />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-bold font-header text-[clamp(26px,4.5vw,42px)] tracking-[-0.025em] text-white">
          Next Project
        </h2>
        <Link href="/" className="group block w-full">
          <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-white/[0.07] bg-[#111] transition-colors duration-300 group-hover:border-white/20">
            <span className="text-center font-bold font-header text-xl leading-relaxed tracking-widest text-white/20">
              THUMBNAIL
              <br />
              OF THE OTHER
              <br />
              PROJECT
            </span>
          </div>
        </Link>
      </section>
    </div>

    <footer className="border-t border-white/[0.07] px-6 py-6 text-center md:px-16">
      <p className="text-[13px] text-white/30">
        © 2026 Mario Vukzaj. All Rights Reserved.
      </p>
    </footer>
  </main>
);
