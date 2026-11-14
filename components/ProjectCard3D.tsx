"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { useCoarsePointer, useReducedMotion } from "@/hooks/useMedia";

interface Props {
  project: Project;
  index: number;
  /** base rotation in degrees (static layout rotation) */
  rotate?: number;
}

export default function ProjectCard3D({ project, index, rotate = 0 }: Props) {
  const reduced = useReducedMotion();
  const touch = useCoarsePointer();
  const off = reduced || touch;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (off || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    // static rotation wrapper → perspective wrapper → tilt element (Framer only)
    <div style={{ rotate: `${rotate}deg` }} className="h-full">
      <div style={{ perspective: 1100 }} className="h-full">
        <motion.article
          onPointerMove={onMove}
          onPointerLeave={reset}
          whileHover={off ? undefined : { y: -10, scale: 1.015 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          style={{ rotateX: off ? 0 : rotateX, rotateY: off ? 0 : rotateY, transformStyle: "preserve-3d" }}
          className="group relative overflow-hidden rounded-xl border border-white/20 bg-[#101014] shadow-[0_40px_80px_-30px_rgba(128,96,183,0.45)] transition-shadow hover:shadow-[0_50px_90px_-25px_rgba(128,96,183,0.7)]"
        >
          {/* browser chrome */}
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3 py-2.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="ml-3 h-4 flex-1 rounded bg-white/[0.06]" />
          </div>

          {/* screenshot */}
          <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#1d1530] via-[#14101f] to-[#0b0b10]">
            {project.screenshot ? (
              <Image
                src={project.screenshot}
                alt={`Screenshot of ${project.name}`}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-center" aria-hidden>
                <div className="grid w-2/3 grid-cols-3 gap-2 opacity-70">
                  <span className="col-span-3 h-4 rounded bg-violet/40" />
                  <span className="h-12 rounded bg-white/10" />
                  <span className="h-12 rounded bg-white/10" />
                  <span className="h-12 rounded bg-violet/25" />
                </div>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-mute">
                  Temporary screenshot placeholder
                </p>
              </div>
            )}
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-semibold text-ivory">{project.name}</h3>
                <p className="mt-1.5 text-sm text-ivory/70">{project.summary}</p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-ivory transition group-hover:bg-violet group-hover:border-violet">
                <ArrowUpRight size={16} aria-hidden />
              </span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
              {project.technologies.map((t) => (
                <li key={t} className="rounded border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-ivory/80">
                  {t}
                </li>
              ))}
            </ul>
            {project.placeholder && (
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-violet">
                Sample entry · replace in data/projects.ts
              </p>
            )}
          </div>

          {/* whole card is the link */}
          <Link
            href={`/projects/${project.slug}`}
            className="absolute inset-0 z-10"
            aria-label={`View details for ${project.name} (project ${index + 1})`}
          />
        </motion.article>
      </div>
    </div>
  );
}
