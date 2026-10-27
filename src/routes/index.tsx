import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Quote,
  Award,
  Star,
  MessageCircle,
  Clock3,
  ChevronLeft,
  ChevronRight,
  Shield,
  Users,
  Cpu,
  Headphones,
  Coins,
  Leaf,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Reveal, SectionHeading } from "@/components/Reveal";
import { CtaBand } from "@/components/PageHero";
import { ServicesScroll } from "@/components/ServicesScroll";

import {
  industries,
  stats,
  clients,
  testimonials,
} from "@/lib/site-data";

import heroBuilding from "@/assets/hero-building.png";
import aboutInterior from "@/assets/about-interior.jpg";
import whyTower from "@/assets/why-tower.jpg";

/* ==========================================================
CLIENT LOGOS
========================================================== */

const clientLogos: Record<string, string> = {
  DLF: "/cilents/dlf.png",
  Godrej: "/cilents/godrej.png",
  TATA: "/cilents/tata-company-logo.png",
  Tata: "/cilents/tata-company-logo.png",
  Wipro: "/cilents/wipro.png",
  Prestige: "/cilents/prestige.png",
  CapitalLand: "/cilents/capitaland.png",
  CapitaLand: "/cilents/capitaland.png",
};

/* ==========================================================
TESTIMONIAL AVATAR COLORS
========================================================== */

const avatarColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-indigo-500",
  "bg-pink-500",
  "bg-teal-500",
];

/* ==========================================================
COUNT UP COMPONENT (Counting Animation)
========================================================== */

