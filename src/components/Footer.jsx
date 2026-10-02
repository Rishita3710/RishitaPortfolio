import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
import { site } from "../data/site";
import TechGarden from "./TechGarden";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="px-6">
        <p className="cta-text">
          {site.ctaLines.map((line) => <span key={line} className="block">{line}</span>)}
        </p>
        <Link to="/contact" className="btn btn-secondary mt-9 !px-7 !py-4 !text-base">
          Let&rsquo;s Talk <FiArrowRight />
        </Link>
        <p className="mt-9 text-[15px] text-muted">
          Made with <FaHeart className="mx-1 inline -translate-y-px text-[#f3a6c4]" aria-label="love" /> and creativity by{" "}
          <span className="logo !text-[1.55rem] align-middle text-ink">{site.handle}</span>
        </p>
      </div>

      <TechGarden />
    </footer>
  );
}