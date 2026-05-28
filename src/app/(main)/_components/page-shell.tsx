"use client";

import { useState } from "react";
import { About } from "./about";
import { Contact } from "./contact";
import { Hero } from "./hero";
import { Intro } from "./intro";
import { Navbar } from "./navbar";
import { Works } from "./works";

export const PageShell = () => {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Intro onCompleteAction={() => setReady(true)} />
      <main
        className="relative bg-transparent"
        style={{
          opacity: ready ? 1 : 0,
          transition: ready ? "opacity 0.4s ease" : "none",
          pointerEvents: ready ? "auto" : "none",
        }}
      >
        <div className="hidden">
          <Navbar />
        </div>
        <Hero />
        <Works />
        <About />
        <Contact />
      </main>
    </>
  );
};
