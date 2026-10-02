import { useSyncExternalStore } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { isSoundOn, setSoundOn, subscribeSound } from "../lib/sound";

// Small speaker icon. Remove <SoundToggle /> from Navbar.jsx if you don't want it.
export default function SoundToggle() {
  const on = useSyncExternalStore(subscribeSound, isSoundOn, () => true);
  return (
    <button
      onClick={() => setSoundOn(!on)}
      aria-pressed={on}
      aria-label={on ? "Sound on" : "Sound off"}
      title="Toggle sound"
      className="grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-card2 hover:text-ink"
    >
      {on ? <FiVolume2 size={17} /> : <FiVolumeX size={17} />}
    </button>
  );
}
