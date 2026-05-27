import { About } from "./_components/about";
import { Contact } from "./_components/contact";
import { Hero } from "./_components/hero";
import { Intro } from "./_components/intro";
import { Navbar } from "./_components/navbar";
import { Works } from "./_components/works";

export default () => {
  return (
    <>
      <Intro />
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
