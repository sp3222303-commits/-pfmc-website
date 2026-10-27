import { createFileRoute } from "@tanstack/react-router";
import {
  MapPin,
  Briefcase,
  ArrowRight,
  Award,
  Users,
  TrendingUp,
  Shield,
  X,
} from "lucide-react";
import { PageHero, CtaBand } from "@/components/PageHero";
import { Reveal, SectionHeading } from "@/components/Reveal";
import servicesTeam from "@/assets/services-team.jpg";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

/* ==========================================================
   COUNTER ANIMATION
========================================================== */

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

/* ==========================================================
   OPENINGS
========================================================== */

const openings = [
  {
    role: "Facility Manager",
    location: "Noida",
    type: "Full-time",
    experience: "5-8 years",
  },
  {
    role: "MEP Technician",
    location: "Gurugram",
    type: "Full-time",
    experience: "2-4 years",
  },
  {
    role: "Housekeeping Supervisor",
    location: "Pune",
    type: "Full-time",
    experience: "3-5 years",
  },
  {
    role: "Security Shift In-charge",
    location: "Bengaluru",
    type: "Full-time",
    experience: "4-6 years",
  },
  {
    role: "Helpdesk Executive",
    location: "Hyderabad",
    type: "Full-time",
    experience: "1-3 years",
  },
  {
    role: "Energy & Sustainability Analyst",
    location: "Noida",
    type: "Full-time",
    experience: "3-6 years",
  },
];

/* ==========================================================
   API CONFIG
========================================================== */

const API_URL = "http://localhost:5000/api";

/* ==========================================================
   VALIDATION
========================================================== */

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;

function normalizeIndianPhone(phone: string) {
  let value = phone.trim();

  value = value.replace(/[^\d+]/g, "");

  if (value.startsWith("+91")) {
    value = value.slice(3);
  } else if (value.startsWith("91") && value.length === 12) {
    value = value.slice(2);
  }

  return value;
}

