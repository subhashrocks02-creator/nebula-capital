import type { ReactNode } from "react";

import { PageHero } from "@/components/PageHero";

export function LegalPage({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string | undefined;
  children: ReactNode;
}) {

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} />
      <section className="section">
        <div className="shell max-w-3xl space-y-10">{children}</div>
      </section>
    </>
  );
}

export function LegalBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-primary">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
