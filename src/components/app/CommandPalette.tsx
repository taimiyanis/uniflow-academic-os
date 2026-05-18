import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard, NotebookPen, Sparkles, Layers, CalendarRange,
  Focus, BarChart3, GraduationCap, Plus, BookOpen,
} from "lucide-react";
import { courses } from "@/data/courses";
import { notes } from "@/data/notes";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const go = (to: string) => {
    setOpen(false);
    navigate({ to });
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search or jump to..." />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go("/app")}><LayoutDashboard className="size-4" /> Dashboard</CommandItem>
          <CommandItem onSelect={() => go("/app/notes")}><NotebookPen className="size-4" /> Smart Notes</CommandItem>
          <CommandItem onSelect={() => go("/app/tutor")}><Sparkles className="size-4" /> AI Tutor</CommandItem>
          <CommandItem onSelect={() => go("/app/quizzes")}><Layers className="size-4" /> Quizzes</CommandItem>
          <CommandItem onSelect={() => go("/app/exam")}><GraduationCap className="size-4" /> Exam Prep</CommandItem>
          <CommandItem onSelect={() => go("/app/planner")}><CalendarRange className="size-4" /> Planner</CommandItem>
          <CommandItem onSelect={() => go("/app/focus")}><Focus className="size-4" /> Focus</CommandItem>
          <CommandItem onSelect={() => go("/app/analytics")}><BarChart3 className="size-4" /> Analytics</CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Create">
          <CommandItem onSelect={() => go("/app/notes")}><Plus className="size-4" /> New note</CommandItem>
          <CommandItem onSelect={() => go("/app/quizzes")}><Plus className="size-4" /> New flashcard deck</CommandItem>
          <CommandItem onSelect={() => go("/app/focus")}><Plus className="size-4" /> Start focus session</CommandItem>
          <CommandItem onSelect={() => go("/app/exam")}><Plus className="size-4" /> Plan an exam</CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Switch course">
          {courses.map((c) => (
            <CommandItem key={c.code} onSelect={() => go(`/app/courses/${c.code}`)}>
              <BookOpen className="size-4" />
              <span className="font-mono text-xs text-muted-foreground mr-2">{c.code}</span> {c.name}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Recent notes">
          {notes.slice(0, 4).map((n) => (
            <CommandItem key={n.id} onSelect={() => go(`/app/notes/${n.id}`)}>
              <NotebookPen className="size-4" />
              <span className="font-mono text-xs text-muted-foreground mr-2">{n.code}</span> {n.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
