// src/routes/clients.tsx

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Quote,
  Building2,
  ChevronRight,
  Star,
  Award,
  Users,
  Briefcase,
} from "lucide-react";

import { PageHero, CtaBand } from "@/components/PageHero";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { clients, testimonials } from "@/lib/site-data";
import aboutInterior from "@/assets/about-interior.jpg";

// ======================================================
// CLIENT LOGOS
// Actual folder:
// public/cilents/
// ======================================================

const clientLogos: Record<string, { src: string; alt: string }> = {
  DLF: {
    src: "/cilents/dlf.png",
    alt: "DLF Logo",
  },

  Godrej: {
    src: "/cilents/godrej.png",
    alt: "Godrej Logo",
  },

  TATA: {
    src: "/cilents/tata-company-logo.png",
    alt: "TATA Logo",
  },

  Tata: {
    src: "/cilents/tata-company-logo.png",
    alt: "TATA Logo",
  },

  Wipro: {
    src: "/cilents/wipro.png",
    alt: "Wipro Logo",
  },

  Prestige: {
    src: "/cilents/prestige.png",
    alt: "Prestige Logo",
  },

  CapitaLand: {
    src: "/cilents/capitaland.png",
    alt: "CapitaLand Logo",
  },

  CapitalLand: {
    src: "/cilents/capitaland.png",
    alt: "CapitaLand Logo",
  },
};


// ======================================================
// COUNTER ANIMATION
// ======================================================

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
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [end, duration, hasAnimated]);

  return {
    count,
    ref,
  };
}


// ======================================================
// CLIENTS PAGE
// ======================================================

