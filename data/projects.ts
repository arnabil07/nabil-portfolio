import type { Project } from "@/lib/types";

// PLACEHOLDERS ONLY — none of these are real projects.
// The thumbnails (public/images/projects/project-0X.webp) are DUMMY illustrations.
// Replace each entry (and set placeholder: false) once you have real work: put your own
// screenshots in public/images/projects/ and point `screenshot` / `screenshots` at them.
const tbc = "To be provided by A R Nabil.";

export const projects: Project[] = [
  {
    slug: "project-01",
    name: "Project 01 — Placeholder",
    placeholder: true,
    summary: "Placeholder project. Replace with a real description.",
    screenshot: "/images/projects/project-01.webp",
    technologies: ["React", "Next.js", "TypeScript"],
    githubUrl: null,
    liveUrl: null,
    overview: tbc,
    problem: tbc,
    solution: tbc,
    architecture: tbc,
    challenges: tbc,
    screenshots: ["/images/projects/project-01.webp"],
  },
  {
    slug: "project-02",
    name: "Project 02 — Placeholder",
    placeholder: true,
    summary: "Placeholder project. Replace with a real description.",
    screenshot: "/images/projects/project-02.webp",
    technologies: ["To be confirmed"],
    githubUrl: null,
    liveUrl: null,
    overview: tbc,
    problem: tbc,
    solution: tbc,
    architecture: tbc,
    challenges: tbc,
    screenshots: ["/images/projects/project-02.webp"],
  },
  {
    slug: "project-03",
    name: "Project 03 — Placeholder",
    placeholder: true,
    summary: "Placeholder project. Replace with a real description.",
    screenshot: "/images/projects/project-03.webp",
    technologies: ["To be confirmed"],
    githubUrl: null,
    liveUrl: null,
    overview: tbc,
    problem: tbc,
    solution: tbc,
    architecture: tbc,
    challenges: tbc,
    screenshots: ["/images/projects/project-03.webp"],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
