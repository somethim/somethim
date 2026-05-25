"use client";

import Lenis from "lenis";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";

export const SmoothScroll = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    if (window.innerWidth < 768) return; // native scroll on mobile
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    });

    const tick = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    // ── Snap to section titles ────────────────────────────────────────────
    let snapTimer: ReturnType<typeof setTimeout>;

    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      clearTimeout(snapTimer);
      if (Math.abs(velocity) > 0.3) return;

      snapTimer = setTimeout(() => {
        const targets = [
          ...document.querySelectorAll<HTMLElement>("[data-snap]"),
        ].map((el) => el.offsetTop);

        const scroll = lenis.scroll;

        for (const target of targets) {
          const dist = target - scroll;
          // Snap if we're within 0–350px before the target (just past the dead zone)
          if (dist > -60 && dist < 350) {
            if (Math.abs(dist) > 8) lenis.scrollTo(target, { duration: 1.4 });
            break;
          }
        }
      }, 120);
    });

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
};