function Clients() {

  const {
    count: clientsCount,
    ref: clientsRef,
  } = useCounter(50);

  const {
    count: projectsCount,
    ref: projectsRef,
  } = useCounter(200);

  const {
    count: yearsCount,
    ref: yearsRef,
  } = useCounter(15);

  const {
    count: industriesCount,
    ref: industriesRef,
  } = useCounter(12);


  return (
    <>
      {/* ==================================================
          HERO
      ================================================== */}

      <PageHero
        eyebrow="Our Clients"
        title="Trusted by Leading"
        highlight="Organizations"
        description="Long-term partnerships built on consistent service quality, transparency and quick response."
        image={aboutInterior}
      />


      {/* ==================================================
          STATS SECTION
      ================================================== */}

      <section className="border-b bg-surface">

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {/* CLIENTS */}

            <div className="rounded-xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mb-2 flex justify-center">
                <Building2 className="h-7 w-7 text-primary" />
              </div>

              <span
                ref={clientsRef}
                className="text-3xl font-extrabold text-foreground sm:text-4xl"
              >
                {clientsCount}+
              </span>

              <div className="mt-1 text-sm text-muted-foreground">
                Clients
              </div>

            </div>


            {/* PROJECTS */}

            <div className="rounded-xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mb-2 flex justify-center">
                <Users className="h-7 w-7 text-primary" />
              </div>

              <span
                ref={projectsRef}
                className="text-3xl font-extrabold text-foreground sm:text-4xl"
              >
                {projectsCount}+
              </span>

              <div className="mt-1 text-sm text-muted-foreground">
                Projects Completed
              </div>

            </div>


            {/* YEARS */}

            <div className="rounded-xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mb-2 flex justify-center">
                <Award className="h-7 w-7 text-primary" />
              </div>

              <span
                ref={yearsRef}
                className="text-3xl font-extrabold text-foreground sm:text-4xl"
              >
                {yearsCount}+
              </span>

              <div className="mt-1 text-sm text-muted-foreground">
                Years of Service
              </div>

            </div>


            {/* INDUSTRIES */}

            <div className="rounded-xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mb-2 flex justify-center">
                <Briefcase className="h-7 w-7 text-primary" />
              </div>

              <span
                ref={industriesRef}
                className="text-3xl font-extrabold text-foreground sm:text-4xl"
              >
                {industriesCount}+
              </span>

              <div className="mt-1 text-sm text-muted-foreground">
                Industries
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          CLIENTS / PARTNERS SECTION
      ================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">

        <Reveal>

          <div className="mb-12 text-center">

            <p className="eyebrow">
              Our Partners
            </p>

            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">

              Companies That{" "}

              <span className="text-primary">
                Trust Us
              </span>

            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">

              We're proud to work with industry leaders across various sectors

            </p>

          </div>

        </Reveal>


        {/* ==================================================
            LOGO GRID
        ================================================== */}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

          {clients.map((c, i) => {

            const logo = clientLogos[c];

            return (

              <Reveal
                key={c}
                delay={i * 50}
              >

                <div className="group relative overflow-hidden rounded-xl border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">


                  {/* HOVER BACKGROUND */}

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />


                  {/* ==================================================
                      LOGO
                  ================================================== */}

                  <div className="relative mx-auto mb-4 flex h-20 w-full items-center justify-center">

                    {logo ? (

                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="max-h-16 max-w-[160px] w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />

                    ) : (

                      /* Fallback */

                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">

                        {c
                          .slice(0, 2)
                          .toUpperCase()}

                      </div>

                    )}

                  </div>


                  {/* ==================================================
                      CLIENT NAME
                  ================================================== */}

                  <div className="relative">

                    <h3 className="text-base font-bold text-foreground transition-colors duration-300 group-hover:text-primary">

                      {c}

                    </h3>

                  </div>


                  {/* ==================================================
                      ARROW
                  ================================================== */}

                  <div className="absolute bottom-3 right-3 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">

                    <ChevronRight className="h-4 w-4 text-primary" />

                  </div>

                </div>

              </Reveal>

            );

          })}

        </div>

      </section>


      {/* ==================================================
          TESTIMONIALS
      ================================================== */}

      <section className="bg-gradient-to-b from-surface to-background py-16 md:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          <Reveal>

            <div className="mb-12 text-center">

              <p className="eyebrow">
                Testimonials
              </p>

              <SectionHeading
                eyebrow=""
                title="What Our"
                highlight="Clients Say"
              />

              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">

                Real feedback from our valued partners

              </p>

            </div>

          </Reveal>


          {/* TESTIMONIAL CARDS */}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {testimonials.map((t, i) => (

              <Reveal
                key={t.name}
                delay={i * 100}
              >

                <figure className="group relative h-full rounded-2xl border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-2xl">


                  {/* QUOTE ICON */}

                  <div className="absolute -left-3 -top-3 rounded-full bg-primary/10 p-2">

                    <Quote className="h-5 w-5 text-primary" />

                  </div>


                  {/* STARS */}

                  <div className="mb-4 flex items-center gap-1">

                    {[...Array(5)].map((_, i) => (

                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />

                    ))}

                  </div>


                  {/* QUOTE */}

                  <blockquote className="mt-2 text-sm italic leading-relaxed text-muted-foreground">

                    "{t.quote}"

                  </blockquote>


                  {/* AUTHOR */}

                  <figcaption className="mt-6 border-t pt-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">

                        {t.name.charAt(0)}

                      </div>

                      <div>

                        <div className="text-sm font-bold text-foreground">

                          {t.name}

                        </div>

                        <div className="text-xs text-muted-foreground">

                          {t.role}

                        </div>

                      </div>

                    </div>

                  </figcaption>


                  {/* HOVER BORDER */}

                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-primary/20" />

                </figure>

              </Reveal>

            ))}

          </div>


          {/* ==================================================
              TRUST BADGE
          ================================================== */}

          <Reveal delay={300}>

            <div className="mt-12 text-center">

              <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-6 py-3">

                <Award className="h-5 w-5 text-primary" />

                <span className="text-sm font-medium">

                  Join 50+ trusted companies already working with us

                </span>

              </div>

            </div>

          </Reveal>

        </div>

      </section>


      {/* CTA */}

      <CtaBand />

    </>
  );
}


// ======================================================
// ROUTE
// ======================================================

export const Route = createFileRoute("/clients")({

  head: () => ({

    meta: [

      {
        title: "Our Clients & Testimonials | PFMC",
      },

      {
        name: "description",
        content:
          "Trusted by leading organizations. Read client testimonials and see the brands that rely on PFMC for facility management.",
      },

      {
        property: "og:title",
        content:
          "Our Clients & Testimonials | PFMC",
      },

      {
        property: "og:description",
        content:
          "Trusted by leading organizations. Read client testimonials and see the brands that rely on PFMC for facility management.",
      },

    ],

  }),

  component: Clients,

});