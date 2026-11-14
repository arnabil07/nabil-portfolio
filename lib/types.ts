export interface SocialLink {
  label: "GitHub" | "LinkedIn" | "YouTube";
  /** Leave empty until you supply the real URL — empty links render as inert text. */
  url: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Profile {
  name: string;
  displayName: string;
  title: string;
  tagline: string;
  greeting: string;
  availability: { label: string; available: boolean };
  location: string;
  speciality: string;
  interests: string;
  status: string;
  idNumber: string;
  about: string[];
  aboutTags: [string, string];
  philosophy: string;
  interestList: string[];
  skills: SkillGroup[];
  contact: {
    heading: string;
    highlightWord: string;
    intro: string;
    email: string;
    github: string;
    linkedin: string;
  };
  social: SocialLink[];
  resumePath: string;
  /** Set true once public/resume.pdf really exists. */
  resumeAvailable: boolean;
  siteUrl: string;
}

export interface Project {
  slug: string;
  name: string;
  /** true while the entry is a labelled sample, not a real project */
  placeholder: boolean;
  summary: string;
  screenshot: string | null;
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string;
  screenshots: string[];
}

export interface EducationEntry {
  id: string;
  qualification: string;
  institution: string;
  period: string;
  note?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  logo: string | null;
  /** optional image of the certificate in public/certificates/ */
  image: string | null;
  credentialUrl: string | null;
  placeholder: boolean;
}
