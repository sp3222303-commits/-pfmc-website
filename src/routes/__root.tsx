import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Send, X } from "lucide-react";

/* ==========================================================
   API CONFIG
========================================================== */
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* ==========================================================
   404 COMPONENT
========================================================== */
function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   ERROR COMPONENT
========================================================== */
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   ROOT ROUTE
========================================================== */
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { title: "PFMC | Integrated Property & Facility Management Company" },
      {
        name: "description",
        content:
          "PFMC delivers end-to-end property and facility management — technical, soft services, security, smart solutions and sustainability.",
      },
      { name: "author", content: "PFMC" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/* ==========================================================
   SCROLL TO TOP
========================================================== */
function ScrollToTop() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const modal = document.getElementById("project-modal");
    if (!modal) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname]);

  return null;
}

/* ==========================================================
   GLOBAL CONTACT FORM (WhatsApp Integrated)
========================================================== */
function ContactForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // तुमचा WhatsApp नंबर
  const WHATSAPP_NUMBER = "919417828498";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // 🔥 फोन नंबरसाठी खास लॉजिक 🔥
    if (name === "phone") {
      // फक्त आकडे स्वीकारा
      let digits = value.replace(/\D/g, "");
      
      // जर युजरने 91 ने सुरुवात केली असेल तर ते काढून टाका
      if (digits.startsWith("91") && digits.length > 10) {
        digits = digits.slice(2);
      }
      
      // फक्त 10 आकडेच ठेवा
      digits = digits.slice(0, 10);

      // जर आकडे असतील तर +91 लावून दाखवा
      const formattedValue = digits.length > 0 ? `+91 ${digits}` : "";
      
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
      if (error) setError("");
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError("");

    // फोन नंबर मधून फक्त १० आकडे वेगळे काढणे
    const phoneDigits = formData.phone.replace(/\D/g, "");

    // Validation
    if (formData.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (phoneDigits.length !== 10) {
      setError("Please enter exactly 10 digits of your phone number.");
      return;
    }
    if (formData.message.trim().length < 10) {
      setError("Please enter at least 10 characters in your message.");
      return;
    }

    setIsSubmitting(true);

    // WhatsApp Message तयार करणे
    const text = `*New Enquiry from Website*%0A%0A*Name:* ${formData.name}%0A*Company:* ${formData.company || "N/A"}%0A*Email:* ${formData.email}%0A*Phone:* +91 ${phoneDigits}%0A*Service:* ${formData.service || "Not Selected"}%0A*Message:* ${formData.message}`;

    // WhatsApp उघडणे
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");

    // 2 सेकंदानंतर फॉर्म बंद करणे
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", company: "", email: "", phone: "", service: "", message: "" });
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* HEADER */}
        <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-gray-900">
          Tell Us What Your <span className="text-red-600">Space Needs</span>
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Fill in the details below and our team will get back to you shortly via WhatsApp.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* GRID 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-800">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-colors focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-800">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-colors focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                placeholder="Company name"
              />
            </div>
          </div>

          {/* GRID 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-800">
                Business Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-colors focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-800">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                autoComplete="off" /* 🔥 ऑटोफिल बंद केलं */
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-colors focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                placeholder="+91 98765 43210"
              />
              <p className="mt-1 text-[11px] text-gray-500">
                फक्त १० आकडे टाका (उदा. 9876543210)
              </p>
            </div>
          </div>

          {/* SERVICE DROPDOWN */}
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-800">
              What service do you need? <span className="text-red-500">*</span>
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-colors focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 bg-white"
            >
              <option value="" disabled>Select a service</option>
              <option value="Property Management">Property Management</option>
              <option value="Technical Management">Technical Management</option>
              <option value="Soft Services">Soft Services</option>
              <option value="Security Management">Security Management</option>
              <option value="Business Support">Business Support</option>
              <option value="Smart Facility Solutions">Smart Facility Solutions</option>
              <option value="Sustainability Solutions">Sustainability Solutions</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* MESSAGE */}
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-800">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 transition-colors focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              placeholder="Tell us about your property and requirements..."
            />
          </div>

          {/* ERROR */}
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              ❌ {error}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex w-fit items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending to WhatsApp...
              </>
            ) : (
              <>
                Send Enquiry <Send className="h-4 w-4" />
              </>
            )}
          </button>
          
          <p className="text-[11px] text-gray-500 mt-2">
            By submitting this form, you agree to be contacted by our team regarding your enquiry via WhatsApp.
          </p>
        </form>
      </div>
    </div>
  );
}

/* ==========================================================
   ROOT COMPONENT
========================================================== */
function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  useEffect(() => {
    const checkModal = () => {
      const modal = document.getElementById("project-modal");
      setIsProjectModalOpen(!!modal);
    };
    checkModal();
    const observer = new MutationObserver(() => { checkModal(); });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["id", "style", "class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HeadContent />
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        {!isProjectModalOpen && <Footer />}
      </div>

      <Toaster position="top-right" richColors />

      {/* WHATSAPP FLOATING BUTTON (Chat साठी) */}
      <a
        href="whatsapp://send?phone=919417828498&text=Hi%20PFMC%2C%20I'm%20interested%20in%20your%20property%20management%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#20b85f] hover:shadow-xl group"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 transition-transform duration-300 group-hover:scale-110">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* 🔥 EMAIL चं बटण (Logo) इथून काढून टाकलं आहे 🔥 */}

      {/* GLOBAL CONTACT FORM MODAL */}
      <ContactForm
        isOpen={isEmailFormOpen}
        onClose={() => setIsEmailFormOpen(false)}
      />
    </QueryClientProvider>
  );
}