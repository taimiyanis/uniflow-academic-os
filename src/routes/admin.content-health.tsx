import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Flag, MessageSquareWarning, TrendingDown, TrendingUp, Minus, FileText } from "lucide-react";
import { contentSignals, type ContentSignal } from "@/data/admin";
import { fadeUp, stagger } from "@/lib/motion";
import { readStorage, writeStorage, StorageKeys } from "@/lib/storage";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/content-health")({
  head: () => ({
    meta: [
      { title: "Content health — Uniflow Institutional" },
      { name: "description", content: "Find the lessons hurting student outcomes and flag them for review by the Uniflow content team." },
    ],
  }),
  component: ContentHealth,
});

type SortKey = "passRate" | "dropOff" | "tutorHits" | "views";

function ContentHealth() {
  const [sort, setSort] = useState<SortKey>("passRate");
  const [flagged, setFlagged] = useState<string[]>(() => readStorage<string[]>(StorageKeys.flaggedLessons, []));

  const sorted = [...contentSignals].sort((a, b) => {
    if (sort === "passRate") return a.passRate - b.passRate;
    return b[sort] - a[sort];
  });

  const flag = (id: string, title: string) => {
    const next = flagged.includes(id) ? flagged.filter((x) => x !== id) : [...flagged, id];
    setFlagged(next);
    writeStorage(StorageKeys.flaggedLessons, next);
    toast.success(flagged.includes(id) ? `Unflagged "${title}"` : `Flagged "${title}" for content review`);
  };

  const worst = sorted[0];
  const avgPass = Math.round(contentSignals.reduce((s, c) => s + c.passRate, 0) / contentSignals.length);
  const totalHits = contentSignals.reduce((s, c) => s + c.tutorHits, 0);

  return (
    <motion.div initial="hidden" animate="show" variants={stagger()} className="max-w-7xl mx-auto space-y-8">
      <motion.header variants={fadeUp}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-[10px] font-mono uppercase tracking-widest mb-3">
          <Activity className="size-3" /> Content health
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Where lessons are hurting outcomes</h1>
        <p className="text-sm text-muted-foreground mt-1">Lowest pass-rate, highest drop-off, most "ask tutor" hits. Flag chapters for the Uniflow content team.</p>
      </motion.header>

      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-5">
        <Stat label="Avg quiz pass rate" value={`${avgPass}%`} />
        <Stat label="Tutor hits (30d)" value={totalHits.toLocaleString()} />
        <Stat label="Flagged for review" value={String(flagged.length)} />
      </motion.div>

      <motion.section variants={fadeUp} className="bg-card border border-border rounded-3xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold">Lessons sorted by {sortLabel(sort)}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Worst performer: <span className="font-semibold text-foreground">{worst.title}</span> · {worst.passRate}% pass
            </p>
          </div>
          <div className="flex gap-1 p-1 bg-secondary/40 rounded-lg">
            <SortBtn current={sort} value="passRate" onClick={setSort}>Pass rate</SortBtn>
            <SortBtn current={sort} value="dropOff" onClick={setSort}>Drop-off</SortBtn>
            <SortBtn current={sort} value="tutorHits" onClick={setSort}>Tutor hits</SortBtn>
            <SortBtn current={sort} value="views" onClick={setSort}>Views</SortBtn>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-secondary/40">
            <tr className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <th className="text-left px-6 py-3 font-medium">Lesson</th>
              <th className="text-right px-6 py-3 font-medium">Pass rate</th>
              <th className="text-right px-6 py-3 font-medium">Drop-off</th>
              <th className="text-right px-6 py-3 font-medium">Tutor hits</th>
              <th className="text-right px-6 py-3 font-medium">Views</th>
              <th className="text-right px-6 py-3 font-medium">Trend</th>
              <th className="text-right px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s) => (
              <tr key={s.lessonId} className="border-t border-border hover:bg-secondary/30">
                <td className="px-6 py-4">
                  <Link to="/app/library/$code/$lessonId" params={{ code: s.code, lessonId: s.lessonId }} className="inline-flex items-center gap-2 group">
                    <FileText className="size-3.5 text-muted-foreground" />
                    <div>
                      <p className="font-semibold group-hover:text-primary transition-colors">{s.title}</p>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">{s.code} · {s.chapter}</p>
                    </div>
                  </Link>
                </td>
                <PassCell value={s.passRate} />
                <td className="px-6 py-4 text-right font-mono text-xs">{s.dropOff}%</td>
                <td className="px-6 py-4 text-right font-mono text-xs">{s.tutorHits.toLocaleString()}</td>
                <td className="px-6 py-4 text-right font-mono text-xs text-muted-foreground">{s.views.toLocaleString()}</td>
                <td className="px-6 py-4 text-right"><TrendIcon trend={s.trend} /></td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => flag(s.lessonId, s.title)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border rounded-lg transition-colors ${
                      flagged.includes(s.lessonId)
                        ? "bg-destructive/10 text-destructive border-destructive/30"
                        : "border-border hover:bg-primary-soft hover:text-primary hover:border-primary/30"
                    }`}
                  >
                    <Flag className="size-3" /> {flagged.includes(s.lessonId) ? "Flagged" : "Flag"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.section>

      <motion.div variants={fadeUp} className="p-6 bg-card border border-border rounded-2xl flex items-start gap-4">
        <MessageSquareWarning className="size-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold">How flagging works</p>
          <p className="text-xs text-muted-foreground mt-1">Flagged lessons enter the Uniflow content team's review queue. They prioritize revisions based on impact (pass-rate × views) and ship updates back to your library within 14 days.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function sortLabel(s: SortKey) {
  return s === "passRate" ? "lowest pass rate" : s === "dropOff" ? "highest drop-off" : s === "tutorHits" ? "most tutor hits" : "most views";
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 bg-card border border-border rounded-2xl">
      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="text-3xl font-extrabold mt-3">{value}</p>
    </div>
  );
}

function SortBtn({ current, value, onClick, children }: { current: SortKey; value: SortKey; onClick: (v: SortKey) => void; children: React.ReactNode }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest rounded transition-colors ${
        current === value ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function PassCell({ value }: { value: number }) {
  const tone = value < 60 ? "text-destructive" : value < 75 ? "text-primary" : "text-foreground";
  return <td className={`px-6 py-4 text-right font-mono text-sm font-semibold ${tone}`}>{value}%</td>;
}

function TrendIcon({ trend }: { trend: ContentSignal["trend"] }) {
  if (trend === "up") return <TrendingUp className="size-4 text-primary inline" />;
  if (trend === "down") return <TrendingDown className="size-4 text-destructive inline" />;
  return <Minus className="size-4 text-muted-foreground inline" />;
}
