"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section role="alert" className="flex min-h-[80svh] flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow text-violet">Error</p>
      <h1 className="mt-4 font-serif text-5xl text-ivory">Something went wrong.</h1>
      <button onClick={reset} className="mt-8 rounded-md bg-ivory px-5 py-3 text-sm font-medium text-ink">
        Try again
      </button>
    </section>
  );
}
