import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Clock, MapPin } from "lucide-react";

import { ApplyDialog } from "@/components/ApplyDialog";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/company";
import { jobs } from "@/lib/jobs";

export const Route = createFileRoute("/careers/")({
  head: () => ({
    meta: [
      { title: "Careers at Nebula Capital | Pune" },
      {
        name: "description",
        content:
          "Open roles at Nebula Capital Advisory Pvt. Ltd. in Pune — Data Analyst, Data Engineer and Telesales Executive. Apply online with your resume.",
      },
      { property: "og:title", content: "Careers at Nebula Capital | Pune" },
      {
        property: "og:description",
        content:
          "Join a proprietary trading firm in Pune. Current openings across data, technology and business development.",
      },
    ],
  }),
  component: Careers,
});

function Careers() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build Your Career at Nebula Capital"
        lead="We are looking for curious, analytical and driven professionals who want to build their careers at the intersection of financial markets, technology and data."
      >
        <Button asChild variant="brand" size="lg">
          <a href="#open-positions">
            See Open Positions <ArrowRight aria-hidden="true" />
          </a>
        </Button>
      </PageHero>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <SectionHeading eyebrow="Hiring now" title="People we are looking for" />
          <p className="text-lg leading-relaxed text-muted-foreground">
            We are looking for passionate, dedicated and talented people across trading, technology,
            analytics and business development. If you enjoy working with data, asking careful
            questions and improving how things run, we would like to hear from you.
          </p>
        </div>
      </section>

      <section id="open-positions" className="relative scroll-mt-28 border-y border-border bg-surface">
        <div className="grid-lines-light absolute inset-0" aria-hidden="true" />
        <div className="shell relative section">
          <SectionHeading
            eyebrow="Open positions"
            title="Current openings in Pune"
            lead="Every role is based at our Pune office. Applications go directly to our HR team."
          />

          <div className="mt-14 grid gap-6">
            {jobs.map((job) => (
              <article
                key={job.slug}
                className="card-lift rounded-xl border border-border bg-card p-7 shadow-card md:p-9"
              >
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div className="max-w-2xl">
                    <p className="eyebrow">{job.department}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-primary">{job.title}</h3>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{job.description}</p>

                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                      <li className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-brand-deep" aria-hidden="true" />
                        {job.location}
                      </li>
                      <li className="inline-flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-brand-deep" aria-hidden="true" />
                        {job.employment}
                      </li>
                      {job.shift ? (
                        <li className="inline-flex items-center gap-2">
                          <Clock className="h-4 w-4 text-brand-deep" aria-hidden="true" />
                          {job.shift}
                        </li>
                      ) : null}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                    <ApplyDialog
                      position={job.title}
                      trigger={<Button size="lg">Apply Now</Button>}
                    />
                    <Button asChild variant="outline" size="lg">
                      <Link to="/careers/$slug" params={{ slug: job.slug }}>
                        Full details
                      </Link>
                    </Button>
                  </div>
                </div>

                {job.note ? (
                  <p className="mt-7 rounded-md border border-border bg-accent/70 px-4 py-3 text-sm font-medium text-accent-foreground">
                    {job.note}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell max-w-3xl">
          <SectionHeading
            eyebrow="Hiring process"
            title="What to expect after you apply"
            lead="Our HR team reviews every application. Shortlisted candidates are contacted for a conversation about the role, followed by a role-specific discussion with the hiring team."
          />
          <p className="mt-8 text-sm text-muted-foreground">
            Prefer email? Send your resume to{" "}
            <a href={`mailto:${company.email}`} className="font-medium text-brand-deep hover:underline">
              {company.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
