import type { ReactNode } from "react";
import { motion } from "motion/react";

export function Section({
  id, zone, title, subtitle, children,
}: {
  id: string;
  zone: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-7xl px-5 py-28 md:px-8 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-10 md:mb-14"
      >
        <span className="hud-chip"><span className="h-1.5 w-1.5 rounded-full bg-[color:var(--neon)] animate-pulse-glow" />Zone · {zone}</span>
        <h2 className="mt-4 text-4xl font-black md:text-6xl">
          <span className="gradient-text">{title}</span>
        </h2>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>
        )}
      </motion.div>
      {children}
    </section>
  );
}
