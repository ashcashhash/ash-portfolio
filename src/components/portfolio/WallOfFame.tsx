/* eslint-disable prettier/prettier */
import { motion } from "motion/react";
import { Section } from "./Section";

const CONTRIBUTORS = [
  {
    name: "Shreyshy",
    role: "Ideas",
    initials: "SS",
    badge: "Core",
    glow: "linear-gradient(135deg, #8b5cf6 0%, #22d3ee 100%)",
  },
  // {
  //   name: "Jules Hart",
  //   role: "Motion design",
  //   initials: "JH",
  //   badge: "Visual",
  //   glow: "linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)",
  // },
  // {
  //   name: "Ari Sol",
  //   role: "Audio ideas",
  //   initials: "AS",
  //   badge: "Sound",
  //   glow: "linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)",
  // },
];

export function WallOfFame() {
  return (
    <Section
      id="wall-of-fame"
      zone="09 · Wall of Fame"
      title="Wall of Fame"
      subtitle="A little spotlight for the people shaping this project with ideas, energy, and good taste."
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="panel relative w-full overflow-hidden px-4 py-5 sm:px-6 sm:py-6 md:p-8"
        >
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div
            className="absolute -left-10 top-10 h-40 w-40 rounded-full blur-3xl"
            style={{ background: "color-mix(in oklab, var(--neon) 22%, transparent)" }}
          />
          <div
            className="absolute -bottom-10 right-0 h-44 w-44 rounded-full blur-3xl"
            style={{ background: "color-mix(in oklab, var(--neon-2) 24%, transparent)" }}
          />

          <div className="relative flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neon">
                Contribute
              </p>
              <h3 className="mt-2 text-xl sm:text-2xl md:text-3xl">
                Want to help shape this space?
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
                This project is a living sketchbook. If you’ve got a sharp idea, a better
                interaction, or a fresh perspective, this is the place to leave your mark.
              </p>
            </div>

            <a
              href="https://github.com/ashcashhash/ash-portfolio/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-full border border-border/60 bg-background/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition hover:border-[color:var(--neon)] hover:text-neon"
            >
              Open guide <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="relative mt-6 grid gap-3 md:grid-cols-3">
            {[
              {
                title: "Bring an idea",
                copy: "Share a motion, layout, or concept that makes the site feel more alive.",
              },
              {
                title: "Fix something small",
                copy: "Polish a detail, improve copy, or make the experience smoother.",
              },
              {
                title: "Leave a mark",
                copy: "Open a PR and become part of the evolving story behind this portfolio.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.14 + index * 0.06 }}
                className="rounded-2xl border border-border/50 bg-background/60 p-4 backdrop-blur"
              >
                <span className="font-mono text-[20px] uppercase tracking-[0.24em] text-neon">
                  {index + 1}
                </span>
                <h4 className="mt-2 text-sm font-semibold text-foreground">{item.title}</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.copy}</p>
              </motion.div>
            ))}
          </div>

          <h3 className="mt-6 text-xl sm:text-2xl md:text-3xl">Featured Contributors</h3>
          <div className="relative mt-2 flex flex-wrap gap-3 sm:mt-8">
            {CONTRIBUTORS.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.16 + index * 0.06 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex items-center gap-3 rounded-full border border-border/60 bg-background/70 px-3 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur"
              >
                <div
                  className="relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white shadow-lg"
                  style={{ backgroundImage: person.glow }}
                >
                  <span>{person.initials}</span>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-background bg-neon text-[8px] text-black">
                    ✦
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{person.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {person.role}
                  </p>
                </div>
                <span className="rounded-full border border-neon/30 bg-neon/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-neon">
                  {person.badge}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <footer className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:flex-row">
        <span>© {new Date().getFullYear()} ashcashhash.com · Built with care &amp; React</span>
        <span>Made with music on & Diet Coke</span>
      </footer>
    </Section>
  );
}
