import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/engagement")({
  head: () => ({ meta: [{ title: "Engagement — Uniflow Institutional" }] }),
  component: EngagementPage,
});

const courses = [
  { code: "EC22", name: "Macroeconomics", students: 412, dau: 78, sessions: "2,140", recall: 89 },
  { code: "AC22", name: "Financial Accounting", students: 388, dau: 71, sessions: "1,890", recall: 84 },
  { code: "LW22", name: "Business Law EU", students: 295, dau: 64, sessions: "1,210", recall: 79 },
  { code: "MK21", name: "Marketing", students: 350, dau: 69, sessions: "1,440", recall: 82 },
  { code: "MA22", name: "Mathematics 2", students: 410, dau: 73, sessions: "1,980", recall: 86 },
  { code: "ST22", name: "Statistics", students: 318, dau: 58, sessions: "990", recall: 77 },
];

function EngagementPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Engagement</h1>
        <p className="text-sm text-muted-foreground mt-1">How cohorts use Uniflow across every course.</p>
      </header>

      <div className="bg-card border border-border rounded-3xl overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-4 border-b border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <div className="col-span-1">Code</div>
          <div className="col-span-4">Course</div>
          <div className="col-span-2 text-right">Students</div>
          <div className="col-span-2 text-right">DAU %</div>
          <div className="col-span-2 text-right">Sessions</div>
          <div className="col-span-1 text-right">Recall</div>
        </div>
        {courses.map((c) => (
          <div key={c.code} className="grid grid-cols-12 px-6 py-4 border-b border-border last:border-0 items-center text-sm hover:bg-secondary/30 transition-colors">
            <div className="col-span-1 text-[10px] font-mono text-primary bg-primary-soft w-fit px-2 py-0.5 rounded">{c.code}</div>
            <div className="col-span-4 font-semibold">{c.name}</div>
            <div className="col-span-2 text-right font-mono">{c.students}</div>
            <div className="col-span-2 text-right font-mono">{c.dau}%</div>
            <div className="col-span-2 text-right font-mono">{c.sessions}</div>
            <div className="col-span-1 text-right font-mono text-primary">{c.recall}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
