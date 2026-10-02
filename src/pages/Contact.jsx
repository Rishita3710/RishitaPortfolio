import { useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { site } from "../data/site";

// The form opens the visitor's email app with the message filled in (no backend needed).
// To send straight from the page instead, plug in EmailJS or Formspree inside submit().
export default function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio message from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field = "w-full rounded-xl border border-line bg-card px-4 py-3 text-[15px] outline-none transition placeholder:text-muted focus:border-brand";

  return (
    <section>
      <h1 className="display text-5xl">{site.talkLabel.charAt(0).toUpperCase() + site.talkLabel.slice(1)}</h1>
      <p className="lead mt-4">Open to full-time roles, freelance work and collaborations. Say hello!</p>

      <form onSubmit={submit} className="dashed-card mt-10 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Name</span>
          <input name="name" required className={field} placeholder="Jane Doe" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Email</span>
          <input name="email" type="email" required className={field} placeholder="jane@company.com" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Message</span>
          <textarea name="message" required rows={5} className={field} placeholder="Tell me about your project..." />
        </label>
        <button type="submit" className="btn btn-primary">Send message</button>
        {sent && <p className="text-sm text-muted">Your email app should open with the message ready to send.</p>}
      </form>

      <div className="mt-8 flex flex-wrap items-center gap-5 text-lg">
        <a href={`mailto:${site.email}`} className="text-base font-medium hover:text-brand">{site.email}</a>
        <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-brand"><FaGithub /></a>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-brand"><FaLinkedin /></a>
        <a href={site.twitter} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="hover:text-brand"><FaTwitter /></a>
      </div>
    </section>
  );
}
