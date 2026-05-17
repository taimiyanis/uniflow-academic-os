import { Link } from "@tanstack/react-router";

export function InstitutionalCTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto bg-foreground rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/30 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/20 blur-[120px]" />
        <div className="relative z-10">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-5">For Universities</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-background mb-6 tracking-tight text-balance max-w-2xl mx-auto">
            Deploy Uniflow across your faculty.
          </h2>
          <p className="text-background/60 mb-10 max-w-xl mx-auto text-lg">
            Engagement analytics, adoption tracking, and content moderation in one enterprise-grade institutional dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/admin" className="bg-primary text-primary-foreground px-7 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-all">
              View admin demo
            </Link>
            <Link to="/institutional" className="bg-background/10 text-background border border-background/15 px-7 py-3.5 rounded-lg font-semibold hover:bg-background/15 transition-all">
              Request a pilot
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
