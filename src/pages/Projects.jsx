import { site } from "../data/site";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <section>
      <h1 className="display text-5xl">Projects</h1>
      <p className="lead mt-4">Things I've built recently. Click through for the live site or the code.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {site.projects.map((p) => <ProjectCard key={p.title} project={p} />)}
      </div>
    </section>
  );
}
