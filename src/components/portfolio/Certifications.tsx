import { motion } from "motion/react";
import { Section } from "./Section";
import { Award } from "lucide-react";

const CERTS = [
  { name: "AWS Solutions Architect", org: "Amazon", year: "2024" },
  { name: "Google Cloud Pro Dev", org: "Google", year: "2023" },
  { name: "Frontend Masters · Advanced React", org: "FEM", year: "2023" },
  { name: "Web Audio Engineering", org: "Coursera", year: "2022" },
];

export function Certifications() {
  return (
    <Section
      id="certs"
      zone="06 · Certifications"
      title="Certifications"
      subtitle="A handful of programs that sharpened how I work."
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {CERTS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -6, rotate: -1 }}
            className="panel group relative overflow-hidden p-5"
          >
            <div className="pointer-events-none absolute -inset-x-10 -top-10 h-24 rotate-12 opacity-0 transition group-hover:opacity-100"
              style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--neon) 40%, transparent), transparent)" }} />
            <Award className="h-6 w-6 text-magenta" />
            <h4 className="mt-3 text-sm font-semibold leading-snug">{c.name}</h4>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.org} · {c.year}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
