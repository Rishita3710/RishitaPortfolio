import { site } from "../data/site";

// The list of jobs (used on the Home page and on the Experience page).
// Edit the jobs in src/data/site.js -> experience.
export default function ExperienceList() {
  return (
    <ol className="space-y-4">
      {site.experience.map((e) => (
        <li key={e.role + e.company} className="card-box">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold">{e.role} <span className="font-normal text-muted">· {e.company}</span></h3>
            <span className="text-sm text-muted">{e.period}</span>
          </div>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] text-muted">
            {e.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </li>
      ))}
    </ol>
  );
}