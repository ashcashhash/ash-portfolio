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
import { WallOfFame } from "@/components/portfolio/WallOfFame";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ashnish Sharma" },
      {
        name: "description",
        content:
          "Portfolio of Ashnish — a full-stack engineer and guitarist building calm, expressive software.",
      },
      { property: "og:title", content: "Ashnish Sharma" },
      {
        property: "og:description",
        content: "A music-inspired developer portfolio with thoughtful motion and quiet polish.",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/logo.png",
      },
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
      <WallOfFame />
    </main>
  );
}
