import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Download, Activity, Brain, CalendarX, ChevronRight } from "lucide-react";
import { atRiskStudents, type AtRiskStudent, type InterventionRecord, type InterventionStatus } from "@/data/admin";
import { fadeUp, stagger } from "@/lib/motion";
import { toast } from "sonner";
import { readStorage, StorageKeys } from "@/lib/storage";
import { InterventionDrawer } from "@/components/admin/InterventionDrawer";

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

const statusTone: Record<InterventionStatus, string> = {
  new: "bg-destructive/15 text-destructive",
  contacted: "bg-primary-soft text-primary",
  resolved: "bg-secondary text-muted-foreground",
};

function AtRisk() {
  const [interventions, setInterventions] = useState<Record<string, InterventionRecord>>(
    () => readStorage<Record<string, InterventionRecord>>(StorageKeys.interventions, {})
  );
  const [selected, setSelected] = useState<AtRiskStudent | null>(null);

  const groups = (Object.keys(signalMeta) as AtRiskStudent["signal"][]).map((key) => ({
    key,
    meta: signalMeta[key],
    rows: atRiskStudents.filter((s) => s.signal === key),
  }));

  const handleSaved = (record: InterventionRecord) => {
    setInterventions((prev) => ({ ...prev, [record.studentId]: record }));
  };

  const resolved = Object.values(interventions).filter((i) => i.status === "resolved").length;

  return (
    <motion.div initial="hidden" animate="show" variants={stagger()} className="max-w-7xl mx-auto space-y-8">
      <motion.header variants={fadeUp} className="flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-[10px] font-mono uppercase tracking-widest mb-3">
            <AlertTriangle className="size-3" /> {atRiskStudents.length} signals · {resolved} resolved
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">At-risk students</h1>
          <p className="text-sm text-muted-foreground mt-1">Click a row to log an outreach and update the intervention status.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => toast.success("CSV export queued")} className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold border border-border rounded-lg hover:bg-secondary/60">
            <Download className="size-3.5" /> Export CSV
          </button>
          <button onClick={() => toast.success("PDF report generated")} className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold border border-border rounded-lg hover:bg-secondary/60">
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
                <th className="text-left px-6 py-3 font-medium">Intervention</th>
                <th className="text-right px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {g.rows.map((r) => {
                const intervention = interventions[r.id];
                return (
                  <tr
                    key={r.id}
                    onClick={() => setSelected(r)}
                    className="border-t border-border hover:bg-secondary/30 transition-colors cursor-pointer"
                  >
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
                    <td className="px-6 py-4">
                      {intervention ? (
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded ${statusTone[intervention.status]}`}>
                            {intervention.status}
                          </span>
                          {intervention.advisor && (
                            <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[140px]">{intervention.advisor}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">— not started</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight className="size-4 text-muted-foreground inline" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.section>
      ))}

      <InterventionDrawer
        student={selected}
        current={selected ? interventions[selected.id] : undefined}
        onClose={() => setSelected(null)}
        onSaved={handleSaved}
      />
    </motion.div>
  );
}
