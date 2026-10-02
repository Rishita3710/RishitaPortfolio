import { useRef } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useSyncExternalStore } from "react";
import { getTheme, subscribeTheme, toggleTheme } from "../lib/theme";

// Pill switch in the navbar. The new theme spreads out as a circle from the knob, with a sound.
export default function ThemeSwitch() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "dark");
  const ref = useRef(null);

  const onClick = () => {
    const r = ref.current.getBoundingClientRect();
    toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      role="switch"
      aria-checked={theme === "dark"}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="switch"
    >
      <span className="switch-knob">
        <FiSun size={15} className="i-sun" />
        <FiMoon size={15} className="i-moon" />
      </span>
    </button>
  );
}
