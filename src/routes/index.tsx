import { createFileRoute } from "@tanstack/react-router";
import { HUD } from "@/components/portfolio/HUD";
import { Cursor } from "@/components/portfolio/Cursor";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Education } from "@/components/portfolio/Education";
import { Certifications } from "@/components/portfolio/Certifications";
import { Skills } from "@/components/portfolio/Skills";
import { Contact } from "@/components/portfolio/Contact";
import { Marquee } from "@/components/portfolio/Marquee";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ashnish — Developer & Guitarist" },
      { name: "description", content: "Portfolio of Ashnish — a full-stack engineer and guitarist building calm, expressive software." },
      { property: "og:title", content: "Ashnish — Developer & Guitarist" },
      { property: "og:description", content: "A music-inspired developer portfolio with thoughtful motion and quiet polish." },
    ],
  }),
  component: Index,
});

function Index() {
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
