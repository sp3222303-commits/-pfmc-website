import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },

      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  align = "center",
  description,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  align?: "center" | "left";
  description?: string;
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl md:text-4xl">
        {title} {highlight ? <span className="text-primary">{highlight}</span> : null}
      </h2>
      {description ? (
        <p
          className={`mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
