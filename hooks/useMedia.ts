"use client";

import { useEffect, useState } from "react";

/** SSR-safe media query hook. Returns `fallback` until mounted. */
export function useMedia(query: string, fallback = false): boolean {
  const [matches, setMatches] = useState(fallback);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

export const useReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");
/** Touch-first devices (no hover + coarse pointer): skip tilt and heavy 3D. */
export const useCoarsePointer = () => useMedia("(hover: none), (pointer: coarse)");
export const useIsMobile = () => useMedia("(max-width: 767px)");
