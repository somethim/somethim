import { cookies } from "next/headers";
import { About } from "./_components/about";
import { Contact } from "./_components/contact";
import { Hero } from "./_components/hero";
import { Intro } from "./_components/intro";
import { Navbar } from "./_components/navbar";
import { Works } from "./_components/works";

export default async () => {
  const introSeen = !!(await cookies()).get("intro_seen");

  return (
    <>
      {!introSeen && <Intro />}
      <main className="relative bg-transparent">
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
