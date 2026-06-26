import { GraduationCap, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { Section } from "./Section";

// const EDU = [
//   { school: "Berklee Online", deg: "Music Production Certificate", year: "2021" },
//   { school: "State University", deg: "B.S. Computer Science", year: "2017" },
//   { school: "Self-taught Guitar", deg: "10+ yrs · Live performance", year: "2014→" },
// ];
const EDU = [
  {
    school: "Army Public School",
    deg: "Schooling",
    year: "2016",
  },
  {
    school: "Chandigarh Group of Colleges",
    deg: "B.Tech. in Computer Science & Engineering",
    year: "2016 — 2020",
  },
  {
    school: "Self-Taught",
    deg: "Full-Stack Development • Cloud • AI • Music",
    year: "2020→",
  },
];

export function Education() {
  return (
    <Section
      id="education"
      zone="05 · Education"
      title="Where I learned"
      subtitle="Formal study, online programs and a lot of late-night practice."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {EDU.map((e, i) => (
          <motion.div
            key={e.school}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="panel relative overflow-hidden p-6 text-center"
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[color:var(--neon)] animate-pulse-glow">
              {i === EDU.length - 1 ? (
                <Trophy className="h-7 w-7 text-neon" />
              ) : (
                <GraduationCap className="h-7 w-7 text-neon" />
              )}
            </div>
            {/* <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Milestone
            </div> */}
            <h3 className="mt-2 text-xl">{e.deg}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {e.school} · {e.year}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
