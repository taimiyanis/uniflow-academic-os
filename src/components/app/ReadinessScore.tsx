import { readinessBreakdown } from "@/lib/readiness";

interface Props {
  examCode: string;
  size?: number;
}

export function ReadinessScore({ examCode, size = 180 }: Props) {
  const { total, coverage, recall, practice } = readinessBreakdown(examCode);
  const r = (size - 20) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (total / 100) * c;

  return (
    <div className="text-center">
      <div className="relative inline-block" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="-rotate-90 size-full">
          <circle cx={size / 2} cy={size / 2} r={r} stroke="currentColor" strokeWidth={12} fill="none" className="text-secondary" />
          <circle cx={size / 2} cy={size / 2} r={r} stroke="currentColor" strokeWidth={12} fill="none" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" className="text-primary transition-all duration-1000" />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div>
            <p className="text-5xl font-extrabold tracking-tight">{total}<span className="text-base text-muted-foreground">%</span></p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">ready</p>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <Metric label="Coverage" value={coverage} />
        <Metric label="Recall" value={recall} />
        <Metric label="Practice" value={practice} />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="text-sm font-bold font-mono mt-1">{value}%</p>
    </div>
  );
}
