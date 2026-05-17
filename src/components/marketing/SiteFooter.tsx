import { Link } from "@tanstack/react-router";
import { UniflowLogo } from "@/components/brand/UniflowLogo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <UniflowLogo size={28} />
          <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
            The academic operating system. Clarity reduces stress.
          </p>
        </div>
        <FooterCol title="Product" links={[["Platform", "/platform"], ["Resources", "/resources"], ["Student App", "/app"]]} />
        <FooterCol title="For institutions" links={[["Overview", "/institutional"], ["Admin demo", "/admin"]]} />
        <FooterCol title="Company" links={[["About", "/"], ["Changelog", "/resources"], ["Privacy", "/"]]} />
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          <span>© 2026 Uniflow Academic Systems</span>
          <span>Built for modern universities</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">{title}</p>
      <ul className="space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link to={href} className="text-sm text-foreground hover:text-primary transition-colors">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
