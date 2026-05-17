import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, Activity, ShieldCheck, TrendingUp, ArrowLeft } from "lucide-react";
import { UniflowLogo } from "@/components/brand/UniflowLogo";

const items = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/engagement", label: "Engagement", icon: Activity },
  { to: "/admin/adoption", label: "Adoption", icon: TrendingUp },
  { to: "/admin/content", label: "Content", icon: ShieldCheck },
];

export function AdminSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="w-60 shrink-0 border-r border-border bg-card flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-border">
        <Link to="/">
          <UniflowLogo size={28} />
        </Link>
        <p className="mt-3 text-[10px] font-mono uppercase tracking-widest text-primary">Institutional</p>
      </div>

      <div className="px-3 py-4 border-b border-border">
        <div className="flex items-center gap-3 p-2">
          <div className="size-9 rounded-lg bg-foreground text-background grid place-items-center">
            <Users className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">ESCP BIM</p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">3,420 students</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        <p className="px-3 pt-2 pb-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Analytics</p>
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
              <item.icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <Link to="/app" className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary px-3 py-2">
          <ArrowLeft className="size-3.5" />
          Student view
        </Link>
      </div>
    </aside>
  );
}
