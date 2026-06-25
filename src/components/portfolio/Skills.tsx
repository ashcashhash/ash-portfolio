import { motion } from "motion/react";
import { Section } from "./Section";

const SKILLS: { name: string; level: number; cat: string }[] = [
  { name: "TypeScript", level: 96, cat: "Core" },
  { name: "React / Next", level: 95, cat: "Core" },
  { name: "Node / Edge", level: 90, cat: "Core" },
  { name: "Three.js / WebGL", level: 82, cat: "Visual" },
  { name: "Motion / GSAP", level: 88, cat: "Visual" },
  { name: "Web Audio / WASM", level: 84, cat: "Audio" },
  { name: "PostgreSQL", level: 86, cat: "Data" },
  { name: "Design Systems", level: 92, cat: "Craft" },
];

export function Skills() {
  return (
    <Section
      id="skills"
      zone="07 · Skills"
      title="Tools I reach for"
      subtitle="The instruments I play in my day-to-day work."
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* equalizer */}
        <div className="panel relative overflow-hidden p-6">
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="text-xl">Studio equalizer</h3>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Now playing</span>
          </div>
          <div className="flex h-48 items-end justify-between gap-1.5">
            {Array.from({ length: 28 }).map((_, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-sm"
                style={{ background: i % 3 === 0 ? "var(--neon-2)" : "var(--neon)" }}
                animate={{ height: [`${15 + (i % 7) * 8}%`, `${40 + ((i * 13) % 55)}%`, `${20 + (i % 9) * 7}%`] }}
                transition={{ duration: 0.9 + (i % 5) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }}
              />
            ))}
          </div>
          <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Track 01 — &quot;Quiet Mornings, Loud Ideas&quot;
          </div>
        </div>

        {/* skill bars */}
        <div className="panel p-6">
          <ul className="space-y-4">
            {SKILLS.map((s, i) => (
              <li key={s.name}>
                <div className="flex justify-between text-sm">
                  <span><span className="text-foreground">{s.name}</span> <span className="ml-2 font-mono text-[10px] uppercase text-muted-foreground">{s.cat}</span></span>
                  <span className="font-mono text-[10px] text-neon">{s.level}</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-background/60">
                  <motion.div
                    initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: i * 0.06, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, var(--neon), var(--neon-2))" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
