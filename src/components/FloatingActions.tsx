import { Mail, MessageCircle } from "lucide-react";

export function FloatingActions() {
  return (
    <div
      className="
        fixed bottom-6 right-6 z-[999]
        flex flex-col items-end gap-3
      "
      aria-label="Quick contact actions"
    >
      {/* Email — hidden on mobile (header already exposes contact) */}
      <a
        href="/contact"
        aria-label="Open email contact form"
        className="
          hidden sm:flex h-12 items-center gap-2
          rounded-full bg-primary px-4 text-primary-foreground
          shadow-lg ring-1 ring-black/5
          transition-all duration-300
          hover:-translate-y-0.5 hover:shadow-xl
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-primary focus-visible:ring-offset-2
        "
      >
        <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span className="text-sm font-semibold">Email</span>
      </a>

      {/* WhatsApp — single primary floating action, always visible */}
      <a
        href="whatsapp://send?phone=919417828498&text=Hi%20PFMC%2C%20I'm%20interested%20in%20your%20property%20management%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          flex h-12 items-center gap-2
          rounded-full bg-primary px-4 text-primary-foreground
          shadow-lg ring-1 ring-black/5
          transition-all duration-300
          hover:-translate-y-0.5 hover:shadow-xl
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-primary focus-visible:ring-offset-2
        "
      >
        <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span className="hidden text-sm font-semibold sm:inline">
          WhatsApp
        </span>
      </a>
    </div>
  );
}