import { Link } from "react-router-dom";

// RIGHT rope: a wooden "HIRE ME" board. It sways, swings harder on hover,
// and links to the contact page. Change the text or link here.
export default function HireBoard() {
  return (
    <div className="rope-anchor rope-right">
      <Link to="/contact" aria-label="Hire me — go to the contact page" className="board-swing">
        <span className="rope-line" style={{ height: 52 }} />
        <svg className="board-strings" viewBox="0 0 96 22" aria-hidden="true">
          <path d="M48 0 12 22M48 0 84 22" stroke="#b98b4e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
        <span className="board">HIRE ME</span>
      </Link>
    </div>
  );
}
