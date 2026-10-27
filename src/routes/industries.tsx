import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { PageHero, CtaBand } from "@/components/PageHero";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { industries } from "@/lib/site-data";
import whyTower from "@/assets/why-tower.jpg";
import { Shield, Users, Gauge } from "lucide-react";

// =====================================================
// Counter animation (Same as About page)
// =====================================================

function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let start = 0;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;

            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return { count, ref };
}

function Industries() {
  const complianceFeatures = [
    {
      icon: Shield,
      title: "Safety & Compliance",
      description:
        "Statutory checks, permits to work and documented drills.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Users,
      title: "Trained Manpower",
      description:
        "Sector-specific induction and refresher training every quarter.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Gauge,
      title: "Measurable SLAs",
      description:
        "Response, resolution and uptime tracked on live dashboards.",
      color: "from-purple-500 to-pink-500",
    },
  ];

  // =====================================================
  // Counters for stats
  // =====================================================

  const { count: clientsCount, ref: clientsRef } = useCounter(500);
  const { count: verticalsCount, ref: verticalsRef } = useCounter(12);
  const { count: facilitiesCount, ref: facilitiesRef } = useCounter(50000);
  const { count: retentionCount, ref: retentionRef } = useCounter(98);

  return (
    <>
      <PageHero
        eyebrow="Industries We Serve"
        title="Expertise Across"
        highlight="Every Industry"
        description="Each sector runs differently. Our scopes, staffing and compliance frameworks are tailored to the way your facility actually operates."
        image={whyTower}
      />

      {/* Industry Cards Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <div className="mb-10 text-center">
          <Reveal>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Our Coverage
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Industries We <span className="text-gradient">Empower</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Delivering tailored facility management solutions across India's
              most demanding sectors
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 60}>
              <article className="group relative h-full overflow-hidden rounded-2xl border bg-card shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-2xl">
                {/* Industry image */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <img
                    src={ind.image}
                    alt={`${ind.name} facility`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(event) => {
                      event.currentTarget.src = whyTower;
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-primary shadow-lg backdrop-blur-sm">
                    <ind.icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="relative p-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <h2 className="relative text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
                    {ind.name}
                  </h2>

                  <p className="relative mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {ind.blurb}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Compliance Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface via-surface to-background py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Sector Standards
              </span>

              <SectionHeading
                eyebrow=""
                title="Compliance built into"
                highlight="every scope"
                description="From hygiene audits in healthcare to fire and safety drills in industrial plants, our SOPs follow the standards your sector is measured against."
              />
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {complianceFeatures.map((feature, i) => {
              const Icon = feature.icon;

              return (
                <Reveal key={feature.title} delay={i * 90}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border bg-card p-8 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-2xl">
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
                    />

                    <div
                      className={`mb-5 inline-flex rounded-xl bg-gradient-to-br ${feature.color} p-3.5 text-white shadow-lg`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="text-xl font-bold tracking-tight">
                      {feature.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>

                    <span className="absolute -bottom-2 -right-2 select-none text-8xl font-bold text-muted-foreground/5">
                      {i + 1}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS BAR - Clean floating box (Matching screenshot)
      ===================================================== */}

      <div className="mx-auto max-w-5xl px-4 pb-16 md:pb-20">
        <div className="grid grid-cols-2 divide-x divide-border rounded-2xl border bg-card shadow-xl lg:grid-cols-4">
          {[
            {
              label: "Clients Served",
              ref: clientsRef,
              value: clientsCount,
              suffix: "+",
            },
            {
              label: "Industry Verticals",
              ref: verticalsRef,
              value: verticalsCount,
              suffix: "",
            },
            {
              label: "Facilities Managed",
              ref: facilitiesRef,
              value: facilitiesCount,
              suffix: "+",
            },
            {
              label: "Client Retention",
              ref: retentionRef,
              value: retentionCount,
              suffix: "%",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center px-4 py-6 ${
                i === 0 ? "rounded-l-2xl" : ""
              } ${i === 3 ? "rounded-r-2xl" : ""}`}
            >
              <span
                ref={item.ref || undefined}
                className="text-2xl font-extrabold text-primary sm:text-3xl lg:text-4xl"
              >
                {item.value}
                {item.suffix}
              </span>

              <span className="mt-1 text-[10px] font-medium text-muted-foreground sm:text-xs">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <CtaBand />
    </>
  );
}

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      {
        title:
          "Industries We Serve | PFMC",
      },
      {
        name: "description",
        content:
          "PFMC manages corporate offices, healthcare, retail, industrial, hospitality, residential, education and government facilities across India.",
      },
      {
        property: "og:title",
        content:
          "Industries We Serve | PFMC",
      },
      {
        property: "og:description",
        content:
          "PFMC manages corporate offices, healthcare, retail, industrial, hospitality, residential, education and government facilities across India.",
      },
    ],
  }),
  component: Industries,
});