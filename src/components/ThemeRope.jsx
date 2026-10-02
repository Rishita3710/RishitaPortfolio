import { useRef, useState, useSyncExternalStore } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { getTheme, subscribeTheme, toggleTheme } from "../lib/theme";
import { playTick } from "../lib/sound";

const BASE = 92;     // resting rope length (px)
const MAX = 70;      // furthest you can pull
const TRIGGER = 26;  // pull at least this far, then let go, to switch the theme

// LEFT rope. Drag the knob down and release to switch dark/light — or just tap it.
// The circular reveal starts from the knob.
export default function ThemeRope() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "dark");
  const [pull, setPull] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(null);
  const crossed = useRef(false);
  const knob = useRef(null);

  const origin = () => {
    const r = knob.current.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  const onDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    startY.current = e.clientY;
    crossed.current = false;
    setDragging(true);
  };

  const onMove = (e) => {
    if (startY.current === null) return;
    const dy = Math.max(0, Math.min(MAX, e.clientY - startY.current));
    setPull(dy);
    if (dy >= TRIGGER && !crossed.current) { crossed.current = true; playTick(); }
    if (dy < TRIGGER) crossed.current = false;
  };

  const onUp = (e) => {
    if (startY.current === null) return;
    const moved = e.clientY - startY.current;
    startY.current = null;
    setDragging(false);

    if (crossed.current) {                 // a real pull
      toggleTheme(origin());
      setPull(0);
    } else if (Math.abs(moved) < 5) {      // a simple tap: give the rope a little tug
      playTick();
      toggleTheme(origin());
      setPull(30);
      setTimeout(() => setPull(0), 160);
    } else {
      setPull(0);                          // pulled too little: spring back
    }
    crossed.current = false;
  };

  return (
    <div className="rope-anchor rope-left">
      <div className="rope-swing" style={dragging ? { animation: "none" } : undefined}>
        <span
          className="rope-line"
          style={{ height: BASE + pull, transition: dragging ? "none" : "height .6s cubic-bezier(.3,1.9,.5,1)" }}
        />
        <button
          ref={knob}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={() => { startY.current = null; setDragging(false); setPull(0); }}
          onClick={(e) => { if (e.detail === 0) toggleTheme(origin()); }}  /* keyboard: Enter / Space */
          aria-label={theme === "dark" ? "Pull to switch to light mode" : "Pull to switch to dark mode"}
          title="Pull me!"
          className="rope-knob"
        >
          <FiSun size={18} className="absolute transition-all duration-500 dark:-translate-y-6 dark:-rotate-[60deg] dark:opacity-0" />
          <FiMoon size={18} className="absolute translate-y-6 rotate-[60deg] opacity-0 transition-all duration-500 dark:translate-y-0 dark:rotate-0 dark:opacity-100" />
        </button>
      </div>
    </div>
  );
}
