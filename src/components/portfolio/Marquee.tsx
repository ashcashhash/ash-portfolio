const ITEMS = [
  "Senior Software Engineer",
  "6+ Years Building Enterprise Applications",
  "React • Angular • Node.js • TypeScript",
  "AI-Powered Solutions",
  "Cloud • AWS • Snowflake",
  "Consultant @ ZS Associates",
  "Musician • Live Performer",
  "Building Products That Matter",
  "Product Engineering • Solution Architecture",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-border/40 bg-background/40 py-3">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="text-neon">◆</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
