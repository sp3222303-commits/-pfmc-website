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
  whatsapp: "919417828498", // तुझा WhatsApp नंबर
  phone: "+91 94178 28498",
};

/* ==========================================================
   VALIDATION HELPERS
========================================================== */

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

/* ==========================================================
   CONTACT PAGE
========================================================== */

function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  // 🔥 फोन नंबर फक्त १० आकडे घेईल (कोणताही +91 नाही) 🔥
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // फक्त आकडे स्वीकारा आणि १० पेक्षा जास्त कापून टाका
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
     FORM SUBMIT (WhatsApp वर पाठवण्यासाठी)
  ======================================================== */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitting) return;

    // Reset errors
    setErrors({ name: "", email: "", phone: "", service: "", message: "" });

    // Validate form
    if (!validateForm()) {
      const firstErrorField = document.querySelector('[data-error="true"]') as HTMLElement;
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
        firstErrorField.focus();
      }
      return;
    }

    setSubmitting(true);

    // तुझा WhatsApp नंबर
    const YOUR_WHATSAPP_NUMBER = "919417828498"; 

    // फोनमधून फक्त आकडे
    const cleanPhone = formData.phone.replace(/\D/g, "");

    // मेसेज तयार करणे
    const text = `*New Enquiry from PFMC Website*%0A%0A*Name:* ${formData.name}%0A*Company:* ${formData.company || "N/A"}%0A*Email:* ${formData.email}%0A*Phone:* ${cleanPhone}%0A*Service:* ${formData.service}%0A*Message:* ${formData.message}`;

    // WhatsApp ची अधिकृत लिंक
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${YOUR_WHATSAPP_NUMBER}&text=${text}`;

    // 🔥 ब्राउझर ब्लॉक करू नये म्हणून हिडन लिंकचा वापर 🔥
    const link = document.createElement("a");
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Opening WhatsApp... Please click 'Send' in the app.");

    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      // फॉर्म रिकामा करणे
      setFormData({ name: "", company: "", email: "", phone: "", service: "", message: "" });
    }, 3000);
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
              {/* CALL */}
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

              {/* EMAIL */}
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

              {/* WHATSAPP */}
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

            {/* OFFICE INFORMATION */}
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
            <form id="contact-form" onSubmit={handleSubmit} className="rounded-2xl border bg-card p-6 shadow-card sm:p-8">
              <div className="mb-7">
                <p className="eyebrow">Start a Conversation</p>
                <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                  Tell Us What Your <span className="text-primary">Space Needs</span>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Fill in the details below and our team will get back to you shortly on WhatsApp.
                </p>
              </div>

              {/* NAME + COMPANY */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  name="name"
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
                  placeholder="Company name"
                  required={false}
                  value={formData.company}
                  onChange={(val) => setFormData({ ...formData, company: val })}
                />
              </div>

              {/* EMAIL + PHONE */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Business Email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(val) => {
                    setFormData({ ...formData, email: val });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  onBlur={() => setErrors({ ...errors, email: validateEmail(formData.email) })}
                  error={errors.email}
                />
                <div>
                  <label className="block text-xs font-semibold">
                    Phone Number <span className="text-red-500">*</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      autoComplete="off"
                      className={`mt-1.5 w-full rounded-lg border bg-background px-3 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.phone ? "border-red-500 ring-red-500" : ""}`}
                    />
                  </label>
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>
              </div>

              {/* SERVICE */}
              <div className="mt-5">
                <label className="block text-xs font-semibold">
                  What service do you need? <span className="text-red-500">*</span>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={(e) => {
                      setFormData({ ...formData, service: e.target.value });
                      if (errors.service) setErrors({ ...errors, service: "" });
                    }}
                    className={`mt-1.5 w-full rounded-lg border bg-background px-3 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.service ? "border-red-500 ring-red-500" : ""}`}
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </label>
                {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
              </div>

              {/* MESSAGE */}
              <div className="mt-5">
                <label className="block text-xs font-semibold">
                  Message <span className="text-red-500">*</span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your property and requirements..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: "" });
                    }}
                    onBlur={() => setErrors({ ...errors, message: validateMessage(formData.message) })}
                    className={`mt-1.5 w-full resize-y rounded-lg border bg-background px-3 py-3 text-sm leading-relaxed outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.message ? "border-red-500 ring-red-500" : ""}`}
                  />
                </label>
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={sent || submitting}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:cursor-default disabled:opacity-90 sm:w-auto"
              >
                {sent ? (
                  <><CheckCircle2 className="h-4 w-4" /> Enquiry Sent!</>
                ) : submitting ? (
                  <><Send className="h-4 w-4 animate-pulse" /> Sending...</>
                ) : (
                  <>Send Enquiry <Send className="h-4 w-4" /></>
                )}
              </button>
              
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                By submitting this form, you agree to be contacted by our team regarding your enquiry via WhatsApp.
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      {/* QUICK CTA */}
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

/* ==========================================================
   REUSABLE INPUT FIELD
========================================================== */
function Field({
  label, name, type = "text", placeholder, required = true, value, onChange, onBlur, error = "",
}: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean; value: string; onChange: (value: string) => void; onBlur?: () => void; error?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete={name === "phone" ? "off" : "on"}
          className={`mt-1.5 w-full rounded-lg border bg-background px-3 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10 ${error ? "border-red-500 ring-red-500" : ""}`}
          data-error={!!error}
        />
      </label>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
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