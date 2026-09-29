const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

/**
 * The visible sender. Resend requires this domain to be verified in the Resend
 * account. Override with the MAIL_FROM env var if a different sender is used.
 */
const DEFAULT_FROM = "Nebula Capital Website <website@nebulacapital.co.in>";

export type Attachment = { filename: string; content: string };

export async function sendMail(input: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: Attachment[];
}) {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const resendKey = process.env["RESEND_API_KEY"];
  const to = process.env["HR_EMAIL"] || "hradmin@nebulacapital.co.in";
  const from = process.env["MAIL_FROM"] || DEFAULT_FROM;

  if (!lovableKey || !resendKey) {
    throw new Error("Email service is not configured.");
  }

  const response = await fetch(`${GATEWAY_URL}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": resendKey,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: input.subject,
      html: input.html,
      text: input.text,
      ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      ...(input.attachments?.length ? { attachments: input.attachments } : {}),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`Resend request failed [${response.status}]: ${body}`);
    throw new Error(`Email delivery failed [${response.status}]: ${body}`);
  }

  return (await response.json()) as { id?: string };
}

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const submittedAt = () =>
  new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" }) +
  " IST";

export function rowsToHtml(rows: [string, string][]) {
  return `<table style="border-collapse:collapse;width:100%;max-width:640px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#14201b">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="padding:10px 14px;background:#f5f7f6;border:1px solid #e4e9e7;font-weight:600;width:200px;vertical-align:top">${escapeHtml(
        label,
      )}</td><td style="padding:10px 14px;border:1px solid #e4e9e7;white-space:pre-wrap">${escapeHtml(
        value,
      )}</td></tr>`,
  )
  .join("\n")}
</table>`;
}

export const rowsToText = (rows: [string, string][]) =>
  rows.map(([label, value]) => `${label}: ${value}`).join("\n");
