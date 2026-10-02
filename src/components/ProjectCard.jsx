
import { FiExternalLink, FiGithub } from "react-icons/fi";

export default function ProjectCard({ project }) {
  const statusStyles = {
    live: "bg-green-500/10 text-green-600 border-green-500/30",
    ongoing: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
    completed: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  };

  return (
    <article className="card-box flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">{project.title}</h3>

          {project.status && (
            <span
              className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium capitalize ${
                statusStyles[project.status] ||
                "bg-card2 text-muted border-line"
              }`}
            >
              <span className="mr-1.5">●</span>
              {project.status}
            </span>
          )}
        </div>

        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-line bg-card2 px-3 py-1 text-xs font-medium text-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex gap-5 text-sm font-medium">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-brand"
          >
            Live <FiExternalLink size={14} />
          </a>
        )}

        {project.code && (
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-brand"
          >
            Code <FiGithub size={14} />
          </a>
        )}
      </div>
    </article>
  );
}