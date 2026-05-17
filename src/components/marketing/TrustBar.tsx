const institutions = ["ESCP BIM", "HEC PARIS", "INSEAD", "LSE", "OXFORD SAID", "WHARTON"];

export function TrustBar() {
  return (
    <section className="py-20 border-y border-border/40">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-10">
          Adopted by leading business programs
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-6 opacity-50">
          {institutions.map((name) => (
            <div key={name} className="text-xl font-extrabold tracking-tighter text-foreground">
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
