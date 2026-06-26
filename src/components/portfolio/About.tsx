import { BrainCircuit, Guitar, Layers3 } from "lucide-react";
import { motion } from "motion/react";
import { Section } from "./Section";

const PILLARS = [
  {
    icon: Layers3,
    title: "Build",
    subtitle: "Engineering & Architecture",
    desc: "I design and develop scalable enterprise applications using modern web technologies, cloud platforms, and clean architecture. My focus is on building software that's reliable, maintainable, and built to scale.",
  },
  {
    icon: BrainCircuit,
    title: "Innovate",
    subtitle: "AI & Emerging Technologies",
    desc: "I enjoy exploring how AI can transform products and workflows—from intelligent assistants and automation to enhancing user experiences with practical, real-world solutions.",
  },
  {
    icon: Guitar,
    title: "Create",
    subtitle: "Music & Creativity",
    desc: "Outside engineering, I'm a guitarist and vocalist who performs live. Music has taught me creativity, collaboration, and discipline—qualities I bring into every product I build.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      zone="02 · About"
      title="What Drives Me"
      subtitle="Technology, innovation, and creativity shape how I approach every challenge. These three pillars define who I am as an engineer."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.12,
              duration: 0.6,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="panel group relative overflow-hidden p-7"
          >
            {/* Glow */}
            <div
              className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
              style={{
                background: i % 2 === 0 ? "var(--neon)" : "var(--neon-2)",
              }}
            />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[var(--neon)]/20 bg-[var(--neon)]/10">
                <pillar.icon className="h-7 w-7 text-neon" />
              </div>

              <div className="mt-6">
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-neon">
                  0{i + 1}
                </div>

                <h3 className="mt-2 text-2xl font-semibold">{pillar.title}</h3>

                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {pillar.subtitle}
                </p>

                <p className="mt-5 leading-7 text-muted-foreground">{pillar.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="panel mt-10 p-8 text-center"
      >
        <p className="mx-auto max-w-3xl text-lg leading-8 text-muted-foreground">
          <span className="gradient-text font-semibold">
            "Great software isn't just about writing code—
          </span>{" "}
          it's about solving meaningful problems, continuously learning, and creating experiences
          that people genuinely enjoy using."
        </p>
      </motion.div>
    </Section>
  );
}
