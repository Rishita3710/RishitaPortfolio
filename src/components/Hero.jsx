import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { site } from "../data/site";
import Banner from "./Banner";
import Avatar from "./Avatar";

// types a word, holds, erases it, then moves to the next one
function useTypewriter(words) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0, i = 0, dir = 1, timer;
    setText("");
    const tick = () => {
      const word = words[w];
      if (dir === 1) {
        i++;
        setText(word.slice(0, i));
        if (i === word.length) { dir = -1; timer = setTimeout(tick, 1500); return; }
        timer = setTimeout(tick, 90);
      } else {
        i--;
        setText(word.slice(0, i));
        if (i === 0) { dir = 1; w = (w + 1) % words.length; timer = setTimeout(tick, 350); return; }
        timer = setTimeout(tick, 45);
      }
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [words]);
  return text;
}

export default function Hero() {
  const role = useTypewriter(site.roles);
  return (
    <div>
      <Banner />

      <div className="flex items-start justify-between gap-3">
        <div className="-mt-12 ml-5 sm:-mt-14"><Avatar /></div>
        <div className="mt-4 flex flex-wrap justify-end gap-2.5">
          <Link to={site.primaryCta.to} className="btn btn-primary">
            {site.primaryCta.label} <FiArrowRight />
          </Link>
          <a href={site.secondaryCta.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            {site.secondaryCta.label} <FiArrowRight />
          </a>
        </div>
      </div>

      <h1 className="display mt-6 flex items-center gap-2.5 text-[2.5rem] sm:text-5xl">
        {site.name}
        <MdVerified size={26} className="mt-1 shrink-0 text-[#1d9bf0]" aria-label="Verified" />
      </h1>
      <p className="mt-2 min-h-[2.6rem] text-[1.9rem] font-medium leading-tight text-brand sm:text-[2.1rem]" aria-label={site.roles.join(", ")}>
        {role}
        <span className="caret" aria-hidden="true" />
      </p>
      <p className="mt-1.5 text-[15px] text-muted">{site.meta}</p>
    </div>
  );
}
