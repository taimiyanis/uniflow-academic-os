import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { Hero } from "@/components/marketing/Hero";
import { TrustBar } from "@/components/marketing/TrustBar";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { TestimonialRow } from "@/components/marketing/TestimonialRow";
import { InstitutionalCTA } from "@/components/marketing/InstitutionalCTA";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <TrustBar />
        <FeatureGrid />
        <TestimonialRow />
        <InstitutionalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
