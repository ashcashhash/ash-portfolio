import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import guitarAsset from "@/assets/guitar.png.asset.json";
const guitarImg = guitarAsset.url;

/**
 * A photoreal acoustic dreadnought rendered from a hand-painted asset, with
 * six interactive string hotspots, a strum zone, and Karplus–Strong synthesis
 * (standard tuning E A D G B E). Pluck a single string, or drag across the
 * sound hole to strum the full chord — down or up stroke.
 */
const TUNING = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63]; // low E .. high E

// String endpoints on the 1550×1920 source image (measured from the asset).
// The guitar is rendered at a diagonal, so each string has its own (x,y) at
// both the nut and the bridge saddle.
const IMG_W = 1550;
const IMG_H = 1920;
const STRING_X_TOP = [255, 267, 279, 291, 303, 315];
const STRING_Y_TOP = [360, 352, 344, 336, 328, 320];
const STRING_X_BOTTOM = [1020, 1050, 1080, 1110, 1140, 1170];
const STRING_Y_BOTTOM = [1365, 1371, 1377, 1383, 1389, 1395];
const HOLE_CX = 770;
const HOLE_CY = 1130;

export function GuitarScene() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 80, damping: 20 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 80, damping: 20 });
  const [ripples, setRipples] = useState<number[]>([]);
  const [plucked, setPlucked] = useState<number | null>(null);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
      my.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  function ensureAudio(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!audioRef.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      audioRef.current = new AC();
    }
    if (audioRef.current.state === "suspended") audioRef.current.resume().catch(() => {});
    return audioRef.current;
  }

  /** Karplus–Strong plucked-string synthesis. */
  function playNote(freq: number) {
    const ctx = ensureAudio();
    if (!ctx) return;
    const sr = ctx.sampleRate;
    const seconds = 2.2;
    const n = Math.floor(sr * seconds);
    const N = Math.max(2, Math.floor(sr / freq));
    const buffer = ctx.createBuffer(1, n, sr);
    const data = buffer.getChannelData(0);
    const ring = new Float32Array(N);
    for (let i = 0; i < N; i++) ring[i] = Math.random() * 2 - 1;
    let idx = 0;
    const decay = 0.996;
    for (let i = 0; i < n; i++) {
      const next = (idx + 1) % N;
      const sample = 0.5 * (ring[idx] + ring[next]) * decay;
      data[i] = ring[idx];
      ring[idx] = sample;
      idx = next;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + seconds);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 3500;
    src.connect(lp).connect(gain).connect(ctx.destination);
    src.start();
    src.stop(ctx.currentTime + seconds + 0.05);
  }

  function emit(stringIndex: number) {
    const id = Date.now() + Math.random();
    setRipples((r) => [...r, id]);
    setPlucked(stringIndex);
    playNote(TUNING[stringIndex] ?? 220);
    setTimeout(() => setRipples((r) => r.filter((x) => x !== id)), 2200);
    setTimeout(() => setPlucked((p) => (p === stringIndex ? null : p)), 700);
  }

  function strum(direction: "down" | "up" = "down") {
    const order = direction === "down" ? [0, 1, 2, 3, 4, 5] : [5, 4, 3, 2, 1, 0];
    order.forEach((i, k) => setTimeout(() => emit(i), k * 55));
  }

  const dragRef = useRef<{ active: boolean; lastIdx: number | null; startX: number }>({
    active: false,
    lastIdx: null,
    startX: 0,
  });

  function stringIndexFromPoint(
    svg: SVGSVGElement,
    clientX: number,
    clientY: number,
  ): number | null {
    const rect = svg.getBoundingClientRect();
    const vx = ((clientX - rect.left) / rect.width) * IMG_W;
    const vy = ((clientY - rect.top) / rect.height) * IMG_H;
    let best = -1,
      bestD = 45;
    for (let i = 0; i < 6; i++) {
      const ax = STRING_X_TOP[i],
        ay = STRING_Y_TOP[i];
      const bx = STRING_X_BOTTOM[i],
        by = STRING_Y_BOTTOM[i];
      const dx = bx - ax,
        dy = by - ay;
      const len2 = dx * dx + dy * dy;
      let t = ((vx - ax) * dx + (vy - ay) * dy) / len2;
      if (t < -0.05 || t > 1.05) continue;
      t = Math.max(0, Math.min(1, t));
      const px = ax + dx * t,
        py = ay + dy * t;
      const d = Math.hypot(px - vx, py - vy);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    return best === -1 ? null : best;
  }

  return (
    <div ref={ref} className="relative h-full w-full select-none" style={{ perspective: 1600 }}>
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative mx-auto h-full w-full max-w-[520px]"
      >
        {/* warm stage halo behind the guitar */}
        <motion.div
          className="absolute left-1/2 top-[45%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--neon) 55%, transparent), transparent 65%)",
            filter: "blur(8px)",
          }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="relative mx-auto h-full"
          style={{ transform: "translateZ(40px)", aspectRatio: `${IMG_W} / ${IMG_H}` }}
        >
          <motion.img
            src={guitarImg}
            alt="Acoustic dreadnought guitar"
            width={IMG_W}
            height={IMG_H}
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          <svg
            viewBox={`0 0 ${IMG_W} ${IMG_H}`}
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            onPointerDown={(e) => {
              const svg = e.currentTarget;
              svg.setPointerCapture(e.pointerId);
              dragRef.current = { active: true, lastIdx: null, startX: e.clientX };
              const idx = stringIndexFromPoint(svg, e.clientX, e.clientY);
              if (idx !== null) {
                emit(idx);
                dragRef.current.lastIdx = idx;
              }
            }}
            onPointerMove={(e) => {
              if (!dragRef.current.active) return;
              const idx = stringIndexFromPoint(e.currentTarget, e.clientX, e.clientY);
              if (idx !== null && idx !== dragRef.current.lastIdx) {
                emit(idx);
                dragRef.current.lastIdx = idx;
              }
            }}
            onPointerUp={() => {
              dragRef.current.active = false;
              dragRef.current.lastIdx = null;
            }}
            onPointerCancel={() => {
              dragRef.current.active = false;
              dragRef.current.lastIdx = null;
            }}
          >
            {/* ripples from sound hole */}
            <AnimatePresence>
              {ripples.map((id) => (
                <motion.circle
                  key={id}
                  cx={HOLE_CX}
                  cy={HOLE_CY}
                  initial={{ r: 60, opacity: 0.55 }}
                  animate={{ r: 380, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.4, ease: "easeOut" }}
                  fill="none"
                  stroke="oklch(0.92 0.14 80)"
                  strokeWidth="2"
                />
              ))}
            </AnimatePresence>

            {/* visible vibrating strings overlay + hit areas */}
            {Array.from({ length: 6 }).map((_, i) => {
              const xTop = STRING_X_TOP[i];
              const xBot = STRING_X_BOTTOM[i];
              const yTop = STRING_Y_TOP[i];
              const yBot = STRING_Y_BOTTOM[i];
              const isPlucked = plucked === i;
              const color = i < 3 ? "oklch(0.82 0.1 75)" : "oklch(0.96 0.03 85)";
              return (
                <g key={i} style={{ cursor: "pointer" }}>
                  <line
                    x1={xTop}
                    y1={yTop}
                    x2={xBot}
                    y2={yBot}
                    stroke="transparent"
                    strokeWidth="70"
                  />
                  <motion.line
                    x1={xTop}
                    y1={yTop}
                    x2={xBot}
                    y2={yBot}
                    stroke={color}
                    strokeOpacity={isPlucked ? 0.95 : 0}
                    strokeWidth={1.8 + (5 - i) * 0.5}
                    style={{
                      filter: isPlucked ? "drop-shadow(0 0 4px oklch(0.95 0.12 80))" : "none",
                    }}
                    animate={
                      isPlucked
                        ? {
                            x1: [xTop - 3, xTop + 3, xTop - 1.5, xTop],
                            x2: [xBot - 3, xBot + 3, xBot - 1.5, xBot],
                          }
                        : { x1: xTop, x2: xBot }
                    }
                    transition={{
                      duration: isPlucked ? 0.5 : 0.2,
                      ease: "easeOut",
                      repeat: isPlucked ? 2 : 0,
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* strum controls */}
          <div className="pointer-events-auto absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2">
            <button
              type="button"
              onClick={() => strum("down")}
              className="rounded-full border border-[color:var(--neon)]/40 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-neon backdrop-blur-md transition hover:bg-[color:var(--neon)]/15"
            >
              ↓ Strum
            </button>
            <button
              type="button"
              onClick={() => strum("up")}
              className="rounded-full border border-[color:var(--neon-2)]/40 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-neon-2 backdrop-blur-md transition hover:bg-[color:var(--neon-2)]/15"
            >
              ↑ Strum
            </button>
          </div>
          <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-neon/80">
            ♪ pluck strings · drag to strum ♪
          </div>
        </div>
      </motion.div>
    </div>
  );
}
