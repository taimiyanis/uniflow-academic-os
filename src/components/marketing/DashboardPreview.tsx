export function DashboardPreview() {
  return (
    <div className="relative animate-fade-up" style={{ animationDelay: "200ms" }}>
      <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-[3rem] -z-10 opacity-60" />
      <div className="bg-card rounded-[2rem] border border-border/60 shadow-[var(--shadow-elegant)] overflow-hidden ring-1 ring-foreground/5">
        {/* Mock window chrome */}
        <div className="h-11 border-b border-border bg-secondary/40 flex items-center px-4 gap-3">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-border" />
            <div className="size-2.5 rounded-full bg-border" />
            <div className="size-2.5 rounded-full bg-border" />
          </div>
          <div className="h-4 w-px bg-border mx-2" />
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            uniflow / dashboard / fall 2025
          </div>
        </div>

        <div className="flex h-[560px]">
          {/* Mini sidebar */}
          <aside className="w-60 border-r border-border p-5 bg-secondary/20 hidden lg:flex flex-col">
            <div className="space-y-1">
              <SidebarRow active label="Dashboard" />
              <SidebarRow label="Library" />
              <SidebarRow label="Practice" />
              <SidebarRow label="AI Tutor" />
              <SidebarRow label="Planner" />
            </div>
            <div className="pt-5 mt-5 border-t border-border">
              <p className="text-[10px] font-bold text-muted-foreground uppercase mb-3 tracking-widest">Courses</p>
              <div className="space-y-2.5">
                <CourseLine name="Macroeconomics" pct="92%" />
                <CourseLine name="Corp Finance" pct="84%" dim />
                <CourseLine name="Bus. Law EU" pct="76%" dim />
              </div>
            </div>
            <div className="mt-auto p-3 rounded-lg bg-primary-soft/60 border border-primary/10">
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary">Uniflow+</p>
              <p className="text-xs font-semibold mt-1">Unlock AI tutor</p>
            </div>
          </aside>

          {/* Main */}
          <section className="flex-1 p-7 overflow-hidden bg-card">
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Good morning, Yanis</h3>
                <p className="text-xs text-muted-foreground mt-0.5">B2 · ESCP BIM · Fall 2025</p>
              </div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">4 deadlines · 14 days to finals</div>
            </div>

            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-8 space-y-5">
                <div className="p-5 rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-primary)] relative overflow-hidden">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-primary-foreground/70 mb-2">AI Tutor</p>
                  <h4 className="text-lg font-semibold mb-1.5">Review the IS-LM model</h4>
                  <p className="text-xs text-primary-foreground/75 max-w-md mb-4">
                    Three concepts flagged from yesterday's lecture. Recommended 22-minute session.
                  </p>
                  <button className="px-3.5 py-1.5 bg-card text-primary text-xs font-bold rounded-md">
                    Resume session →
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl border border-border bg-card">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Weekly Goal</p>
                    <p className="text-2xl font-extrabold mt-2">14<span className="text-muted-foreground text-sm font-medium">/20h</span></p>
                    <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "70%" }} />
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl border border-border bg-card">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Next Exam</p>
                    <p className="text-2xl font-extrabold mt-2">14 days</p>
                    <p className="text-[11px] text-muted-foreground mt-1">Macroeconomics · 22 May</p>
                  </div>
                </div>
              </div>

              <div className="col-span-4 p-5 rounded-2xl bg-secondary/40 border border-border">
                <div className="flex items-center justify-between mb-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Practice queue</p>
                  <p className="text-[10px] font-mono text-primary">start</p>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: "IS-LM flashcards", meta: "15 due" },
                    { label: "Fiscal expansion exercise", meta: "12 min" },
                    { label: "2024 mock exam", meta: "120 min" },
                  ].map((n) => (
                    <div key={n.label} className="p-3 bg-card border border-border rounded-lg">
                      <p className="text-xs font-semibold">{n.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{n.meta}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function SidebarRow({ label, active }: { label: string; active?: boolean }) {
  return (
    <div className={`h-8 rounded-md w-full flex items-center px-3 gap-2 ${active ? "bg-primary/10" : ""}`}>
      <div className={`size-2.5 rounded-sm ${active ? "bg-primary" : "bg-border"}`} />
      <span className={`text-xs font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
    </div>
  );
}

function CourseLine({ name, pct, dim }: { name: string; pct: string; dim?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${dim ? "opacity-50" : ""}`}>
      <span className="text-xs font-medium">{name}</span>
      <span className="text-[10px] font-mono text-primary bg-primary-soft px-1.5 py-0.5 rounded">{pct}</span>
    </div>
  );
}
