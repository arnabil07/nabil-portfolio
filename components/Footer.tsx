"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useMedia";
import { socialIcon } from "./icons";

export default function Footer() {
  const reduced = useReducedMotion();
  const toTop = () => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });

  return (
    <footer className="border-t border-white/15 bg-ink px-5 py-8 sm:px-10 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <p className="font-display text-sm font-bold tracking-[0.18em] text-ivory">A R NABIL.</p>

        <ul aria-label="Social links" className="flex items-center gap-5">
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
                  <span aria-label={`${label} link not added yet`} className="text-ivory/25">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-5">
          <p className="text-xs text-mute">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <motion.button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            whileHover={reduced ? undefined : { y: -3 }}
            whileTap={{ scale: 0.92 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-ivory transition hover:border-violet hover:bg-violet"
          >
            <ArrowUp size={16} aria-hidden />
          </motion.button>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-7xl font-mono text-[10px] uppercase tracking-widest text-mute">
        Designed &amp; built with code.
      </p>
    </footer>
  );
}
