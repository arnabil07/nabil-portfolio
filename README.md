# A R Nabil — Portfolio

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP · Framer Motion.

> **Status:** the source was written without being able to install packages, so it has **not yet been
> compiled, run or browser-tested**. Follow "Run locally" below; if `npm run build` reports anything, fix it
> (or paste the error to Claude) before deploying. No `package-lock.json` is included — `npm install` creates it.

## Run locally (Mac)

1. Install Node.js 20.9+ from https://nodejs.org (LTS). Check with `node -v`.
2. Unzip `ARNabil-Portfolio.zip`, open **Terminal**, then:

```bash
cd ~/Downloads/nabil-portfolio        # adjust to where you unzipped it
npm install
npm run dev                            # open http://localhost:3000
```

Before deploying, also run:

```bash
npm run typecheck
npm run build
```

## Add your real content

Everything personal lives in a few files — you never need to touch components.

| What | Where |
| --- | --- |
| Name, intro, philosophy, **skills**, domain | `data/profile.ts` |
| **Email, GitHub, LinkedIn, YouTube** (one place, used everywhere) | the `links` block at the top of `data/profile.ts` — currently temporary working destinations |
| **Resume** | `public/resume.pdf` is currently a **dummy CV** (clearly marked "SAMPLE CV"). Replace it with your real PDF using the same filename; visitors download it as `A-R-Nabil-CV.pdf` |
| **Projects** (3–5 shown) | `data/projects.ts` — set `placeholder: false`, add `githubUrl` / `liveUrl` |
| **Project screenshots** | the 3 images in `public/images/projects/` are **dummy thumbnails** — replace them and update `screenshot` / `screenshots` in `data/projects.ts` |
| **Education** dates / institutions | `data/education.ts` |
| **Certificates** | `data/certifications.ts` (+ images/logos in `public/certificates/`) — currently **dummy** entries with fictional issuers |
| **Avatar** | `public/images/avatar.webp` — see "Replacing the avatar" |

Rules built in: empty email/social URLs and `null` project/credential links render as inert, labelled text —
never as fake links. Set `resumeAvailable: false` in `data/profile.ts` if you ever want the Resume button disabled. Placeholder projects are
marked "Sample" on the site, show a banner on their page, and are excluded from the sitemap.

### Replacing the avatar

The hero avatar is a local transparent WebP illustration: `public/images/avatar.webp` (shown by `components/Avatar.tsx`).

- **Use your own artwork:** replace `public/images/avatar.webp` with your file. A transparent PNG/WebP also works —
  save it in `public/images/` and change the `src` default in `components/Avatar.tsx` and the thumbnail source in `components/DigitalIDCard.tsx`.
- Best results: transparent background, upper body with folded arms, bottom edge cut flat, roughly 400×440 ratio.
- The same image is cropped into the small thumbnail on the ID card, so a face near the top works best.

## Contact form

`app/api/contact/route.ts` sends mail through [Resend](https://resend.com):

1. Create a Resend account, verify a sending domain, create an API key.
2. Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.

Without these, visitors see an honest "not connected" message plus a `mailto:` link (needs `contact.email` set).
The form never shows a fake success. It has validation, a honeypot field and basic rate limiting
(in-memory, so best-effort on serverless).

## Deploy to Vercel

1. Create a GitHub repo and push the project (`git init && git add . && git commit -m "init" && git push`).
2. Go to https://vercel.com → **Add New → Project** → import the repo (Next.js is auto-detected).
3. Under **Environment Variables** add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
4. Click **Deploy**.
5. Set `siteUrl` in `data/profile.ts` to your live domain, commit and push (updates the sitemap/metadata).

## Project structure

```
app/            layout, home page, /projects/[slug], /api/contact, robots, sitemap, error/loading/not-found
components/     Navbar, Hero, Avatar, DigitalIDCard, About, ProjectGallery,
                ProjectCard3D, Education, Certifications, CertificateCard, Contact, ContactForm, Footer, …
data/           profile.ts, projects.ts, education.ts, certifications.ts
hooks/          useActiveSection, useMedia, useScrollReveal
lib/            types.ts
public/         resume.pdf (dummy CV - replace), images/ (avatar.webp, projects/ dummy thumbnails), certificates/
```

## Not yet tested / needs external things

- Install, type-check, production build, browser rendering, responsive layout, Lighthouse scores — **not run**.
- Hero layout, ID card animation/tilt, GSAP scroll animations, mobile menu — written but **not seen in a browser**. (The avatar SVG itself was rendered and checked.)
- Contact email delivery needs your Resend credentials.
- No Open Graph share image (add `app/opengraph-image.png` if you want one).
- Dependency versions are ranges chosen for compatibility but never resolved here.
