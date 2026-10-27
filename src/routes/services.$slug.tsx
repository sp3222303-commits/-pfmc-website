import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { CtaBand } from "@/components/PageHero";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const index = services.findIndex((s) => s.slug === params.slug);
    if (index === -1) throw notFound();
    const service = services[index]!;
    return { slug: service.slug, title: service.title, description: service.description };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Service unavailable | PFMC" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.title} | PFMC Facility Management`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const index = services.findIndex((s) => s.slug === slug);
  const service = services[index];
  if (!service) return null;
  const next = services[(index + 1) % services.length]!;

  return (
    <>
      <section className="relative overflow-hidden border-b bg-surface">
        <img
          src={service.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
          <Reveal>
            <p className="eyebrow">Service {String(index + 1).padStart(2, "0")}</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold uppercase sm:text-4xl md:text-5xl">
              {service.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {service.description}
            </p>
            <Link
              to="/services"
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All Services
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <img
              src={service.image}
              alt={`${service.title} delivered by PFMC teams`}
              width={1200}
              height={800}
              loading="lazy"
              className="w-full rounded-xl border object-cover shadow-card"
            />
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading
              align="left"
              eyebrow="What's included"
              title="Scope &"
              highlight="deliverables"
            />
            <ul className="mt-6 grid gap-3">
              {service.points.map((p) => (
                <li key={p} className="flex gap-2.5 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/services/$slug"
              params={{ slug: next.slug }}
              className="mt-8 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold transition-colors hover:border-primary hover:text-primary"
            >
              Next: {next.title}
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}