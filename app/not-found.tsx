import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow text-violet">404</p>
      <h1 className="mt-4 font-serif text-5xl text-ivory">Page not found.</h1>
      <p className="mt-4 text-ivory/70">That page doesn&apos;t exist (or hasn&apos;t been built yet).</p>
      <Link href="/" className="mt-8 rounded-md bg-ivory px-5 py-3 text-sm font-medium text-ink">
        Back to portfolio
      </Link>
    </section>
  );
}
