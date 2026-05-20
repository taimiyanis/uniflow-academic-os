import { useRouterState } from "@tanstack/react-router";
import { Search, Bell } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const labels: Record<string, string> = {
  "/app": "Dashboard",
  "/app/library": "Library",
  "/app/practice": "Practice",
  "/app/tutor": "AI Tutor",
  "/app/planner": "Planner",
  "/app/focus": "Focus Mode",
  "/app/analytics": "Progress",
  "/app/exam": "Exam Prep",
};

export function AppTopbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  let label = labels[pathname] ?? "Workspace";
  if (pathname.startsWith("/app/courses/")) label = "Course";
  else if (pathname.startsWith("/app/library/")) label = "Lesson";
  else if (pathname.startsWith("/app/practice/flashcards/")) label = "Review session";
  else if (pathname.startsWith("/app/exam/")) label = "Exam plan";

  return (
    <header className="h-14 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30 flex items-center px-8 gap-6">
      <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
        <span>Uniflow</span>
        <span>/</span>
        <span className="text-foreground">{label}</span>
      </div>
      <div className="flex-1 max-w-md mx-auto">
        <button
          onClick={onOpenPalette}
          className="w-full h-9 px-3 flex items-center gap-2.5 bg-secondary/60 border border-border rounded-lg text-sm text-muted-foreground hover:bg-secondary/80 transition-colors"
        >
          <Search className="size-4" />
          <span className="flex-1 text-left">Search lessons, courses, decks...</span>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-card border border-border rounded">⌘K</kbd>
        </button>
      </div>
      <ThemeToggle />
      <button className="size-9 grid place-items-center hover:bg-secondary/60 rounded-lg">
        <Bell className="size-4 text-muted-foreground" />
      </button>
      <div className="size-9 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-bold">YT</div>
    </header>
  );
}
