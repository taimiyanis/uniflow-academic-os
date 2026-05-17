const quotes = [
  { quote: "Uniflow replaced four apps in my workflow. My finals prep felt structured for the first time.", name: "Léa Marchand", role: "M1 · HEC Paris" },
  { quote: "The AI tutor explains case studies the way a TA would — not like a chatbot. Calm and precise.", name: "Tomás Ribeiro", role: "BBA · ESCP" },
  { quote: "I stopped dreading exam season. The planner just shows me what to do next.", name: "Amelia Chen", role: "MSc · LSE" },
];

export function TestimonialRow() {
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Students</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
            Less stress. More clarity.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((q) => (
            <figure key={q.name} className="p-7 bg-card border border-border rounded-3xl">
              <blockquote className="text-base leading-relaxed text-foreground">
                "{q.quote}"
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-border">
                <p className="text-sm font-semibold">{q.name}</p>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">{q.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
