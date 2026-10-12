
import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { sendInquiryEmail } from "@/lib/email";
import type { ContactFormData } from "@/types";

type ContactRequestBody = ContactFormData & {
  eventId?: unknown;
  packageName?: unknown;
};

function isValidPayload(body: unknown): body is ContactRequestBody {
  if (typeof body !== "object" || body === null) return false;

  const b = body as Record<string, unknown>;

  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0 &&
    typeof b.email === "string" &&
    typeof b.eventDate === "string" &&
    typeof b.location === "string"
  );
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function normalizePhone(phone: string): string {
  let digits = phone.trim().replace(/\D/g, "");

  if (digits.startsWith("0")) {
    digits = `92${digits.slice(1)}`;
  } else if (digits.startsWith("92")) {
    // Already includes Pakistan's country code.
  }

  return digits;
}

async function sendMetaLead(
  request: NextRequest,
  body: ContactRequestBody
): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  // Do not fail a customer's enquiry if Meta is not configured.
  if (!pixelId || !accessToken) {
    console.error("Meta CAPI is not configured.");
    return;
  }

  // The browser and server must use the same ID for deduplication.
  const eventId =
    typeof body.eventId === "string" &&
    /^[a-zA-Z0-9_-]{1,100}$/.test(body.eventId)
      ? body.eventId
      : null;

  if (!eventId) {
    console.error("Meta CAPI skipped: missing or invalid event ID.");
    return;
  }

  const userData: Record<string, string | string[]> = {};

  const email = body.email.trim().toLowerCase();
  const phone = normalizePhone(body.phone);

  if (email) {
    userData.em = [sha256(email)];
  }

  if (phone) {
    userData.ph = [sha256(phone)];
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip");

  const userAgent = request.headers.get("user-agent");

  if (clientIp) {
    userData.client_ip_address = clientIp;
  }

  if (userAgent) {
    userData.client_user_agent = userAgent;
  }

  // These browser cookies can help Meta match the event.
  const fbp = request.cookies.get("_fbp")?.value;
  const fbc = request.cookies.get("_fbc")?.value;

  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  let eventSourceUrl = "https://www.rbaweddingfilms.com/#contact";
  const referer = request.headers.get("referer");

  if (referer) {
    try {
      const url = new URL(referer);

      if (
        url.hostname === "rbaweddingfilms.com" ||
        url.hostname.endsWith(".rbaweddingfilms.com")
      ) {
        eventSourceUrl = url.toString();
      }
    } catch {
      // Keep the default website URL.
    }
  }

  
  try {
    const response = await fetch(
      `https://graph.facebook.com/v25.0/${encodeURIComponent(pixelId)}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: accessToken,
          test_event_code: "TEST93405",
          data: [
            {
              event_name: "Lead",
              event_time: Math.floor(Date.now() / 1000),
              event_id: eventId,
              action_source: "website",
              event_source_url: eventSourceUrl,
              user_data: userData,
            },
          ],
        }),
        cache: "no-store",
      }
    );

    const responseText = await response.text();

    console.log("Meta CAPI HTTP status:", response.status);
    console.log("Meta CAPI response:", responseText);

    if (!response.ok) {
      console.error(
        "Meta CAPI request failed:",
        response.status,
        responseText
      );
    }
  } catch (error) {
    console.error("Meta CAPI network error:", error);
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Name and contact number are required." },
      { status: 400 }
    );
  }

  try {
    // First, make sure the enquiry email was sent successfully.
    await sendInquiryEmail(body);

    // Then report the successful enquiry to Meta.
    await sendMetaLead(request, body);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Failed to send inquiry email:", err);

    const message =
      err instanceof Error ? err.message : "We couldn't send your inquiry.";

    return NextResponse.json({ error: message }, { status: 502 });
  }
}
