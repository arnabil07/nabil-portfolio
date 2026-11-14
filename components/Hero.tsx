"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useMedia";
import { socialIcon } from "./icons";
import Particles from "./Particles";
import Avatar from "./Avatar";
import DigitalIDCard from "./DigitalIDCard";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Masked line reveal — Framer Motion owns all hero text animation.
 * The mask has horizontal padding (cancelled by negative margin) so glyph edges
 * and italic overhangs are never clipped on the left or right.
 */
function Line({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <span className="-mx-3 block overflow-hidden px-3 pb-1.5 pt-1">
      <motion.span
        className={`block ${className}`}
        initial={reduced ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduced ? false : ({ opacity: 0, y: 12 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section id="home" aria-label="Introduction" className="relative isolate overflow-hidden bg-ink">
      {/* Star field, clipped to the black half */}
      <div aria-hidden className="absolute inset-0 -z-10 lg:[clip-path:polygon(0_0,56%_0,48%_100%,0_100%)]">
        <Particles />
      </div>
      {/* Ivory half (desktop only; on mobile/tablet the avatar block carries its own ivory bg) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-ivory lg:block [clip-path:polygon(56%_0,100%_0,100%_100%,48%_100%)]"
      />

      <div className="relative flex flex-col lg:block lg:h-[clamp(640px,88svh,800px)]">
        {/* Left-edge socials */}
        <ul
          aria-label="Social links"
          className="absolute bottom-6 left-4 z-20 hidden flex-col items-center gap-4 lg:flex xl:left-7"
        >
          {profile.social.map(({ label, url }) => {
            const Icon = socialIcon[label];
            return (
              <li key={label}>
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in new tab)`}
                    className="text-ivory/80 transition hover:text-violet"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ) : (
                  <span aria-label={`${label} link not added yet`} title={`${label} link not added yet`} className="text-ivory/30">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                )}
              </li>
            );
          })}
          <li aria-hidden className="mt-1 h-20 w-px bg-ivory/40" />
        </ul>

        {/* Text frame — stays in the black half; the avatar never enters this box's text area */}
        <div className="relative z-10 mx-5 mt-28 sm:mx-10 lg:absolute lg:left-[8%] lg:top-[22%] lg:mx-0 lg:mt-0 lg:w-[50%]">
          {/* Outline inverts over the ivory half via blend mode */}
          <div aria-hidden className="pointer-events-none absolute inset-0 border border-white [mix-blend-mode:difference]" />
          <div className="px-6 py-9 sm:px-10 sm:py-11 lg:px-12 lg:py-12">
            <motion.p {...fade(0.1)} className="font-mono text-xs tracking-[0.3em] text-ivory/80 sm:text-sm">
              {profile.greeting}
            </motion.p>
            <h1 className="mt-3 font-display font-bold leading-[0.98] tracking-tight text-ivory">
              <Line delay={0.2} className="text-[clamp(2.5rem,12.5vw,4.5rem)] sm:text-[clamp(3.5rem,9vw,5.5rem)] lg:text-[clamp(3rem,6vw,6.25rem)]">
                {profile.name}.
              </Line>
              <Line
                delay={0.32}
                className="font-normal text-ivory/85 text-[clamp(1.25rem,6.2vw,2rem)] sm:text-[clamp(1.75rem,4.5vw,2.75rem)] lg:text-[clamp(1.5rem,3.4vw,3.6rem)]"
              >
                {profile.title}.
              </Line>
            </h1>
            <motion.p {...fade(0.6)} className="mt-5 max-w-md text-base text-ivory/80 sm:text-lg">
              {profile.tagline}
            </motion.p>
            <motion.div {...fade(0.75)} className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs sm:text-sm">
              {profile.availability.available && (
                <p className="flex items-center gap-2.5 text-ivory/85">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  {profile.availability.label}
                </p>
              )}
              <Link
                href="/#about"
                className="flex items-center gap-2 text-ivory/85 transition hover:text-violet sm:border-l sm:border-ivory/40 sm:pl-8"
              >
                Scroll to explore <ArrowDown size={14} aria-hidden />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Ivory side: avatar + ID card.
            mobile: stacked, centred · tablet: side by side · desktop: absolutely placed in the right half */}
        <div className="relative mt-10 flex flex-col items-center bg-ivory px-5 pb-14 pt-12 [clip-path:polygon(0_5%,100%_0,100%_100%,0_100%)] sm:flex-row sm:items-end sm:justify-center sm:gap-8 sm:px-10 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:block lg:w-[52%] lg:bg-transparent lg:p-0 lg:[clip-path:none]">
          {/* orbit ring (decorative) */}
          <svg
            aria-hidden
            viewBox="0 0 600 400"
            className="pointer-events-none absolute left-1/2 top-[22%] hidden w-[104%] -translate-x-1/2 lg:block"
            fill="none"
          >
            <ellipse cx="300" cy="200" rx="290" ry="100" stroke="#8060b7" strokeOpacity="0.5" transform="rotate(-12 300 200)" />
          </svg>

          {/* Avatar: 69% of the right hero panel, centred in the space left of the ID card */}
          <div className="relative w-[87%] max-w-[416px] sm:w-[57%] sm:max-w-[436px] lg:absolute lg:bottom-0 lg:left-[0.5%] lg:z-20 lg:w-[69%] lg:max-w-none">
            <Avatar />
          </div>

          {/* ID card: lower right, beside (not over) the character */}
          <div className="relative z-30 -mt-10 flex w-[80%] max-w-[262px] justify-center sm:mt-0 sm:w-[36%] lg:absolute lg:bottom-[11%] lg:right-[5%] lg:mt-0 lg:w-[clamp(200px,18vw,262px)]">
            <DigitalIDCard />
          </div>
        </div>
      </div>
    </section>
  );
}
