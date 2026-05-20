import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard, Library, Dumbbell, Sparkles, CalendarRange,
  Focus, BarChart3, GraduationCap, BookOpen, FileText,
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
    const openEvt = () => setOpen(true);
    window.addEventListener("keydown", handler);
    window.addEventListener("uniflow:open-palette", openEvt);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("uniflow:open-palette", openEvt);
    };
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
          <CommandItem onSelect={() => go("/app/library")}><Library className="size-4" /> Library</CommandItem>
          <CommandItem onSelect={() => go("/app/practice")}><Dumbbell className="size-4" /> Practice</CommandItem>
          <CommandItem onSelect={() => go("/app/exam")}><GraduationCap className="size-4" /> Exam Prep</CommandItem>
          <CommandItem onSelect={() => go("/app/tutor")}><Sparkles className="size-4" /> AI Tutor</CommandItem>
          <CommandItem onSelect={() => go("/app/planner")}><CalendarRange className="size-4" /> Planner</CommandItem>
          <CommandItem onSelect={() => go("/app/focus")}><Focus className="size-4" /> Focus</CommandItem>
          <CommandItem onSelect={() => go("/app/analytics")}><BarChart3 className="size-4" /> Progress</CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Courses">
          {courses.map((c) => (
            <CommandItem key={c.code} onSelect={() => go(`/app/library/${c.code}`)}>
              <BookOpen className="size-4" />
              <span className="font-mono text-xs text-muted-foreground mr-2">{c.code}</span> {c.name}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Recent lessons">
          {notes.slice(0, 5).map((n) => (
            <CommandItem key={n.id} onSelect={() => go(`/app/library/${n.code}/${n.id}`)}>
              <FileText className="size-4" />
              <span className="font-mono text-xs text-muted-foreground mr-2">{n.code}</span> {n.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
