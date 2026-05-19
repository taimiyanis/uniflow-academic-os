import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Plus, FileText, Layers, CalendarPlus, BookOpen } from "lucide-react";
import { tutorThreads, type TutorMessage } from "@/data/tutor";

export const Route = createFileRoute("/app/tutor")({
  head: () => ({
    meta: [
      { title: "AI Tutor — Uniflow" },
      { name: "description", content: "Conversational tutoring grounded in your notes, decks and syllabus." },
    ],
  }),
  component: TutorPage,
});

const suggestions = [
  "Explain the IS-LM model with a real-world example",
  "Generate a 10-question quiz from Chapter 4",
  "Summarize today's Macroeconomics lecture in 5 bullets",
  "What's the difference between Article 101 and 102?",
];

const cannedResponse =
  "Liquidity preference is Keynes's theory that money demand arises from three motives: transactions, precautionary, and speculative. The demand curve slopes down in (i, M) space — when the interest rate rises, the opportunity cost of holding cash rises, so people hold less. Equilibrium is reached when money supply, set by the central bank, equals demand. That's the foundation of the LM curve.";

function TutorPage() {
  const [activeId, setActiveId] = useState(tutorThreads[0].id);
  const [draft, setDraft] = useState("");
  const [extra, setExtra] = useState<Record<string, TutorMessage[]>>({});
  const [streaming, setStreaming] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const active = tutorThreads.find((t) => t.id === activeId)!;
  const messages = [...active.messages, ...(extra[activeId] ?? [])];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, streaming]);

  const send = (text?: string) => {
    const body = (text ?? draft).trim();
    if (!body) return;
    setDraft("");
    setExtra((m) => ({ ...m, [activeId]: [...(m[activeId] ?? []), { role: "you", body }] }));
    setStreaming("");
    let i = 0;
    const interval = setInterval(() => {
      i += 3;
      const slice = cannedResponse.slice(0, i);
      setStreaming(slice);
      if (i >= cannedResponse.length) {
        clearInterval(interval);
        setStreaming(null);
        setExtra((m) => ({
          ...m,
          [activeId]: [...(m[activeId] ?? []), { role: "tutor", body: cannedResponse, citations: [{ note: "IS-LM Model — Chapter 4", id: "is-lm-ch4" }] }],
        }));
      }
    }, 35);
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-5 h-[calc(100vh-7rem)]">
      {/* Thread list */}
      <aside className="hidden lg:flex col-span-3 bg-card border border-border rounded-3xl flex-col overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Conversations</p>
          <button className="size-7 grid place-items-center rounded-lg border border-border hover:bg-secondary/60">
            <Plus className="size-3.5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {tutorThreads.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveId(t.id)}
              className={`w-full text-left p-3 rounded-xl transition-colors ${activeId === t.id ? "bg-primary-soft" : "hover:bg-secondary/50"}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary">{t.course}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{t.time}</span>
              </div>
              <p className="text-sm font-semibold truncate">{t.title}</p>
            </button>
          ))}
        </div>
      </aside>

      {/* Conversation */}
      <section className="col-span-12 lg:col-span-6 bg-card border border-border rounded-3xl flex flex-col overflow-hidden">
        <header className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg bg-primary grid place-items-center">
              <Sparkles className="size-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold">{active.title}</p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{active.course} · grounded in your notes</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${t.role === "you" ? "flex-row-reverse" : ""}`}
            >
              <div className={`size-8 rounded-full grid place-items-center shrink-0 text-xs font-bold ${t.role === "tutor" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                {t.role === "tutor" ? "AI" : "YT"}
              </div>
              <div className={`max-w-md ${t.role === "tutor" ? "" : "items-end"}`}>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${t.role === "tutor" ? "bg-secondary/60" : "bg-primary text-primary-foreground"}`}>
                  {t.body}
                </div>
                {t.citations && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {t.citations.map((c) => (
                      <span key={c.id} className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono uppercase tracking-widest bg-primary-soft text-primary rounded">
                        <BookOpen className="size-3" /> {c.note}
                      </span>
                    ))}
                  </div>
                )}
                {t.role === "tutor" && i === messages.length - 1 && !streaming && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      { icon: Layers, label: "Turn into flashcards" },
                      { icon: CalendarPlus, label: "Add to plan" },
                      { icon: FileText, label: "Save as note" },
                    ].map((a) => (
                      <button key={a.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-secondary/60">
                        <a.icon className="size-3.5" /> {a.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {streaming !== null && (
            <div className="flex gap-3">
              <div className="size-8 rounded-full grid place-items-center shrink-0 text-xs font-bold bg-primary text-primary-foreground">AI</div>
              <div className="max-w-md p-4 rounded-2xl text-sm leading-relaxed bg-secondary/60">
                {streaming}
                <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-primary align-middle animate-pulse" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2 p-2 bg-secondary/40 border border-border rounded-xl">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="flex-1 bg-transparent px-3 text-sm outline-none"
              placeholder="Ask anything about your courses..."
            />
            <button onClick={() => send()} className="size-9 grid place-items-center bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              <Send className="size-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Right rail */}
      <aside className="hidden lg:flex col-span-3 flex-col gap-5">
        <div className="p-5 bg-card border border-border rounded-3xl">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">Suggested prompts</p>
          <ul className="space-y-2">
            {suggestions.map((s) => (
              <li key={s}>
                <button onClick={() => send(s)} className="w-full text-left text-xs p-2.5 rounded-lg hover:bg-secondary/60 border border-border transition-colors">
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 bg-foreground text-background rounded-3xl">
          <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-2">This week</p>
          <p className="text-2xl font-extrabold">3 sessions</p>
          <p className="text-xs text-background/60 mt-1">avg. 22 min · 87% recall</p>
        </div>
      </aside>
    </div>
  );
}
