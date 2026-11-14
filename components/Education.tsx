"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/education";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Education() {
  const reveal = useScrollReveal<HTMLElement>();
  const listRef = useRef<HTMLOListElement>(null);

  // Timeline drawing: GSAP scrubs the line (horizontal on md+, vertical on mobile).
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.registerPlugin(ScrollTrigger);
      const st = { trigger: list, start: "top 80%", end: "bottom 60%", scrub: 0.5 };
      gsap.fromTo("[data-line-h]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: st });
      gsap.fromTo("[data-line-v]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: st });
      gsap.utils.toArray<HTMLElement>("[data-marker]").forEach((m, i, all) => {
        gsap.fromTo(
          m,
          { scale: 0.4, backgroundColor: "#2a2433" },
          {
            scale: 1,
            backgroundColor: "#8060b7",
            ease: "back.out(2)",
            scrollTrigger: { trigger: list, start: `top ${80 - (i / all.length) * 18}%`, toggleActions: "play none none reverse" },
          },
        );
      });
    }, list);
    return () => mm.revert();
  }, []);

  return (
    <section
      id="education"
      ref={reveal}
      aria-labelledby="education-title"
      className="section-shell overflow-hidden border-t border-white/10 bg-ink"
    >
      <div className="relative mx-auto max-w-7xl">
        <GraduationCap aria-hidden className="absolute right-0 top-0 hidden h-10 w-10 text-ivory/80 md:block" />
        <p data-reveal className="eyebrow text-ivory/80">
          <span className="text-violet">04</span> — Education
        </p>
        <h2 id="education-title" data-reveal className="mt-4 font-serif text-4xl text-ivory sm:text-6xl">
          The learning <em className="text-violet">journey.</em>
        </h2>

        <ol ref={listRef} className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* horizontal rail */}
          <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-white/15 md:block" />
          <span
            aria-hidden
            data-line-h
            className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-violet md:block"
          />
          {/* vertical rail */}
          <span aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-white/15 md:hidden" />
          <span aria-hidden data-line-v className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-violet md:hidden" />

          {education.map((e) => (
            <li key={e.id} className="relative pl-9 md:pl-0 md:pt-9">
              <span
                data-marker
                aria-hidden
                className="absolute left-0 top-0 h-[15px] w-[15px] rounded-full border-2 border-ink bg-violet shadow-[0_0_0_1px_rgba(128,96,183,0.7)]"
              />
              <div data-reveal>
                <p className="font-mono text-xs text-ivory/70">{e.period}</p>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ivory">{e.qualification}</h3>
                <p className="mt-1 text-sm text-ivory/75">{e.institution}</p>
                {e.note && <p className="mt-1 text-xs text-mute">({e.note})</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