function formatIndianPhone(phone: string) {
  const digits = normalizeIndianPhone(phone);

  if (digits.length !== 10) {
    return phone.trim();
  }

  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

/* ==========================================================
   APPLY MODAL
========================================================== */

function ApplyModal({
  isOpen,
  onClose,
  position,
}: {
  isOpen: boolean;
  onClose: () => void;
  position: string;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Error state for inline validation
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    message: "",
  });

  // Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    message: "",
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        experience: "",
        message: "",
      });
      setErrors({
        fullName: "",
        email: "",
        phone: "",
        experience: "",
        message: "",
      });
      setLoading(false);
      setSuccess(false);
    }
  }, [isOpen]);

  // Phone input formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // If user is deleting, allow backspace to work naturally
    if (rawValue.length < formData.phone.length) {
      setFormData({ ...formData, phone: rawValue });
      return;
    }
    const digits = rawValue.replace(/\D/g, "");
    let formatted = "";
    if (digits.length > 0) {
      if (digits.length <= 5) {
        formatted = `+91 ${digits}`;
      } else {
        formatted = `+91 ${digits.slice(0, 5)} ${digits.slice(5, 10)}`;
      }
    }
    setFormData({ ...formData, phone: formatted });
    if (errors.phone) setErrors({ ...errors, phone: "" });
  };

  // Validation functions
  const validateFullName = (name: string): string => {
    if (!name.trim()) return "Full Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) return "Email is required";
    if (!EMAIL_REGEX.test(email.trim())) return "Please enter a valid email address";

    // Additional check for invalid TLDs
    const domain = email.trim().split("@")[1];
    if (domain && !domain.includes(".")) return "Please enter a valid email address";
    const tld = domain?.split(".").pop() || "";
    if (tld.length < 2) return "Please enter a valid email address";

    return "";
  };

  const validatePhone = (phone: string): string => {
    if (!phone.trim()) return "Phone number is required";
    const digits = normalizeIndianPhone(phone);
    if (digits.length !== 10) return "Please enter a valid 10-digit mobile number";
    if (!/^[6-9]/.test(digits)) return "Mobile number must start with 6, 7, 8, or 9";
    return "";
  };

  const validateExperience = (exp: string): string => {
    if (!exp.trim()) return "Years of experience is required";
    return "";
  };

  const validateMessage = (msg: string): string => {
    if (!msg.trim()) return "Please tell us about yourself";
    if (msg.trim().length < 10) return "Message must be at least 10 characters";
    return "";
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors = {
      fullName: validateFullName(formData.fullName),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      experience: validateExperience(formData.experience),
      message: validateMessage(formData.message),
    };

    setErrors(newErrors);

    // Check if any errors exist
    return !Object.values(newErrors).some((error) => error !== "");
  };

  /* ========================================================
     FORM SUBMIT
  ======================================================== */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    // Reset errors
    setErrors({
      fullName: "",
      email: "",
      phone: "",
      experience: "",
      message: "",
    });

    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector(
        '[data-error="true"]'
      ) as HTMLElement;
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
        firstErrorField.focus();
      }
      return;
    }

    const phoneDigits = normalizeIndianPhone(formData.phone);
    const formattedPhone = formatIndianPhone(formData.phone);

    const data = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formattedPhone,
      position,
      experience: formData.experience.trim(),
      message: formData.message.trim(),
    };

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/careers/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        toast.success("✅ Application submitted successfully! We'll contact you soon.");

        setTimeout(() => {
          onClose();
          setSuccess(false);
          setLoading(false);
        }, 2000);
      } else {
        toast.error(result.message || "❌ Failed to submit application. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      toast.error("❌ Network error. Please try again.");
      console.error("Application error:", error);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}

        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Apply for {position}</h3>

          <button
            onClick={onClose}
            type="button"
            className="rounded-full p-1 hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* FULL NAME */}

          <div>
            <label className="text-xs font-semibold">
              Full Name <span className="text-red-500">*</span>
            </label>

            <input
              name="fullName"
              type="text"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: "" });
              }}
              onBlur={() => {
                const error = validateFullName(formData.fullName);
                setErrors({ ...errors, fullName: error });
              }}
              autoComplete="name"
              className={`mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                errors.fullName ? "border-red-500 ring-red-500" : ""
              }`}
              data-error={!!errors.fullName}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* EMAIL */}

          <div>
            <label className="text-xs font-semibold">
              Email <span className="text-red-500">*</span>
            </label>

            <input
              name="email"
              type="email"
              placeholder="you@email.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              onBlur={() => {
                const error = validateEmail(formData.email);
                setErrors({ ...errors, email: error });
              }}
              autoComplete="email"
              className={`mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                errors.email ? "border-red-500 ring-red-500" : ""
              }`}
              data-error={!!errors.email}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* PHONE */}

          <div>
            <label className="text-xs font-semibold">
              Phone Number <span className="text-red-500">*</span>
            </label>

            <input
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handlePhoneChange}
              onBlur={() => {
                const error = validatePhone(formData.phone);
                setErrors({ ...errors, phone: error });
              }}
              inputMode="tel"
              autoComplete="tel"
              className={`mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                errors.phone ? "border-red-500 ring-red-500" : ""
              }`}
              data-error={!!errors.phone}
            />
            {errors.phone ? (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            ) : (
              <p className="mt-1 text-[11px] text-muted-foreground">
                Indian mobile number only
              </p>
            )}
          </div>

          {/* EXPERIENCE */}

          <div>
            <label className="text-xs font-semibold">
              Years of Experience <span className="text-red-500">*</span>
            </label>

            <input
              name="experience"
              placeholder="e.g., 5+ years"
              value={formData.experience}
              onChange={(e) => {
                setFormData({ ...formData, experience: e.target.value });
                if (errors.experience) setErrors({ ...errors, experience: "" });
              }}
              onBlur={() => {
                const error = validateExperience(formData.experience);
                setErrors({ ...errors, experience: error });
              }}
              className={`mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                errors.experience ? "border-red-500 ring-red-500" : ""
              }`}
              data-error={!!errors.experience}
            />
            {errors.experience && (
              <p className="mt-1 text-xs text-red-500">{errors.experience}</p>
            )}
          </div>

          {/* MESSAGE */}

          <div>
            <label className="text-xs font-semibold">
              Why do you want to join PFMC? <span className="text-red-500">*</span>
            </label>

            <textarea
              name="message"
              placeholder="Tell us about yourself and why you're interested..."
              rows={3}
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: "" });
              }}
              onBlur={() => {
                const error = validateMessage(formData.message);
                setErrors({ ...errors, message: error });
              }}
              className={`mt-1 w-full resize-y rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                errors.message ? "border-red-500 ring-red-500" : ""
              }`}
              data-error={!!errors.message}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-500">{errors.message}</p>
            )}
          </div>

          {/* BUTTONS */}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border px-4 py-2 text-sm font-semibold hover:bg-muted"
            >
              Cancel
            </button>

            <button              type="submit"
              disabled={loading || success}
              className="flex-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-70"
            >
              {loading ? "Submitting..." : success ? "✅ Submitted!" : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ==========================================================
   CAREERS PAGE
========================================================== */

function Careers() {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { count: teamCount, ref: teamRef } = useCounter(500);

  const { count: yearsCount, ref: yearsRef } = useCounter(15);

  const { count: growthCount, ref: growthRef } = useCounter(30);

  const { count: safetyCount, ref: safetyRef } = useCounter(99);

  return (
    <>
      {/* HERO */}

      <PageHero
        eyebrow="Careers"
        title="Build Your Career"
        highlight="With PFMC"
        description="We invest in training, safety and growth. If you take pride in getting the details right, you will fit in here."
        image={servicesTeam}
      />

      {/* STATS */}

      <section className="border-b bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="rounded-2xl border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-3 flex justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>

              <span
                ref={teamRef}
                className="text-3xl font-extrabold text-foreground sm:text-4xl"
              >
                {teamCount}+
              </span>

              <div className="mt-1 text-sm text-muted-foreground">Team Members</div>
            </div>

            <div className="rounded-2xl border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-3 flex justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>

              <span
                ref={yearsRef}
                className="text-3xl font-extrabold text-foreground sm:text-4xl"
              >
                {yearsCount}+
              </span>

              <div className="mt-1 text-sm text-muted-foreground">Years of Excellence</div>
            </div>

            <div className="rounded-2xl border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-3 flex justify-center">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>

              <span
                ref={growthRef}
                className="text-3xl font-extrabold text-foreground sm:text-4xl"
              >
                {growthCount}%
              </span>

              <div className="mt-1 text-sm text-muted-foreground">Growth Rate</div>
            </div>

            <div className="rounded-2xl border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-3 flex justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>

              <span
                ref={safetyRef}
                className="text-3xl font-extrabold text-foreground sm:text-4xl"
              >
                {safetyCount}%
              </span>

              <div className="mt-1 text-sm text-muted-foreground">Safety Record</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY JOIN */}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Why Join Us"
            title="More than a"
            highlight="job"
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Structured Training",
              description:
                "Induction, on-the-job coaching and certification support.",
            },
            {
              icon: TrendingUp,
              title: "Career Progression",
              description:
                "Clear growth paths from technician to site leadership.",
            },
            {
              icon: Shield,
              title: "Safety First",
              description:
                "PPE, drills and a zero-compromise safety culture.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative">
                  <div className="mb-4 w-fit rounded-full bg-primary/10 p-3 transition-all duration-300 group-hover:scale-110">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="text-lg font-bold">{item.title}</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OPEN POSITIONS */}

      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Open Positions"
              title="Current"
              highlight="Openings"
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {openings.map((o, i) => (
              <Reveal key={o.role} delay={i * 60}>
                <article className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative flex flex-wrap items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold">{o.role}</h3>

                      <div className="mt-1 flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                          {o.location}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5 text-primary" />
                          {o.type}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <Award className="h-3.5 w-3.5 text-primary" />
                          {o.experience}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPosition(o.role);
                        setIsModalOpen(true);
                      }}
                      className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                    >
                      Apply Now
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      {/* APPLY MODAL */}

      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPosition(null);
        }}
        position={selectedPosition || ""}
      />
    </>
  );
}

/* ==========================================================
   ROUTE
========================================================== */

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      {
        title:
          "Careers at PFMC | Join Our Facility Management Team",
      },
      {
        name: "description",
        content:
          "Explore open roles at PFMC — facility managers, MEP technicians, housekeeping supervisors, security and helpdesk positions across India.",
      },
      {
        property: "og:title",
        content:
          "Careers at PFMC | Join Our Facility Management Team",
      },
      {
        property: "og:description",
        content:
          "Explore open roles at PFMC — facility managers, MEP technicians, housekeeping supervisors, security and helpdesk positions across India.",
      },
    ],
  }),

  component: Careers,
});