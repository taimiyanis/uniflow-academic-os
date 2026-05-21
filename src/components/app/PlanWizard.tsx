import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wand2, Calendar, Clock } from "lucide-react";
import { exams } from "@/data/exams";
import { generatePlan, planToICS, type StudyPlan } from "@/lib/plan-generator";
import { readStorage, writeStorage, StorageKeys } from "@/lib/storage";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  onGenerated: (plan: StudyPlan) => void;
}

export function PlanWizard({ open, onClose, onGenerated }: Props) {
  const [hours, setHours] = useState(10);
  const [examIds, setExamIds] = useState<string[]>(exams.map((e) => e.id));

  useEffect(() => {
    if (open) {
      const existing = readStorage<StudyPlan | null>(StorageKeys.plan, null);
      if (existing) {
        setHours(existing.hoursPerWeek);
        setExamIds(existing.examIds);
      }
    }
  }, [open]);

  const toggle = (id: string) => {
    setExamIds((arr) => arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);
  };

  const submit = () => {
    const plan = generatePlan({ hoursPerWeek: hours, examIds });
    writeStorage(StorageKeys.plan, plan);
    onGenerated(plan);
    toast.success(`Plan generated · ${plan.blocks.length} blocks over the week`);
    onClose();
  };

  const exportICS = () => {
    const plan = generatePlan({ hoursPerWeek: hours, examIds });
    const ics = planToICS(plan);
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uniflow-plan.ics";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Calendar exported (uniflow-plan.ics)");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(540px,calc(100vw-2rem))] bg-card border border-border rounded-3xl z-50 overflow-hidden"
          >
            <header className="p-6 border-b border-border flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary text-primary-foreground grid place-items-center">
                  <Wand2 className="size-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Plan my week</h2>
                  <p className="text-xs text-muted-foreground">Generates timeboxed blocks per exam, weighted by urgency and readiness.</p>
                </div>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-secondary rounded-md"><X className="size-4" /></button>
            </header>

            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5">
                    <Clock className="size-3" /> Study hours / week
                  </label>
                  <span className="text-sm font-bold font-mono">{hours}h</span>
                </div>
                <input
                  type="range" min={5} max={30} step={1}
                  value={hours} onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1">
                  <span>5h</span><span>30h</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2 block">Exams to plan for</label>
                <div className="space-y-1.5">
                  {exams.map((e) => (
                    <button
                      key={e.id}
                      onClick={() => toggle(e.id)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center gap-3 transition-colors ${
                        examIds.includes(e.id)
                          ? "border-primary bg-primary-soft"
                          : "border-border hover:bg-secondary/40"
                      }`}
                    >
                      <span className={`size-4 rounded grid place-items-center border ${examIds.includes(e.id) ? "bg-primary border-primary" : "border-border"}`}>
                        {examIds.includes(e.id) && <span className="size-1.5 bg-primary-foreground rounded-sm" />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{e.course}</p>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{e.code} · {e.daysAway}d · {e.readiness}% ready</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <footer className="p-6 border-t border-border flex gap-2">
              <button onClick={exportICS} className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border border-border rounded-lg hover:bg-secondary/60">
                <Calendar className="size-3.5" /> Export .ics
              </button>
              <div className="flex-1" />
              <button onClick={onClose} className="px-4 py-2.5 text-xs font-semibold border border-border rounded-lg hover:bg-secondary/60">Cancel</button>
              <button onClick={submit} disabled={examIds.length === 0} className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold bg-primary text-primary-foreground rounded-lg disabled:opacity-40">
                <Wand2 className="size-3.5" /> Generate
              </button>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
