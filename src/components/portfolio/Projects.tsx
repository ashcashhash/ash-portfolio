import { ExternalLink, Github } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { Section } from "./Section";

type Project = {
  title: string;
  tagline: string;
  kind: string;
  color: string;
  tags: string[];
  metrics: Record<string, string>;
  link?: string;
  repo?: string;
};

const PROJECTS: Project[] = [
  {
    title: "AI Copilot for Evidence Planning",
    tagline:
      "Embedded AI assistant that streamlines evidence planning through conversational workflows and intelligent recommendations.",
    kind: "AI · Enterprise",
    color: "var(--neon)",
    tags: ["Angular", "TypeScript", "OpenAI"],
    metrics: {
      Domain: "Pharma",
      AI: "Generative",
      UX: "Conversational",
    },
  },
  {
    title: "Evidence Planning Platform",
    tagline:
      "Enterprise platform for planning, managing, and tracking evidence generation strategies.",
    kind: "Enterprise Platform",
    color: "var(--neon-2)",
    tags: ["React", "Node.js", "Snowflake"],
    metrics: {
      Domain: "Pharma",
      Scale: "Enterprise",
      APIs: "REST",
    },
  },
  {
    title: "Clinical Trial Study Optimizer",
    tagline: "Decision-support platform that helps optimize clinical trial planning and execution.",
    kind: "Healthcare Analytics",
    color: "var(--neon-3)",
    tags: ["React", "Node.js", "Analytics"],
    metrics: {
      Domain: "Clinical Trials",
      Focus: "Optimization",
      Users: "Global Teams",
    },
  },
  {
    title: "Pricing & What-If Simulator",
    tagline:
      "Scenario modeling platform for commercial planning, pricing strategies, and business forecasting.",
    kind: "Enterprise Analytics",
    color: "var(--neon)",
    tags: ["React", "Node.js", "Simulation"],
    metrics: {
      Scenarios: "Dynamic",
      Insights: "Real-time",
      Domain: "Commercial",
    },
  },
  {
    title: "My Portfolio",
    tagline:
      "A premium developer portfolio showcasing interactive UI, animations, and modern web engineering.",
    kind: "Personal Project",
    color: "var(--neon-2)",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    metrics: {
      Stack: "Next.js",
      Theme: "Interactive",
      Status: "Live",
    },
    link: "https://ashcashhash.com",
  },
  {
    title: "Chai Spot",
    tagline: "Discover and review nearby chai stalls with maps, ratings, and local insights.",
    kind: "Side Project",
    color: "var(--neon-3)",
    tags: ["React", "Node.js", "Google Maps"],
    metrics: {
      Status: "In Progress",
      Platform: "Web",
      Goal: "MVP",
    },
    repo: "https://github.com/ashcashhash/chai-locator",
  },
];

export function Projects() {
  return (
    <Section
      id="projects"
      zone="04 · Work"
      title="Selected projects"
      subtitle="A few things I've built recently. Hover any card for a closer look."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PROJECTS.map((p, i) => (
          <Card key={p.title} index={i} {...p} />
        ))}
      </div>
    </Section>
  );
}

function Card({
  title,
  tagline,
  kind,
  color,
  tags,
  metrics,
  index,
  link,
  repo,
}: {
  title: string;
  tagline: string;
  kind: string;
  color: string;
  tags: string[];
  metrics: Record<string, string>;
  index: number;
  link?: string;
  repo?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55 }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="panel relative h-full overflow-hidden p-5"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(400px circle at 50% 0%, ${color}, transparent 50%)`,
          }}
        />
        <div className="flex items-start justify-between" style={{ transform: "translateZ(30px)" }}>
          <span
            className="rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest"
            style={{
              color,
              border: `1px solid ${color}`,
              background: `color-mix(in oklab, ${color} 12%, transparent)`,
            }}
          >
            {kind}
          </span>
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: color, boxShadow: `0 0 10px ${color}` }}
          />
        </div>

        <h3 className="mt-6 text-2xl" style={{ transform: "translateZ(30px)" }}>
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground" style={{ transform: "translateZ(20px)" }}>
          {tagline}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2" style={{ transform: "translateZ(20px)" }}>
          {Object.entries(metrics).map(([k, v]) => (
            <div
              key={k}
              className="rounded-md border border-border/50 bg-background/30 px-2 py-1.5"
            >
              <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                {k}
              </div>
              <div
                className="mt-0.5 text-xs"
                style={{
                  width: "100%",
                  display: "block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color,
                }}
                title={v}
              >
                {v}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5" style={{ transform: "translateZ(15px)" }}>
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border/60 bg-background/30 px-2 py-0.5 font-mono text-[10px] uppercase text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-2" style={{ transform: "translateZ(25px)" }}>
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer">
              <IconBtn label="Live">
                <ExternalLink className="h-3.5 w-3.5" />
              </IconBtn>
            </a>
          )}

          {repo && (
            <a href={repo} target="_blank" rel="noopener noreferrer">
              <IconBtn label="Code">
                <Github className="h-3.5 w-3.5" />
              </IconBtn>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function IconBtn({ children, label }: { children: ReactNode; label: string }) {
  return (
    <button className="group inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition hover:border-[color:var(--neon)] hover:text-neon">
      {children}
      {label}
    </button>
  );
}
