import { Disc3 } from "lucide-react";
import { motion } from "motion/react";
import { Section } from "./Section";

const QUESTS = [
  {
    year: "2025 — Now",
    role: "Consultant · ZS Associates",
    focus: "Designed Well Architected Solutions & AI Enabled Workflows",
    log: "Designed and shipped multiple web apps for Big Pharma clients. Leading the team of 50+ members",
    tags: ["Performance", "Leadership"],
  },
  {
    year: "2023 — 2025",
    role: "Associate Consultant · ZS Associates",
    focus: "Pharma Process Reimagined platform",
    log: "Built multiple web apps for Big Pharma clients. Led the frontend team, introduced React 18 + TypeScript, and shipped a design system with motion and accessibility baked in.",
    tags: ["Full-Stack", "Design systems", "Developer experience"],
  },
  {
    year: "2020 — 2022",
    role: "Associate · ZS Associates",
    focus: "Cross-product design system",
    log: "Owned the design system across 14 apps. TS-first components, motion guidelines, and accessibility built in from day one.",
    tags: ["Design systems", "Accessibility", "Frontend"],
  },
  {
    year: "2020",
    role: "Intern · ZS Associates",
    focus: "First production codebase",
    log: "Learned the craft on a small team shipping Angular + Flask apps for Capabilities showcase. Created my first pull request here.",
    tags: ["Angular", "Flask", "GitHub"],
  },
];

export function Experience() {
  return (
    <Section
      id="experience"
      zone="03 · Experience"
      title="My journey so far"
      subtitle="A timeline of the teams I've joined, the things I've shipped, and what I learned along the way."
    >
      <div className="relative">
        <div
          className="absolute left-4 top-0 h-full w-px md:left-1/2"
          style={{
            background:
              "linear-gradient(180deg, transparent, var(--neon), var(--neon-2), transparent)",
          }}
        />
        <ul className="space-y-12">
          {QUESTS.map((q, i) => (
            <motion.li
              key={q.role}
              initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative flex flex-col gap-4 md:grid md:grid-cols-2 md:items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}
            >
              <div className={`pl-12 md:pl-0 ${i % 2 ? "md:pr-12 md:text-right" : "md:pr-12"}`}>
                <div className="panel relative overflow-hidden p-6 [direction:ltr]">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {q.year}
                  </div>
                  <h3 className="mt-1 text-2xl">{q.role}</h3>
                  <div className="mt-1 text-sm text-magenta">{q.focus}</div>
                  <p className="mt-3 text-sm text-foreground/80">{q.log}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {q.tags.map((r) => (
                      <span key={r} className="hud-chip !text-[10px]">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute left-4 top-6 md:left-1/2 md:-translate-x-1/2">
                <div className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--neon)] bg-background animate-pulse-glow">
                  <Disc3 className="h-4 w-4 text-neon" />
                </div>
              </div>
              <div className="hidden md:block" />
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
