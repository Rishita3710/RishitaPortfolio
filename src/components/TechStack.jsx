import { useMemo, useState } from "react";
import {
  SiAxios, SiCss, SiDocker, SiExpress, SiFigma, SiFramer, SiGit, SiGithub, SiHtml5, SiJavascript,
  SiJsonwebtokens, SiMongodb, SiNextdotjs, SiNodedotjs, SiPostgresql, SiPostman, SiReact, SiRedux,
  SiTailwindcss, SiTypescript, SiVercel,
} from "react-icons/si";
import { site } from "../data/site";
import { playStack } from "../lib/sound";

// name (as written in src/data/site.js) -> [icon, hover colour].
// Icons are grey until you hover them. Need another? Import it from "react-icons/si" and add a line.
const INK = "var(--ink)";
const ICONS = {
  JavaScript: [SiJavascript, "#f7df1e"],
  TypeScript: [SiTypescript, "#3b82f6"],
  React: [SiReact, "#61dafb"],
  "Next.js": [SiNextdotjs, INK],
  "Tailwind CSS": [SiTailwindcss, "#38bdf8"],
  HTML5: [SiHtml5, "#e34f26"],
  CSS3: [SiCss, "#1572b6"],
  Redux: [SiRedux, "#764abc"],
  "Framer Motion": [SiFramer, "#ff4fd8"],
  Figma: [SiFigma, "#f24e1e"],
  "Node.js": [SiNodedotjs, "#5fa04e"],
  "Express.js": [SiExpress, INK],
  MongoDB: [SiMongodb, "#47a248"],
  PostgreSQL: [SiPostgresql, "#4169e1"],
  JWT: [SiJsonwebtokens, "#d63aff"],
  Git: [SiGit, "#f05032"],
  GitHub: [SiGithub, INK],
  Vercel: [SiVercel, INK],
  Docker: [SiDocker, "#2496ed"],
  Postman: [SiPostman, "#ff6c37"],
  Axios: [SiAxios, "#7c5cff"],
};

const TABS = ["All", "Frontend", "Backend", "Design", "Tools"];

export default function TechStack() {
  const [tab, setTab] = useState("All");

  // remember each tech's position inside its own category -> that decides its note
  const items = useMemo(() => {
    const seen = {};
    return site.skills.map((s) => {
      const i = (seen[s.cat] = (seen[s.cat] ?? -1) + 1);
      return { ...s, i };
    });
  }, []);
  const shown = items.filter((s) => tab === "All" || s.cat === tab);

  return (
    <section className="section" id="stack">
      <div className="stack-head">
        <h2 className="display !mb-0 flex items-baseline gap-3">
          Tech Stack <span className="hint">( hover to play )</span>
        </h2>
        <div className="stack-tabs" role="tablist" aria-label="Filter tech stack">
          {TABS.map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <ul className="stack-grid">
        {shown.map((s) => {
          const [Icon, color] = ICONS[s.name] || [null, INK];
          const play = () => playStack(s.cat, s.i);
          return (
            <li
              key={s.name}
              className="stack-pill"
              style={{ "--c": color }}
              tabIndex={0}
              onPointerEnter={play}
              onFocus={play}
              onClick={play}
            >
              {Icon && <Icon size={19} />}
              {s.name}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
