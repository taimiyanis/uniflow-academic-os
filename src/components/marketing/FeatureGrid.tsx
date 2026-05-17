import { Sparkles, NotebookPen, BarChart3, CalendarRange, Focus, Layers } from "lucide-react";

const features = [
  { icon: Sparkles, title: "AI Tutor", body: "An intelligent companion trained on your course materials. Personalized quizzes, structured explanations, no fluff." },
  { icon: NotebookPen, title: "Smart Notes", body: "Capture lectures and case studies in a clean editor that auto-links concepts across your curriculum." },
  { icon: Layers, title: "Quizzes & Flashcards", body: "Generate active-recall decks and practice exams from any chapter, slide, or PDF in seconds." },
  { icon: CalendarRange, title: "Planner", body: "Deadlines, study sessions, and exam countdowns unified in one calm, actionable view." },
  { icon: Focus, title: "Focus Mode", body: "Pomodoro sessions paired with ambient soundscapes and distraction-blocking. Designed to lower cognitive load." },
  { icon: BarChart3, title: "Performance Analytics", body: "See exactly where you stand in every course — and where to invest your next 30 minutes." },
];

export function FeatureGrid() {
  return (
    <section className="py-28 bg-primary-soft/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">The Platform</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5 text-balance">
            Built for the rigor of business school.
          </h2>
          <p className="text-lg text-muted-foreground">
            Every tool you need to organize, study, and perform — without the chaos of ten browser tabs.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group p-7 bg-card border border-border rounded-3xl hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)] transition-all duration-300"
            >
              <div className="size-11 bg-primary-soft rounded-xl flex items-center justify-center mb-5">
                <Icon className="size-5 text-primary" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold mb-2.5">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
