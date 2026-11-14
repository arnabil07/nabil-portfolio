"use client";

import { certifications } from "@/data/certifications";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import CertificateCard from "./CertificateCard";

const tilts = [14, 8, -10, 12, -8, 10];

export default function Certifications() {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section
      id="certifications"
      ref={ref}
      aria-labelledby="cert-title"
      className="section-shell overflow-hidden bg-ivory text-ink"
    >
      <span aria-hidden className="ghost-heading left-0 top-8 text-[clamp(3rem,11.5vw,11rem)] text-ink">
        CERTIFICATIONS
      </span>
      <div className="relative mx-auto max-w-7xl">
        <p data-reveal className="eyebrow">
          <span className="text-violet">05</span> — Certifications
        </p>
        <h2 id="cert-title" data-reveal className="mt-4 font-serif text-4xl sm:text-6xl">
          My <em className="text-violet">credentials.</em>
        </h2>
        <p data-reveal className="mt-4 max-w-sm text-ink/75">
          Professional certifications and online achievements.
        </p>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <li key={c.id} data-reveal className={i % 2 ? "lg:translate-y-8" : ""}>
              <CertificateCard cert={c} tilt={tilts[i % tilts.length]} dark={i % 3 === 2} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
