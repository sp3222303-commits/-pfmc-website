import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { services } from "@/lib/site-data";

export function ServicesScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  /*
   * ---------------------------------------------------------
   * Reduced motion
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => {
      setReduced(mediaQuery.matches);
    };

    update();

    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * Scroll animation
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (reduced) return;

    const section = sectionRef.current;

    if (!section) return;

    let animationFrame = 0;
    let mounted = true;
    let previousActive = -1;

    const update = () => {
      animationFrame = 0;

      if (!mounted) return;

      const rect = section.getBoundingClientRect();

      const scrollRange = Math.max(
        1,
        section.offsetHeight - window.innerHeight
      );

      const progress = Math.min(
        1,
        Math.max(0, -rect.top / scrollRange)
      );

      const total = services.length;

      /*
       * Convert overall scroll progress into
       * service-to-service progress.
       */
      const position = progress * Math.max(0, total - 1);

      const isMobile = window.innerWidth < 1024;

      /*
       * Animate cards directly in the DOM.
       */
      const cards =
        section.querySelectorAll<HTMLElement>("[data-service-card]");

      cards.forEach((card, index) => {
        const distance = position - index;

        /*
         * Keep animation calculation controlled.
         */
        const clamped = Math.max(
          -1,
          Math.min(1, distance)
        );

        const absoluteDistance = Math.abs(clamped);

        /*
         * Cards move vertically.
         * Desktop also gets a subtle horizontal movement.
         */
        const horizontalDirection =
          index % 2 === 0 ? -1 : 1;

        const x = isMobile
          ? 0
          : horizontalDirection * clamped * 55;

        const y = clamped * -45;

        /*
         * Active card remains larger.
         */
        const scale =
          1 - absoluteDistance * 0.08;

        /*
         * Smooth fade.
         */
        const opacity =
          absoluteDistance >= 0.95
            ? 0
            : 1 - absoluteDistance * 0.9;

        /*
         * Prevent invisible cards from receiving clicks.
         */
        const clickable =
          absoluteDistance < 0.45;

        card.style.transform =
          `translate3d(${x}px, ${y}px, 0) scale(${scale})`;

        card.style.opacity = String(opacity);

        card.style.pointerEvents =
          clickable ? "auto" : "none";

        card.style.zIndex =
          String(100 - Math.round(absoluteDistance * 50));
      });

      /*
       * Active service.
       */
      const currentIndex = Math.min(
        total - 1,
        Math.max(0, Math.round(position))
      );

      if (currentIndex !== previousActive) {
        previousActive = currentIndex;
        setActive(currentIndex);
      }
    };

    const requestUpdate = () => {
      if (!animationFrame) {
        animationFrame =
          requestAnimationFrame(update);
      }
    };

    /*
     * Initial render.
     */
    update();

    window.addEventListener(
      "scroll",
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestUpdate,
      { passive: true }
    );

    return () => {
      mounted = false;

      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [reduced]);

  /*
   * ---------------------------------------------------------
   * Click service number
   * ---------------------------------------------------------
   *
   * IMPORTANT:
   * We do NOT calculate the position of an animated card.
   *
   * Instead, we calculate the target based on the section's
   * actual scroll range.
   *
   * This prevents the 4th/5th/6th click stuck issue.
   */
  const handleServiceClick = (index: number) => {
    const section = sectionRef.current;

    if (!section) return;

    const maxIndex = Math.max(
      1,
      services.length - 1
    );

    const sectionTop =
      section.getBoundingClientRect().top +
      window.scrollY;

    const scrollRange =
      Math.max(
        0,
        section.offsetHeight - window.innerHeight
      );

    const progress =
      index / maxIndex;

    const target =
      sectionTop +
      scrollRange * progress;

    window.scrollTo({
      top: Math.max(0, target),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  /*
   * ---------------------------------------------------------
   * Reduced-motion version
   * ---------------------------------------------------------
   */
  if (reduced) {
    return (
      <section
        aria-label="Our services"
        className="bg-surface py-16 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                active
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Our services"
      className="relative bg-surface"
      style={{
        height: `${Math.max(
          520,
          services.length * 82
        )}vh`,
      }}
    >
      {/* FIX: Added pb-8 to parent sticky container for extra bottom space */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-visible pb-8">
        {/* ---------------------------------------------------
            Background text
        --------------------------------------------------- */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid place-items-center px-4"
        >
          <p className="max-w-6xl text-center text-4xl font-extrabold uppercase leading-tight tracking-tighter text-foreground/[0.045] select-none sm:text-6xl lg:text-8xl">
            Harnessing the potential of your space
          </p>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
          {/* -------------------------------------------------
              Header — inside the section, tight with cards
          ------------------------------------------------- */}
          <SectionHeader />

          {/* -------------------------------------------------
              Cards
          ------------------------------------------------- */}
          <div className="relative mx-auto mt-4 h-[17rem] max-w-5xl sm:h-[21rem] lg:h-[27rem]">
            {services.map((service, index) => (
              <div
                key={service.slug}
                data-service-card
                className={`absolute inset-x-0 top-0 mx-auto w-full ${
                  index % 2 === 0
                    ? "lg:right-auto lg:ml-0 lg:w-[78%]"
                    : "lg:left-auto lg:mr-0 lg:w-[78%]"
                }`}
                style={{
                  opacity: index === 0 ? 1 : 0,
                  transform:
                    index === 0
                      ? "translate3d(0, 0, 0) scale(1)"
                      : "translate3d(0, 0, 0) scale(0.92)",
                  willChange:
                    "transform, opacity",
                  transition:
                    "box-shadow 300ms ease",
                }}
              >
                <ServiceCard
                  service={service}
                  index={index}
                  active={index === active}
                />
              </div>
            ))}
          </div>

          {/* -------------------------------------------------
              Progress + navigation
          ------------------------------------------------- */}
          <div className="mx-auto mt-6 max-w-5xl">
            {/* Progress line */}
            <div className="relative h-1 overflow-hidden rounded-full bg-border">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-300 ease-out"
                style={{
                  width: `${(
                    (active + 1) /
                      services.length
                  ) *
                    100
                  }%`,
                }}
              />
            </div>

            {/* Navigation buttons */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 pb-2 lg:justify-between">
              {services.map((service, index) => {
                const isActive =
                  active === index;

                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() =>
                      handleServiceClick(index)
                    }
                    aria-label={`View ${service.title}`}
                    aria-current={
                      isActive
                        ? "step"
                        : undefined
                    }
                    className={`group flex items-center gap-1.5 rounded-full border px-3 py-2 text-[10px] font-bold tabular-nums transition-all duration-300 sm:gap-2 sm:px-3.5 sm:py-2 sm:text-[11px] ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    <span>
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span
                      className={`hidden md:inline ${
                        isActive
                          ? "text-primary-foreground"
                          : ""
                      }`}
                    >
                      {service.short}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* FIX: CSS for mobile */}
      <style>{`
        @media (max-width: 768px) {
          section[aria-label="Our services"] .sticky {
            min-height: 100vh;
            overflow-y: visible;
          }
          section[aria-label="Our services"] .sticky .flex-wrap {
            gap: 6px;
          }
          section[aria-label="Our services"] .sticky .flex-wrap button {
            padding: 6px 10px;
            font-size: 9px;
            min-height: 32px;
          }
          section[aria-label="Our services"] .sticky .flex-wrap button span:first-child {
            font-size: 9px;
          }
        }

        @media (max-width: 480px) {
          section[aria-label="Our services"] .sticky .flex-wrap {
            gap: 4px;
          }
          section[aria-label="Our services"] .sticky .flex-wrap button {
            padding: 4px 8px;
            font-size: 8px;
            min-height: 28px;
            border-radius: 9999px;
          }
          section[aria-label="Our services"] .sticky .flex-wrap button span:first-child {
            font-size: 8px;
          }
        }
      `}</style>
    </section>
  );
}

/*
 * ==========================================================
 * SECTION HEADER
 * ==========================================================
 */

function SectionHeader() {
  return (
    <div className="relative z-10 mb-4 text-center lg:text-left">
      <p className="eyebrow">
        Our Services
      </p>

      <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
        Comprehensive Facility Management{" "}
        <span className="text-primary">
          Solutions
        </span>
      </h2>
    </div>
  );
}

/*
 * ==========================================================
 * SERVICE CARD
 * ==========================================================
 */

function ServiceCard({
  service,
  index,
  active = false,
}: {
  service: (typeof services)[number];
  index: number;
  active?: boolean;
}) {
  return (
    <article
      className={`group relative isolate w-full overflow-hidden rounded-2xl border bg-card shadow-lift transition-all duration-500 ${
        active
          ? "ring-1 ring-primary/30"
          : ""
      }`}
    >
      {/* ----------------------------------------------------
          Image
      ---------------------------------------------------- */}
      <div className="relative overflow-hidden">
        <img
          src={service.image}
          alt={`${service.title} by PFMC`}
          width={1600}
          height={900}
          loading={index === 0 ? "eager" : "lazy"}
          className="aspect-[16/10] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] sm:aspect-[16/9] lg:aspect-[21/9]"
        />

        {/* Dark overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5" />

        {/* Additional bottom gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 to-transparent" />
      </div>

      {/* ----------------------------------------------------
          Number
      ---------------------------------------------------- */}
      <div className="absolute left-4 top-4">
        <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-white/20 bg-black/35 px-3 text-xs font-extrabold text-white backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* ----------------------------------------------------
          Service icon
      ---------------------------------------------------- */}
      <div className="absolute right-4 top-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary">
          <service.icon className="h-5 w-5" />
        </div>
      </div>

      {/* ----------------------------------------------------
          Content
      ---------------------------------------------------- */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <div className="max-w-2xl">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground/70">
            PFMC
          </p>

          <h3 className="text-xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-2xl lg:text-3xl">
            {service.title}
          </h3>

          {service.description && (
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-white/80 sm:text-sm">
              {service.description}
            </p>
          )}

          {/* ------------------------------------------------
              Bottom action
          ------------------------------------------------ */}
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="hidden items-center gap-2 text-[11px] font-semibold text-white/70 sm:flex">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Integrated &amp; Professional Service
            </div>

            <Link
              to="/services/$slug"
              params={{
                slug: service.slug,
              }}
              aria-label={`Learn more about ${service.title}`}
              className="group/button inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/40 sm:text-sm"
            >
              Learn More

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          Hover border
      ---------------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-all duration-500 group-hover:border-primary/40" />
    </article>
  );
}