import { Resend } from "resend";
import type { ContactFormData } from "@/types";

const STUDIO_INBOX = "refractionsbyammar@gmail.com";

function buildEmailBody(data: ContactFormData, submittedAt: string) {
  const text = [
    "New Wedding Photography Inquiry",
    "",
    `Name: ${data.name}`,
    `Contact Number: ${data.phone}`,
    `Expected Event Date: ${data.eventDate || "Not provided"}`,
    `Location: ${data.location || "Not provided"}`,
    "",
    `Submitted: ${submittedAt}`,
  ].join("\n");

  const html = `
    <div style="font-family: sans-serif; color: #131210; line-height: 1.6;">
      <h2 style="font-weight: 600;">New Wedding Photography Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Contact Number:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Expected Event Date:</strong> ${escapeHtml(
        data.eventDate || "Not provided"
      )}</p>
      <p><strong>Location:</strong> ${escapeHtml(data.location || "Not provided")}</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
      <p style="color: #777; font-size: 13px;">Submitted: ${escapeHtml(submittedAt)}</p>
    </div>
  `;

  return { text, html };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Sends the inquiry notification email.
 *
 * Configure by setting these environment variables (see .env.example):
 *   RESEND_API_KEY   - API key from resend.com
 *   CONTACT_FROM     - a verified "from" address on your Resend domain,
 *                       e.g. "Cinematic Weddings <inquiries@yourdomain.com>"
 *
 * To swap providers (Nodemailer, SendGrid, etc.), replace the body of
 * this function — the calling API route does not need to change.
 */
export async function sendInquiryEmail(data: ContactFormData) {
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const { text, html } = buildEmailBody(data, submittedAt);

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !from) {
    // Fail loudly in server logs but do not leak configuration details
    // to the client — the API route decides how to respond.
    throw new Error(
      "Email is not configured. Set RESEND_API_KEY and CONTACT_FROM in your environment."
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: STUDIO_INBOX,
    replyTo: undefined,
    subject: `New inquiry from ${data.name}`,
    text,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }
}
