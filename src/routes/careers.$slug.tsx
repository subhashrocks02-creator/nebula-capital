import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Briefcase, Clock, MapPin } from "lucide-react";

import { ApplyDialog } from "@/components/ApplyDialog";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/company";
import { getJob, jobs } from "@/lib/jobs";

export const Route = createFileRoute("/careers/$slug")({
  loader: ({ params }) => {
    const job = getJob(params.slug);
    if (!job) throw notFound();
    return { job };
  },
  head: ({ loaderData }) => {
    const job = loaderData?.job;
    if (!job) return {};
    return {
      meta: [
        { title: job.seoTitle },
        { name: "description", content: job.seoDescription },
        { property: "og:title", content: job.seoTitle },
        { property: "og:description", content: job.seoDescription },
      ],
    };
  },
  component: JobPage,
});

function JobPage() {
  const { job } = Route.useLoaderData();
  const others = jobs.filter((j) => j.slug !== job.slug);

  return (
    <>
      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="shell relative py-16 md:py-24">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-brand-soft"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All open positions
          </Link>
          <p className="eyebrow-on-ink mt-8">{job.department}</p>
          <h1 className="mt-4 text-4xl font-bold text-ink-foreground md:text-5xl">{job.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{job.description}</p>

          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-ink-muted">
            <li className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-soft" aria-hidden="true" />
              {job.location}
            </li>
            <li className="inline-flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-brand-soft" aria-hidden="true" />
              {job.employment}
            </li>
            {job.shift ? (
              <li className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-soft" aria-hidden="true" />
                {job.shift}
              </li>
            ) : null}
          </ul>

          <div className="mt-10">
            <ApplyDialog
              position={job.title}
              trigger={
                <Button variant="brand" size="lg">
                  Apply Now
                </Button>
              }
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-12">
            <JobList title="Responsibilities" items={job.responsibilities} />
            <JobList title="Requirements" items={job.requirements} />
            <JobList title="Preferred skills" items={job.preferred} />
            {job.note ? (
              <p className="rounded-md border border-border bg-accent/70 px-5 py-4 text-sm font-medium text-accent-foreground">
                {job.note}
              </p>
            ) : null}
          </div>

          <aside className="h-fit rounded-xl border border-border bg-card p-7 shadow-card lg:sticky lg:top-28">
            <h2 className="text-lg font-semibold text-primary">Apply for this role</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Submit your details and resume. Our HR team reviews every application.
            </p>
            <ApplyDialog
              position={job.title}
              trigger={
                <Button className="mt-6 w-full" size="lg">
                  Apply Now
                </Button>
              }
            />
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Or email your resume to{" "}
              <a href={`mailto:${company.email}`} className="font-medium text-brand-deep hover:underline">
                {company.email}
              </a>
              .
            </p>

            <h3 className="mt-9 font-mono text-[0.68rem] tracking-[0.18em] text-muted-foreground uppercase">
              Other openings
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    to="/careers/$slug"
                    params={{ slug: other.slug }}
                    className="font-medium text-primary transition-colors hover:text-brand-deep"
                  >
                    {other.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}

function JobList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary">{title}</h2>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-muted-foreground">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
