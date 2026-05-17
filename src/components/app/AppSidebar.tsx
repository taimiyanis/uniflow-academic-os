import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, BookOpen, NotebookPen, Sparkles, Layers, CalendarRange, Focus, BarChart3, Crown } from "lucide-react";
import { UniflowLogo } from "@/components/brand/UniflowLogo";

const items = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/notes", label: "Smart Notes", icon: NotebookPen },
  { to: "/app/tutor", label: "AI Tutor", icon: Sparkles },
  { to: "/app/quizzes", label: "Quizzes", icon: Layers },
  { to: "/app/planner", label: "Planner", icon: CalendarRange },
  { to: "/app/focus", label: "Focus", icon: Focus },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-card flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-border">
        <Link to="/">
          <UniflowLogo size={30} />
        </Link>
      </div>

      <div className="px-3 py-4 border-b border-border">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/40 transition-colors">
          <div className="size-9 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-bold">YT</div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">Yanis Taimi</p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">ESCP · B2</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <p className="px-3 pt-2 pb-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Workspace</p>
        {items.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-primary-soft text-primary"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <item.icon className="size-4" strokeWidth={2} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <p className="px-3 pt-6 pb-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Courses</p>
        {[
          ["EC22", "Macroeconomics", "92%"],
          ["AC22", "Financial Acc.", "84%"],
          ["LW22", "Bus. Law EU", "76%"],
          ["MK21", "Marketing", "—"],
        ].map(([code, name, pct]) => (
          <div key={code} className="flex items-center justify-between px-3 py-1.5 text-xs">
            <span className="font-mono text-muted-foreground">{code}</span>
            <span className="font-medium text-foreground truncate flex-1 mx-3">{name}</span>
            <span className="font-mono text-[10px] text-primary">{pct}</span>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        <div className="p-4 rounded-xl bg-foreground text-background relative overflow-hidden">
          <div className="absolute -top-8 -right-8 size-24 bg-primary/30 rounded-full blur-2xl" />
          <Crown className="size-4 text-primary mb-2 relative" />
          <p className="text-sm font-bold relative">Uniflow+</p>
          <p className="text-[11px] text-background/60 mt-0.5 relative">Unlimited AI tutor & analytics</p>
          <button className="relative mt-3 w-full text-xs font-bold py-1.5 rounded-md bg-primary text-primary-foreground">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
