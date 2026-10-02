import { FaYoutube, FaInstagram, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { site } from "../data/site";
import GitHubActivity from "./GitHubActivity";

// the dashed card with the GitHub graph + social buttons
const LINKS = [
  { label: "YouTube", href: site.youtube, Icon: FaYoutube },
  { label: "Instagram", href: site.instagram, Icon: FaInstagram },
  { label: "GitHub", href: site.github, Icon: FaGithub },
  { label: "X (Twitter)", href: site.twitter, Icon: FaXTwitter },
  { label: "LinkedIn", href: site.linkedin, Icon: FaLinkedin },
];

export default function Connect() {
  return (
    <section className="section" id="connect">
      <h2 className="display">Let&rsquo;s connect</h2>
      <div className="dashed-card">
        <GitHubActivity />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {LINKS.filter((l) => l.href).map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-btn">
              <Icon size={20} /> {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
