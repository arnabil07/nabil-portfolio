"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * GSAP-owned scroll reveals. Any descendant with `data-reveal` fades/rises in
 * when it enters the viewport. Framer Motion never touches these elements.
 */
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el, i) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 36,
          duration: 0.9,
          ease: "power3.out",
          delay: (i % 4) * 0.04,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return ref;
}
