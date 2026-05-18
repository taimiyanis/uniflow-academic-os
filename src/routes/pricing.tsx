import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Uniflow" },
      { name: "description", content: "Simple pricing for students, ambitious learners, and universities." },
      { property: "og:title", content: "Pricing — Uniflow" },
      { property: "og:description", content: "Simple pricing for students and universities." },
    ],
  }),
  component: PricingPage,
});

const tiers = [
  { name: "Student", price: "Free", desc: "The essentials for solo study.", cta: "Get started", features: ["Smart Notes", "5 flashcard decks", "20 tutor messages / week", "Focus mode"], featured: false },
  { name: "Student+", price: "€8", suffix: "/mo", desc: "For students who want every edge.", cta: "Upgrade", features: ["Unlimited decks & notes", "Unlimited AI tutor", "Exam Prep mode", "Performance analytics", "Spaced-repetition tuning"], featured: true },
  { name: "Institution", price: "Custom", desc: "Deploy across cohorts with governance.", cta: "Talk to sales", features: ["Everything in Student+", "Institutional dashboard", "Cohort analytics & at-risk detection", "SSO & SCIM", "Content governance", "Dedicated success manager"], featured: false },
];

function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-5">Pricing</p>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-balance mb-5">Simple, calm, fair.</h1>
          <p className="text-lg text-muted-foreground">Free for everyone. Paid only when you want more depth.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div key={t.name} className={`p-8 rounded-3xl border ${t.featured ? "bg-foreground text-background border-foreground shadow-[var(--shadow-elegant)]" : "bg-card border-border"}`}>
              <p className={`text-[10px] font-mono uppercase tracking-widest mb-4 ${t.featured ? "text-primary" : "text-muted-foreground"}`}>{t.name}</p>
              <p className="text-4xl font-extrabold tracking-tight">{t.price}<span className={`text-base font-medium ml-1 ${t.featured ? "text-background/60" : "text-muted-foreground"}`}>{t.suffix ?? ""}</span></p>
              <p className={`text-sm mt-2 ${t.featured ? "text-background/70" : "text-muted-foreground"}`}>{t.desc}</p>
              <Link to="/app" className={`mt-6 w-full block text-center py-2.5 rounded-lg font-semibold text-sm ${t.featured ? "bg-primary text-primary-foreground" : "border border-border hover:bg-secondary/60"}`}>{t.cta}</Link>
              <ul className="mt-8 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className={`size-4 mt-0.5 shrink-0 ${t.featured ? "text-primary" : "text-primary"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
