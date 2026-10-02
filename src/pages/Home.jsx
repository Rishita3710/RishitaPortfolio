import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { site } from "../data/site";
import Hero from "../components/Hero";
import Rich from "../components/Rich";
import TechStack from "../components/TechStack";
import ProjectCard from "../components/ProjectCard";
import ExperienceList from "../components/ExperienceList";
import Connect from "../components/Connect";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section" id="about">
        <h2 className="display">{site.aboutTitle}</h2>
        {site.about.map((p) => (
          <p key={p} className="lead"><Rich text={p} /></p>
        ))}
      </section>

      <TechStack />

            <section className="section" id="experience">
        <h2 className="display">Experience</h2>
        <ExperienceList />
      </section>

      <section className="section" id="freelancing">
        <h2 className="display">{site.freelanceTitle}</h2>
        <div className="dashed-card">
          {site.freelance.map((p) => (
            <p key={p} className="lead"><Rich text={p} /></p>
          ))}
          <Link to="/contact" className="btn btn-primary mt-7">
            {site.talkLabel} <FiArrowRight />
          </Link>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="display !mb-0">Projects</h2>
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-brand">
            View all <FiArrowRight />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {site.projects.slice(0, 2).map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>
      </section>

      <Connect />
      <div className="h-24" />
    </>
  );
}
