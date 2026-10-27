import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { navLinks } from "@/lib/site-data";

const logo = {
  url: "/pfmc-logo.png",
};

export function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur transition-shadow ${
        scrolled ? "shadow-card" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2.5 sm:px-6 lg:py-3">

        {/* PFMC Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          <img
            src={logo.url}
            alt="PFMC - Integrated Property & Facility Management"
            className="
              block
              h-auto
              w-[105px]
              sm:w-[120px]
              lg:w-[130px]
              object-contain
            "
          />
        </Link>

        <div className="flex items-center gap-4">

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 xl:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Get a Quote */}
          <Link
            to="/contact"
            className="hidden items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 sm:inline-flex"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* Dark Mode */}
          <button
            aria-label="Toggle dark mode"
            onClick={() => setDark((d) => !d)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors hover:border-primary hover:text-primary"
          >
            {dark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Mobile Menu */}
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors hover:border-primary hover:text-primary xl:hidden"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t bg-background xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="border-b py-4 text-sm font-medium last:border-0 hover:text-primary"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="my-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}