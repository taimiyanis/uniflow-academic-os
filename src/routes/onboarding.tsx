import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, GraduationCap, BookOpen, Upload, Building2 } from "lucide-react";
import { UniflowLogo } from "@/components/brand/UniflowLogo";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Get started — Uniflow" },
      { name: "description", content: "Set up your academic workspace in under a minute." },
      { property: "og:title", content: "Get started — Uniflow" },
      { property: "og:description", content: "Set up your academic workspace in under a minute." },
    ],
  }),
  component: Onboarding,
});

const steps = [
  { key: "school", title: "Which school?", icon: Building2, hint: "We'll match the syllabus, calendar, and grading scale." },
  { key: "program", title: "Pick your program", icon: GraduationCap, hint: "This tunes recommendations and exam prep." },
  { key: "courses", title: "Select your courses", icon: BookOpen, hint: "We pre-build decks, notes and exam plans from your syllabus." },
  { key: "upload", title: "Upload a syllabus", icon: Upload, hint: "Optional — speeds up content generation. You can do this later." },
];

const schools = ["ESCP", "HEC Paris", "ESSEC", "EDHEC", "INSEAD", "EM Lyon"];
const programs = ["BBA", "Master in Management", "MSc Finance", "MSc Marketing", "Executive MBA"];
const courseOpts = ["Macroeconomics", "Financial Accounting", "EU Competition Law", "Marketing Strategy", "Corporate Finance", "Statistics", "Operations", "Strategy"];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [school, setSchool] = useState<string>();
  const [program, setProgram] = useState<string>();
  const [picked, setPicked] = useState<string[]>([]);

  const canNext = [school, program, picked.length >= 2, true][step];

  const next = () => {
    if (step === steps.length - 1) navigate({ to: "/app" });
    else setStep((s) => s + 1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="h-16 border-b border-border flex items-center px-8">
        <UniflowLogo size={28} />
        <div className="ml-auto text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Step {step + 1} of {steps.length}</div>
      </header>

      <div className="px-8 pt-2">
        <div className="max-w-3xl mx-auto h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div className="h-full bg-primary" initial={false} animate={{ width: `${((step + 1) / steps.length) * 100}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
        </div>
      </div>

      <main className="flex-1 grid place-items-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="p-10 bg-card border border-border rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-2">
                {(() => {
                  const Icon = steps[step].icon;
                  return <Icon className="size-5 text-primary" />;
                })()}
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{steps[step].key}</p>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">{steps[step].title}</h1>
              <p className="text-sm text-muted-foreground mt-2">{steps[step].hint}</p>

              <div className="mt-8">
                {step === 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {schools.map((s) => (
                      <button key={s} onClick={() => setSchool(s)} className={`p-4 text-left border rounded-xl text-sm font-semibold transition-all ${school === s ? "border-primary bg-primary-soft text-primary" : "border-border hover:border-foreground/30"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
                {step === 1 && (
                  <div className="space-y-2">
                    {programs.map((p) => (
                      <button key={p} onClick={() => setProgram(p)} className={`w-full p-4 text-left border rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${program === p ? "border-primary bg-primary-soft text-primary" : "border-border hover:border-foreground/30"}`}>
                        {p}
                        {program === p && <Check className="size-4" />}
                      </button>
                    ))}
                  </div>
                )}
                {step === 2 && (
                  <div className="grid grid-cols-2 gap-2">
                    {courseOpts.map((c) => {
                      const on = picked.includes(c);
                      return (
                        <button key={c} onClick={() => setPicked((arr) => on ? arr.filter((x) => x !== c) : [...arr, c])} className={`p-3 text-left border rounded-xl text-sm flex items-center justify-between transition-all ${on ? "border-primary bg-primary-soft text-primary font-semibold" : "border-border hover:border-foreground/30"}`}>
                          {c}
                          {on && <Check className="size-4" />}
                        </button>
                      );
                    })}
                  </div>
                )}
                {step === 3 && (
                  <label className="block p-10 border-2 border-dashed border-border rounded-2xl text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="size-8 mx-auto text-muted-foreground" />
                    <p className="mt-3 text-sm font-semibold">Drop your syllabus PDF here</p>
                    <p className="text-xs text-muted-foreground mt-1">or click to browse · optional</p>
                    <input type="file" className="hidden" />
                  </label>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground disabled:opacity-30 px-4 py-2"
            >
              Back
            </button>
            <button
              onClick={next}
              disabled={!canNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {step === steps.length - 1 ? "Enter Uniflow" : "Continue"}
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
