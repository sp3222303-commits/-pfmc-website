import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/PageHero";
import aboutInterior from "@/assets/about-interior.jpg";



function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        highlight="Policy"
        description="We respect your privacy and handle every enquiry with care."
        image={aboutInterior}
      />
      <section className="mx-auto max-w-3xl space-y-5 px-4 py-16 text-sm leading-relaxed text-muted-foreground sm:px-6">
        <p>
          PFMC collects only the information you voluntarily provide through our contact and career
          forms — such as your name, company, email address, phone number and message.
        </p>
        <p>
          This information is used solely to respond to your enquiry, prepare proposals and process
          job applications. We do not sell or rent personal data to third parties.
        </p>
        <p>
          Data is retained only as long as required for the purpose it was collected or as mandated
          by applicable law. You may request correction or deletion of your data by writing to
          info@pfmc.com.
        </p>
        <p>
          Our website may use basic analytics cookies to understand traffic patterns. You can
          disable cookies in your browser settings at any time.
        </p>
      </section>
    </>
  );
}

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | PFMC" },
      { name: "description", content: "How PFMC collects, uses and protects the personal information you share with us." },
      { property: "og:title", content: "Privacy Policy | PFMC" },
      { property: "og:description", content: "How PFMC collects, uses and protects the personal information you share with us." },
    ],
  }),
  component: Privacy,
});
