import { useState, useEffect } from "react";
import { X, Check, Send } from "lucide-react";
import { advisors, type AtRiskStudent, type InterventionRecord, type InterventionStatus } from "@/data/admin";
import { readStorage, writeStorage, StorageKeys } from "@/lib/storage";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  student: AtRiskStudent | null;
  onClose: () => void;
  onSaved: (record: InterventionRecord) => void;
  current?: InterventionRecord;
}

const statusLabels: Record<InterventionStatus, string> = {
  new: "New",
  contacted: "Contacted",
  resolved: "Resolved",
};

export function InterventionDrawer({ student, onClose, onSaved, current }: Props) {
  const [status, setStatus] = useState<InterventionStatus>("new");
  const [advisor, setAdvisor] = useState<string>(advisors[0]);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (student) {
      setStatus(current?.status ?? "new");
      setAdvisor(current?.advisor ?? advisors[0]);
      setNote(current?.note ?? "");
    }
  }, [student, current]);

  const save = () => {
    if (!student) return;
    const record: InterventionRecord = {
      studentId: student.id,
      status,
      advisor,
      note,
      updatedAt: Date.now(),
    };
    const all = readStorage<Record<string, InterventionRecord>>(StorageKeys.interventions, {});
    all[student.id] = record;
    writeStorage(StorageKeys.interventions, all);
    onSaved(record);
    toast.success(`Intervention saved for ${student.name}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {student && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 bottom-0 w-[420px] bg-card border-l border-border z-50 flex flex-col"
          >
            <header className="p-6 border-b border-border flex items-start justify-between">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Intervention</p>
                <h2 className="text-xl font-bold mt-1">{student.name}</h2>
                <p className="text-xs text-muted-foreground font-mono mt-1">{student.program} · {student.detail}</p>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-secondary rounded-md"><X className="size-4" /></button>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Status</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {(Object.keys(statusLabels) as InterventionStatus[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                        status === s
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:bg-secondary/60"
                      }`}
                    >
                      {statusLabels[s]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2 block">Advisor</label>
                <select value={advisor} onChange={(e) => setAdvisor(e.target.value)} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary">
                  {advisors.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2 block">Outreach note</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Summary of the conversation, agreed next steps, follow-up date…"
                  rows={6}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="p-4 bg-secondary/40 rounded-xl">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Suggested action</p>
                <p className="text-sm font-semibold mt-1">{student.action}</p>
              </div>
            </div>

            <footer className="p-6 border-t border-border flex gap-2">
              <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm font-semibold border border-border rounded-lg hover:bg-secondary/60">Cancel</button>
              <button onClick={save} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                {status === "resolved" ? <Check className="size-4" /> : <Send className="size-4" />}
                Save
              </button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
