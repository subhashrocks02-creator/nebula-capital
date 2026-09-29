import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Braces,
  Database,
  GaugeCircle,
  GraduationCap,
  LineChart,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import dataTexture from "@/assets/data-texture.jpg";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/why-nebula")({
  head: () => ({
    meta: [
      { title: "Why Nebula | Careers in Markets, Data & Technology" },
      {
        name: "description",
        content:
          "Why professionals choose Nebula Capital: a market-focused environment, data and analytics, technology-driven processes, structured learning and disciplined risk practices.",
      },
      { property: "og:title", content: "Why Nebula | Careers in Markets, Data & Technology" },
      {
        property: "og:description",
        content:
          "A market-focused, technology-driven and disciplined environment for analytical professionals in Pune.",
      },
    ],
  }),
  component: WhyNebula,
});


const reasons = [
  {
    icon: LineChart,
    title: "Market-Focused Environment",
    body: "Work close to live markets, research discussions and the reasoning behind decisions.",
  },
  {
    icon: Database,
    title: "Data & Analytics",
    body: "Data is central to how we review performance, monitor processes and improve workflows.",
  },
  {
    icon: Braces,
    title: "Technology-Driven Processes",
    body: "Tooling, automation and clean engineering practices support day-to-day operations.",
  },
  {
    icon: GraduationCap,
    title: "Structured Learning",
    body: "Onboarding, documentation and mentoring help new joiners build real depth.",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    body: "Small teams, direct communication and shared ownership of outcomes.",
  },
  {
    icon: Sparkles,
    title: "Career Growth",
    body: "Clear responsibilities with room to widen your scope as you demonstrate capability.",
  },
  {
    icon: ShieldCheck,
    title: "Disciplined Risk Approach",
    body: "Defined processes, controls and reviews guide how risk is handled.",
  },
  {
    icon: GaugeCircle,
    title: "Professional Work Environment",
    body: "An office in Pune built for focused, professional work.",
  },
];

function WhyNebula() {
  return (
    <>
      <PageHero
        eyebrow="Why Nebula"
        title="Why professionals build their careers here"
        lead="Nebula Capital is built for people who enjoy markets, evidence and well-run processes — and who want their work to be visible and useful."
      >
        <Button asChild variant="brand" size="lg">
          <Link to="/careers">
            View Open Roles <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </PageHero>

      <section className="section">
        <div className="shell grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="card-lift rounded-xl border border-border bg-card p-7 shadow-card"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-brand-deep">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-base font-semibold text-primary">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border">
        <img
          src={dataTexture}
          alt="Abstract market data pattern with flowing analytical curves"
          loading="lazy"
          width={1600}
          height={912}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-[color-mix(in_oklab,var(--ink)_80%,transparent)]"
          aria-hidden="true"
        />
        <div className="shell relative py-20 md:py-28">
          <SectionHeading
            tone="light"
            eyebrow="How the work feels"
            title="Research, build, review — repeat"
            lead="A typical week mixes market and data review, building or improving something, and sitting down with the team to question what the numbers actually say."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              ["01", "Understand", "Frame the question, gather the data, agree on what good looks like."],
              ["02", "Build", "Create the report, pipeline, process or check that answers it reliably."],
              ["03", "Review", "Validate, document, and improve based on what the results show."],
            ].map(([step, title, body]) => (
              <div key={step} className="border-t border-ink-border pt-6">
                <span className="font-mono text-xs tracking-[0.2em] text-brand-soft">{step}</span>
                <h3 className="mt-4 text-lg font-semibold text-ink-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell flex flex-wrap items-center justify-between gap-6">
          <SectionHeading
            eyebrow="Next step"
            title="See where you could fit"
            lead="Open roles across data, technology and business development in Pune."
          />
          <Button asChild size="lg">
            <Link to="/careers">
              View Careers <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
