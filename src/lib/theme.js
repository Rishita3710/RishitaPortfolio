import { playThemeSound } from "./sound";

// Theme lives on <html data-theme="light|dark">. Tailwind's `dark:` variant and
// the CSS variables in index.css both read that attribute.
const COLORS = { light: "#f4f4f5", dark: "#0a0a0a" };
const listeners = new Set();

export const getTheme = () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
export const subscribeTheme = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

function apply(theme) {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem("theme", theme); } catch { /* private mode */ }
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", COLORS[theme]);
  listeners.forEach((fn) => fn());
}

// Switch theme. `origin` = where the circular reveal starts (the rope knob).
export async function toggleTheme(origin) {
  const next = getTheme() === "dark" ? "light" : "dark";
  playThemeSound(next === "dark");

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduce) {
    apply(next);
    return;
  }

  const x = origin?.x ?? window.innerWidth - 30;
  const y = origin?.y ?? 30;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = document.startViewTransition(() => apply(next));
  try {
    await transition.ready;
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 750, easing: "cubic-bezier(.4, 0, .2, 1)", pseudoElement: "::view-transition-new(root)" }
    );
  } catch { /* transition skipped — theme already applied */ }
}
