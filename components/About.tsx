"use client";

import { profile } from "@/data/profile";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function About() {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-title"
      className="section-shell overflow-hidden border-t border-white/10 bg-ink"
    >
      <span aria-hidden className="ghost-heading left-0 top-6 text-[clamp(6rem,26vw,22rem)] text-ivory">
        ABOUT
      </span>

      <div className="relative mx-auto max-w-7xl">
        <p data-reveal className="eyebrow text-ivory/80">
          <span className="text-violet">02</span> — About
        </p>
        <h2 id="about-title" data-reveal className="mt-4 font-serif text-4xl text-ivory sm:text-6xl">
          A little about <em className="text-violet">me.</em>
        </h2>

        <div className="mt-12 grid gap-10 border border-white/20 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            {profile.about.map((p, i) => (
              <p key={i} data-reveal className="mb-5 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg">
                {p}
              </p>
            ))}
            <div data-reveal className="mt-8 border-t border-white/20 pt-4">
              <div className="flex flex-wrap justify-between gap-2 font-mono text-[11px] uppercase tracking-widest text-ivory/80">
                <span>{profile.aboutTags[0]}</span>
                <span>{profile.aboutTags[1]}</span>
              </div>
            </div>
            <div data-reveal className="mt-10">
              <h3 className="eyebrow text-violet">Philosophy</h3>
              <p className="mt-3 max-w-xl font-serif text-xl italic leading-snug text-ivory/90">
                {profile.philosophy}
              </p>
            </div>
          </div>

          <div className="space-y-10">
            <div data-reveal>
              <h3 className="eyebrow text-violet">Interests</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {profile.interestList.map((i) => (
                  <li key={i} className="rounded-full border border-white/25 px-3.5 py-1.5 text-sm text-ivory/85">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <h3 className="eyebrow text-violet">Skills</h3>
              <dl className="mt-3 divide-y divide-white/10 border-y border-white/10">
                {profile.skills.map((g) => (
                  <div key={g.label} className="grid grid-cols-[7rem_1fr] gap-4 py-3.5">
                    <dt className="text-xs uppercase tracking-widest text-mute">{g.label}</dt>
                    <dd className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ivory">
                      {g.items.map((it) => (
                        <span key={it}>{it}</span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
