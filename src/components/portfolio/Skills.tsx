import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Section } from "./Section";

const SKILL_GROUPS = [
  {
    title: "Frontend",
    exp: "5+ Years",
    skills: [
      "React",
      "Angular",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Backend",
    exp: "4+ Years",
    skills: ["Node.js", "Express", "REST APIs", "Python", "Flask", "Java"],
  },
  {
    title: "AI & Automation",
    exp: "2+ Years",
    skills: [
      "OpenAI APIs",
      "Prompt Engineering",
      "AI Workflows",
      "LLM Integration",
      "AI Assistants",
    ],
  },
  {
    title: "Cloud & Data",
    exp: "4+ Years",
    skills: ["AWS", "Snowflake", "PostgreSQL", "SQL", "MongoDB"],
  },
  {
    title: "Engineering",
    exp: "5+ Years",
    skills: [
      "System Design",
      "Solution Architecture",
      "CI/CD",
      "Git",
      "Docker",
      "Postman",
      "Jira",
      "Agile",
      "Code Reviews",
      "Mentoring",
    ],
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const inView = useInView(sectionRef, {
    amount: 0.55,
  });

  return (
    <div ref={sectionRef}>
      <Section
        id="skills"
        zone="07 · Engineering"
        title="Engineering Toolkit"
        subtitle="Technologies and practices I use to build scalable enterprise software and AI-powered products."
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left Panel */}
          <div className="panel relative overflow-hidden p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl">Engineering Pulse</h3>

              <span className="font-mono text-[10px] uppercase tracking-widest text-neon">
                LIVE
              </span>
            </div>

            <div className="flex h-56 items-end justify-between gap-1.5">
              {Array.from({ length: 32 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    background: i % 3 === 0 ? "var(--neon-2)" : "var(--neon)",
                  }}
                  animate={{
                    height: [
                      `${15 + (i % 7) * 8}%`,
                      `${35 + ((i * 17) % 55)}%`,
                      `${20 + (i % 9) * 7}%`,
                    ],
                  }}
                  transition={{
                    duration: 1 + (i % 5) * 0.15,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: i * 0.03,
                  }}
                />
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-neon">
                Current Focus
              </div>

              <p className="text-sm leading-7 text-muted-foreground">
                Building enterprise-scale web applications, architecting cloud solutions, and
                integrating AI to deliver faster, smarter user experiences.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["React", "Angular", "Node.js", "Snowflake", "AWS", "OpenAI"].map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{
                      scale: 1.08,
                    }}
                    className="rounded-full border border-[var(--neon)]/30 px-3 py-1 text-xs transition-colors hover:border-[var(--neon)] hover:bg-[var(--neon)]/10"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="panel p-6">
            <h3 className="mb-6 text-xl">Technology Stack</h3>

            <div className="space-y-6">
              {SKILL_GROUPS.map((group, i) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.08,
                  }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="font-semibold">{group.title}</h4>

                    <span className="font-mono text-[11px] uppercase tracking-wider text-neon">
                      {group.exp}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{
                          y: -2,
                          scale: 1.04,
                        }}
                        transition={{
                          duration: 0.15,
                        }}
                        className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs transition-colors hover:border-[var(--neon)] hover:bg-[var(--neon)]/10 hover:text-foreground"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
