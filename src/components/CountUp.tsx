import { useEffect, useRef, useState } from "react";

/**
 * Scroll-triggered number counter.
 * Parses a stat string like "250+", "8+", "1.2 Mn" or "24/7".
 * Non-numeric / ratio values (e.g. "24/7") are rendered as-is.
 */
function parse(value: string) {
  // Treat ratio-style values such as 24/7 as literal text.
  if (/\d\s*\/\s*\d/.test(value)) return null;
  const match = value.match(/^([^\d-]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const num = match[2] ?? "0";
  return {
    prefix: match[1] ?? "",
    target: Number(num),
    suffix: match[3] ?? "",
    decimals: (num.split(".")[1] ?? "").length,
  };
}

export function CountUp({
  value,
  duration = 1600,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() =>
    parsed ? `${parsed.prefix}0${parsed.suffix}` : value,
  );

  useEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () =>
      setDisplay(
        `${parsed.prefix}${parsed.target.toFixed(parsed.decimals)}${parsed.suffix}`,
      );

    if (reduced) {
      finish();
      return;
    }

    let raf = 0;
    let start = 0;
    const run = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(
        `${parsed.prefix}${(parsed.target * eased).toFixed(parsed.decimals)}${parsed.suffix}`,
      );
      if (p < 1) raf = requestAnimationFrame(run);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          raf = requestAnimationFrame(run);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

export function StatGrid({
  items,
  className = "",
}: {
  items: readonly { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-2 divide-border rounded-xl border bg-card shadow-card lg:grid-cols-4 ${className}`}
    >
      {items.map((s) => (
        <div key={s.label} className="border-b border-r p-6 text-center last:border-r-0">
          <p className="text-2xl font-extrabold text-primary sm:text-3xl">
            <CountUp value={s.value} />
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
