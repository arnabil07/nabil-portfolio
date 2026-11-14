import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Configure in .env.local (see .env.example):
//   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
// Without them the route answers 503 { configured: false } and the form shows an honest fallback.

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.website ?? "");

  // Bots fill the hidden field. Respond like a failure-free request but send nothing.
  if (honeypot) return NextResponse.json({ ok: true });

  if (name.length < 2 || name.length > 120 || !emailRe.test(email) || message.length < 10 || message.length > 4000) {
    return NextResponse.json({ ok: false, error: "Please check the form fields and try again." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many messages. Please try again later." }, { status: 429 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) {
    return NextResponse.json({ ok: false, configured: false, error: "Email service not configured." }, { status: 503 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        html: `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;</p><p>${esc(message).replace(/\n/g, "<br>")}</p>`,
        text: `${name} <${email}>\n\n${message}`,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false, error: "The email service rejected the message." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact send failed", err);
    return NextResponse.json({ ok: false, error: "Could not reach the email service." }, { status: 502 });
  }
}
