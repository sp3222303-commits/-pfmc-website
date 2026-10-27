import { Link } from "@tanstack/react-router";
import {
  Linkedin,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ArrowUp,
  Send,
  Clock,
  Shield,
} from "lucide-react";
import { useState, useEffect } from "react";

import { navLinks, services } from "@/lib/site-data";

const logo = {
  url: "/pfmc-logo.png",
};

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative overflow-hidden bg-ink text-ink-foreground">

      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-ink/90 opacity-50" />

      <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl animate-pulse" />

      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl animate-pulse delay-1000" />

      {/* Main Footer */}
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">

        {/* Company */}
        <div className="transform transition-all duration-500 hover:-translate-y-1">

          {/* PFMC LOGO - Compact background box */}
          <div className="inline-flex items-center justify-center rounded-lg bg-white px-2.5 py-1.5 shadow-sm transition-all duration-500 hover:shadow-md hover:scale-105 group">

            <img
              src={logo.url}
              alt="PFMC Prop Facility Management Company"
              width={160}
              height={70}
              loading="lazy"
              className="h-auto w-[135px] object-contain transition-transform duration-700 group-hover:rotate-1"
            />

          </div>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-foreground/70 animate-fadeIn">
            Delivering integrated property and facility management services
            that enhance performance, reduce costs, and create sustainable
            value.
          </p>

          {/* Social Icons */}
          <div className="mt-5 flex gap-2.5">

            <a
              href="#"
              aria-label="LinkedIn"
              className="group grid h-9 w-9 place-items-center rounded-lg border border-ink-foreground/20 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white hover:scale-110 hover:rotate-6"
            >
              <Linkedin className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="group grid h-9 w-9 place-items-center rounded-lg border border-ink-foreground/20 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white hover:scale-110 hover:-rotate-6"
            >
              <Instagram className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
            </a>

            <a
              href="tel:+911123446789"
              aria-label="Call PFMC"
              className="group grid h-9 w-9 place-items-center rounded-lg border border-ink-foreground/20 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white hover:scale-110"
            >
              <Phone className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
            </a>

          </div>
        </div>

        {/* Quick Links */}
        <div className="transform transition-all duration-500 hover:-translate-y-1">

          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]">
            <span className="h-px w-5 bg-primary/50" />
            Quick Links
          </h3>

          <ul className="mt-4 space-y-2.5">

            {navLinks.map((l, index) => (
              <li
                key={l.to}
                className="transform transition-all duration-300 hover:translate-x-2"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Link
                  to={l.to}
                  className="group flex items-center text-sm text-ink-foreground/70 transition-all duration-300 hover:text-primary"
                >
                  <span className="mr-0 max-w-0 overflow-hidden transition-all duration-300 group-hover:mr-2 group-hover:max-w-3 group-hover:text-primary">
                    →
                  </span>

                  {l.label}

                  <span className="ml-auto opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </li>
            ))}

          </ul>
        </div>

        {/* Services */}
        <div className="transform transition-all duration-500 hover:-translate-y-1">

          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]">
            <span className="h-px w-5 bg-primary/50" />
            Our Services
          </h3>

          <ul className="mt-4 space-y-2.5">

            {services.map((s, index) => (
              <li
                key={s.slug}
                className="origin-left transform transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Link
                  to="/services"
                  hash={s.slug}
                  className="group flex items-center text-sm text-ink-foreground/70 transition-all duration-300 hover:text-primary"
                >
                  <span className="mr-0 max-w-0 overflow-hidden transition-all duration-300 group-hover:mr-2 group-hover:max-w-3 group-hover:text-primary">
                    →
                  </span>

                  {s.title}

                  <span className="ml-auto opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                    <Shield className="h-3 w-3 text-primary" />
                  </span>
                </Link>
              </li>
            ))}

          </ul>
        </div>

        {/* Contact */}
        <div className="transform transition-all duration-500 hover:-translate-y-1">

          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]">
            <span className="h-px w-5 bg-primary/50" />
            Contact Us
          </h3>

          <ul className="mt-4 space-y-3.5 text-sm text-ink-foreground/70">

            <li className="group flex gap-3 transition-all duration-300 hover:translate-x-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />

              <span>
                123 Business Park, Sector 45,
                <br />
                Noida, Uttar Pradesh, India
              </span>
            </li>

            <li className="group flex gap-3 transition-all duration-300 hover:translate-x-2">

              <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />

              <a
                href="mailto:info@pfmc.com"
                className="transition-colors hover:text-primary"
              >
                info@pfmc.com
              </a>

            </li>

            <li className="group flex gap-3 transition-all duration-300 hover:translate-x-2">

              <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />

              <a
                href="tel:+911234467890"
                className="transition-colors hover:text-primary"
              >
                +91 12345 67890
              </a>

            </li>

          </ul>

          <Link
            to="/contact"
            className="group relative mt-5 inline-flex items-center gap-2 overflow-hidden rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-lg"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <span className="relative z-10 flex items-center gap-2">
              Get in Touch
              <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </Link>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-ink-foreground/10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-ink-foreground/60 sm:flex-row sm:px-6">

          <p className="animate-fadeIn text-center sm:text-left">
            © {new Date().getFullYear()} PFMC Prop Facility Management
            Company. All Rights Reserved.

            <span className="ml-2 inline-block text-primary/50">
              <Clock className="inline h-3 w-3 animate-pulse" />
            </span>
          </p>

          <div className="flex gap-5">

            <Link
              to="/privacy"
              className="transition-all duration-300 hover:scale-105 hover:text-primary"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition-all duration-300 hover:scale-105 hover:text-primary"
            >
              Terms &amp; Conditions
            </Link>

          </div>

        </div>
      </div>

      {/* Back To Top */}
      <button
        aria-label="Back to top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className={`absolute right-4 top-6 z-50 grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-all duration-300 hover:rotate-6 hover:scale-110 hover:shadow-xl sm:right-8 ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-4.5 w-4.5" />
      </button>

    </footer>
  );
}