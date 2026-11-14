"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import ResumeButton from "./ResumeButton";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certificates" },
];
const ids = [...links.map((l) => l.id), "contact"];

const pill =
  "inline-flex items-center gap-2 rounded-md border px-3.5 py-2 text-xs font-medium transition-colors";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:px-6">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-xl border px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-white/15 bg-ink/80 shadow-lg shadow-black/30 backdrop-blur-xl"
            : "border-white/15 bg-ink/40 backdrop-blur-sm"
        }`}
      >
        <Link
          href="/#home"
          aria-label="A R Nabil — Home"
          className="group inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 bg-white/[0.04] text-ivory transition hover:border-violet hover:bg-violet/10"
        >
          <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
            <path d="M18 46V18h6l16 20V18h6v28h-6L24 26v20z" fill="currentColor" />
            <circle cx="50" cy="48" r="4" fill="#8060b7" />
          </svg>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id} className="relative">
                <Link
                  href={`/#${l.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`py-2 text-xs transition-colors ${isActive ? "text-ivory" : "text-ivory/65 hover:text-ivory"}`}
                >
                  {l.label}
                </Link>
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 h-px w-full bg-violet"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <ResumeButton className={`${pill} border-ivory bg-ivory text-ink hover:bg-white`} />
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-ivory lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-7xl rounded-xl border border-white/15 bg-ink/95 p-5 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.id} className="border-b border-white/10 last:border-0">
                  <Link
                    href={`/#${l.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === l.id ? "location" : undefined}
                    className={`flex items-center justify-between py-3.5 font-display text-lg ${
                      active === l.id ? "text-violet" : "text-ivory"
                    }`}
                  >
                    {l.label}
                    <ArrowUpRight size={16} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5" onClick={() => setOpen(false)}>
              <ResumeButton className={`${pill} w-full justify-center border-ivory bg-ivory text-ink`} label="Download resume" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
