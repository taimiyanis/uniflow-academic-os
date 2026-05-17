import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle, FileText } from "lucide-react";

export const Route = createFileRoute("/admin/content")({
  head: () => ({ meta: [{ title: "Content — Uniflow Institutional" }] }),
  component: ContentPage,
});

const items = [
  { icon: AlertTriangle, type: "AI Tutor", course: "LW22", title: "Tutor answer reported by 3 students", body: "Disputed interpretation of Article 102 TFEU. Awaiting faculty review.", level: "high", time: "1d ago" },
  { icon: FileText, type: "Source PDF", course: "AC22", title: "External case study awaiting approval", body: "Submitted by user yt@escp.edu · 14 pages.", level: "med", time: "5h ago" },
  { icon: ShieldCheck, type: "AI Quiz", course: "EC22", title: "Auto-generated quiz draft", body: "Routine check before publishing to BBA2 cohort.", level: "low", time: "2h ago" },
];

function ContentPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Content governance</h1>
        <p className="text-sm text-muted-foreground mt-1">Review and moderate AI-generated and student-submitted material.</p>
      </header>

      <div className="space-y-3">
        {items.map((it) => (
          <article key={it.title} className="p-6 bg-card border border-border rounded-2xl flex gap-5">
            <div className={`size-10 shrink-0 rounded-lg grid place-items-center ${
              it.level === "high" ? "bg-destructive/10 text-destructive" :
              it.level === "med" ? "bg-primary-soft text-primary" :
              "bg-secondary text-muted-foreground"
            }`}>
              <it.icon className="size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{it.type} · {it.course}</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">· {it.time}</span>
              </div>
              <h3 className="font-bold">{it.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{it.body}</p>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-lg">Approve</button>
                <button className="px-3 py-1.5 text-xs font-bold border border-border rounded-lg">Request changes</button>
                <button className="px-3 py-1.5 text-xs font-bold text-destructive rounded-lg hover:bg-destructive/5">Reject</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
