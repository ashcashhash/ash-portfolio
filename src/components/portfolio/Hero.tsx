import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, Code2, Music2, Sparkles } from "lucide-react";
import { GuitarScene } from "./GuitarScene";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 50%, var(--background) 90%)",
      }} />

      {/* floating glow orbs */}
      <motion.div
        className="absolute -left-32 top-1/3 h-80 w-80 rounded-full blur-3xl opacity-60"
        style={{ background: "color-mix(in oklab, var(--neon) 35%, transparent)" }}
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full blur-3xl opacity-60"
        style={{ background: "color-mix(in oklab, var(--neon-2) 30%, transparent)" }}
        animate={{ y: [0, -28, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 py-32 md:grid-cols-2 md:px-8"
      >
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="hud-chip"
          >
            <Sparkles className="h-3 w-3" /> Developer · Guitarist
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mt-5 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
          >
            <span className="block">Hi, I&apos;m</span>
            <span className="gradient-text block">Ashnish.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl"
          >
            A full-stack engineer who builds calm, expressive interfaces — and a
            <span className="text-neon"> guitarist</span> who treats every product like a
            <span className="text-magenta"> well-tuned instrument</span>. Take a walk through my work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#projects" className="group relative inline-flex items-center gap-2 rounded-lg border border-[color:var(--neon)] bg-[color:color-mix(in_oklab,var(--neon)_15%,transparent)] px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-neon glow-ring transition hover:bg-[color:color-mix(in_oklab,var(--neon)_25%,transparent)]">
              <Code2 className="h-4 w-4" /> See my work
            </a>
            <a href="#about" className="inline-flex items-center gap-2 rounded-lg border border-border/60 px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-foreground/80 hover:border-[color:var(--neon-2)] hover:text-magenta">
              <Music2 className="h-4 w-4" /> About me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 grid max-w-md grid-cols-3 gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
          >
            <Stat k="Experience" v="8+ years" />
            <Stat k="Projects" v="40+ shipped" />
            <Stat k="Based in" v="Remote · IN" />
          </motion.div>
        </div>

        <div className="relative aspect-square w-full max-w-[560px] justify-self-center">
          <GuitarScene />
        </div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-muted-foreground"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="h-4 w-4 text-neon" />
        </motion.div>
      </motion.a>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="panel px-3 py-2">
      <div className="text-[9px] text-muted-foreground">{k}</div>
      <div className="text-neon">{v}</div>
    </div>
  );
}
