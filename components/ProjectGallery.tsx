"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ProjectCard3D from "./ProjectCard3D";

// Asymmetric desktop layout: width/offset classes and static rotation per card.
const layout = [
  { cls: "lg:col-span-7 lg:col-start-1", rotate: -2, speed: -40 },
  { cls: "lg:col-span-5 lg:col-start-8 lg:mt-28", rotate: 3, speed: 50 },
  { cls: "lg:col-span-6 lg:col-start-3 lg:-mt-6", rotate: -1, speed: -30 },
  { cls: "lg:col-span-5 lg:col-start-1 lg:mt-10", rotate: 2, speed: 40 },
  { cls: "lg:col-span-6 lg:col-start-7 lg:-mt-10", rotate: -3, speed: -50 },
] as const;

export default function ProjectGallery() {
  const reveal = useScrollReveal<HTMLElement>();
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll-based depth: GSAP moves the outer wrapper only (Framer owns tilt inside).
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((card) => {
        const speed = Number(card.dataset.parallax) || 0;
        gsap.fromTo(
          card,
          { y: -speed },
          { y: speed, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.6 } },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={reveal}
      aria-labelledby="projects-title"
      className="section-shell overflow-hidden border-t border-white/10 bg-ink"
    >
      <span aria-hidden className="ghost-heading right-0 top-6 text-right text-[clamp(5rem,20vw,17rem)] text-ivory">
        WORK
      </span>
      <div className="relative mx-auto max-w-7xl">
        <p data-reveal className="eyebrow text-ivory/80">
          <span className="text-violet">03</span> — Selected projects
        </p>
        <h2 id="projects-title" data-reveal className="mt-4 font-serif text-4xl text-ivory sm:text-6xl">
          Things I&apos;m <em className="text-violet">building.</em>
        </h2>

        <div ref={trackRef} className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-x-8">
          {projects.slice(0, 5).map((p, i) => {
            const l = layout[i % layout.length];
            return (
              <div key={p.slug} className={l.cls} data-parallax={l.speed}>
                <div data-reveal>
                  <ProjectCard3D project={p} index={i} rotate={l.rotate} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
