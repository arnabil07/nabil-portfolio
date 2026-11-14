import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { getProject, projects } from "@/data/projects";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  return {
    title: p.name,
    description: p.summary,
    // sample entries should not be indexed
    robots: p.placeholder ? { index: false, follow: true } : undefined,
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-white/15 py-10 md:grid md:grid-cols-[14rem_1fr] md:gap-10">
      <h2 className="eyebrow mb-4 text-violet md:mb-0">{title}</h2>
      <div className="max-w-2xl text-base leading-relaxed text-ivory/85">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="px-5 pb-24 pt-32 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-ivory/75 transition hover:text-violet">
          <ArrowLeft size={16} aria-hidden /> Back to portfolio
        </Link>

        {p.placeholder && (
          <p role="note" className="mt-8 rounded-md border border-violet/50 bg-violet/10 px-4 py-3 font-mono text-xs text-ivory/90">
            SAMPLE CONTENT — this is a placeholder entry, not a real project. Edit <code>data/projects.ts</code>.
          </p>
        )}

        <h1 className="mt-8 font-serif text-4xl leading-tight text-ivory sm:text-6xl">{p.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-ivory/75">{p.summary}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {p.githubUrl ? (
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-ivory px-4 py-2.5 text-sm text-ivory transition hover:bg-ivory hover:text-ink"
            >
              <GithubIcon className="h-4 w-4" /> GitHub
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          ) : (
            <span aria-disabled="true" className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-sm text-ivory/40">
              <GithubIcon className="h-4 w-4" /> GitHub link not added
            </span>
          )}
          {p.liveUrl ? (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-ivory px-4 py-2.5 text-sm text-ink transition hover:bg-white"
            >
              Live demo <ExternalLink size={14} aria-hidden />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          ) : (
            <span aria-disabled="true" className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-sm text-ivory/40">
              Live demo not available
            </span>
          )}
        </div>

        <div className="mt-14">
          <Block title="Overview">{p.overview}</Block>
          <Block title="Problem">{p.problem}</Block>
          <Block title="Solution">{p.solution}</Block>
          <Block title="Technologies">
            <ul className="flex flex-wrap gap-2">
              {p.technologies.map((t) => (
                <li key={t} className="rounded border border-white/20 bg-white/5 px-3 py-1.5 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Architecture">{p.architecture}</Block>
          <Block title="Challenges">{p.challenges}</Block>
          <Block title="Screenshots">
            {p.screenshots.length ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {p.screenshots.map((src, i) => (
                  <div key={src} className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/15">
                    <Image src={src} alt={`${p.name} screenshot ${i + 1}`} fill sizes="(min-width:640px) 40vw, 90vw" className="object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-ivory/60">No screenshots added yet.</p>
            )}
          </Block>
        </div>

        {projects.length > 1 && (
          <nav aria-label="Next project" className="mt-6 border-t border-white/15 pt-8">
            <Link href={`/projects/${next.slug}`} className="group inline-flex flex-col">
              <span className="eyebrow text-mute">Next project</span>
              <span className="mt-1 font-serif text-2xl text-ivory transition group-hover:text-violet">{next.name} →</span>
            </Link>
          </nav>
        )}
      </div>
    </article>
  );
}
