interface Props {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}

export function UniflowLogo({ className = "", size = 32, showWordmark = true }: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="bg-primary rounded-lg flex items-center justify-center shrink-0 animate-u"
        style={{ width: size, height: size }}
      >
        <svg
          width={size * 0.5}
          height={size * 0.55}
          viewBox="0 0 16 18"
          fill="none"
          aria-hidden
        >
          <path
            d="M2 2v8a6 6 0 0 0 12 0V2"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="square"
            className="text-primary-foreground"
          />
        </svg>
      </div>
      {showWordmark && (
        <span className="font-extrabold tracking-tight uppercase text-foreground" style={{ fontSize: size * 0.6 }}>
          Uniflow
        </span>
      )}
    </div>
  );
}
