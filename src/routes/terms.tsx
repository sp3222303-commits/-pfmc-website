import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/PageHero";
import whyTower from "@/assets/why-tower.jpg";



function Terms() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms &"
        highlight="Conditions"
        description="Please read these terms before using our website or engaging our services."
        image={whyTower}
      />
      <section className="mx-auto max-w-3xl space-y-5 px-4 py-16 text-sm leading-relaxed text-muted-foreground sm:px-6">
        <p>
          Content on this website is provided for general information about PFMC's property and
          facility management services and does not constitute a binding offer.
        </p>
        <p>
          Service scopes, pricing and service levels are defined only in a signed agreement between
          PFMC and the client.
        </p>
        <p>
          All logos, text, imagery and layout on this site are the property of PFMC and may not be
          reproduced without written permission.
        </p>
        <p>
          PFMC is not liable for any indirect loss arising from reliance on website content. These
          terms are governed by the laws of India.
        </p>
      </section>
    </>
  );
}

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | PFMC" },
      { name: "description", content: "Terms governing the use of the PFMC website and the services described on it." },
      { property: "og:title", content: "Terms & Conditions | PFMC" },
      { property: "og:description", content: "Terms governing the use of the PFMC website and the services described on it." },
    ],
  }),
  component: Terms,
});
