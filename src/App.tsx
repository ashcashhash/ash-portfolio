/* eslint-disable prettier/prettier */
import { About } from "@/components/portfolio/About";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";
import { Cursor } from "@/components/portfolio/Cursor";
import { Education } from "@/components/portfolio/Education";
import { Experience } from "@/components/portfolio/Experience";
import { Hero } from "@/components/portfolio/Hero";
import { HUD } from "@/components/portfolio/HUD";
import { Marquee } from "@/components/portfolio/Marquee";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";

export function App() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Cursor />
      <HUD />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Projects />
      <Education />
      <Certifications />
      <Skills />
      <Contact />
    </main>
  );
}
