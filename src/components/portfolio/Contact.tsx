import { Github, Linkedin, Mail, Music2 } from "lucide-react";
import { motion } from "motion/react";
import { Section } from "./Section";

const LINKS = [
  { icon: Mail, label: "hello@ashcashhash.com", href: "mailto:hello@ashcashhash.com" },
  { icon: Github, label: "GitHub", href: "https://github.com/ashcashhash" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ashnish-kumar-sharma-b920291b2/",
  },
  {
    icon: Music2,
    label: "Soundcloud",
    href: "https://soundcloud.com/ashnish-k-sharma",
  },
];

export function Contact() {
  return (
    <Section
      id="contact"
      zone="08 · Contact"
      title="Let's talk"
      subtitle="Always open to thoughtful product work, collaboration, or just trading playlists."
    >
      <div className="panel relative overflow-hidden p-8 md:p-12">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "color-mix(in oklab, var(--neon-2) 28%, transparent)" }}
        />
        <div
          className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "color-mix(in oklab, var(--neon) 28%, transparent)" }}
        />

        <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-3xl md:text-5xl">
              Have something <span className="gradient-text">in mind?</span>
            </h3>
            <p className="mt-3 max-w-md text-muted-foreground">
              Open to discussion, collaboration, mentoring, advisory work, small creative builds or
              just a friendly chat or a jamming session. I usually reply within a day.
            </p>
            <a
              href="mailto:hello@ashcashhash.com"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[color:var(--neon)] bg-[color:color-mix(in_oklab,var(--neon)_15%,transparent)] px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-neon glow-ring transition hover:bg-[color:color-mix(in_oklab,var(--neon)_25%,transparent)]"
            >
              <Mail className="h-4 w-4" /> Send a note
            </a>
          </div>

          <ul className="space-y-2">
            {LINKS.map((l, i) => (
              <motion.li
                key={l.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-4 py-3 transition hover:border-[color:var(--neon)]"
                >
                  <span className="flex items-center gap-3">
                    <l.icon className="h-4 w-4 text-neon" />
                    <span className="font-mono text-sm">{l.label}</span>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-neon">
                    Open →
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
