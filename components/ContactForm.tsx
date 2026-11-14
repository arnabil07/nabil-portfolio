"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { profile } from "@/data/profile";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string; mailto?: string };

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(v: { name: string; email: string; message: string }): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!emailRe.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  if (v.message.length > 4000) e.message = "Message is too long (4000 characters max).";
  return e;
}

const field =
  "w-full rounded-md border border-white/25 bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-violet focus:outline-none";

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const buildMailto = () =>
    profile.contact.email
      ? `mailto:${profile.contact.email}?subject=${encodeURIComponent(`Portfolio message from ${values.name}`)}&body=${encodeURIComponent(
          `${values.message}\n\n— ${values.name} (${values.email})`,
        )}`
      : undefined;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; configured?: boolean };
      if (res.ok && data.ok) {
        setStatus({ kind: "sent" });
        setValues({ name: "", email: "", message: "", website: "" });
        return;
      }
      const mailto = buildMailto();
      setStatus({
        kind: "error",
        message:
          data.configured === false
            ? mailto
              ? "The contact form isn't connected to an email service yet. You can send this message with your email app instead."
              : "The contact form isn't connected to an email service yet, and no email address has been added to this site."
            : data.error || "Something went wrong sending your message.",
        mailto,
      });
    } catch {
      setStatus({ kind: "error", message: "Network error — your message was not sent.", mailto: buildMailto() });
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Contact form" className="space-y-5">
      {/* honeypot — hidden from people, bots fill it */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
        </label>
      </div>

      {(["name", "email"] as const).map((k) => (
        <div key={k}>
          <label htmlFor={`cf-${k}`} className="mb-1.5 block text-xs uppercase tracking-widest text-mute">
            {k === "name" ? "Name" : "Email"}
          </label>
          <input
            id={`cf-${k}`}
            type={k === "email" ? "email" : "text"}
            autoComplete={k}
            value={values[k]}
            onChange={set(k)}
            aria-invalid={!!errors[k]}
            aria-describedby={errors[k] ? `cf-${k}-err` : undefined}
            className={field}
          />
          {errors[k] && (
            <p id={`cf-${k}-err`} role="alert" className="mt-1.5 text-xs text-red-400">
              {errors[k]}
            </p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-xs uppercase tracking-widest text-mute">
          Message
        </label>
        <textarea
          id="cf-message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
          className={field}
        />
        {errors.message && (
          <p id="cf-message-err" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="inline-flex items-center gap-2 rounded-md bg-ivory px-5 py-3 text-sm font-medium text-ink transition hover:bg-white disabled:opacity-60"
      >
        {status.kind === "sending" ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Send size={16} aria-hidden />}
        {status.kind === "sending" ? "Sending…" : "Send message"}
      </button>

      <div aria-live="polite" className="min-h-6 text-sm">
        {status.kind === "sent" && <p className="text-emerald-400">Thanks — your message was sent.</p>}
        {status.kind === "error" && (
          <p className="text-red-300">
            {status.message}{" "}
            {status.mailto && (
              <a href={status.mailto} className="text-ivory underline underline-offset-4 hover:text-violet">
                Open email app
              </a>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
