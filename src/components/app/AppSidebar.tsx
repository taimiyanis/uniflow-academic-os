import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Library, Dumbbell, Sparkles, CalendarRange,
  Focus, BarChart3, GraduationCap, BookOpen, Building2,
} from "lucide-react";
import { UniflowLogo } from "@/components/brand/UniflowLogo";
import { Sparkline } from "@/components/charts/Sparkline";
import { courses } from "@/data/courses";

const items = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/library", label: "Library", icon: Library },
  { to: "/app/practice", label: "Practice", icon: Dumbbell },
  { to: "/app/exam", label: "Exam Prep", icon: GraduationCap },
  { to: "/app/tutor", label: "AI Tutor", icon: Sparkles },
  { to: "/app/planner", label: "Planner", icon: CalendarRange },
  { to: "/app/focus", label: "Focus", icon: Focus },
  { to: "/app/analytics", label: "Progress", icon: BarChart3 },
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
              className={`relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="app-sidebar-active"
                  className="absolute inset-0 bg-primary-soft rounded-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 36 }}
                />
              )}
              <item.icon className="size-4 relative" strokeWidth={2} />
              <span className="relative">{item.label}</span>
            </Link>
          );
        })}

        <p className="px-3 pt-6 pb-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Courses</p>
        {courses.map((c) => (
          <Link
            key={c.code}
            to="/app/courses/$code"
            params={{ code: c.code }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-secondary/50 group"
          >
            <BookOpen className="size-3 text-muted-foreground" />
            <span className="font-mono text-[10px] text-muted-foreground">{c.code}</span>
            <span className="text-xs font-medium text-foreground truncate flex-1">{c.name}</span>
            <Sparkline data={c.trend} width={32} height={14} className="text-primary opacity-60 group-hover:opacity-100" fill={false} />
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        <div className="px-3 py-3 rounded-lg bg-secondary/40 flex items-center gap-3">
          <Building2 className="size-4 text-muted-foreground shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Institution</p>
            <p className="text-xs font-semibold truncate">ESCP Business School</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
