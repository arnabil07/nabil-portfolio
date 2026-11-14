"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { GithubIcon, LinkedinIcon } from "./icons";
import ResumeButton from "./ResumeButton";
import ContactForm from "./ContactForm";

function strip(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

interface ItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  external?: boolean;
}

function Item({ icon, title, value, href, external }: ItemProps) {
  const body = (
    <>
      <span className="text-ivory">{icon}</span>
      <span className="text-left">
        <span className="block text-sm text-ivory">{title}</span>
        <span className="block text-xs text-mute">{value}</span>
      </span>
      {href && <ArrowUpRight size={14} className="text-mute" aria-hidden />}
    </>
  );
  const cls = "flex items-center gap-4 py-2 md:px-6 md:first:pl-0";
  return href ? (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${cls} transition hover:text-violet`}
    >
      {body}
    </a>
  ) : (
    <div className={`${cls} opacity-60`}>{body}</div>
  );
}

export default function Contact() {
  const ref = useScrollReveal<HTMLElement>();
  const { contact } = profile;
  const [before, after] = contact.heading.split(contact.highlightWord);

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-title"
      className="section-shell overflow-hidden border-t border-white/10 bg-ink"
    >
      {/* decorative wireframe globe — static, no WebGL */}
      <svg
        aria-hidden
        viewBox="0 0 400 300"
        className="pointer-events-none absolute -right-24 top-24 hidden w-[620px] text-ivory/20 xl:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
      >
        <ellipse cx="200" cy="150" rx="190" ry="120" />
        {[40, 80, 125].map((rx) => (
          <ellipse key={rx} cx="200" cy="150" rx={rx} ry="120" />
        ))}
        {[-80, -40, 0, 40, 80].map((dy) => (
          <ellipse key={dy} cx="200" cy={150 + dy} rx={190 * Math.sqrt(1 - (dy / 120) ** 2)} ry="14" />
        ))}
      </svg>

      <div className="relative mx-auto max-w-7xl">
        <p data-reveal className="eyebrow text-ivory/80">
          <span className="text-violet">06</span> — Contact
        </p>
        <h2
          id="contact-title"
          data-reveal
          className="mt-4 max-w-4xl font-serif text-[clamp(2.4rem,6.5vw,5rem)] leading-[1.08] text-ivory"
        >
          {before}
          <em className="text-violet-soft">{contact.highlightWord}</em>
          {after}
        </h2>
        <p data-reveal className="mt-5 max-w-xl text-ivory/80">
          {contact.intro}
        </p>

        <div data-reveal className="mt-10 flex flex-col divide-white/20 md:flex-row md:divide-x">
          <Item
            icon={<Mail size={24} aria-hidden />}
            title="Email"
            value={contact.email || "To be added"}
            href={contact.email ? `mailto:${contact.email}` : undefined}
          />
          <Item
            icon={<GithubIcon className="h-6 w-6" />}
            title="GitHub"
            value={contact.github ? strip(contact.github) : "To be added"}
            href={contact.github || undefined}
            external
          />
          <Item
            icon={<LinkedinIcon className="h-6 w-6" />}
            title="LinkedIn"
            value={contact.linkedin ? strip(contact.linkedin) : "To be added"}
            href={contact.linkedin || undefined}
            external
          />
        </div>

        <div data-reveal className="mt-8">
          <ResumeButton className="inline-flex items-center gap-2 rounded-md bg-ivory px-5 py-3 text-sm font-medium text-ink transition hover:bg-white" label="Download resume" />
        </div>

        <div data-reveal className="mt-16 max-w-xl border border-white/20 p-6 sm:p-8">
          <h3 className="font-display text-lg font-semibold text-ivory">Send a message</h3>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
