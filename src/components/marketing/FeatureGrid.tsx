import { Sparkles, Library, BarChart3, CalendarRange, Focus, Dumbbell } from "lucide-react";

const features = [
  { icon: Library, title: "Curated Library", body: "Every lesson, reading, and case for your semester — authored by the Uniflow team in partnership with your faculty." },
  { icon: Dumbbell, title: "Practice that mirrors the exam", body: "Flashcards, concept quizzes, worked exercises, and full timed mock exams — all calibrated to your weakest topics." },
  { icon: Sparkles, title: "AI Tutor", body: "An academic companion grounded in your library. Explains a passage, breaks down a case, or runs a personalized review." },
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
