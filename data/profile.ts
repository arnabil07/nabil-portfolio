import type { Profile } from "@/lib/types";

// Single source of truth for personal text. Edit here, nowhere else.
// Empty strings (email, social URLs) render as inert text, never as fake links.
// ONE place for your contact links — used by the Contact section, hero icons and footer.
// These are TEMPORARY working destinations (the sites' home pages / an example address).
// Replace them with your own details:
//   email:    "you@yourdomain.com"
//   github:   "https://github.com/<your-username>"
//   linkedin: "https://www.linkedin.com/in/<your-username>"
//   youtube:  "https://www.youtube.com/@<your-channel>"   (or "" to hide the link)
const links = {
  email: "arnabil@example.com",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  youtube: "https://www.youtube.com/",
};

export const profile: Profile = {
  name: "A R Nabil",
  displayName: "A R NABIL.",
  title: "Software Engineer",
  tagline: "Building ideas into digital experiences.",
  greeting: "HELLO, I'M",
  availability: { label: "Available for opportunities", available: true },
  location: "Liverpool, UK",
  speciality: "Software Engineering",
  interests: "Web Development & Technology",
  status: "Building & Learning",
  idNumber: "DEV-2026-001", // decorative card number only — not a real ID
  about: [
    "I'm A R Nabil, a Software Engineer passionate about building digital experiences and solving real-world problems through technology.",
    "I enjoy exploring modern technologies, developing applications and turning ideas into functional, well-designed products.",
  ],
  aboutTags: ["Curious by nature.", "Built through code."],
  // TODO: rewrite in your own words
  philosophy:
    "Good software starts with a real problem. I like to keep things simple, build in small steps and keep learning along the way.",
  interestList: ["Web development", "Modern technologies", "Application development"],
  // TODO: edit so this reflects what you actually use
  skills: [
    { label: "Languages", items: ["TypeScript", "JavaScript"] },
    { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
    { label: "Motion", items: ["GSAP", "Framer Motion"] },
    { label: "Tools", items: ["Git", "GitHub"] },
  ],
  contact: {
    heading: "Let's build something remarkable.",
    highlightWord: "remarkable",
    intro:
      "Have an idea, an opportunity or just want to connect? I'd love to hear from you.",
    email: links.email,
    github: links.github,
    linkedin: links.linkedin,
  },
  social: [
    { label: "GitHub", url: links.github },
    { label: "LinkedIn", url: links.linkedin },
    { label: "YouTube", url: links.youtube },
  ],
  resumePath: "/resume.pdf",
  resumeAvailable: true, // public/resume.pdf is currently a DUMMY CV — replace it with your real PDF (same filename)
  siteUrl: "https://example.com", // TODO: your real domain
};
