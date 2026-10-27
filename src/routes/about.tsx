import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Target,
  Eye,
  Gem,
  CheckCircle2,
  Award,
  Users,
  Building2,
  Shield,
  Sparkles,
  Clock,
  HeartHandshake,
  Lightbulb,
} from "lucide-react";
import { PageHero, CtaBand } from "@/components/PageHero";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { StatGrid } from "@/components/CountUp";
import { stats } from "@/lib/site-data";
import aboutInterior from "@/assets/about-interior.jpg";
import servicesTeam from "@/assets/services-team.jpg";

// Floating particles background component
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }[] = [];

    const count = 50;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99, 102, 241, 0.3)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
}

// Counter animation hook
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

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return { count, ref };
}

function About() {
  const { count: yearsCount, ref: yearsRef } = useCounter(12);
  const { count: projectsCount, ref: projectsRef } = useCounter(250);
  const { count: clientsCount, ref: clientsRef } = useCounter(150);

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Integrated Solutions."
        highlight="Lasting Impact."
        description="PFMC is a forward-thinking property and facility management company delivering integrated solutions across operations, maintenance, workplace experience, and sustainability."
        image={aboutInterior}
      />

      {/* Stats Bar */}
      <div className="relative -mt-10 z-10 mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 divide-x divide-border rounded-2xl border bg-card/95 backdrop-blur-lg shadow-2xl lg:grid-cols-4">
          {[
            {
              label: "Years of Excellence",
              ref: yearsRef,
              value: yearsCount,
              suffix: "+",
            },
            {
              label: "Projects Delivered",
              ref: projectsRef,
              value: projectsCount,
              suffix: "+",
            },
            {
              label: "Happy Clients",
              ref: clientsRef,
              value: clientsCount,
              suffix: "+",
            },
            {
              label: "Team Members",
              value: "500+",
              suffix: "",
              isStatic: true,
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center p-6 ${
                i === 0 ? "rounded-l-2xl" : ""
              } ${i === 3 ? "rounded-r-2xl" : ""}`}
            >
              <span
                ref={item.ref || undefined}
                className="text-3xl font-extrabold text-primary sm:text-4xl lg:text-5xl"
              >
                {item.value}
                {item.suffix}
              </span>

              <span className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-2xl" />

              <img
                src={servicesTeam}
                alt="PFMC team at work"
                width={1200}
                height={700}
                loading="lazy"
                className="relative w-full rounded-2xl object-cover shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
              />

              <div className="absolute -bottom-4 -right-4 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30">
                ⚡ 24/7 Support
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Our Story
              </div>

              <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Built on trust,{" "}
                <span className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
                  run on precision.
                </span>
              </h2>

              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  Founded with a single goal — to make buildings work better
                  for the people inside them — PFMC has grown into a
                  multi-disciplinary facility management partner serving
                  corporate campuses, hospitals, malls, factories, and
                  residential communities.
                </p>

                <p>
                  Our teams combine on-ground discipline with digital
                  monitoring, so every asset is tracked, every SLA is
                  measurable, and every rupee of spend is accounted for.
                </p>
              </div>

              <ul className="space-y-3">
                {[
                  "Certified, background-verified workforce",
                  "ISO-aligned processes and documented SOPs",
                  "Transparent monthly performance reporting",
                ].map((t, i) => (
                  <Reveal key={t} delay={100 + i * 50}>
                    <li className="flex items-center gap-3 rounded-lg bg-surface/50 p-3 transition-colors hover:bg-surface">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm font-medium">{t}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface via-background to-surface py-20 md:py-28">
        <Particles />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <HeartHandshake className="h-3.5 w-3.5" />
                Our Core
              </div>

              <SectionHeading
                eyebrow="What Drives Us"
                title="Mission, Vision &"
                highlight="Values"
                className="mt-2"
              />
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Our Mission",
                body: "To deliver reliable, technology-enabled facility services that protect asset value and elevate everyday experience.",
                gradient: "from-blue-500 to-indigo-500",
                emoji: "🎯",
              },
              {
                icon: Eye,
                title: "Our Vision",
                body: "To be India's most trusted integrated property and facility management partner across every asset class.",
                gradient: "from-purple-500 to-pink-500",
                emoji: "👁️",
              },
              {
                icon: Gem,
                title: "Our Values",
                body: "Integrity, accountability, safety-first thinking and a relentless focus on service quality.",
                gradient: "from-amber-500 to-orange-500",
                emoji: "💎",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <div className="group relative h-full rounded-2xl border bg-card/80 p-8 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 backdrop-blur-sm">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-5" />

                  <div className="relative">
                    <div className="inline-flex items-center gap-3">
                      <div
                        className={`rounded-xl bg-gradient-to-br ${c.gradient} p-3 shadow-lg`}
                      >
                        <c.icon className="h-6 w-6 text-white" />
                      </div>

                      <span className="text-2xl">{c.emoji}</span>
                    </div>

                    <h3 className="mt-4 text-xl font-bold group-hover:text-primary transition-colors">
                      {c.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {c.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <Reveal>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Award className="h-3.5 w-3.5" />
              Why PFMC
            </div>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Your Trusted Partner in{" "}
              <span className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
                Facility Management
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Shield,
              title: "Certified Excellence",
              desc: "ISO-certified processes with rigorous quality standards",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: Users,
              title: "Expert Team",
              desc: "Background-verified professionals with industry expertise",
              color: "from-purple-500 to-purple-600",
            },
            {
              icon: Clock,
              title: "24/7 Support",
              desc: "Round-the-clock service desk with rapid response times",
              color: "from-green-500 to-green-600",
            },
            {
              icon: Building2,
              title: "Pan-India Reach",
              desc: "Serving multiple asset classes across the country",
              color: "from-orange-500 to-orange-600",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="group rounded-2xl border bg-card p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div
                  className={`mx-auto w-fit rounded-2xl bg-gradient-to-br ${item.color} p-3 shadow-lg transition-transform group-hover:scale-110`}
                >
                  <item.icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="mt-4 font-bold">{item.title}</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <StatGrid items={stats} />
        </div>
      </section>

      {/* Approach / Timeline */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <Reveal>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Lightbulb className="h-3.5 w-3.5" />
              Our Approach
            </div>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              How We <span className="text-primary">Deliver</span> Excellence
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-12">
          <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 bg-primary/20" />

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Consult & Assess",
                desc: "We begin with a thorough assessment of your property's unique needs and challenges.",
              },
              {
                step: "02",
                title: "Plan & Strategize",
                desc: "Our team develops a customized facility management plan aligned with your goals.",
              },
              {
                step: "03",
                title: "Execute & Monitor",
                desc: "We deploy certified teams and digital tools for real-time monitoring and quality control.",
              },
              {
                step: "04",
                title: "Review & Optimize",
                desc: "Continuous improvement through data-driven insights and regular performance reviews.",
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 80}>
                <div
                  className={`flex flex-col items-center gap-4 md:flex-row ${
                    i % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-3">
                      <span className="text-4xl font-extrabold text-primary/20">
                        {item.step}
                      </span>

                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>

                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-primary/30 bg-primary text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/30">
                    {i + 1}
                  </div>

                  <div className="flex-1" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About PFMC | Property & Facility Management Experts",
      },
      {
        name: "description",
        content:
          "Learn about PFMC — our mission, vision, values and the integrated facility management expertise behind 250+ delivered projects.",
      },
      {
        property: "og:title",
        content: "About PFMC | Property & Facility Management Experts",
      },
      {
        property: "og:description",
        content:
          "Learn about PFMC — our mission, vision, values and the integrated facility management expertise behind 250+ delivered projects.",
      },
    ],
  }),

  component: About,
});