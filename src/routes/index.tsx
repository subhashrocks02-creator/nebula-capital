import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Cpu, ShieldCheck, Users } from "lucide-react";

import heroImage from "@/assets/hero-market.jpg";
import { SectionHeading } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/company";
import { jobs } from "@/lib/jobs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nebula Capital Advisory Pvt. Ltd. | Proprietary Trading & Careers" },
      {
        name: "description",
        content:
          "Nebula Capital Advisory Pvt. Ltd. is a Pune-based proprietary trading firm combining market research, technology, data and disciplined processes. Explore careers in data, technology and business development.",
      },
      {
        property: "og:title",
        content: "Nebula Capital Advisory Pvt. Ltd. | Proprietary Trading & Careers",
      },
      {
        property: "og:description",
        content:
          "A Pune-based proprietary trading firm built on market research, technology, data and disciplined processes.",
      },
    ],
  }),
  component: Home,
});

const pillars = [
  {
    icon: BarChart3,
    title: "Market Intelligence",
    body: "Focus on market analysis, research and informed decision-making.",
  },
  {
    icon: Cpu,
    title: "Technology & Data",
    body: "Use technology, analytics and data-driven workflows to support trading operations.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Discipline",
    body: "Emphasis on structured processes, controls and disciplined decision-making.",
  },
  {
    icon: Users,
    title: "People & Growth",
    body: "An environment where talented professionals can learn, contribute and grow.",
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-60" aria-hidden="true" />
        <img
          src={heroImage}
          alt="Abstract visualisation of financial market data and trend lines"
          width={1600}
          height={1200}
          className="pointer-events-none absolute inset-y-0 right-0 h-full w-full object-cover opacity-45 mix-blend-screen lg:w-[62%]"
        />
        <div
          className="absolute inset-0 lg:bg-[linear-gradient(90deg,var(--ink)_0%,color-mix(in_oklab,var(--ink)_82%,transparent)_45%,transparent_100%)]"
          aria-hidden="true"
        />
        <div className="shell relative grid items-center gap-12 py-24 md:py-32 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow-on-ink reveal">Proprietary Trading · Pune, India</p>
            <h1 className="reveal mt-6 text-4xl font-bold text-ink-foreground md:text-6xl md:leading-[1.04]">
              Building the Future of Proprietary Trading
            </h1>
            <p className="reveal mt-7 max-w-xl text-lg leading-relaxed text-ink-muted">
              Nebula Capital is a proprietary trading firm focused on disciplined trading, market
              research, technology, data, and developing high-performing teams.
            </p>
            <div className="reveal mt-10 flex flex-wrap gap-4">
              <Button asChild variant="brand" size="lg">
                <Link to="/careers">
                  Explore Careers <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="onInk" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
            <dl className="reveal mt-14 grid max-w-lg grid-cols-2 gap-6 border-t border-ink-border pt-8 sm:grid-cols-3">
              {[
                ["Focus", "Proprietary trading"],
                ["Base", "Lohegaon, Pune"],
                ["Hiring", "Data · Tech · BD"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="font-mono text-[0.62rem] tracking-[0.18em] text-brand-soft uppercase">
                    {label}
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-ink-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading eyebrow="Who we are" title="A professional proprietary trading environment" />
          <p className="text-lg leading-relaxed text-muted-foreground">
            Nebula Capital brings together market knowledge, analytical thinking, technology and
            disciplined processes to build a professional proprietary trading environment.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative border-y border-border bg-surface">
        <div className="grid-lines-light absolute inset-0" aria-hidden="true" />
        <div className="shell relative section">
          <SectionHeading
            eyebrow="What defines us"
            title="Four pillars behind how we work"
            lead="Research, technology, discipline and people — applied consistently across everything we do."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="card-lift rounded-xl border border-border bg-card p-7 shadow-card"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-brand-deep">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-semibold text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Careers teaser */}
      <section className="section">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Careers"
              title="Open positions at Nebula Capital"
              lead="We are hiring across trading support, technology, analytics and business development in Pune."
            />
            <Button asChild variant="outline" size="lg">
              <Link to="/careers">View all roles</Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-4">
            {jobs.map((job) => (
              <Link
                key={job.slug}
                to="/careers/$slug"
                params={{ slug: job.slug }}
                className="card-lift group flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-6 shadow-card md:p-7"
              >
                <div>
                  <h3 className="text-xl font-semibold text-primary group-hover:text-brand-deep">
                    {job.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {job.department} · {job.location} · {job.employment}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-deep">
                  View role <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="shell relative flex flex-wrap items-center justify-between gap-8 py-16 md:py-20">
          <div>
            <h2 className="max-w-2xl text-3xl font-bold text-ink-foreground md:text-4xl">
              Let's talk about markets, technology and your career.
            </h2>
            <p className="mt-4 max-w-xl text-ink-muted">
              Reach our team in Pune at{" "}
              <a href={`mailto:${company.email}`} className="text-brand-soft hover:underline">
                {company.email}
              </a>
              .
            </p>
          </div>
          <Button asChild variant="brand" size="lg">
            <Link to="/contact">
              Get in Touch <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
