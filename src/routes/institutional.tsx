import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { TrustBar } from "@/components/marketing/TrustBar";

export const Route = createFileRoute("/institutional")({
  head: () => ({
    meta: [
      { title: "For Institutions — Uniflow" },
      { name: "description", content: "Deploy Uniflow across your faculty. Engagement analytics, adoption tracking, and content governance for modern universities." },
      { property: "og:title", content: "Uniflow for Institutions" },
      { property: "og:description", content: "Enterprise-grade academic infrastructure for universities." },
    ],
  }),
  component: InstitutionalPage,
});

const kpis = [
  { label: "Student engagement uplift", value: "+38%" },
  { label: "Average exam score gain", value: "+12pts" },
  { label: "Adoption across cohorts", value: "94%" },
];

const capabilities = [
  { title: "Engagement analytics", body: "Real-time visibility into how cohorts study, where they struggle, and which resources actually move the needle." },
  { title: "Adoption tracking", body: "Per-program rollouts with measurable adoption curves. Identify champions, intervene with stragglers." },
  { title: "Content governance", body: "Moderate AI-generated material, approve institutional content packs, and align with your academic standards." },
  { title: "Single sign-on", body: "SAML, OIDC, and Google Workspace. Roster sync via SCIM. Provisioned in days, not quarters." },
  { title: "Privacy first", body: "FERPA & GDPR compliant. Data residency in the EU. No third-party model training on student data." },
  { title: "Dedicated success", body: "A named partner from kickoff through end-of-semester reviews. Quarterly outcome reports." },
];

function InstitutionalPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-5">For Institutions</p>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-balance mb-6 leading-[1.05]">
              Enterprise clarity for academic leaders.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8">
              The institutional academic operating system. Deploy across faculties, measure adoption, and elevate student outcomes — with the rigor your board expects.
            </p>
            <div className="flex gap-3">
              <Link to="/admin" className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-[var(--shadow-primary)]">
                View admin dashboard →
              </Link>
              <Link to="/resources" className="px-6 py-3 bg-card border border-border font-semibold rounded-lg">
                Download brief
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid md:grid-cols-3 gap-5">
            {kpis.map((k) => (
              <div key={k.label} className="p-8 bg-card border border-border rounded-3xl">
                <p className="text-5xl font-extrabold tracking-tight text-primary">{k.value}</p>
                <p className="mt-3 text-sm text-muted-foreground">{k.label}</p>
              </div>
            ))}
          </div>
        </section>

        <TrustBar />

        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-balance">
              Built for the institutions that shape the next generation of leaders.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((c) => (
              <div key={c.title} className="p-7 bg-card border border-border rounded-3xl hover:border-primary/30 transition-colors">
                <h3 className="text-base font-bold mb-3">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
