import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Paperclip } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendJobApplication } from "@/lib/forms.functions";

const ACCEPTED = [".pdf", ".doc", ".docx"];
const MAX_BYTES = 4 * 1024 * 1024;

function readAsBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.readAsDataURL(file);
  });
}

export function ApplyDialog({
  position,
  trigger,
}: {
  position: string;
  trigger: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apply = useServerFn(sendJobApplication);

  const reset = () => {
    setDone(false);
    setResume(null);
    setConsent(false);
    setError(null);
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const values = new FormData(form);

    if (!resume) {
      setError("Please attach your resume (PDF, DOC or DOCX).");
      return;
    }
    const lower = resume.name.toLowerCase();
    if (!ACCEPTED.some((ext) => lower.endsWith(ext))) {
      setError("Resume must be a PDF, DOC or DOCX file.");
      return;
    }
    if (resume.size > MAX_BYTES) {
      setError("Resume must be smaller than 4 MB.");
      return;
    }
    if (!consent) {
      setError("Please confirm the consent checkbox to continue.");
      return;
    }

    setSubmitting(true);
    try {
      const resumeBase64 = await readAsBase64(resume);
      await apply({
        data: {
          position,
          fullName: String(values.get("fullName") || ""),
          email: String(values.get("email") || ""),
          phone: String(values.get("phone") || ""),
          city: String(values.get("city") || ""),
          qualification: String(values.get("qualification") || ""),
          experience: String(values.get("experience") || ""),
          linkedin: String(values.get("linkedin") || ""),
          message: String(values.get("message") || ""),
          consent: true,
          resumeName: resume.name,
          resumeType: resume.type,
          resumeBase64,
          company: "",
        },
      });
      setDone(true);
      form.reset();
      toast.success("Application submitted");
    } catch (err) {
      console.error(err);
      setError(
        "We could not submit your application right now. Please try again, or email your resume to hradmin@nebulacapital.co.in.",
      );
      toast.error("Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        {done ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-brand" aria-hidden="true" />
            <DialogHeader className="mt-5">
              <DialogTitle className="text-center text-2xl">Application received</DialogTitle>
              <DialogDescription className="mx-auto mt-3 max-w-md text-center text-base">
                Thank you for applying to Nebula Capital. Our HR team will review your application
                and contact you if your profile matches the requirements.
              </DialogDescription>
            </DialogHeader>
            <Button className="mt-8" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Apply for {position}</DialogTitle>
              <DialogDescription>
                Fields marked with * are required. Your details go directly to our HR team.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={onSubmit} className="mt-4 grid gap-5 sm:grid-cols-2">
              <input type="hidden" name="position" value={position} />
              <Field label="Position applied for" htmlFor="position-display">
                <Input id="position-display" value={position} readOnly className="bg-muted" />
              </Field>
              <Field label="Full name *" htmlFor="fullName">
                <Input id="fullName" name="fullName" required minLength={2} autoComplete="name" />
              </Field>
              <Field label="Email *" htmlFor="email">
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </Field>
              <Field label="Phone number *" htmlFor="phone">
                <Input id="phone" name="phone" required minLength={6} autoComplete="tel" />
              </Field>
              <Field label="Current city" htmlFor="city">
                <Input id="city" name="city" autoComplete="address-level2" />
              </Field>
              <Field label="Highest qualification" htmlFor="qualification">
                <Input id="qualification" name="qualification" />
              </Field>
              <Field label="Total experience" htmlFor="experience">
                <Input id="experience" name="experience" placeholder="e.g. Fresher, 2 years" />
              </Field>
              <Field label="LinkedIn profile (optional)" htmlFor="linkedin">
                <Input id="linkedin" name="linkedin" placeholder="https://" />
              </Field>

              <Field label="Resume * (PDF, DOC, DOCX — max 4 MB)" htmlFor="resume" full>
                <div className="flex items-center gap-3">
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    required
                    onChange={(e) => setResume(e.target.files?.[0] ?? null)}
                    className="file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1 file:text-xs file:font-medium"
                  />
                </div>
                {resume ? (
                  <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Paperclip className="h-3.5 w-3.5" aria-hidden="true" />
                    {resume.name} · {(resume.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                ) : null}
              </Field>

              <Field label="Message / cover note" htmlFor="message" full>
                <Textarea id="message" name="message" rows={4} />
              </Field>

              <div className="sm:col-span-2 flex items-start gap-3 rounded-md border border-border bg-secondary/60 p-4">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(v) => setConsent(v === true)}
                  className="mt-0.5"
                />
                <Label htmlFor="consent" className="text-sm leading-relaxed font-normal">
                  I consent to Nebula Capital Advisory Pvt. Ltd. storing and processing the
                  information and resume I have submitted for recruitment purposes.
                </Label>
              </div>

              {error ? (
                <p role="alert" className="sm:col-span-2 text-sm font-medium text-destructive">
                  {error}
                </p>
              ) : null}

              <div className="sm:col-span-2 flex flex-wrap gap-3">
                <Button type="submit" size="lg" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" aria-hidden="true" /> Submitting…
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  htmlFor,
  children,
  full,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <Label htmlFor={htmlFor} className="mb-2 block text-xs font-semibold tracking-wide uppercase">
        {label}
      </Label>
      {children}
    </div>
  );
}
