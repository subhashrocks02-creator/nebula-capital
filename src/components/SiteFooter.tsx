import { Link } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";

import { Logo } from "@/components/Logo";
import { company } from "@/lib/company";
import { jobs } from "@/lib/jobs";

export function SiteFooter() {
  return (
    <footer className="ink-panel relative overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="shell relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 text-sm font-medium text-ink-foreground">{company.name}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
              Proprietary trading, data and technology-driven financial markets.
            </p>
          </div>

          <FooterCol title="Company">
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/why-nebula">Why Nebula</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </FooterCol>

          <FooterCol title="Careers">
            {jobs.map((job) => (
              <FooterLink key={job.slug} to="/careers/$slug" params={{ slug: job.slug }}>
                {job.title}
              </FooterLink>
            ))}
          </FooterCol>

          <div>
            <h3 className="font-mono text-[0.68rem] tracking-[0.2em] text-brand-soft uppercase">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-ink-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft" aria-hidden="true" />
                <span>Pune, Maharashtra</span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft" aria-hidden="true" />
                <a
                  href={`mailto:${company.email}`}
                  className="break-all transition-colors hover:text-brand-soft"
                >
                  {company.email}
                </a>
              </li>
            </ul>
            <h3 className="mt-8 font-mono text-[0.68rem] tracking-[0.2em] text-brand-soft uppercase">
              Legal
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink to="/terms-of-use">Terms of Use</FooterLink>
              <FooterLink to="/disclaimer">Disclaimer</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-ink-border pt-8">
          <p className="max-w-4xl text-xs leading-relaxed text-ink-muted">{company.disclaimer}</p>
          <p className="mt-6 text-xs text-ink-muted">
            © 2026 {company.name} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-mono text-[0.68rem] tracking-[0.2em] text-brand-soft uppercase">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  to,
  params,
  children,
}: {
  to: string;
  params?: Record<string, string>;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        to={to as any}
        params={params as never}
        className="text-ink-muted transition-colors hover:text-brand-soft"
      >
        {children}
      </Link>
    </li>
  );
}
