import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string | undefined;
  children?: ReactNode | undefined;
}) {

  return (
    <section className="ink-panel relative overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute -top-40 -right-24 h-[26rem] w-[26rem] rounded-full blur-3xl"
        style={{ background: "color-mix(in oklab, var(--brand) 22%, transparent)" }}
        aria-hidden="true"
      />
      <div className="shell relative py-20 md:py-28">
        <p className="eyebrow-on-ink reveal">{eyebrow}</p>
        <h1 className="reveal mt-5 max-w-4xl text-4xl font-bold text-ink-foreground md:text-[3.35rem] md:leading-[1.06]">
          {title}
        </h1>
        {lead ? (
          <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{lead}</p>
        ) : null}
        {children ? <div className="reveal mt-9">{children}</div> : null}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "ink",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: "ink" | "light";
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className={tone === "light" ? "eyebrow-on-ink" : "eyebrow"}>{eyebrow}</p> : null}
      <h2
        className={`mt-4 text-3xl font-bold md:text-[2.5rem] md:leading-tight ${
          tone === "light" ? "text-ink-foreground" : "text-primary"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-5 text-base leading-relaxed md:text-lg ${
            tone === "light" ? "text-ink-muted" : "text-muted-foreground"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
