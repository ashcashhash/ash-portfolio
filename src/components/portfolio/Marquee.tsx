const ITEMS = [
  "♪ Code in 4/4 time",
  "Composing in TypeScript",
  "Engineer × Musician",
  "Standard tuning · E A D G B E",
  "Capo on the second fret of life",
  "Open for new sessions",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-border/40 bg-background/40 py-3">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="text-neon">♫</span>
            <span>{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
