"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import type { Certification } from "@/lib/types";
import { useCoarsePointer, useReducedMotion } from "@/hooks/useMedia";

interface Props {
  cert: Certification;
  /** perspective tilt in degrees (rest state) */
  tilt?: number;
  dark?: boolean;
}

export default function CertificateCard({ cert, tilt = 0, dark = false }: Props) {
  const reduced = useReducedMotion();
  const touch = useCoarsePointer();
  const off = reduced || touch;

  const tone = dark
    ? "bg-ink text-ivory border-white/20"
    : "bg-white/70 text-ink border-ink/15 backdrop-blur";

  return (
    <div style={{ perspective: 1000 }}>
      <motion.article
        style={{ rotateY: off ? 0 : tilt, rotateX: off ? 0 : 4, transformStyle: "preserve-3d" }}
        whileHover={off ? undefined : { rotateY: 0, rotateX: 0, y: -12, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className={`flex h-full flex-col rounded-xl border p-6 shadow-[0_30px_50px_-25px_rgba(128,96,183,0.5)] ${tone}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg ${
              dark ? "bg-white/10" : "bg-ink/5"
            }`}
          >
            {cert.logo ? (
              <Image src={cert.logo} alt={`${cert.issuer} logo`} width={40} height={40} className="object-contain" />
            ) : (
              <Award aria-hidden className="text-violet" size={22} />
            )}
          </div>
          <p className="text-sm font-medium opacity-80">{cert.issuer}</p>
        </div>

        {cert.image && (
          <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-md border border-current/10">
            <Image src={cert.image} alt={`Preview of ${cert.title}`} fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover" />
          </div>
        )}

        <h3 className="mt-5 font-display text-lg font-semibold leading-snug">{cert.title}</h3>
        <p className="mt-1 text-xs opacity-65">Issued: {cert.issued}</p>

        {cert.placeholder && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-violet">
            Placeholder · replace in data/certifications.ts
          </p>
        )}

        <div className="mt-auto pt-5">
          {cert.credentialUrl ? (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-current px-3.5 py-2 text-xs font-medium transition hover:bg-violet hover:text-ivory hover:border-violet"
            >
              View credential <ExternalLink size={13} aria-hidden />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-current/30 px-3.5 py-2 text-xs opacity-50"
            >
              Credential link not added
            </span>
          )}
        </div>
      </motion.article>
    </div>
  );
}
