import { useEffect, useRef, useState } from "react";
import {
  SiReact, SiJavascript, SiMongodb, SiNodedotjs, SiGit, SiGithub, SiTypescript, SiNextdotjs,
  SiTailwindcss, SiExpress, SiHtml5, SiCss, SiFigma, SiDocker, SiPostgresql, SiVercel,
} from "react-icons/si";
import { FaJava, FaHeart } from "react-icons/fa6";
import { playStack } from "../lib/sound";

// TECH GARDEN: real tech logos "growing" on stems.
// Edit this list to add/remove/reorder plants:  [name, icon, colour]
// "var(--ink)" = black in light mode, white in dark mode.
// Any icon from "react-icons/si" works: import it above and add a line here.
const PLANTS = [
  ["React", SiReact, "#61dafb"],
  ["JavaScript", SiJavascript, "#f7df1e"],
  ["Java", FaJava, "#f89820"],
  ["MongoDB", SiMongodb, "#47a248"],
  ["Node.js", SiNodedotjs, "#5fa04e"],
  ["Git", SiGit, "#f05032"],
  ["GitHub", SiGithub, "var(--ink)"],
  ["TypeScript", SiTypescript, "#3178c6"],
  ["Next.js", SiNextdotjs, "var(--ink)"],
  ["Tailwind CSS", SiTailwindcss, "#38bdf8"],
  ["Express", SiExpress, "var(--ink)"],
  ["HTML5", SiHtml5, "#e34f26"],
  ["CSS3", SiCss, "#1572b6"],
  ["Figma", SiFigma, "#f24e1e"],
  ["Docker", SiDocker, "#2496ed"],
  ["PostgreSQL", SiPostgresql, "#4169e1"],
  ["Vercel", SiVercel, "var(--ink)"],
].slice(0, 14);                                  // how many to show (change 14)

// background decoration (fixed positions so it looks the same every load)
const SPARKLES = [[6, 12, 12, 0], [17, 58, 8, 1.2], [29, 22, 10, 2.1], [41, 70, 7, .6], [53, 14, 12, 1.7], [64, 52, 9, 2.6], [76, 20, 8, .9], [88, 62, 12, 1.4], [94, 18, 7, 2.3]];
const FLOWERS  = [[10, 38, 18, "#ffb7d5"], [24, 8, 14, "#ffd9a8"], [36, 46, 16, "#d8c4ff"], [58, 36, 14, "#ffb7d5"], [70, 6, 18, "#c9ecff"], [84, 40, 16, "#ffd9a8"], [95, 64, 14, "#d8c4ff"]];
const DOTS     = [[8, 66, 0], [20, 30, 1.5], [33, 80, .8], [47, 24, 2.2], [60, 72, 1.1], [72, 34, 2.8], [86, 78, .4], [92, 28, 1.9]];
const HEARTS   = [[14, 14, 7, 0, 18], [32, 11, 9, -3, -14], [48, 16, 8, -5, 10], [66, 12, 10, -1, -20], [81, 15, 8.5, -6, 16]];

function Flower({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="12" cy="6.2" rx="3.6" ry="5.2" fill={color} transform={`rotate(${a} 12 12)`} opacity=".9" />
      ))}
      <circle cx="12" cy="12" r="3" fill="#fff6c9" />
    </svg>
  );
}

export default function TechGarden() {
  const ref = useRef(null);
  const [grown, setGrown] = useState(false);

  // plants pop up when the garden scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setGrown(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGrown(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`garden ${grown ? "grown" : ""}`}>
      {/* soft pastel background */}
      <div className="garden-bg" aria-hidden="true">
        {SPARKLES.map(([l, t, s, d], i) => <span key={"s" + i} className="gsparkle" style={{ left: `${l}%`, top: `${t}%`, width: s, height: s, animationDelay: `${d}s` }} />)}
        {FLOWERS.map(([l, t, s, c], i) => <span key={"f" + i} className="gflower" style={{ left: `${l}%`, top: `${t}%`, animationDelay: `${i * .7}s` }}><Flower size={s} color={c} /></span>)}
        {DOTS.map(([l, t, d], i) => <span key={"d" + i} className="gdot" style={{ left: `${l}%`, top: `${t}%`, animationDelay: `${d}s` }} />)}
        {HEARTS.map(([l, s, dur, dl, x], i) => (
          <FaHeart key={"h" + i} className="fheart" size={s + 4} style={{ left: `${l}%`, "--d": `${dur}s`, "--dl": `${dl}s`, "--x": `${x}px` }} />
        ))}
      </div>

      <ul className="plants">
        {PLANTS.map(([name, Icon, color], i) => (
          <li key={name} className="plant" style={{ "--i": i, "--c": color, "--lift": `${[0, 22, 8, 30, 14, 26, 4][i % 7]}px` }}>
            <button
              type="button"
              className="plant-tile"
              aria-label={name}
              onPointerEnter={() => playStack(["Frontend", "Backend", "Design", "Tools"][i % 4], i)}
              onFocus={() => playStack("Frontend", i)}
            >
              <Icon size={30} />
              <span className="plant-name">{name}</span>
            </button>
            <svg className="stem" viewBox="0 0 24 60" aria-hidden="true">
              <path d="M12 0 C 10 20, 14 40, 12 60" stroke="#8fd3a4" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              <path d="M12 38 C 4 36, 2 28, 3 24 C 10 25, 12 31, 12 38Z" fill="#a8e0b6" />
              <path d="M12 46 C 20 44, 22 36, 21 32 C 14 33, 12 39, 12 46Z" fill="#bfe9c9" />
            </svg>
          </li>
        ))}
      </ul>
      <div className="garden-ground" aria-hidden="true" />
    </div>
  );
}