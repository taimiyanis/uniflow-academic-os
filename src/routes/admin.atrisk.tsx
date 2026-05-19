import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AlertTriangle, Download, BellRing, Activity, Brain, CalendarX } from "lucide-react";
import { atRiskStudents, type AtRiskStudent } from "@/data/admin";
import { fadeUp, stagger } from "@/lib/motion";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/atrisk")({
  head: () => ({
    meta: [
      { title: "At-risk students — Uniflow Institutional" },
      { name: "description", content: "Identify and intervene with students showing declining engagement, low recall, or missed deadlines." },
    ],
  }),
  component: AtRisk,
});

const signalMeta: Record<AtRiskStudent["signal"], { label: string; icon: typeof Activity }> = {
  engagement: { label: "Declining engagement", icon: Activity },
  recall: { label: "Low recall", icon: Brain },
  deadlines: { label: "Missed deadlines", icon: CalendarX },
};

function AtRisk() {
  const groups = (Object.keys(signalMeta) as AtRiskStudent["signal"][]).map((key) => ({
    key,
    meta: signalMeta[key],
    rows: atRiskStudents.filter((s) => s.signal === key),
  }));

  return (
    <motion.div initial="hidden" animate="show" variants={stagger()} className="max-w-7xl mx-auto space-y-8">
      <motion.header variants={fadeUp} className="flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-[10px] font-mono uppercase tracking-widest mb-3">
            <AlertTriangle className="size-3" /> {atRiskStudents.length} signals
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">At-risk students</h1>
          <p className="text-sm text-muted-foreground mt-1">Segmented by signal type, with one-click intervention.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => toast.success("CSV export queued — you'll receive an email shortly.")} className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold border border-border rounded-lg hover:bg-secondary/60">
            <Download className="size-3.5" /> Export CSV
          </button>
          <button onClick={() => toast.success("PDF report generated — opening download.")} className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold border border-border rounded-lg hover:bg-secondary/60">
            <Download className="size-3.5" /> Export PDF
          </button>
        </div>
      </motion.header>

      {groups.map((g) => (
        <motion.section key={g.key} variants={fadeUp} className="bg-card border border-border rounded-3xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <g.meta.icon className="size-4 text-primary" />
              <h2 className="text-base font-bold">{g.meta.label}</h2>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{g.rows.length} students</span>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-secondary/40">
              <tr className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <th className="text-left px-6 py-3 font-medium">Student</th>
                <th className="text-left px-6 py-3 font-medium">Program</th>
                <th className="text-left px-6 py-3 font-medium">Signal</th>
                <th className="text-left px-6 py-3 font-medium">Severity</th>
                <th className="text-right px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {g.rows.map((r) => (
                <tr key={r.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4 font-semibold">{r.name}</td>
                  <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{r.program}</td>
                  <td className="px-6 py-4 text-muted-foreground">{r.detail}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded ${
                      r.severity === "high" ? "bg-destructive/15 text-destructive" :
                      r.severity === "med" ? "bg-primary-soft text-primary" :
                      "bg-secondary text-muted-foreground"
                    }`}>
                      {r.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => toast.success(`${r.action} — sent to ${r.name}`)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-border rounded-lg hover:bg-primary-soft hover:text-primary hover:border-primary/30">
                      <BellRing className="size-3" /> {r.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.section>
      ))}
    </motion.div>
  );
}
