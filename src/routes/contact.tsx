import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  ChevronRight,
  MessageCircle,
  CheckCircle2,
  ExternalLink,
  User,
  Building2,
  Briefcase,
  MessageSquare,
  Shield,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { PageHero } from "@/components/PageHero";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { services } from "@/lib/site-data";
import smartOps from "@/assets/smart-ops.jpg";

/* ==========================================================
   CONTACT CONFIG
========================================================== */

const CONTACT_CONFIG = {
  email: "sp2592551@gmail.com",
  whatsapp: "919417828498", 
  phone: "+91 94178 28498",
};

// 🔥 तुझ्या बॅकएंडची लिंक (लोकलसाठी) 🔥
const API_URL = "http://localhost:5000/api";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

/* ==========================================================
   CONTACT PAGE
========================================================== */

function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });

  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", service: "", message: "",
  });

  // 🔥 फोन नंबर फक्त १० आकडे घेईल (कोणताही +91 नाही) 🔥
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData({ ...formData, phone: digits });
    if (errors.phone) setErrors({ ...errors, phone: "" });
  };

  // Validation functions
  const validateName = (name: string): string => {
    if (!name.trim()) return "Full Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) return "Email is required";
    if (!EMAIL_REGEX.test(email.trim())) return "Please enter a valid email address";
    return "";
  };

  const validatePhone = (phone: string): string => {
    if (!phone.trim()) return "Phone number is required";
    if (phone.length !== 10) return "Please enter exactly 10 digits";
    if (!/^[6-9]/.test(phone)) return "Mobile number must start with 6, 7, 8, or 9";
    return "";
  };

  const validateService = (service: string): string => {
    if (!service) return "Please select a service";
    return "";
  };

  const validateMessage = (msg: string): string => {
    if (!msg.trim()) return "Message is required";
    if (msg.trim().length < 3) return "Message is too short"; 
    return "";
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      service: validateService(formData.service),
      message: validateMessage(formData.message),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  /* ========================================================
     FORM SUBMIT (बॅकएंडला डेटा पाठवणे)
  ======================================================== */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitting) return;
    setErrors({ name: "", email: "", phone: "", service: "", message: "" });

    if (!validateForm()) {
      setTimeout(() => {
        const firstErrorField = document.querySelector('[data-error="true"]') as HTMLElement | null;
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
          firstErrorField.focus();
        }
      }, 50);
      return;
    }

    setSubmitting(true);

    try {
      // 🔥 तुझ्या index.js ला डेटा पाठवत आहोत 🔥
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          company: formData.company,
          email: formData.email,
          phone: `+91 ${formData.phone}`, // बॅकएंडला +91 सह पाठवत आहोत
          service: formData.service,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSent(true);
        toast.success("Enquiry sent successfully! Check your email.");
        setFormData({ name: "", company: "", email: "", phone: "", service: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send enquiry.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Network error. Is your backend running?");
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const fallbackMessage = "Hello PFMC Team, I would like to know more about your property and facility management services.";
    window.open(`https://wa.me/${CONTACT_CONFIG.whatsapp}?text=${encodeURIComponent(fallbackMessage)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Talk About"
        highlight="Your Facility"
        description="Share a few details and our team will respond within one business day with a tailored proposal."
        image={smartOps}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          
          {/* LEFT SIDE */}
          <Reveal>
            <SectionHeading align="left" eyebrow="Get in Touch" title="We're here to" highlight="help." />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Have a property that needs smarter management? Tell us what you need and our team will get in touch with you.
            </p>

            <div className="mt-8 space-y-4">
              <a href={`tel:${CONTACT_CONFIG.phone.replace(/\s/g, "")}`} className="group flex items-center gap-4 rounded-xl border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Call Us</p>
                  <p className="mt-1 text-sm font-bold">{CONTACT_CONFIG.phone}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
              </a>

              <a href={`mailto:${CONTACT_CONFIG.email}`} className="group flex items-center gap-4 rounded-xl border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email Us</p>
                  <p className="mt-1 break-all text-sm font-bold">{CONTACT_CONFIG.email}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
              </a>

              <button type="button" onClick={openWhatsApp} className="group flex w-full items-center gap-4 rounded-xl border bg-card p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">WhatsApp</p>
                  <p className="mt-1 text-sm font-bold">Chat with our team</p>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
              </button>
            </div>

            <div className="mt-6 rounded-xl border bg-surface p-5">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Office</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">123 Business Park, Sector 45,<br />Noida, Uttar Pradesh, India</p>
                </div>
              </div>
              <div className="mt-4 flex gap-3 border-t pt-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Working Hours</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Mon–Sat, 9:30 AM – 6:30 PM<br />Availability support 24/7</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT SIDE — CONTACT FORM */}
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-3xl border bg-card shadow-card">
              {/* FORM HEADER */}
              <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 px-6 py-7 text-primary-foreground sm:px-8">
                <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10" />
                <div className="pointer-events-none absolute -bottom-14 right-20 h-32 w-32 rounded-full bg-white/10" />

                <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                  <MessageCircle className="h-3 w-3" />
                  Start a Conversation
                </span>
                <h2 className="relative mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">
                  Tell Us What Your Space Needs
                </h2>
                <p className="relative mt-2 text-sm leading-relaxed text-white/85">
                  Fill in the details below and our team will get back to you shortly.
                </p>
              </div>

              {sent ? (
                <div className="flex flex-col items-center px-6 py-14 text-center sm:px-8">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="mt-5 text-2xl font-extrabold">Enquiry Sent!</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Thank you for contacting PFMC. A confirmation email is on its way, and our team will respond within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 rounded-full border-2 border-primary px-6 py-2.5 text-sm font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form
                  id="contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="p-6 sm:p-8"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Full Name"
                      name="name"
                      icon={User}
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(val) => {
                        setFormData({ ...formData, name: val });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      onBlur={() => setErrors({ ...errors, name: validateName(formData.name) })}
                      error={errors.name}
                    />
                    <Field
                      label="Company"
                      name="company"
                      icon={Building2}
                      placeholder="Company name"
                      required={false}
                      value={formData.company}
                      onChange={(val) => setFormData({ ...formData, company: val })}
                    />
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Business Email"
                      name="email"
                      type="email"
                      icon={Mail}
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(val) => {
                        setFormData({ ...formData, email: val });
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      onBlur={() => setErrors({ ...errors, email: validateEmail(formData.email) })}
                      error={errors.email}
                    />

                    {/* PHONE */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wide text-foreground/80">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-1.5">
                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                        <span className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 border-r pr-2 text-sm font-semibold text-muted-foreground">
                          +91
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          inputMode="numeric"
                          placeholder="9876543210"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          onBlur={() => setErrors({ ...errors, phone: validatePhone(formData.phone) })}
                          autoComplete="off"
                          className={`${fieldBase} pl-[5.5rem] ${errors.phone ? fieldError : ""}`}
                          data-error={!!errors.phone}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* SERVICE */}
                  <div className="mt-5">
                    <label className="block text-xs font-bold uppercase tracking-wide text-foreground/80">
                      What service do you need? <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <Briefcase className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                      <select
                        name="service"
                        value={formData.service}
                        onChange={(e) => {
                          setFormData({ ...formData, service: e.target.value });
                          if (errors.service) setErrors({ ...errors, service: "" });
                        }}
                        onBlur={() => setErrors({ ...errors, service: validateService(formData.service) })}
                        className={`${fieldBase} ${errors.service ? fieldError : ""}`}
                        data-error={!!errors.service}
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s.slug} value={s.title}>{s.title}</option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    {errors.service && (
                      <p className="mt-1.5 text-xs font-medium text-red-500">{errors.service}</p>
                    )}
                  </div>

                  {/* MESSAGE */}
                  <div className="mt-5">
                    <div className="flex items-end justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wide text-foreground/80">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[11px] text-muted-foreground">
                        {formData.message.length}/1000
                      </span>
                    </div>
                    <div className="relative mt-1.5">
                      <MessageSquare className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-primary" />
                      <textarea
                        name="message"
                        rows={4}
                        maxLength={1000}
                        placeholder="Tell us about your property and requirements..."
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: "" });
                        }}
                        onBlur={() => setErrors({ ...errors, message: validateMessage(formData.message) })}
                        className={`${fieldBase} resize-none leading-relaxed ${errors.message ? fieldError : ""}`}
                        data-error={!!errors.message}
                      />
                    </div>
                    {errors.message && (
                      <p className="mt-1.5 text-xs font-medium text-red-500">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/40 disabled:cursor-default disabled:opacity-80 disabled:hover:scale-100"
                  >
                    {submitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                    ) : (
                      <>Send Enquiry <Send className="h-4 w-4" /></>
                    )}
                  </button>

                  <p className="mt-4 flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
                    <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    By submitting this form, you agree to be contacted by our team regarding your enquiry.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t bg-surface py-14">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="eyebrow">Need Immediate Assistance?</p>
            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              Let's make your space <span className="text-primary">work better.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Our team is ready to understand your requirements and recommend the right property and facility management solution.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href={`tel:${CONTACT_CONFIG.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full border bg-card px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-md">
                <Phone className="h-4 w-4" /> Call Us
              </a>
              <a href={`mailto:${CONTACT_CONFIG.email}`} className="inline-flex items-center gap-2 rounded-full border bg-card px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-md">
                <Mail className="h-4 w-4" /> Email Us
              </a>
              <button type="button" onClick={openWhatsApp} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const fieldBase =
  "w-full rounded-xl border bg-background py-3 pl-10 pr-3 text-sm outline-none transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/15";
const fieldError = "border-red-500 focus:border-red-500 focus:ring-red-500/15";

function Field({
  label, name, type = "text", placeholder, required = true, value, onChange, onBlur, error = "", icon: Icon,
}: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean; value: string; onChange: (value: string) => void; onBlur?: () => void; error?: string; icon?: LucideIcon;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wide text-foreground/80">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative mt-1.5">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
        )}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete={name === "phone" ? "off" : "on"}
          className={`${fieldBase} ${error ? fieldError : ""}`}
          data-error={!!error}
        />
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact PFMC | Request a Property & Facility Management Proposal" },
      { name: "description", content: "Get in touch with PFMC for a tailored property and facility management proposal." },
      { property: "og:title", content: "Contact PFMC | Request a Property & Facility Management Proposal" },
      { property: "og:description", content: "Get in touch with PFMC for a tailored property and facility management proposal." },
    ],
  }),
  component: Contact,
});