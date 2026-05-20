import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Uniflow" },
      { name: "description", content: "Research, changelog, and academic practice notes from the Uniflow team." },
    ],
  }),
  component: ResourcesPage,
});

const posts = [
  { tag: "Research", date: "May 2026", title: "Cognitive load and the modern syllabus", excerpt: "What happens when we treat note-taking as an information architecture problem, not a productivity one." },
  { tag: "Changelog", date: "April 2026", title: "Uniflow 2.4 — Library refresh", excerpt: "A faster reader, deeper concept linking, and quieter formatting controls across every lesson." },
  { tag: "Field notes", date: "March 2026", title: "How ESCP BIM piloted Uniflow", excerpt: "Three cohorts, one semester, +14 points on average finals scores." },
  { tag: "Research", date: "February 2026", title: "Designing for academic calm", excerpt: "The five interface principles that guide every screen in Uniflow." },
];

function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-5">Resources</p>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-balance">
            Notes from the team.
          </h1>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {posts.map((p) => (
            <article key={p.title} className="py-8 grid md:grid-cols-[140px_120px_1fr] gap-6 group cursor-pointer">
              <p className="text-xs font-mono uppercase tracking-widest text-primary">{p.tag}</p>
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{p.date}</p>
              <div>
                <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
