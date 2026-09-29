import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import dataTexture from "@/assets/data-texture.jpg";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/company";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Nebula Capital | Proprietary Trading Firm in Pune" },
      {
        name: "description",
        content:
          "Nebula Capital Advisory Pvt. Ltd. is a Pune-based proprietary trading firm building a disciplined, technology-enabled trading environment.",
      },
      { property: "og:title", content: "About Nebula Capital | Proprietary Trading Firm in Pune" },
      {
        property: "og:description",
        content:
          "Who we are, how we work and the approach behind Nebula Capital Advisory Pvt. Ltd., a proprietary trading firm based in Pune.",
      },
    ],
  }),
  component: About,
});

const blocks = [
  {
    title: "Who We Are",
    body: "Nebula Capital Advisory Pvt. Ltd. is a proprietary trading firm registered in Pune, Maharashtra. We trade with the firm's own capital and build the research, technology and operational capability required to do that professionally.",
  },
  {
    title: "How We Work",
    body: "Our work is structured around research, preparation and review. Ideas are documented, processes are repeatable, and decisions are examined afterwards so the team keeps learning from both outcomes and mistakes.",
  },
  {
    title: "Our Approach",
    body: "We combine market knowledge with analytical thinking, data and technology. Analysis, reporting and monitoring are treated as core capabilities rather than support functions, and risk discipline governs every process.",
  },
  {
    title: "People First",
    body: "We build teams carefully. Professionals here are given context, mentoring and room to take ownership, whether they work in trading support, technology, analytics or business development.",
  },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="About Nebula Capital"
        lead="Nebula Capital Advisory Pvt. Ltd. is a Pune-based proprietary trading firm focused on building a disciplined, technology-enabled trading environment. Our approach combines market knowledge, analytical thinking, data and operational discipline."
      >
        <Button asChild variant="brand" size="lg">
          <Link to="/careers">
            Explore Careers <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </PageHero>

      <section className="section">
        <div className="shell grid gap-8 md:grid-cols-2">
          {blocks.map((block) => (
            <article
              key={block.title}
              className="card-lift rounded-xl border border-border bg-card p-8 shadow-card"
            >
              <h2 className="text-xl font-semibold text-primary">{block.title}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{block.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border">
        <img
          src={dataTexture}
          alt="Abstract analytics pattern of flowing lines and data points"
          loading="lazy"
          width={1600}
          height={912}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="ink-panel/0 absolute inset-0 bg-[color-mix(in_oklab,var(--ink)_78%,transparent)]" aria-hidden="true" />
        <div className="shell relative py-20 md:py-24">
          <SectionHeading
            tone="light"
            eyebrow="Our position"
            title="A proprietary trading firm — nothing more, nothing implied"
            lead="Nebula Capital trades with its own capital. We do not offer investment advice, portfolio management, broking or asset management services, and we make no claims about returns or performance."
          />
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-muted">{company.disclaimer}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Company details"
            title="Registered in Pune, Maharashtra"
            lead={`${company.name}`}
          />
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