function CountUp({ end, duration = 2000 }: { end: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Extract number and suffix (e.g., "250+" -> 250, "+")
  const numericValue = parseInt(end.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = end.replace(/[0-9]/g, "");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function (easeOutQuad)
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * numericValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, numericValue, duration]);

  // If value contains "24/7", just show it directly (no counting)
  if (end.includes("/")) {
    return <span ref={ref}>{end}</span>;
  }

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ==========================================================
WHY CHOOSE SECTION
========================================================== */

function WhyChooseSection() {
  const reasons = [
    {
      icon: Shield,
      title: "Integrated Solutions",
      description:
        "End-to-end property and facility management under one roof",
    },
    {
      icon: Users,
      title: "Expert Professionals",
      description:
        "Experienced & certified team dedicated to excellence",
    },
    {
      icon: Cpu,
      title: "Technology Driven",
      description:
        "Smart systems for efficiency, transparency, and control",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description:
        "Round-the-clock assistance with quick response times",
    },
    {
      icon: Coins,
      title: "Cost Efficiency",
      description:
        "Optimized operations for long-term value creation",
    },
    {
      icon: Leaf,
      title: "Sustainability Focus",
      description:
        "Responsible solutions for a greener tomorrow",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-surface via-background to-surface py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-[floatSlow_10s_ease-in-out_infinite]" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-[floatSlow_12s_ease-in-out_infinite_reverse]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              ⚡ Our Advantage
            </span>

            <h2 className="text-4xl font-extrabold sm:text-5xl">
              Why We're{" "}
              <span className="text-primary">Different</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We deliver excellence through our commitment to quality,
              innovation, and client satisfaction.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 70}>
              <div className="why-card group relative flex h-full min-h-[190px] flex-col overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 sm:p-7">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/10" />

                <div className="relative mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary group-hover:text-primary-foreground">
                  <reason.icon className="h-6 w-6" />
                </div>

                <h3 className="relative text-lg font-bold">
                  {reason.title}
                </h3>

                <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-700 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================
PREMIUM CLIENTS GRID
========================================================== */

type PremiumClientsGridProps = {
  clients: string[];
  clientLogos: Record<string, string>;
};

function PremiumClientsGrid({
  clients,
  clientLogos,
}: PremiumClientsGridProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-3xl"
      />

      <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {clients.map((client, index) => {
          const logo = clientLogos[client];
          const delay = index * 100;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={client}
              className={`
                client-premium-card
                ${index % 2 === 0
                  ? "client-enter-left"
                  : "client-enter-right"}
                ${visible ? "client-visible" : ""}
                ${isHovered ? "client-hovered" : ""}
              `}
              style={{
                transitionDelay: `${delay}ms`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="group relative h-full min-h-[190px] overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 sm:p-6">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 transition-all duration-700 group-hover:from-primary/[0.08] group-hover:via-transparent group-hover:to-primary/[0.03]" />

                <div className="absolute left-0 right-0 top-0 h-[2px] overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-700 ${
                      isHovered ? "w-full" : "w-0"
                    }`}
                  />
                </div>

                <div className="absolute right-4 top-4 text-[10px] font-bold tracking-[0.15em] text-muted-foreground/30">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="relative flex min-h-[100px] items-center justify-center">
                  <div
                    className={`absolute h-20 w-20 rounded-full bg-primary/[0.035] blur-xl transition-all duration-700 ${
                      isHovered
                        ? "scale-150 bg-primary/[0.12]"
                        : ""
                    }`}
                  />

                  {logo ? (
                    <img
                      src={logo}
                      alt={`${client} Logo`}
                      loading="lazy"
                      className={`relative max-h-16 max-w-[160px] w-auto object-contain transition-all duration-700 ${
                        isHovered
                          ? "scale-110 rotate-1"
                          : ""
                      }`}
                    />
                  ) : (
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-lg font-extrabold text-primary">
                      {client.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div
                  className={`mx-auto h-px bg-border transition-all duration-700 ${
                    isHovered
                      ? "w-16 bg-primary/40"
                      : "w-10"
                  }`}
                />

                <div className="mt-4 text-center">
                  <h3
                    className={`text-sm font-bold tracking-tight transition-all duration-500 ${
                      isHovered ? "scale-105 text-primary" : ""
                    }`}
                  >
                    {client}
                  </h3>

                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Strategic Partner
                  </p>
                </div>

                <div
                  className={`absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-500 ${
                    isHovered
                      ? "translate-x-0 translate-y-0 opacity-100"
                      : "translate-x-4 translate-y-4 opacity-0"
                  }`}
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>

                <div
                  className={`pointer-events-none absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-primary transition-all duration-700 ${
                    isHovered ? "w-2/3" : "w-0"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .client-premium-card {
          opacity: 0;
          filter: blur(8px);
          will-change: transform, opacity, filter;
          transition:
            opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1100ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 900ms ease;
        }

        .client-enter-left {
          transform:
            perspective(900px)
            translate3d(-70px, 30px, 0)
            rotateY(6deg)
            scale(0.94);
        }

        .client-enter-right {
          transform:
            perspective(900px)
            translate3d(70px, 30px, 0)
            rotateY(-6deg)
            scale(0.94);
        }

        .client-premium-card.client-visible {
          opacity: 1;
          transform:
            perspective(900px)
            translate3d(0, 0, 0)
            rotateY(0deg)
            scale(1);
          filter: blur(0);
        }

        .client-premium-card.client-hovered {
          z-index: 10;
        }

        @media (prefers-reduced-motion: reduce) {
          .client-premium-card,
          .client-premium-card.client-visible,
          .client-enter-left,
          .client-enter-right {
            opacity: 1;
            transform: none;
            filter: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}

/* ==========================================================
TESTIMONIAL CAROUSEL
========================================================== */

function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const itemsPerView = 3;

  useEffect(() => {
    if (
      isPaused ||
      testimonials.length <= itemsPerView
    ) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex(
        (prev) =>
          (prev + 1) %
          (testimonials.length - itemsPerView + 1)
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const maxIndex = Math.max(
    0,
    testimonials.length - itemsPerView
  );

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleTestimonials.map((testimonial, index) => {
          const color =
            avatarColors[index % avatarColors.length];

          const initial =
            testimonial.name.charAt(0);

          return (
            <div
              key={`${testimonial.name}-${index}`}
              className="testimonial-card"
            >
              <div className="group relative h-full rounded-2xl border border-border/70 bg-card p-7 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
                <div className="mb-3 flex items-center gap-1">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400 transition-transform duration-300 group-hover:scale-110"
                    />
                  ))}
                </div>

                <div className="absolute right-6 top-6 opacity-10 transition-all duration-500 group-hover:scale-110 group-hover:opacity-20">
                  <Quote className="h-12 w-12" />
                </div>

                <blockquote className="text-sm italic leading-relaxed text-muted-foreground">
                  "{testimonial.quote}"
                </blockquote>

                <figcaption className="mt-6 border-t pt-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${color} text-sm font-bold text-white shadow-md`}
                    >
                      {initial}
                    </div>

                    <div>
                      <div className="text-sm font-bold">
                        {testimonial.name}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </figcaption>

                <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-primary/20" />
              </div>
            </div>
          );
        })}
      </div>

      {testimonials.length > itemsPerView && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() =>
              setCurrentIndex((prev) =>
                Math.max(0, prev - 1)
              )
            }
            disabled={!canGoPrev}
            className={`rounded-full border bg-card p-3 transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary ${
              !canGoPrev
                ? "cursor-not-allowed opacity-40"
                : ""
            }`}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex gap-2">
            {Array.from({
              length: maxIndex + 1,
            }).map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentIndex(index)
                }
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-primary/30"
                }`}
                aria-label={`Go to testimonial page ${
                  index + 1
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentIndex((prev) =>
                Math.min(maxIndex, prev + 1)
              )
            }
            disabled={!canGoNext}
            className={`rounded-full border bg-card p-3 transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary ${
              !canGoNext
                ? "cursor-not-allowed opacity-40"
                : ""
            }`}
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

/* ==========================================================
HOME PAGE
========================================================== */

function Index() {
  return (
    <>
      {/* ====================================================
      HERO
      ==================================================== */}

      <section className="relative overflow-hidden bg-background">
        {/* Background effects */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

          <div className="hero-orb hero-orb-one absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />

          <div className="hero-orb hero-orb-two absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-primary/5 blur-3xl" />

          <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.035] blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Decorative lines */}
        <div className="hero-line hero-line-one absolute left-[8%] top-[18%] h-px w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="hero-line hero-line-two absolute right-[10%] top-[35%] h-px w-20 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 md:pt-12 lg:grid-cols-2 lg:gap-12 lg:pb-14 lg:pt-14">
          {/* LEFT SIDE */}
          <div className="relative z-10">
            <Reveal delay={50}>
              <div className="hero-badge mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md dark:bg-card/80">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">
                  #1 Integrated Property & Facility Management
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="hero-title max-w-3xl text-2xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                Managing spaces.
                <br />

                <span className="relative inline-block">
                  <span className="text-primary">
                    Enabling
                  </span>

                  <span className="text-foreground">
                    {" "}excellence.
                  </span>

                  <span className="hero-underline absolute -bottom-2 left-0 h-1 w-2/3 rounded-full bg-primary/30 sm:-bottom-3" />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
                We deliver end-to-end property and facility management
                solutions that ensure efficiency, comfort, safety, and
                long-term value for your business.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/services"
                  className="hero-button group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/35"
                >
                  Explore Services

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-5 py-3 text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-md dark:bg-card/80"
                >
                  <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  Let's Talk
                </Link>

                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 px-2 py-2 text-sm font-semibold"
                >
                  <span className="inline">
                    About Us
                  </span>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {[
                  "Integrated Solutions",
                  "Technology Driven",
                  "24/7 Support",
                ].map((item) => (
                  <div
                    key={item}
                    className="group flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-125" />

                    <span className="text-xs font-semibold text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative">
            {/* Floating 24/7 card */}
            <div className="floating-card floating-card-left absolute -bottom-4 -left-2 z-20 sm:-left-5">
              <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/90 p-3 shadow-xl backdrop-blur-xl dark:bg-card/90 sm:p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Clock3 className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-lg font-extrabold leading-none">
                    24/7
                  </p>

                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Support
                  </p>
                </div>
              </div>
            </div>

            {/* Floating years card */}
            <div className="floating-card floating-card-right absolute -right-2 -top-3 z-20 sm:-right-5">
              <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-xl dark:bg-card/90">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">
                  8+
                </div>

                <div>
                  <p className="text-xs font-bold">
                    Years
                  </p>

                  <p className="text-[9px] text-muted-foreground">
                    Excellence
                  </p>
                </div>
              </div>
            </div>

            {/* Main image - CLEAN, NO BORDER, NO PADDING */}
            <Reveal delay={120}>
              <div className="hero-image-wrapper group relative overflow-hidden rounded-3xl">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={heroBuilding}
                    alt="Modern commercial building managed by PFMC"
                    width={1600}
                    height={1000}
                    className="hero-image h-[330px] w-full object-cover sm:h-[400px] lg:h-[470px] xl:h-[500px]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  {/* image scan line */}
                  <div className="hero-scan absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="hero-caption inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 backdrop-blur-xl">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inset-0 animate-ping rounded-full bg-primary/70" />
                        <span className="relative h-2 w-2 rounded-full bg-primary" />
                      </span>

                      <span className="text-xs font-semibold text-white">
                        Smarter Spaces. Better Experiences.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground lg:flex">
          <span className="text-[8px] font-bold uppercase tracking-[0.3em]">
            Scroll
          </span>

          <div className="scroll-line h-7 w-px overflow-hidden bg-border">
            <div className="h-1/2 w-full bg-primary" />
          </div>
        </div>
      </section>

      {/* ====================================================
      ABOUT
      ==================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-18">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="group relative">
              <div className="absolute -inset-3 rounded-3xl bg-primary/5 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />

              <img
                src={aboutInterior}
                alt="Modern office lounge maintained by PFMC team"
                width={1200}
                height={900}
                loading="lazy"
                className="relative w-full rounded-2xl object-cover shadow-xl transition-transform duration-700 group-hover:scale-[1.015]"
              />

              <div className="absolute -bottom-5 right-5 flex items-center gap-3 rounded-xl border border-white/40 bg-white/90 p-4 shadow-xl backdrop-blur-md dark:bg-card/90">
                <span className="text-3xl font-extrabold text-primary">
                  8+
                </span>

                <span className="text-xs font-semibold leading-tight">
                  Years of
                  <br />
                  Excellence
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SectionHeading
              align="left"
              eyebrow="About Us"
              title="Integrated Solutions."
              highlight="Lasting Impact."
            />

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              PFMC is a forward-thinking property and facility management
              company delivering integrated solutions across operations,
              maintenance, workplace experience, and sustainability. We help
              businesses optimise performance, reduce costs, and create
              smarter, safer, and future-ready spaces.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {[
                [
                  "Client-Centric Approach",
                  "We align with your goals and deliver what matters.",
                ],
                [
                  "Integrated Expertise",
                  "One partner for all your property and facility needs.",
                ],
                [
                  "Technology Driven",
                  "Smart systems for efficiency, transparency, and control.",
                ],
                [
                  "Sustainability Focused",
                  "Responsible solutions for a greener tomorrow.",
                ],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="group flex gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:scale-125" />

                  <div>
                    <h3 className="text-sm font-bold">
                      {title}
                    </h3>

                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================================================
      SERVICES SCROLL
      ==================================================== */}

      <ServicesScroll />

      {/* ====================================================
      WHY CHOOSE
      ==================================================== */}

      <WhyChooseSection />

      {/* ====================================================
      PROJECTS
      ==================================================== */}

      <section className="relative overflow-hidden py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/[0.05] blur-3xl" />

          <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-primary/[0.05] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  🚀 Our Projects
                </span>

                <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                  Smart Management.
                  <br />
                  <span className="text-primary">
                    Stronger Results.
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  From commercial towers to complex industrial environments,
                  we build measurable operational excellence through people,
                  process, technology, and sustainability.
                </p>
              </div>

              <Link
                to="/projects"
                className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Explore Projects

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <div className="grid items-stretch gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
            <Reveal>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-border/70 bg-card/80 p-7 shadow-card backdrop-blur-xl sm:p-9">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Built for performance
                  </p>

                  <ul className="mt-7 space-y-4">
                    {[
                      "Tailored solutions for every project vertical",
                      "ISO-certified processes & quality standards",
                      "AI-powered predictive maintenance systems",
                      "Real-time reporting & data-driven insights",
                      "Sustainable practices for net-zero operations",
                      "Scalable services for growing enterprises",
                    ].map((item) => (
                      <li
                        key={item}
                        className="group flex items-start gap-3 text-sm leading-relaxed"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </span>

                        <span>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-9 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-border/60 bg-background/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
                    <p className="text-2xl font-extrabold text-primary">
                      24/7
                    </p>

                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Operations
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-background/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
                    <p className="text-2xl font-extrabold text-primary">
                      8+
                    </p>

                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Years Excellence
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="group relative min-h-[420px] overflow-hidden rounded-3xl border border-border/60 bg-card p-2 shadow-xl sm:min-h-[520px]">
                <div className="relative h-full min-h-[404px] overflow-hidden rounded-[1.35rem] sm:min-h-[504px]">
                  <img
                    src={whyTower}
                    alt="High-rise tower under PFMC management"
                    width={900}
                    height={1100}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/15 bg-black/35 p-4 backdrop-blur-xl">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground/70">
                          Project intelligence
                        </p>

                        <p className="mt-1 text-sm font-bold text-white sm:text-base">
                          Smarter Spaces. Better Experiences.
                        </p>
                      </div>

                      <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-110">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====================================================
      INDUSTRIES - ONLY CARDS (NO CONTAINER)
      ==================================================== */}

      <section className="relative overflow-hidden border-y border-border/20 bg-transparent py-12 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-[-12%] top-1/4 h-80 w-80 rounded-full bg-primary/[0.04] blur-3xl" />
          <div className="absolute right-[-12%] bottom-0 h-96 w-96 rounded-full bg-primary/[0.03] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                Sectors
              </span>

              {/* UPDATED: One line font size - nowrap */}
              <h2 className="mt-4 whitespace-nowrap text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                Expertise Across <span className="text-primary">Every Sector</span>
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground/70 sm:text-base">
                Explore how PFMC adapts its property and facility management
                expertise to the unique operational needs of every industry.
              </p>
            </div>
          </Reveal>

          {/* Only Cards - No Container, No Edge Fades */}
          <div className="mt-8 overflow-hidden">
            <div className="industries-marquee flex w-max gap-4 py-2">
              {[...industries, ...industries].map((industry, index) => (
                <Link
                  key={`${industry.name}-${index}`}
                  to="/industries"
                  className="industry-slide-card group relative block w-[260px] shrink-0 overflow-hidden rounded-2xl border border-border/15 bg-background/20 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10 sm:w-[300px]"
                >
                  {/* Image Container */}
                  <div className="relative h-[190px] overflow-hidden sm:h-[220px]">
                    <img
                      src={industry.image}
                      alt={`${industry.name} facility`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(event) => {
                        event.currentTarget.src = "/industries/sector-corporate.jpg";
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* Icon Badge */}
                    <div className="absolute left-3.5 top-3.5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/85 text-primary shadow-md backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                      <industry.icon className="h-5.5 w-5.5" />
                    </div>

                    {/* Floating Tag */}
                    <div className="absolute bottom-3 left-3.5 rounded-full bg-black/35 px-3 py-0.5 backdrop-blur-sm">
                      <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-white/70">
                        Sector
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-5">
                    <span className="block text-base font-bold leading-tight transition-colors duration-300 group-hover:text-primary">
                      {industry.name}
                    </span>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground/60">
                        Explore Solutions
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border/20 bg-background/30 text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:border-primary/20 group-hover:bg-primary group-hover:text-white">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>

                    {/* Bottom progress bar */}
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-primary transition-all duration-500 group-hover:w-1/2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Reveal delay={250}>
            <div className="mt-8 flex justify-center">
              <Link
                to="/industries"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
              >
                Explore All Industries
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>

        <style>{`
          .industries-marquee {
            animation: smart-industries-marquee 45s linear infinite;
            will-change: transform;
            transform: translate3d(0, 0, 0);
          }

          .industries-marquee:hover {
            animation-play-state: paused;
          }

          @keyframes smart-industries-marquee {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              transform: translate3d(-50%, 0, 0);
            }
          }

          @media (max-width: 768px) {
            .industries-marquee {
              animation-duration: 30s;
            }
            .industry-slide-card {
              width: 220px;
            }
            .industry-slide-card .relative.h-\\[190px\\] {
              height: 160px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .industries-marquee {
              animation: none;
            }
          }
        `}</style>
      </section>

      {/* ====================================================
      CLIENTS
      ==================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute left-[-180px] top-20 h-[420px] w-[420px] rounded-full bg-primary/[0.07] blur-[110px]" />

          <div className="absolute right-[-180px] bottom-0 h-[420px] w-[420px] rounded-full bg-primary/[0.06] blur-[110px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.06] px-4 py-2 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" />

                  <span className="relative h-2 w-2 rounded-full bg-primary" />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                  Trusted Partnerships
                </span>
              </div>

              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Trusted by{" "}
                <span className="text-primary">
                  Industry Leaders
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                We partner with organizations that value operational
                excellence, reliability, innovation, and long-term performance.
              </p>

              <div className="mt-7 flex items-center justify-center gap-3">
                <div className="h-px w-10 bg-border" />
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <div className="h-px w-10 bg-border" />
              </div>
            </div>
          </Reveal>

          <PremiumClientsGrid
            clients={clients}
            clientLogos={clientLogos}
          />

          <Reveal delay={500}>
            <div className="mt-10 text-center">
              <Link
                to="/clients"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                View All Partners

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================================================
      TESTIMONIALS (With Counting Animation Stats Grid)
      ==================================================== */}

      <section className="bg-gradient-to-b from-slate-50 to-white py-14 dark:from-slate-950 dark:to-slate-900 md:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 text-center">
              <p className="eyebrow">
                TESTIMONIALS
              </p>

              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                What Our{" "}
                <span className="text-primary">
                  Clients Say
                </span>
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Real feedback from our valued partners.
              </p>
            </div>
          </Reveal>

          <TestimonialCarousel />

          {/* ====================================================
          STATS GRID (With Counting Animation)
          ==================================================== */}
          <Reveal delay={300}>
            <div className="mt-14">
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-xl dark:bg-card">
                <div className="grid grid-cols-2 divide-y divide-border/60 sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`flex flex-col items-center justify-center p-6 text-center sm:p-8 ${
                        index < 2 ? "border-b border-border/60 sm:border-b-0" : ""
                      }`}
                    >
                      <span className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                        <CountUp end={stat.value} duration={2000} />
                      </span>
                      <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-6 py-3">
                <Award className="h-5 w-5 text-primary" />

                <span className="text-sm font-medium">
                  Join{" "}
                  {stats.find(
                    (stat) =>
                      stat.label === "Happy Clients"
                  )?.value || "120+"}{" "}
                  trusted companies already working with us.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================================================
      CTA
      ==================================================== */}

      <CtaBand />

      {/* ====================================================
      GLOBAL HOMEPAGE ANIMATIONS
      ==================================================== */}

      <style>{`

        /* -----------------------------------------------
           HERO ORBS
        ------------------------------------------------ */

        @keyframes heroOrbFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(-20px, 20px, 0) scale(1.06);
          }
        }

        .hero-orb-one {
          animation:
            heroOrbFloat
            9s
            ease-in-out
            infinite;
        }

        .hero-orb-two {
          animation:
            heroOrbFloat
            12s
            ease-in-out
            infinite
            reverse;
        }

        /* -----------------------------------------------
           HERO FLOATING CARDS
        ------------------------------------------------ */

        @keyframes floatingCard {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -9px, 0);
          }
        }

        .floating-card-left {
          animation:
            floatingCard
            4.5s
            ease-in-out
            infinite;
        }

        .floating-card-right {
          animation:
            floatingCard
            5.5s
            ease-in-out
            infinite
            0.5s;
        }

        /* -----------------------------------------------
           HERO IMAGE
        ------------------------------------------------ */

        .hero-image {
          animation:
            heroImageReveal
            1.4s
            cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        @keyframes heroImageReveal {
          from {
            opacity: 0;
            transform:
              scale(1.08)
              translateY(25px);
            filter: blur(8px);
          }

          to {
            opacity: 1;
            transform:
              scale(1)
              translateY(0);
            filter: blur(0);
          }
        }

        /* -----------------------------------------------
           HERO BADGE
        ------------------------------------------------ */

        .hero-badge {
          animation:
            heroBadge
            0.8s
            cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        @keyframes heroBadge {
          from {
            opacity: 0;
            transform:
              translateY(15px)
              scale(0.95);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        /* -----------------------------------------------
           HERO TITLE
        ------------------------------------------------ */

        .hero-title {
          animation:
            heroTitle
            1s
            cubic-bezier(0.22, 1, 0.36, 1)
            0.1s
            both;
        }

        @keyframes heroTitle {
          from {
            opacity: 0;
            transform:
              translateY(30px)
              scale(0.97);
            filter: blur(5px);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
            filter: blur(0);
          }
        }

        /* -----------------------------------------------
           UNDERLINE
        ------------------------------------------------ */

        .hero-underline {
          animation:
            underlineGrow
            1.2s
            cubic-bezier(0.22, 1, 0.36, 1)
            0.8s
            both;
        }

        @keyframes underlineGrow {
          from {
            width: 0;
          }

          to {
            width: 66.666%;
          }
        }

        /* -----------------------------------------------
           IMAGE SCAN
        ------------------------------------------------ */

        .hero-scan {
          animation:
            imageScan
            4.5s
            ease-in-out
            infinite;
        }

        @keyframes imageScan {
          0%,
          35% {
            transform: translateY(-20px);
            opacity: 0;
          }

          45% {
            opacity: 0.8;
          }

          65% {
            opacity: 0;
          }

          100% {
            transform: translateY(500px);
            opacity: 0;
          }
        }

        /* -----------------------------------------------
           HERO CAPTION
        ------------------------------------------------ */

        .hero-caption {
          animation:
            captionFloat
            5s
            ease-in-out
            infinite;
        }

        @keyframes captionFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-3px);
          }
        }

        /* -----------------------------------------------
           DECORATIVE LINES
        ------------------------------------------------ */

        .hero-line {
          animation:
            linePulse
            4s
            ease-in-out
            infinite;
        }

        @keyframes linePulse {
          0%,
          100% {
            opacity: 0.2;
            transform: scaleX(0.7);
          }

          50% {
            opacity: 0.8;
            transform: scaleX(1);
          }
        }

        /* -----------------------------------------------
           SCROLL INDICATOR
        ------------------------------------------------ */

        .scroll-line div {
          animation:
            scrollIndicator
            1.8s
            ease-in-out
            infinite;
        }

        @keyframes scrollIndicator {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }

          30% {
            opacity: 1;
          }

          70% {
            opacity: 1;
          }

          100% {
            transform: translateY(200%);
            opacity: 0;
          }
        }

        /* -----------------------------------------------
           WHY SECTION
        ------------------------------------------------ */

        @keyframes floatSlow {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(20px, -20px, 0);
          }
        }

        /* -----------------------------------------------
           TESTIMONIAL
        ------------------------------------------------ */

        .testimonial-card {
          animation:
            testimonialEnter
            0.7s
            cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        @keyframes testimonialEnter {
          from {
            opacity: 0;
            transform:
              translateY(20px)
              scale(0.98);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        /* -----------------------------------------------
           REDUCED MOTION
        ------------------------------------------------ */

        @media (prefers-reduced-motion: reduce) {

          .hero-orb-one,
          .hero-orb-two,
          .floating-card-left,
          .floating-card-right,
          .hero-image,
          .hero-badge,
          .hero-title,
          .hero-underline,
          .hero-scan,
          .hero-caption,
          .hero-line,
          .scroll-line div,
          .testimonial-card {
            animation: none !important;
          }

          .hero-image {
            opacity: 1;
            filter: none;
            transform: none;
          }
        }

      `}</style>
    </>
  );
}

/* ==========================================================
ROUTE
========================================================== */

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "PFMC | Integrated Property & Facility Management Company",
      },
      {
        name: "description",
        content:
          "PFMC delivers end-to-end property and facility management — technical, soft services, security, smart solutions and sustainability for every industry.",
      },
      {
        property: "og:title",
        content:
          "PFMC | Integrated Property & Facility Management Company",
      },
      {
        property: "og:description",
        content:
          "PFMC delivers end-to-end property and facility management — technical, soft services, security, smart solutions and sustainability for every industry.",
      },
    ],
  }),

  component: Index,
});