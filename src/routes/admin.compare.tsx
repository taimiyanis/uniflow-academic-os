import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, ChevronRight, Download, TrendingDown, TrendingUp } from "lucide-react";
import { faculties, cohortMetrics, type Faculty } from "@/data/admin";
import { Sparkline } from "@/components/charts/Sparkline";
import { fadeUp, stagger } from "@/lib/motion";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/compare")({
  head: () => ({
    meta: [
      { title: "Cohort comparison — Uniflow Institutional" },
      { name: "description", content: "Compare two faculties side-by-side on readiness, engagement, content coverage and at-risk share." },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const [leftId, setLeftId] = useState<string>("bba");
  const [rightId, setRightId] = useState<string>("msc-fin");

  const left = faculties.find((f) => f.id === leftId)!;
  const right = faculties.find((f) => f.id === rightId)!;
  const lm = cohortMetrics[leftId];
  const rm = cohortMetrics[rightId];

  return (
    <motion.div initial="hidden" animate="show" variants={stagger()} className="max-w-7xl mx-auto space-y-8">
      <motion.header variants={fadeUp} className="flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-[10px] font-mono uppercase tracking-widest mb-3">
            <ArrowLeftRight className="size-3" /> Cohort comparison
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Compare cohorts</h1>
          <p className="text-sm text-muted-foreground mt-1">Pick two faculties to surface what's working and where to intervene.</p>
        </div>
        <button onClick={() => toast.success("Comparison exported as CSV")} className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold border border-border rounded-lg hover:bg-secondary/60">
          <Download className="size-3.5" /> Export
        </button>
      </motion.header>

      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-5">
        <FacultyPicker label="Cohort A" value={leftId} onChange={setLeftId} excludeId={rightId} faculty={left} />
        <FacultyPicker label="Cohort B" value={rightId} onChange={setRightId} excludeId={leftId} faculty={right} />
      </motion.div>

      <motion.section variants={fadeUp} className="bg-card border border-border rounded-3xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-base font-bold">Metric diff</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Positive deltas favor Cohort A.</p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-secondary/40">
            <tr className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <th className="text-left px-6 py-3 font-medium">Metric</th>
              <th className="text-right px-6 py-3 font-medium">{left.name}</th>
              <th className="text-right px-6 py-3 font-medium">{right.name}</th>
              <th className="text-right px-6 py-3 font-medium">Δ</th>
            </tr>
          </thead>
          <tbody>
            <DiffRow label="Avg exam readiness" a={lm.readiness} b={rm.readiness} suffix="%" />
            <DiffRow label="Engagement score" a={left.engagement} b={right.engagement} suffix="%" />
            <DiffRow label="Adoption rate" a={left.adoption} b={right.adoption} suffix="%" />
            <DiffRow label="Content coverage" a={lm.contentCoverage} b={rm.contentCoverage} suffix="%" />
            <DiffRow label="Practice sessions / student / wk" a={lm.practiceFrequency} b={rm.practiceFrequency} digits={1} />
            <DiffRow label="Tutor usage (30d)" a={lm.tutorUsage} b={rm.tutorUsage} suffix="%" />
            <DiffRow label="At-risk students" a={left.atRisk} b={right.atRisk} inverse />
          </tbody>
        </table>
      </motion.section>

      <motion.section variants={fadeUp} className="grid grid-cols-2 gap-5">
        <TrendCard title="Engagement trend" a={lm.engagementTrend} b={rm.engagementTrend} aLabel={left.name} bLabel={right.name} />
        <TrendCard title="Readiness trend" a={lm.readinessTrend} b={rm.readinessTrend} aLabel={left.name} bLabel={right.name} />
      </motion.section>
    </motion.div>
  );
}

function FacultyPicker({
  label, value, onChange, excludeId, faculty,
}: { label: string; value: string; onChange: (id: string) => void; excludeId: string; faculty: Faculty }) {
  return (
    <div className="p-5 bg-card border border-border rounded-2xl">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</p>
        <Link to="/admin/cohort/$facultyId" params={{ facultyId: faculty.id }} className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline inline-flex items-center gap-1">
          Drill in <ChevronRight className="size-3" />
        </Link>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm font-semibold focus:outline-none focus:border-primary"
      >
        {faculties.filter((f) => f.id !== excludeId).map((f) => (
          <option key={f.id} value={f.id}>{f.name}</option>
        ))}
      </select>
      <p className="mt-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{faculty.students.toLocaleString()} students</p>
    </div>
  );
}

function DiffRow({
  label, a, b, suffix = "", digits = 0, inverse = false,
}: { label: string; a: number; b: number; suffix?: string; digits?: number; inverse?: boolean }) {
  const delta = a - b;
  const positive = inverse ? delta < 0 : delta > 0;
  const neutral = delta === 0;
  return (
    <tr className="border-t border-border">
      <td className="px-6 py-3 font-medium">{label}</td>
      <td className="px-6 py-3 text-right font-mono">{a.toFixed(digits)}{suffix}</td>
      <td className="px-6 py-3 text-right font-mono">{b.toFixed(digits)}{suffix}</td>
      <td className="px-6 py-3 text-right">
        <span className={`inline-flex items-center gap-1 text-xs font-mono ${
          neutral ? "text-muted-foreground" : positive ? "text-primary" : "text-destructive"
        }`}>
          {!neutral && (positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />)}
          {delta > 0 ? "+" : ""}{delta.toFixed(digits)}{suffix}
        </span>
      </td>
    </tr>
  );
}

function TrendCard({ title, a, b, aLabel, bLabel }: { title: string; a: number[]; b: number[]; aLabel: string; bLabel: string }) {
  return (
    <div className="p-6 bg-card border border-border rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold">{title}</h3>
        <div className="flex gap-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary" />{aLabel}</span>
          <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-muted-foreground/50" />{bLabel}</span>
        </div>
      </div>
      <div className="relative h-32">
        <div className="absolute inset-0">
          <Sparkline data={a} width={400} height={120} className="w-full h-full text-primary" />
        </div>
        <div className="absolute inset-0 opacity-60">
          <Sparkline data={b} width={400} height={120} className="w-full h-full text-muted-foreground" fill={false} />
        </div>
      </div>
    </div>
  );
}
