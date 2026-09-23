import { NextRequest, NextResponse } from "next/server";
import { sendInquiryEmail } from "@/lib/email";
import type { ContactFormData } from "@/types";

function isValidPayload(body: unknown): body is ContactFormData {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0 &&
    typeof b.eventDate === "string" &&
    typeof b.location === "string"
  );
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
    await sendInquiryEmail(body);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Failed to send inquiry email:", err);
    return NextResponse.json(
      { error: "We couldn't send your inquiry right now. Please try again shortly." },
      { status: 502 }
    );
  }
}
