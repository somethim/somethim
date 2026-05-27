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

    // ── Snap to section boundaries ───────────────────────────────────────
    let snapTimer: ReturnType<typeof setTimeout>;

    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      clearTimeout(snapTimer);
      if (Math.abs(velocity) > 0.5) return;

      snapTimer = setTimeout(() => {
        const targets = [
          ...document.querySelectorAll<HTMLElement>("[data-snap]"),
        ].map((el) => el.offsetTop);

        const scroll = lenis.scroll;
        const threshold = window.innerHeight * 0.35;

        let nearest = -1;
        let minDist = Infinity;
        for (const target of targets) {
          const dist = Math.abs(target - scroll);
          if (dist < minDist) {
            minDist = dist;
            nearest = target;
          }
        }

        if (nearest >= 0 && minDist < threshold && minDist > 8) {
          lenis.scrollTo(nearest, { duration: 1.2 });
        }
      }, 150);
    });

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
};
