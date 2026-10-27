import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  image: string;
}) {
  return (
    <section className="relative overflow-hidden border-b bg-surface">
      {/* Background Image */}
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />

      {/* Hero Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          {/* Eyebrow */}
          <p className="eyebrow">{eyebrow}</p>

          {/* Title */}
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold uppercase leading-tight sm:text-4xl md:text-5xl">
            {title}{" "}
            {highlight ? (
              <span className="text-primary">{highlight}</span>
            ) : null}
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-2xl break-words text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mt-6 flex max-w-full flex-wrap items-center gap-1 text-xs text-muted-foreground"
          >
            <Link to="/" className="shrink-0 hover:text-primary">
              Home
            </Link>

            <ChevronRight className="h-3.5 w-3.5 shrink-0" />

            <span className="min-w-0 break-words text-foreground">
              {title}
              {highlight ? ` ${highlight}` : ""}
            </span>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="w-full overflow-hidden bg-ink text-ink-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">

        {/* CTA Text */}
        <Reveal>
          <div className="min-w-0 max-w-3xl">
            <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
              Ready to optimise your{" "}
              <span className="text-primary">
                facility operations?
              </span>
            </h2>

            <p className="mt-2 max-w-2xl break-words text-sm leading-relaxed text-ink-foreground/70 sm:text-base">
              Talk to our experts for a tailored property and facility
              management plan.
            </p>
          </div>
        </Reveal>

        {/* CTA Button */}
        <Reveal delay={100}>
          <Link
            to="/contact"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Request a Proposal
          </Link>
        </Reveal>

      </div>
    </section>
  );
}