import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { site } from "../data/site";
import ThemeSwitch from "./ThemeSwitch";
import SoundToggle from "./SoundToggle";

const linkClass = ({ isActive }) =>
  `relative py-1 text-[15px] transition-colors hover:text-ink ${
    isActive ? "text-ink after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-brand" : "text-muted"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="nav-bg fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:px-8">
        <Link to="/" className="logo" aria-label="Home">{site.handle}</Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {site.nav.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>{l.label}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <SoundToggle />
          <ThemeSwitch />
          <button
            className="ml-1 grid h-9 w-9 place-items-center rounded-full text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-frame px-6 pb-5 pt-3 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1">
              {site.nav.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) => `rounded-xl px-3 py-3 text-base ${isActive ? "bg-card2 text-ink" : "text-muted"}`}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
