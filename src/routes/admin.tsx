import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Institutional dashboard — Uniflow" },
      { name: "description", content: "Engagement, adoption, content governance and performance analytics for universities." },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30 flex items-center px-8 gap-6">
          <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            Institutional / Analytics
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Fall 2025/2026</span>
            <div className="size-9 rounded-full bg-foreground text-background grid place-items-center text-xs font-bold">AD</div>
          </div>
        </header>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
