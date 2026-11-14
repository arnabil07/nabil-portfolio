import { Download } from "lucide-react";
import { profile } from "@/data/profile";

interface Props {
  className?: string;
  label?: string;
}

/** Downloads public/resume.pdf as A-R-Nabil-CV.pdf. Set resumeAvailable: false in data/profile.ts to show an honest disabled state instead. */
export default function ResumeButton({ className = "", label = "Resume" }: Props) {
  if (!profile.resumeAvailable) {
    return (
      <span
        role="link"
        aria-disabled="true"
        title="Resume not added yet — see data/profile.ts"
        className={`${className} cursor-not-allowed opacity-60`}
      >
        {label} <Download size={14} aria-hidden />
        <span className="sr-only"> (not available yet)</span>
      </span>
    );
  }
  return (
    <a href={profile.resumePath} download="A-R-Nabil-CV.pdf" className={className}>
      {label} <Download size={14} aria-hidden />
    </a>
  );
}
