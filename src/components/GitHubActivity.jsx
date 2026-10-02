import { useEffect, useRef, useState } from "react";
import { site } from "../data/site";

// Real GitHub contribution graph. It reads your PUBLIC profile through a free
// community API (github-contributions-api.jogruber.de) — no token needed.
// Set your username in src/data/site.js -> githubUser. If it can't load,
// an empty graph is shown so the layout never breaks.

const BLANK = Array.from({ length: 371 }, () => ({ level: 0, count: 0 }));

export default function GitHubActivity() {
  const [data, setData] = useState(null);
  const scroller = useRef(null);
  const placeholder = !site.githubUser || site.githubUser === "your-username";

  useEffect(() => {
    if (placeholder) return;
    let live = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/Rishita3710?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => live && setData(j))
      .catch(() => {});
    return () => { live = false; };
  }, [placeholder]);

  // show the newest weeks first on small screens
  useEffect(() => {
    if (scroller.current) scroller.current.scrollLeft = scroller.current.scrollWidth;
  }, [data]);

  const days = data?.contributions ?? BLANK;
  const offset = data ? new Date(days[0].date + "T00:00:00").getDay() : 0; // start on the right weekday row
  const total = data?.total?.lastYear ?? data?.total?.[Object.keys(data.total)[0]] ?? 0;

  return (
    <div>
      <div ref={scroller} className="gh-scroll" aria-label="GitHub contributions">
        <div className="gh-grid">
          {Array.from({ length: offset }).map((_, i) => <span key={`o${i}`} />)}
          {days.map((d, i) => <span key={i} className={`gh-cell l${d.level}`} title={d.date ? `${d.count} on ${d.date}` : undefined} />)}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[13px] text-muted">
        <span>
          {data ? `${total} contributions in the last year` : placeholder ? "Add your GitHub username in site.js" : "Loading contributions…"}
        </span>
        <span className="flex items-center gap-1.5">
          Less
          {[0, 1, 2, 3, 4].map((l) => <span key={l} className={`gh-cell l${l}`} />)}
          More
        </span>
      </div>
    </div>
  );
}
