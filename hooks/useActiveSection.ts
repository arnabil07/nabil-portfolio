"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Returns the id of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids: string[]): string | null {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return;
    }
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, pathname]);

  return active;
}
