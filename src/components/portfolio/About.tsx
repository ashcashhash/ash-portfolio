import { motion } from "motion/react";
import { Section } from "./Section";
import { Cpu, Headphones, Rocket } from "lucide-react";

const TRAITS = [
  { icon: Cpu, label: "Systems Thinker", desc: "I design for scale — clean architecture, typed APIs, predictable state." },
  { icon: Headphones, label: "Rhythm Driven", desc: "Years on stage taught me timing. I ship in tight, productive loops." },
  { icon: Rocket, label: "Product Minded", desc: "I sweat the pixels. Animations, micro-interactions, performance." },
];

export function About() {
  return (
    <Section
      id="about"
      zone="02 · About"
      title="About me"
      subtitle="Half engineer, half guitarist. I build interfaces that feel like instruments — responsive, expressive, and quietly precise."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {TRAITS.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="panel group relative overflow-hidden p-6"
          >
            <div
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl opacity-0 transition group-hover:opacity-60"
              style={{ background: i % 2 ? "var(--neon-2)" : "var(--neon)" }}
            />
            <t.icon className="h-7 w-7 text-neon" />
            <h3 className="mt-4 text-xl">{t.label}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
            <div className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              0{i + 1} · Trait
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
