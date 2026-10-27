import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles, Shield, Users, Zap, Award, BarChart3 } from "lucide-react";
import { PageHero, CtaBand } from "@/components/PageHero";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { services } from "@/lib/site-data";
import servicesTeam from "@/assets/services-team.jpg";
import smartOps from "@/assets/smart-ops.jpg";

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Comprehensive Facility"
        highlight="Management Solutions"
        description="One partner across technical operations, soft services, security, workplace support, smart monitoring and sustainability."
        image={servicesTeam}
      />

      {/* Services Section */}
      <section className="mx-auto max-w-7xl space-y-28 px-4 py-16 sm:px-6 md:py-24">
        {services.map((s, i) => (
          <div key={s.slug} id={s.slug} className="scroll-mt-28">
            <Reveal delay={i * 150}>
              <div
                className={`group grid items-center gap-14 lg:grid-cols-2 lg:gap-20 ${
                  i % 2 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Text Content */}
                <div className="space-y-5">
                  {/* Service Badge */}
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-primary/30">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                      </span>
                      Service {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                      {s.short || "Premium"}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {s.title}
                    </span>
                  </h2>

                  {/* Description */}
                  <div className="relative">
                    <div className="absolute -left-4 top-0 h-12 w-1 rounded-full bg-gradient-to-b from-primary to-primary/20" />
                    <p className="pl-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {s.description}
                    </p>
                  </div>

                  {/* Points */}
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="group/item flex items-start gap-3.5 rounded-xl border border-transparent bg-primary/5 p-3.5 transition-all duration-300 hover:border-primary/20 hover:bg-primary/10 hover:shadow-md hover:-translate-y-0.5"
                      >
                        <div className="mt-0.5 rounded-full bg-primary/20 p-1.5 transition-colors group-hover/item:bg-primary">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary transition-transform group-hover/item:scale-110" />
                        </div>
                        <span className="text-sm font-medium text-foreground/80 transition-colors group-hover/item:text-foreground">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="mt-10 flex items-center gap-4">
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary/80 px-8 py-4 text-sm font-bold text-white shadow-2xl shadow-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-primary/60"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Learn More
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 -z-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] transition-transform duration-700 group-hover/btn:translate-x-[100%]" />
                    </Link>
                    <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-600 shadow-sm sm:flex">
                      <Zap className="h-3 w-3" />
                      Quick Access
                    </span>
                  </div>
                </div>

                {/* Image Card */}
                <div className="group/img relative overflow-hidden rounded-3xl border-2 border-primary/10 bg-card shadow-2xl transition-all duration-500 hover:shadow-3xl hover:border-primary/30 hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={s.image}
                      alt={`${s.title} services by PFMC`}
                      width={1200}
                      height={800}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover/img:opacity-100" />
                    
                    {/* Badges */}
                    <div className="absolute left-5 top-5 flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-2 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover/img:scale-105 group-hover/img:bg-white">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                        {s.short || "Featured"}
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 flex items-center gap-4 rounded-2xl bg-black/60 px-4 py-2.5 backdrop-blur-md opacity-0 transition-all duration-500 group-hover/img:opacity-100 group-hover/img:translate-y-0 translate-y-4">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white">4.9 ★</span>
                      </div>
                      <div className="h-4 w-px bg-white/20" />
                      <span className="text-xs font-medium text-white/80">Trusted</span>
                    </div>

                    <div className="absolute bottom-5 right-5 rounded-full bg-primary/90 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg backdrop-blur-sm transition-all duration-300 group-hover/img:scale-105 group-hover/img:bg-primary">
                      #{s.title?.split(" ")[0] || "Service"}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="h-6 w-6 rounded-full border-2 border-white bg-primary/20" />
                        <div className="h-6 w-6 rounded-full border-2 border-white bg-secondary/20" />
                        <div className="h-6 w-6 rounded-full border-2 border-white bg-accent/20" />
                      </div>
                      <span className="text-[10px] font-medium text-muted-foreground">
                        +{i + 12} team members
                      </span>
                    </div>
                    <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-600">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      Live
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </section>

      {/* How We Work Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-background py-20 md:py-28">
        {/* Background Decorations */}
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -left-40 -bottom-40 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="group relative overflow-hidden rounded-3xl shadow-3xl transition-all duration-500 hover:shadow-4xl hover:-translate-y-1">
              <img
                src={smartOps}
                alt="PFMC command centre monitoring building systems"
                width={1200}
                height={700}
                className="w-full rounded-3xl object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-sm opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
                <span className="text-sm font-bold text-foreground">Command Centre</span>
                <span className="text-xs text-muted-foreground">24/7 Monitoring</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-4">
              <SectionHeading
                align="left"
                eyebrow="⚡ How We Work"
                title="A clear delivery"
                highlight="process."
              />
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                End-to-end execution with complete transparency and measurable outcomes.
              </p>

              <ol className="mt-10 space-y-5">
                {[
                  ["Assess", "Site survey, asset mapping and gap analysis."],
                  ["Design", "Custom scope, manpower plan and SLA framework."],
                  ["Mobilise", "Trained teams, tools and systems deployed on site."],
                  ["Optimise", "Live monitoring, audits and continuous improvement."],
                ].map(([t, d], idx) => (
                  <li
                    key={t}
                    className="group/step flex items-start gap-5 rounded-2xl border border-transparent bg-white/50 p-4 transition-all duration-300 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-lg font-black text-white shadow-xl shadow-primary/30 transition-all duration-300 group-hover/step:scale-110 group-hover/step:shadow-2xl group-hover/step:shadow-primary/50">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="pt-0.5">
                      <h3 className="text-lg font-bold transition-colors group-hover/step:text-primary">
                        {t}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {d}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Facility Management Services | PFMC" },
      {
        name: "description",
        content:
          "Property, technical, soft services, security, business support, smart facility and sustainability solutions delivered end-to-end by PFMC.",
      },
      {
        property: "og:title",
        content: "Facility Management Services | PFMC",
      },
      {
        property: "og:description",
        content:
          "Property, technical, soft services, security, business support, smart facility and sustainability solutions delivered end-to-end by PFMC.",
      },
    ],
  }),
  component: Services,
});