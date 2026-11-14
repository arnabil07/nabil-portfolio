import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Hero from "@/components/Hero";
import ProjectGallery from "@/components/ProjectGallery";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ProjectGallery />
      <Education />
      <Certifications />
      <Contact />
    </>
  );
}
