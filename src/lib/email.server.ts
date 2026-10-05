import { Resend } from "resend";

export type Attachment = {
  filename: string;
  content: string;
};

export async function sendMail(input: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: Attachment[];
}) {
  const resendKey = process.env["RESEND_API_KEY"];
  const to = process.env["HR_EMAIL"] as string;
  const from = process.env["MAIL_FROM"] as string;

  if (!resendKey || !to || !from) {
    throw new Error("RESEND_API_KEY or HR_EMAIL or MAIL_FROM is not configured.");
  }

  const resend = new Resend(resendKey);

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    subject: input.subject,
    html: input.html,
    text: input.text,
    ...(input.replyTo
      ? {
        replyTo: input.replyTo,
      }
      : {}),
    ...(input.attachments?.length
      ? {
        attachments: input.attachments.map((attachment) => ({
          filename: attachment.filename,
          content: attachment.content,
        })),
      }
      : {}),
  });

  if (error) {
    console.error("Resend email error:", error);
    throw new Error("Email delivery failed.");
  }

  return data;
}

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const submittedAt = () =>
  new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  }) + " IST";

export function rowsToHtml(rows: [string, string][]) {
  return `<table style="border-collapse:collapse;width:100%;max-width:640px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#14201b">
${rows
      .map(
        ([label, value]) =>
          `<tr>
        <td style="padding:10px 14px;background:#f5f7f6;border:1px solid #e4e9e7;font-weight:600;width:200px;vertical-align:top">
          ${escapeHtml(label)}
        </td>
        <td style="padding:10px 14px;border:1px solid #e4e9e7;white-space:pre-wrap">
          ${escapeHtml(value)}
        </td>
      </tr>`,
      )
      .join("\n")}
</table>`;
}

export const rowsToText = (rows: [string, string][]) =>
  rows.map(([label, value]) => `${label}: ${value}`).join("\n");
