export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`p-6 bg-card border border-border rounded-2xl ${className}`}>
      <div className="h-3 w-16 bg-secondary rounded animate-pulse" />
      <div className="h-4 w-3/4 bg-secondary rounded mt-4 animate-pulse" />
      <div className="h-3 w-1/2 bg-secondary rounded mt-2 animate-pulse" />
      <div className="h-1.5 w-full bg-secondary rounded mt-6 animate-pulse" />
    </div>
  );
}
