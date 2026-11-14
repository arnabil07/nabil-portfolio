export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[60svh] items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-violet" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
