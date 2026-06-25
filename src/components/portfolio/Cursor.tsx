import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [data-cursor='hover']"));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.classList.add("pick-cursor");
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("pick-cursor");
    };
  }, [x, y]);

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
    >
      <motion.div
        animate={{
          scale: down ? 0.8 : hover ? 1.1 : 0.9,
          rotate: down ? 18 : hover ? 8 : 12,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        style={{ transformOrigin: "50% 10%" }}
        className="-translate-x-1/4 -translate-y-1"
      >
        <svg width="22" height="26" viewBox="0 0 36 40" fill="none" aria-hidden style={{ transform: "scaleY(-1)" }}>
          <defs>
            <linearGradient id="pickGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffe9a8" />
              <stop offset="45%" stopColor="#e8a64a" />
              <stop offset="100%" stopColor="#7a3a14" />
            </linearGradient>
            <radialGradient id="pickShine" cx="35%" cy="25%" r="55%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d="M18 1 C28 1 34 8 34 16 C34 24 26 33 18 39 C10 33 2 24 2 16 C2 8 8 1 18 1 Z"
            fill="url(#pickGrad)"
            stroke="#3a1a08"
            strokeWidth="1.2"
          />
          <path
            d="M18 1 C28 1 34 8 34 16 C34 24 26 33 18 39 C10 33 2 24 2 16 C2 8 8 1 18 1 Z"
            fill="url(#pickShine)"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
