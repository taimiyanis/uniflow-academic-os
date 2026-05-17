import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Send } from "lucide-react";

export const Route = createFileRoute("/app/tutor")({
  head: () => ({ meta: [{ title: "AI Tutor — Uniflow" }] }),
  component: TutorPage,
});

const suggestions = [
  "Explain the IS-LM model with a real-world example",
  "Generate a 10-question quiz from my Chapter 4 notes",
  "Summarize today's Macroeconomics lecture in 5 bullets",
  "Draft an outline for my Marketing brief",
];

const transcript = [
  { role: "tutor", body: "Good morning, Yanis. I reviewed your Chapter 4 notes overnight. Three concepts looked thin: liquidity preference, fiscal multipliers under fixed prices, and the LM curve slope. Want to start with a 10-minute primer or jump straight into practice?" },
  { role: "you", body: "Start with liquidity preference — explain it like I'm preparing for an oral exam." },
  { role: "tutor", body: "Got it. We'll cover: (1) Keynes's three motives for holding money, (2) how the demand for money slopes with respect to the interest rate, and (3) the equilibrium with money supply. I'll pause every 90 seconds for you to summarize back to me." },
];

function TutorPage() {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6 h-[calc(100vh-7rem)]">
      <section className="col-span-12 lg:col-span-8 bg-card border border-border rounded-3xl flex flex-col overflow-hidden">
        <header className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg bg-primary grid place-items-center">
              <Sparkles className="size-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold">Uniflow Tutor</p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Macroeconomics · EC22</p>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary">session 1 · 14:02</span>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {transcript.map((t, i) => (
            <div key={i} className={`flex gap-3 ${t.role === "you" ? "flex-row-reverse" : ""}`}>
              <div className={`size-8 rounded-full grid place-items-center shrink-0 text-xs font-bold ${
                t.role === "tutor" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
              }`}>
                {t.role === "tutor" ? "AI" : "YT"}
              </div>
              <div className={`max-w-md p-4 rounded-2xl text-sm leading-relaxed ${
                t.role === "tutor" ? "bg-secondary/60" : "bg-primary text-primary-foreground"
              }`}>
                {t.body}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2 p-2 bg-secondary/40 border border-border rounded-xl">
            <input className="flex-1 bg-transparent px-3 text-sm outline-none" placeholder="Ask anything about your courses..." />
            <button className="size-9 grid place-items-center bg-primary text-primary-foreground rounded-lg">
              <Send className="size-4" />
            </button>
          </div>
        </div>
      </section>

      <aside className="col-span-12 lg:col-span-4 space-y-5">
        <div className="p-6 bg-card border border-border rounded-3xl">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">Suggested prompts</p>
          <ul className="space-y-2">
            {suggestions.map((s) => (
              <li key={s}>
                <button className="w-full text-left text-sm p-3 rounded-lg hover:bg-secondary/60 border border-border transition-colors">
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 bg-foreground text-background rounded-3xl">
          <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">This week</p>
          <p className="text-2xl font-extrabold">3 sessions</p>
          <p className="text-sm text-background/60 mt-1">avg. 22 min · 87% recall accuracy</p>
        </div>
      </aside>
    </div>
  );
}
