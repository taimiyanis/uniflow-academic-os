import { createFileRoute, Outlet } from "@tanstack/react-router";

import { AppSidebar } from "@/components/app/AppSidebar";
import { AppTopbar } from "@/components/app/AppTopbar";
import { CommandPalette } from "@/components/app/CommandPalette";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Workspace — Uniflow" },
      { name: "description", content: "Your academic workspace: notes, tutor, planner, and exam prep." },
    ],
  }),
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppTopbar onOpenPalette={() => window.dispatchEvent(new Event("uniflow:open-palette"))} />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
