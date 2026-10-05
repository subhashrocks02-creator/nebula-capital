import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().max(30).optional().default(""),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(4000),
  // Simple honeypot: must stay empty.
  company: z.string().max(0).optional().default(""),
});

const MAX_RESUME_BYTES = 4 * 1024 * 1024;

const applicationSchema = z.object({
  position: z.string().trim().min(2).max(120),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(6).max(30),
  city: z.string().trim().max(120).optional().default(""),
  qualification: z.string().trim().max(160).optional().default(""),
  experience: z.string().trim().max(120).optional().default(""),
  linkedin: z.string().trim().max(250).optional().default(""),
  message: z.string().trim().max(4000).optional().default(""),
  consent: z.literal(true),
  resumeName: z.string().trim().min(3).max(200),
  resumeType: z.string().trim().max(160).optional().default(""),
  resumeBase64: z.string().min(16),
  company: z.string().max(0).optional().default(""),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { sendMail, rowsToHtml, rowsToText, submittedAt } = await import("./email.server");

    const rows: [string, string][] = [
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone || "Not provided"],
      ["Subject", data.subject],
      ["Message", data.message],
      ["Submitted", submittedAt()],
      ["Source", "Nebula Capital Website"],
    ];

    await sendMail({
      subject: `Website Contact Form - ${data.subject}`,
      html: `<h2 style="font-family:Arial,Helvetica,sans-serif;color:#14201b">New website enquiry</h2>${rowsToHtml(rows)}`,
      text: rowsToText(rows),
      replyTo: data.email,
    });

    return { ok: true as const };
  });

export const sendJobApplication = createServerFn({ method: "POST" })
  .validator((data: unknown) => applicationSchema.parse(data))
  .handler(async ({ data }) => {
    const name = data.resumeName.toLowerCase();
    if (!/\.(pdf|doc|docx)$/.test(name)) {
      throw new Error("Resume must be a PDF, DOC or DOCX file.");
    }

    const cleanBase64 = data.resumeBase64.includes(",")
      ? data.resumeBase64.slice(data.resumeBase64.indexOf(",") + 1)
      : data.resumeBase64;
    const approxBytes = Math.floor((cleanBase64.length * 3) / 4);
    if (approxBytes > MAX_RESUME_BYTES) {
      throw new Error("Resume is larger than 4 MB. Please upload a smaller file.");
    }

    const { sendMail, rowsToHtml, rowsToText, submittedAt } = await import("./email.server");

    const rows: [string, string][] = [
      ["Position applied for", data.position],
      ["Full name", data.fullName],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Current city", data.city || "Not provided"],
      ["Highest qualification", data.qualification || "Not provided"],
      ["Total experience", data.experience || "Not provided"],
      ["LinkedIn", data.linkedin || "Not provided"],
      ["Message / cover note", data.message || "Not provided"],
      ["Resume", data.resumeName],
      ["Consent given", "Yes"],
      ["Submitted", submittedAt()],
      ["Source", "Nebula Capital Website"],
    ];

    await sendMail({
      subject: `Job Application - ${data.position} - ${data.fullName}`,
      html: `<h2 style="font-family:Arial,Helvetica,sans-serif;color:#14201b">New job application</h2>${rowsToHtml(rows)}`,
      text: rowsToText(rows),
      replyTo: data.email,
      attachments: [{ filename: data.resumeName, content: cleanBase64 }],
    });

    return { ok: true as const };
  });
