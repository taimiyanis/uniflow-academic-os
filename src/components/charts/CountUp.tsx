import { useCountUp } from "@/hooks/use-count-up";

export function CountUp({ value, decimals = 0, suffix = "", prefix = "" }: { value: number; decimals?: number; suffix?: string; prefix?: string }) {
  const v = useCountUp(value);
  return (
    <span>
      {prefix}
      {decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString()}
      {suffix}
    </span>
  );
}
