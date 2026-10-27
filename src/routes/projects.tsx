import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  MapPin,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { PageHero, CtaBand } from "@/components/PageHero";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { StatGrid } from "@/components/CountUp";
import { projects, stats } from "@/lib/site-data";
import heroBuilding from "@/assets/hero-building.png";
import { useCallback, useEffect, useRef, useState } from "react";

function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousScrollY = useRef(0);

  /* =========================================================
     OPEN PROJECT
  ========================================================= */
  const handleViewDetails = useCallback(
    (project: any, index: number) => {
      // Save exact page position
      previousScrollY.current = window.scrollY;

      setCurrentIndex(index);
      setSelectedProject(project);

      // Prevent background page from scrolling
      document.body.style.overflow = "hidden";
    },
    []
  );

  /* =========================================================
     CLOSE PROJECT
  ========================================================= */
  const handleClose = useCallback(() => {
    setSelectedProject(null);

    // Restore body scrolling
    document.body.style.overflow = "";

    // Restore exact page position after modal disappears
    requestAnimationFrame(() => {
      window.scrollTo({
        top: previousScrollY.current,
        behavior: "auto",
      });
    });
  }, []);

  /* =========================================================
     NEXT PROJECT - FIXED
  ========================================================= */
  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % projects.length;
    setCurrentIndex(nextIndex);
    setSelectedProject(projects[nextIndex]);
    // ✅ Reset modal scroll to top
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [currentIndex]);

  /* =========================================================
     PREVIOUS PROJECT - FIXED
  ========================================================= */
  const handlePrevious = useCallback(() => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(prevIndex);
    setSelectedProject(projects[prevIndex]);
    // ✅ Reset modal scroll to top
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [currentIndex]);

  /* =========================================================
     MODAL SCROLL RESET
  ========================================================= */
  useEffect(() => {
    if (!selectedProject) return;

    const modal = modalRef.current;

    if (!modal) return;

    // Wait until the new project is rendered
    requestAnimationFrame(() => {
      modal.scrollTop = 0;
    });
  }, [selectedProject]);

  /* =========================================================
     KEYBOARD CONTROLS
  ========================================================= */
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    selectedProject,
    handleClose,
    handleNext,
    handlePrevious,
  ]);

  /* =========================================================
     CLEANUP
  ========================================================= */
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const scopeItems = [
    "Asset lifecycle & compliance management",
    "Tenant onboarding and relationship handling",
    "Budgeting, billing and vendor governance",
    "Periodic audits and performance reporting",
  ];

  return (
    <>
      {/* =====================================================
          PROJECT DETAIL MODAL
      ===================================================== */}
      {selectedProject && (
        <div
          ref={modalRef}
          id="project-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.name} project details`}
          className="
            fixed
            inset-0
            z-[9999]
            h-[100dvh]
            w-full
            overflow-y-auto
            overscroll-contain
            bg-white
          "
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* =================================================
              MODAL INNER WRAPPER
          ================================================= */}
          <div className="mx-auto min-h-full w-full max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            {/* =================================================
                HERO IMAGE
            ================================================= */}
            <div
              className="
                relative
                h-[280px]
                overflow-hidden
                rounded-2xl
                bg-black
                sm:h-[380px]
                lg:h-[460px]
              "
            >
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="h-full w-full object-cover"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* =================================================
                  CLOSE BUTTON
              ================================================= */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close project details"
                className="
                  absolute
                  right-4
                  top-4
                  z-20
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border-0
                  bg-black/40
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-black/70
                "
              >
                <X className="h-5 w-5" />
              </button>

              {/* =================================================
                  PREVIOUS
              ================================================= */}
              <button
                type="button"
                onClick={handlePrevious}
                aria-label="Previous project"
                className="
                  absolute
                  left-3
                  top-1/2
                  z-20
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border-0
                  bg-black/40
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-black/70
                  sm:left-5
                  sm:h-12
                  sm:w-12
                "
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* =================================================
                  NEXT
              ================================================= */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next project"
                className="
                  absolute
                  right-3
                  top-1/2
                  z-20
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border-0
                  bg-black/40
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-black/70
                  sm:right-5
                  sm:h-12
                  sm:w-12
                "
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* =================================================
                  COUNTER
              ================================================= */}
              <div
                className="
                  absolute
                  bottom-5
                  left-1/2
                  z-20
                  -translate-x-1/2
                  rounded-full
                  bg-black/70
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  backdrop-blur-md
                "
              >
                {currentIndex + 1} / {projects.length}
              </div>

              {/* =================================================
                  HERO CONTENT
              ================================================= */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  z-10
                  p-5
                  sm:p-8
                  lg:p-10
                "
              >
                <span
                  className="
                    inline-flex
                    rounded-full
                    bg-primary/90
                    px-4
                    py-1.5
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-white
                  "
                >
                  {selectedProject.type}
                </span>

                <h1
                  className="
                    mt-3
                    max-w-4xl
                    break-words
                    text-2xl
                    font-extrabold
                    leading-tight
                    text-white
                    sm:text-3xl
                    lg:text-4xl
                  "
                >
                  {selectedProject.name}
                </h1>

                <div
                  className="
                    mt-2
                    flex
                    flex-wrap
                    items-center
                    gap-x-4
                    gap-y-1
                    text-sm
                    text-white/80
                  "
                >
                  <span>{selectedProject.area}</span>
                  <span>•</span>
                  <span>{selectedProject.city}</span>
                </div>
              </div>
            </div>

            {/* =================================================
                PROJECT CONTENT
            ================================================= */}
            <div
              className="
                mt-8
                grid
                grid-cols-1
                gap-8
                pb-16
                lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]
              "
            >
              {/* =================================================
                  LEFT CONTENT
              ================================================= */}
              <div className="min-w-0">
                <h2 className="text-2xl font-bold text-gray-900">
                  Project Overview
                </h2>

                <p
                  className="
                    mt-4
                    break-words
                    text-base
                    leading-8
                    text-gray-600
                  "
                >
                  {selectedProject.description}
                </p>

                <h3 className="mt-8 text-xl font-bold text-gray-900">
                  Scope & Deliverables
                </h3>

                <ul className="mt-4 flex flex-col gap-3">
                  {scopeItems.map((item, index) => (
                    <li
                      key={index}
                      className="
                        flex
                        items-start
                        gap-3
                        text-sm
                        leading-6
                        text-gray-700
                      "
                    >
                      <span
                        className="
                          mt-[7px]
                          h-2
                          w-2
                          shrink-0
                          rounded-full
                          bg-primary
                        "
                      />

                      <span className="break-words">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* =================================================
                  DETAILS CARD
              ================================================= */}
              <div className="min-w-0">
                <div
                  className="
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-5
                    shadow-sm
                    sm:p-6
                    lg:sticky
                    lg:top-6
                  "
                >
                  <h3
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-gray-500
                    "
                  >
                    Project Details
                  </h3>

                  <div className="mt-4">
                    {/* Client */}
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                        border-b
                        border-gray-200
                        py-3
                      "
                    >
                      <span className="shrink-0 text-sm text-gray-500">
                        Client
                      </span>

                      <span className="max-w-[60%] break-words text-right text-sm font-semibold text-gray-900">
                        {selectedProject.client || "Leading Brand"}
                      </span>
                    </div>

                    {/* Area */}
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                        border-b
                        border-gray-200
                        py-3
                      "
                    >
                      <span className="shrink-0 text-sm text-gray-500">
                        Area
                      </span>

                      <span className="text-right text-sm font-semibold text-gray-900">
                        {selectedProject.area}
                      </span>
                    </div>

                    {/* Team */}
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                        border-b
                        border-gray-200
                        py-3
                      "
                    >
                      <span className="shrink-0 text-sm text-gray-500">
                        Team Size
                      </span>

                      <span className="text-right text-sm font-semibold text-gray-900">
                        {selectedProject.teamSize || "50+"}
                      </span>
                    </div>

                    {/* Year */}
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                        py-3
                      "
                    >
                      <span className="shrink-0 text-sm text-gray-500">
                        Year
                      </span>

                      <span className="text-right text-sm font-semibold text-gray-900">
                        {selectedProject.completionYear || "2024"}
                      </span>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="mt-5 border-t border-gray-200 pt-5">
                    <Link
                      to="/contact"
                      onClick={handleClose}
                      className="
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-full
                        bg-primary
                        px-6
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        shadow-lg
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:shadow-xl
                      "
                    >
                      Contact Us
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          PAGE HERO
      ===================================================== */}
      <PageHero
        eyebrow="Our Projects"
        title="Spaces We"
        highlight="Keep Running"
        description="A snapshot of the properties our teams manage day and night, across asset classes and cities."
        image={heroBuilding}
      />

      {/* =====================================================
          PROJECT GRID
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <div
                className="
                  group
                  flex
                  h-full
                  flex-col
                  overflow-hidden
                  rounded-xl
                  border
                  bg-card
                  shadow-card
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                {/* Image */}
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.name} — ${p.type} facility managed by PFMC`}
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  <span
                    className="
                      absolute
                      left-3
                      top-3
                      rounded-full
                      bg-primary
                      px-2.5
                      py-1
                      text-[11px]
                      font-bold
                      text-primary-foreground
                      tabular-nums
                    "
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className="
                      absolute
                      bottom-3
                      left-3
                      rounded-full
                      bg-black/60
                      px-3
                      py-1
                      text-[10px]
                      font-medium
                      text-white
                      backdrop-blur-sm
                    "
                  >
                    {p.type}
                  </span>

                  {/* Hover button */}
                  <button
                    type="button"
                    onClick={() => handleViewDetails(p, i)}
                    aria-label={`View details for ${p.name}`}
                    className="
                      absolute
                      inset-0
                      flex
                      cursor-pointer
                      items-center
                      justify-center
                      bg-black/50
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:opacity-100
                    "
                  >
                    <span
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-full
                        bg-primary
                        px-6
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        shadow-lg
                        transition-transform
                        duration-300
                        hover:scale-105
                      "
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </span>
                  </button>
                </div>

                {/* Card content */}
                <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
                  <span className="eyebrow">
                    {p.type}
                  </span>

                  <h2
                    className="
                      mt-2
                      break-words
                      text-base
                      font-bold
                      transition-colors
                      group-hover:text-primary
                    "
                  >
                    {p.name}
                  </h2>

                  <p
                    className="
                      mt-2
                      flex
                      items-center
                      gap-1
                      text-xs
                      text-muted-foreground
                    "
                  >
                    <MapPin className="h-3 w-3 shrink-0" />

                    <span className="break-words">
                      {p.area} · {p.city}
                    </span>
                  </p>

                  {p.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {p.description}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => handleViewDetails(p, i)}
                    className="
                      group/link
                      mt-4
                      inline-flex
                      cursor-pointer
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-primary
                      transition-all
                      hover:gap-3
                    "
                  >
                    View Details

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="By the Numbers"
              title="Delivery at"
              highlight="scale"
            />
          </Reveal>

          <StatGrid
            items={stats}
            className="mt-8"
          />
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <CtaBand />
    </>
  );
}

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      {
        title: "Projects & Case Studies | PFMC",
      },
      {
        name: "description",
        content:
          "Explore facility management projects delivered by PFMC across corporate campuses, hospitals, malls, plants, schools and residential communities.",
      },
      {
        property: "og:title",
        content: "Projects & Case Studies | PFMC",
      },
      {
        property: "og:description",
        content:
          "Explore facility management projects delivered by PFMC across corporate campuses, hospitals, malls, plants, schools and residential communities.",
      },
    ],
  }),
  component: Projects,
});