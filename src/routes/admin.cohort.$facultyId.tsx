import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { faculties, atRiskStudents } from "@/data/admin";
import { Sparkline } from "@/components/charts/Sparkline";
import { fadeUp, stagger } from "@/lib/motion";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/cohort/$facultyId")({
  head: ({ params }) => ({
    meta: [
      { title: `Cohort ${params.facultyId} — Uniflow Institutional` },
      { name: "description", content: `Cohort drill-down for ${params.facultyId}.` },
    ],
  }),
  component: CohortPage,
});

function CohortPage() {
  const { facultyId } = Route.useParams();
  const f = faculties.find((x) => x.id === facultyId);
  if (!f) throw notFound();

  const trend = [42, 48, 55, 51, 60, 65, 62, 70, 72, 75, 78, f.engagement];
  const atRisk = atRiskStudents.slice(0, 5);

  return (
    <motion.div initial="hidden" animate="show" variants={stagger()} className="max-w-7xl mx-auto space-y-8">
      <motion.div variants={fadeUp}>
        <Link to="/admin/adoption" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="size-3" /> Adoption
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">{f.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{f.students.toLocaleString()} enrolled students · Fall 2025/2026</p>
          </div>
          <button onClick={() => toast.success("Cohort report exported")} className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold border border-border rounded-lg hover:bg-secondary/60">
            <Download className="size-3.5" /> Export
          </button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Students", value: f.students.toLocaleString(), icon: Users },
          { label: "Adoption", value: `${f.adoption}%`, icon: TrendingUp },
          { label: "Engagement", value: `${f.engagement}%`, icon: TrendingUp },
          { label: "At-risk", value: f.atRisk, icon: AlertTriangle, danger: true },
        ].map((k) => (
          <div key={k.label} className="p-6 bg-card border border-border rounded-2xl">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{k.label}</p>
              <k.icon className={`size-4 ${k.danger ? "text-destructive" : "text-primary"}`} />
            </div>
            <p className={`text-3xl font-extrabold mt-3 tracking-tight ${k.danger ? "text-destructive" : ""}`}>{k.value}</p>
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-7 p-7 bg-card border border-border rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold">Engagement trend</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Last 12 weeks</p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary-soft px-2 py-1 rounded">+18% MoM</span>
          </div>
          <Sparkline data={trend} className="h-48 text-primary" />
        </div>

        <div className="col-span-12 lg:col-span-5 p-7 bg-card border border-border rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold">Intervention queue</h2>
            <Link to="/admin/atrisk" className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline">view all</Link>
          </div>
          <ul className="space-y-3">
            {atRisk.map((s) => (
              <li key={s.id} className="flex items-center justify-between p-3 border border-border rounded-xl">
                <div>
                  <p className="text-sm font-semibold">{s.name}</p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.program} · {s.detail}</p>
                </div>
                <button onClick={() => toast.success(`${s.action} — sent`)} className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline">
                  {s.action.split(" ")[0]} →
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
