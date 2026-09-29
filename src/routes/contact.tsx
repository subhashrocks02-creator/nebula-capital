import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, ExternalLink, Loader2, Mail, MapPin, ScrollText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHero, SectionHeading } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { company } from "@/lib/company";
import { sendContactMessage } from "@/lib/forms.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Nebula Capital | Pune, Maharashtra" },
      {
        name: "description",
        content:
          "Get in touch with Nebula Capital Advisory Pvt. Ltd. — Lohegaon, Pune, Maharashtra 411047. Email hradmin@nebulacapital.co.in or send an enquiry through our contact form.",
      },
      { property: "og:title", content: "Contact Nebula Capital | Pune, Maharashtra" },
      {
        property: "og:description",
        content: "Office address, email and enquiry form for Nebula Capital Advisory Pvt. Ltd. in Pune.",
      },
    ],
  }),
  component: Contact,
});

const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(company.addressInline)}&output=embed`;

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const send = useServerFn(sendContactMessage);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const values = new FormData(form);
    setSubmitting(true);
    try {
      await send({
        data: {
          name: String(values.get("name") || ""),
          email: String(values.get("email") || ""),
          phone: String(values.get("phone") || ""),
          subject: String(values.get("subject") || ""),
          message: String(values.get("message") || ""),
          company: String(values.get("company") || ""),
        },
      });
      setSent(true);
      form.reset();
      toast.success("Message sent");
    } catch (err) {
      console.error(err);
      setError(
        `We could not send your message right now. Please email us directly at ${company.email}.`,
      );
      toast.error("Could not send message");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        lead="Questions about Nebula Capital, our work or a role you have applied for? Send us a note and our team will get back to you."
      />

      <section className="section">
        <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading eyebrow="Office" title={company.name} />
            <ul className="mt-9 space-y-8">
              <li className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-deep" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Address
                  </p>
                  <address className="mt-2 leading-relaxed not-italic text-primary select-text">
                    {company.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <Button asChild variant="outline" className="mt-5">
                    <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer">
                      Get Directions <ExternalLink aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-brand-deep" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Email
                  </p>
                  <a
                    href={`mailto:${company.email}`}
                    className="mt-2 block break-all font-medium text-primary hover:text-brand-deep"
                  >
                    {company.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-7 shadow-card md:p-9">
            {sent ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-brand" aria-hidden="true" />
                <h2 className="mt-6 text-2xl font-semibold text-primary">Message sent</h2>
                <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
                  Thank you for contacting Nebula Capital. Our team has received your enquiry and
                  will get back to you by email.
                </p>
                <Button className="mt-8" variant="outline" onClick={() => setSent(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-primary">Send us a message</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fields marked with * are required.
                </p>
                <form onSubmit={onSubmit} className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="company-hp">Company</label>
                    <input id="company-hp" name="company" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div>
                    <Label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase">
                      Name *
                    </Label>
                    <Input id="name" name="name" required minLength={2} autoComplete="name" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase">
                      Email *
                    </Label>
                    <Input id="email" name="email" type="email" required autoComplete="email" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase">
                      Phone
                    </Label>
                    <Input id="phone" name="phone" autoComplete="tel" />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="mb-2 block text-xs font-semibold uppercase">
                      Subject *
                    </Label>
                    <Input id="subject" name="subject" required minLength={2} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase">
                      Message *
                    </Label>
                    <Textarea id="message" name="message" rows={6} required minLength={10} />
                  </div>
                  {error ? (
                    <p role="alert" className="sm:col-span-2 text-sm font-medium text-destructive">
                      {error}
                    </p>
                  ) : null}
                  <div className="sm:col-span-2">
                    <Button type="submit" size="lg" disabled={submitting}>
                      {submitting ? (
                        <>
                          <Loader2 className="animate-spin" aria-hidden="true" /> Sending…
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <h2 className="sr-only">Our location on the map</h2>
        <iframe
          title="Nebula Capital office location on Google Maps"
          src={mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[380px] w-full border-0 md:h-[460px]"
        />
      </section>
    </>
  );
}
