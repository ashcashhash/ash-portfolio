import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { AudioLines, Menu, X } from "lucide-react";

const ZONES = [
  { id: "about", label: "About" },
  { id: "experience", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function HUD() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["hero", ...ZONES.map((z) => z.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left"
        style={{
          scaleX: progress,
          background: "linear-gradient(90deg, var(--neon-2), var(--neon-3))",
        }}
      />
      <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
        <nav className="panel flex w-full max-w-3xl items-center justify-between gap-4 py-2.5 pl-4 pr-2">
          <a href="#hero" className="flex items-center gap-2 font-display text-base font-medium tracking-tight text-foreground">
            <AudioLines className="h-4 w-4 text-[color:var(--neon)]" />
            <span>Ashnish</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {ZONES.map((z) => (
              <a
                key={z.id}
                href={`#${z.id}`}
                className={`relative rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                  active === z.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === z.id && (
                  <motion.span
                    layoutId="hud-active"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ background: "color-mix(in oklab, var(--neon) 14%, transparent)" }}
                  />
                )}
                {z.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition hover:opacity-90 sm:inline-flex"
            >
              Say hello
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* mobile drawer */}
      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : -8, pointerEvents: open ? "auto" : "none" }}
        transition={{ duration: 0.2 }}
        className="fixed inset-x-4 top-20 z-40 md:hidden"
      >
        <div className="panel flex flex-col p-2">
          {ZONES.map((z) => (
            <a
              key={z.id}
              href={`#${z.id}`}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-2.5 text-sm text-foreground/90 hover:bg-[color:color-mix(in_oklab,var(--neon)_10%,transparent)]"
            >
              {z.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background"
          >
            Say hello
          </a>
        </div>
      </motion.div>
    </>
  );
}
