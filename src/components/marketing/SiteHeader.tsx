import { Link } from "@tanstack/react-router";
import { UniflowLogo } from "@/components/brand/UniflowLogo";

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center">
            <UniflowLogo size={32} />
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/platform" className="hover:text-primary transition-colors" activeProps={{ className: "text-foreground" }}>Platform</Link>
            <Link to="/institutional" className="hover:text-primary transition-colors" activeProps={{ className: "text-foreground" }}>Institutional</Link>
            <Link to="/pricing" className="hover:text-primary transition-colors" activeProps={{ className: "text-foreground" }}>Pricing</Link>
            <Link to="/resources" className="hover:text-primary transition-colors" activeProps={{ className: "text-foreground" }}>Resources</Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/app" className="hidden sm:inline-flex text-sm font-semibold px-4 py-2 hover:bg-foreground/5 rounded-lg transition-colors">
            Sign In
          </Link>
          <Link
            to="/onboarding"
            className="text-sm font-semibold bg-primary text-primary-foreground px-5 py-2.5 rounded-lg shadow-[var(--shadow-primary)] hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            Get Access
          </Link>
        </div>
      </div>
    </nav>
  );
}
