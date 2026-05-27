"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/helpers";

const links = [{ label: "Works", href: "/" }] as const;

export const Navbar = () => {
  const pathname = usePathname();

  const pillRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [specular, setSpecular] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeIndex = links.findIndex(({ href }) => href === pathname);
    const activeLink = linkRefs.current[activeIndex];
    const pill = pillRef.current;
    if (!activeLink || !pill) return;

    const pillRect = pill.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    setSpecular({
      left: linkRect.left - pillRect.left + linkRect.width / 2,
      width: linkRect.width * 0.55,
    });
  }, [pathname]);

  return (
    <nav className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <div
        ref={pillRef}
        className="relative flex items-center gap-1 rounded-full px-1.5 py-0.5"
        style={{
          background: "rgba(30, 30, 32, 0.72)",
          backdropFilter: "blur(40px) saturate(2)",
          WebkitBackdropFilter: "blur(40px) saturate(2)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.4), 0 1.5px 0 rgba(255,255,255,0.07) inset",
        }}
      >
        {specular.width > 0 && (
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-px transition-all duration-300"
            style={{
              left: specular.left,
              width: specular.width,
              transform: "translateX(-50%)",
              height: "2px",
              borderRadius: "4px 4px 0 0",
              background: "white",
              boxShadow: "0 0 8px 2px rgba(255,255,255,0.6)",
            }}
          />
        )}

        {links.map(({ label, href }, index) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              ref={(element) => {
                linkRefs.current[index] = element;
              }}
              className={cn(
                "relative select-none rounded-full px-6 py-1 font-medium text-lg tracking-tight transition-colors duration-200",
                active ? "text-white" : "text-white/40 hover:text-white/70",
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
