# All code in one file

Create each file at the path shown (same folders), then run `npm install` and `npm run dev`.
Also add to the `public` folder: `banner.jpg` (your banner), `photo.jpg` (your profile photo), `resume.pdf`, and copy `photo-placeholder.svg` from the zip (any square images work).
For Netlify also create `public/_redirects` containing:  `/*  /index.html  200`

---

## `package.json`

```json
{
  "name": "my-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "motion": "^12.19.2",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.6.3"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.11",
    "@vitejs/plugin-react": "^4.5.2",
    "tailwindcss": "^4.1.11",
    "vite": "^7.0.0"
  }
}
```

---

## `vite.config.js`

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

---

## `vercel.json`

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## `index.html`

```html
<!doctype html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>Your Name — Software Engineer</title>
    <meta name="description" content="Software engineer building fast, friendly and thoughtful web products." />
    <meta name="theme-color" content="#0a0a0a" />
    <meta property="og:title" content="Your Name — Software Engineer" />
    <meta property="og:description" content="Software engineer building fast, friendly and thoughtful web products." />
    <meta property="og:type" content="website" />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌸</text></svg>" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600&family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

    <!-- Apply the saved (or system) theme BEFORE first paint so there is no flash -->
    <script>
      (function () {
        try {
          var t = localStorage.getItem("theme");
          if (t !== "dark" && t !== "light") {
            t = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
          }
          document.documentElement.dataset.theme = t;
          var m = document.querySelector('meta[name="theme-color"]');
          if (m) m.setAttribute("content", t === "dark" ? "#0a0a0a" : "#f4f4f5");
        } catch (e) {}
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## `src/main.jsx`

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

---

## `src/App.jsx`

```jsx
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ThemeRope from "./components/ThemeRope";
import HireBoard from "./components/HireBoard";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Designs from "./pages/Designs";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <ThemeRope />
      <HireBoard />
      <div className="frame">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/designs" element={<Designs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
```

---

## `src/index.css`

```css
@import "tailwindcss";

/* Dark mode is switched by <html data-theme="dark"> (set by src/lib/theme.js) */
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

/* =========================================================
   COLOURS — edit these to restyle the whole site
   ========================================================= */
:root, [data-theme="light"] {
  --bg: #f4f4f5;        /* page outside the centre column */
  --frame: #ffffff;     /* the centre column */
  --card: #f7f7f8;
  --card-2: #efeff1;
  --ink: #0f0f10;
  --muted: #6b6b73;
  --line: #e4e4e7;
  --dash: #d4d4d8;      /* dashed column borders */
  --brand: #d6336c;
}
[data-theme="dark"] {
  --bg: #0a0a0a;
  --frame: #121212;
  --card: #171717;
  --card-2: #1f1f1f;
  --ink: #f5f5f5;
  --muted: #8c8c93;
  --line: #262626;
  --dash: #2f2f2f;
  --brand: #e0407d;
}

@theme inline {
  --color-page: var(--bg);
  --color-frame: var(--frame);
  --color-card: var(--card);
  --color-card2: var(--card-2);
  --color-ink: var(--ink);
  --color-muted: var(--muted);
  --color-line: var(--line);
  --color-dash: var(--dash);
  --color-brand: var(--brand);
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-display: "DM Serif Display", Georgia, serif;
  --font-script: "Caveat", cursive;
}

html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  transition: background-color .35s ease, color .35s ease;
}
:focus-visible { outline: 2px solid var(--brand); outline-offset: 3px; border-radius: 10px; }
::selection { background: var(--brand); color: #fff; }

/* =========================================================
   THEME SWITCH — circular reveal (View Transitions API)
   ========================================================= */
::view-transition-old(root),
::view-transition-new(root) { animation: none; mix-blend-mode: normal; }
::view-transition-old(root) { z-index: 1; }
::view-transition-new(root) { z-index: 2; }

/* =========================================================
   LAYOUT
   ========================================================= */
/* the centred column with dashed side borders */
.frame {
  max-width: 800px; margin: 0 auto; min-height: 100vh;
  padding: 88px 32px 0; background: var(--frame);
  border-left: 1px dashed var(--dash); border-right: 1px dashed var(--dash);
  transition: background-color .35s ease, border-color .35s ease;
}
@media (max-width: 640px) {
  .frame { padding: 80px 16px 0; border-left-width: 0; border-right-width: 0; }
}

.nav-bg {
  background: color-mix(in srgb, var(--frame) 72%, transparent);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid color-mix(in srgb, var(--line) 60%, transparent);
  transition: background-color .35s ease;
}
.logo { font-family: var(--font-script); font-size: 1.9rem; font-weight: 500; line-height: 1; display: inline-block; transform: skewX(-6deg); letter-spacing: .01em; }

.display { font-family: var(--font-display); font-weight: 400; letter-spacing: -0.035em; line-height: 1.05; }
.section { margin-top: 84px; }
.section > h2 { font-size: 2.15rem; margin-bottom: 26px; }
.lead { color: var(--muted); font-size: 1.06rem; line-height: 1.85; }
.lead + .lead { margin-top: 18px; }

.btn { display: inline-flex; align-items: center; gap: 8px; border-radius: 999px; padding: 12px 22px; font-weight: 500; font-size: .95rem; white-space: nowrap; transition: transform .2s ease, opacity .2s ease, background-color .3s ease; }
.btn:hover { transform: translateY(-2px); }
.btn:active { transform: scale(.96); }
.btn-primary { background: var(--ink); color: var(--frame); }
.btn-secondary { background: var(--card-2); color: var(--ink); border: 1px solid var(--line); }
@media (max-width: 480px) { .btn { padding: 10px 16px; font-size: .88rem; } }

.caret { display: inline-block; width: 2px; height: .95em; margin-left: 3px; background: currentColor; vertical-align: -0.1em; animation: blink 1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }

.dashed-card { border: 1.5px dashed var(--dash); border-radius: 28px; padding: 40px; transition: border-color .3s; }
@media (max-width: 640px) { .dashed-card { padding: 26px 22px; border-radius: 22px; } }

.card-box { background: var(--card); border: 1px solid var(--line); border-radius: 18px; padding: 22px; transition: transform .25s ease, border-color .25s ease, background-color .3s ease; }
.card-box:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--brand) 55%, var(--line)); }

/* =========================================================
   BANNER  (just an image space — see Banner.jsx)
   ========================================================= */
.banner {
  position: relative; height: clamp(150px, 27vw, 210px);
  border-radius: 20px; overflow: hidden; border: 1px solid var(--line); background: var(--card);
}
.banner-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.banner-empty {
  height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  color: var(--muted); font-size: .9rem; border: 1.5px dashed var(--dash); border-radius: 18px; margin: 8px; height: calc(100% - 16px);
}
.banner-empty code { font-size: .78rem; background: var(--card-2); padding: 2px 8px; border-radius: 6px; }

/* =========================================================
   AVATAR (your photo, circle over the banner)
   ========================================================= */
.avatar {
  position: relative; width: 104px; height: 104px; border-radius: 50%; padding: 3px;
  background: linear-gradient(135deg, #ff8fb8, #a98bff);
  box-shadow: 0 10px 28px -10px rgba(0, 0, 0, .55);
}
@media (max-width: 480px) { .avatar { width: 88px; height: 88px; } }
.avatar img { width: 100%; height: 100%; border-radius: 50%; border: 3px solid var(--frame); object-fit: cover; background: var(--card-2); transition: border-color .35s; }

/* =========================================================
   THEME PILL SWITCH (navbar)
   ========================================================= */
.switch { position: relative; width: 72px; height: 36px; flex: none; border-radius: 999px; border: 1px solid var(--line); background: var(--card-2); cursor: pointer; padding: 0; transition: background-color .3s, border-color .3s; }
.switch-knob { position: absolute; top: 3px; left: 3px; width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; background: var(--ink); color: var(--frame); transition: left .35s cubic-bezier(.5, 1.5, .5, 1), background-color .3s; }
[data-theme="dark"] .switch-knob { left: calc(100% - 31px); }
.switch-knob svg { position: absolute; transition: transform .45s cubic-bezier(.5, 1.6, .4, 1), opacity .3s; }
.switch-knob .i-moon { opacity: 0; transform: rotate(-70deg) scale(.4); }
[data-theme="dark"] .switch-knob .i-sun  { opacity: 0; transform: rotate(70deg) scale(.4); }
[data-theme="dark"] .switch-knob .i-moon { opacity: 1; transform: none; }

/* =========================================================
   ROPES — theme pull-cord (left) and HIRE ME board (right)
   They hang from the bottom edge of the navbar (the nav sits on top and hides
   the first few pixels). On wide screens they live in the empty side margins and
   stay fixed; on small screens they hang over the top corners and scroll away.
   ========================================================= */
.rope-anchor { position: absolute; top: 60px; z-index: 40; }
.rope-left  { left: 14px; }
.rope-right { right: 14px; }
@media (min-width: 1100px) {
  .rope-anchor { position: fixed; }
  .rope-left  { left: calc(50% - 400px - 132px); }
  .rope-right { right: calc(50% - 400px - 138px); }
}

.rope-swing, .board-swing { display: flex; flex-direction: column; align-items: center; transform-origin: top center; outline: none; }
.rope-swing { animation: ropeSway 6s ease-in-out infinite alternate; }
@keyframes ropeSway { from { transform: rotate(-1.6deg); } to { transform: rotate(1.6deg); } }

.rope-line {
  display: block; width: 5px; flex: none; border-radius: 3px;
  background: repeating-linear-gradient(135deg, #cfa96c 0 3px, #8a6234 3px 6px);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, .25);
}
.rope-knob {
  position: relative; display: grid; place-items: center; flex: none;
  width: 42px; height: 42px; margin-top: -2px; border-radius: 50%; overflow: hidden;
  border: 3px solid var(--frame); background: var(--brand); color: #fff;
  box-shadow: 0 8px 18px -6px rgba(0, 0, 0, .5), inset 0 -4px 6px rgba(0, 0, 0, .15);
  cursor: grab; touch-action: none; transition: transform .2s ease;
}
.rope-knob:active { cursor: grabbing; }
.rope-knob:hover { transform: scale(1.06); }

.board-swing { animation: boardSway 5s ease-in-out infinite alternate; }
.board-swing:hover, .board-swing:focus-visible { animation: boardSwing 1.4s ease-in-out infinite alternate; }
@keyframes boardSway { from { transform: rotate(-3deg); } to { transform: rotate(3deg); } }
@keyframes boardSwing { from { transform: rotate(-9deg); } to { transform: rotate(9deg); } }
.board-strings { display: block; width: 96px; height: 22px; margin-top: -1px; }
.board {
  position: relative; display: grid; place-items: center; flex: none;
  width: 96px; height: 40px; border-radius: 8px;
  color: #fff6e6; font-weight: 700; font-size: .8rem; letter-spacing: .12em;
  border: 2px solid #7a5028;
  background: repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 2px, transparent 2px 9px), linear-gradient(180deg, #cf9d66, #a8763f);
  box-shadow: 0 8px 18px -8px rgba(0, 0, 0, .55), inset 0 2px 0 rgba(255, 255, 255, .28);
  text-shadow: 0 1px 0 rgba(0, 0, 0, .35);
}
.board::before, .board::after { /* nails */
  content: ""; position: absolute; top: 4px; width: 5px; height: 5px; border-radius: 50%;
  background: #4a2e14; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .3);
}
.board::before { left: 9px; }
.board::after  { right: 9px; }
@media (max-width: 1099px) {   /* smaller board on phones/tablets so it doesn't hide the banner */
  .board { width: 78px; height: 34px; font-size: .68rem; }
  .board::before { left: 7px; } .board::after { right: 7px; }
  .board-strings { width: 78px; height: 18px; }
}

/* =========================================================
   TECH STACK — filter tabs + pills that play a note on hover
   ========================================================= */
.stack-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px 20px;
  margin: 0 -32px 26px; padding: 18px 32px; border-top: 1px dashed var(--dash); border-bottom: 1px dashed var(--dash); }
.stack-head h2 { font-size: 2.15rem; }
.hint { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .72rem; letter-spacing: .04em; color: var(--muted); opacity: .8; }
.stack-tabs { display: flex; flex-wrap: wrap; gap: 4px; }
.stack-tabs button { padding: 9px 18px; border-radius: 12px; border: 1px solid transparent; font-weight: 500; font-size: .92rem; color: var(--muted); transition: color .2s ease, background-color .2s ease, border-color .2s ease; }
.stack-tabs button:hover { color: var(--ink); }
.stack-tabs button.on { color: var(--ink); background: var(--card-2); border-color: var(--line); }
.stack-grid { display: flex; flex-wrap: wrap; gap: 12px; }
.stack-pill { display: inline-flex; align-items: center; gap: 10px; padding: 12px 18px; border-radius: 12px; background: var(--card); border: 1px dashed var(--line);
  font-size: 1.02rem; color: var(--muted); cursor: default; outline: none;
  transition: transform .2s cubic-bezier(.3,1.6,.5,1), color .2s ease, border-color .2s ease, background-color .3s ease, box-shadow .2s ease; }
.stack-pill svg { color: var(--muted); transition: color .2s ease, transform .25s ease; }
.stack-pill:hover, .stack-pill:focus-visible { transform: translateY(-4px) scale(1.04); color: var(--ink); border-style: solid; border-color: var(--c);
  box-shadow: 0 8px 22px -10px var(--c); }
.stack-pill:hover svg, .stack-pill:focus-visible svg { color: var(--c); transform: rotate(-8deg) scale(1.12); }
@media (max-width: 640px) { .stack-head { margin: 0 -16px 22px; padding: 16px; } .stack-pill { padding: 10px 14px; font-size: .95rem; } }

/* =========================================================
   CONNECT CARD  (GitHub graph + social buttons)
   ========================================================= */
.gh-scroll { overflow-x: auto; padding-bottom: 6px; scrollbar-width: none; }
.gh-scroll::-webkit-scrollbar { display: none; }
.gh-grid { display: grid; grid-template-rows: repeat(7, 10px); grid-auto-flow: column; grid-auto-columns: 10px; gap: 3px; width: max-content; }
.gh-cell { width: 10px; height: 10px; border-radius: 2px; background: var(--card-2); }
.gh-cell.l1 { background: color-mix(in srgb, var(--brand) 28%, var(--card-2)); }
.gh-cell.l2 { background: color-mix(in srgb, var(--brand) 50%, var(--card-2)); }
.gh-cell.l3 { background: color-mix(in srgb, var(--brand) 75%, var(--card-2)); }
.gh-cell.l4 { background: var(--brand); }
.social-btn { display: inline-flex; align-items: center; gap: 10px; padding: 14px 22px; border-radius: 16px; background: var(--card); border: 1px solid var(--line); font-weight: 500; font-size: .95rem; transition: transform .2s ease, border-color .2s ease, background-color .3s ease; }
.social-btn:hover { transform: translateY(-3px); border-color: var(--brand); }

/* =========================================================
   FOOTER  (call to action, floating hearts, pixel animals)
   ========================================================= */
.site-footer { border-top: 1px solid var(--line); background: var(--bg); text-align: center; padding-top: 64px; overflow: hidden; transition: background-color .35s ease, border-color .35s ease; }
.cta-text { font-family: var(--font-display); font-style: italic; font-size: clamp(1.7rem, 5vw, 2.45rem); line-height: 1.2; letter-spacing: -0.01em; }
.heart-field { position: relative; height: 262px; margin-top: 28px; }
.fheart { position: absolute; bottom: 90px; color: var(--brand); opacity: 0; animation: heartUp var(--d) ease-in infinite; animation-delay: var(--dl); }
@keyframes heartUp {
  0%   { transform: translateY(0) scale(.7); opacity: 0; }
  15%  { opacity: .85; }
  100% { transform: translateY(-170px) translateX(var(--x)) scale(1.05); opacity: 0; }
}
.zoo { position: absolute; left: 50%; bottom: 18px; transform: translateX(-50%); display: flex; align-items: flex-end; width: min(94vw, 640px); justify-content: center; }
.pets-img { display: block; width: min(92vw, 640px); height: auto; animation: hop 2.4s ease-in-out infinite; }
.pet { width: clamp(38px, 9.2vw, 74px); flex: none; image-rendering: pixelated; animation: hop 2.4s ease-in-out infinite; animation-delay: var(--dl); cursor: pointer; }
.pet:hover { animation: hopHigh .5s ease-out; }
@keyframes hop { 0%, 70%, 100% { transform: translateY(0); } 80% { transform: translateY(-9px); } 90% { transform: translateY(0); } }
@keyframes hopHigh { 50% { transform: translateY(-26px) rotate(-6deg); } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
}
```

---

## `src/data/site.js`

```js
// =========================================================
//  EDIT YOUR DETAILS HERE — the whole site reads from this file.
//  Wrap words in **double stars** to make them bold/white in paragraphs.
// =========================================================
export const site = {
  handle: "yourname",              // script logo, top-left
  name: "Your Name",
  roles: ["Software Engineer", "Full-stack Developer", "Problem Solver"], // typewriter line
  meta: "21, India",               // small grey line under the name

  email: "you@example.com",
  photo: "/photo.jpg",             // YOUR profile photo: put it in /public (square works best)
  petsImage: "/pets.png",          // ONE transparent image with all your pets (footer). Missing file = drawn pixel animals
  banner: "/banner.jpg",           // your banner image: put it in /public (or change this path)
  githubUser: "your-username",     // used for the contribution graph (public profile)
  github: "https://github.com/your-username",
  youtube: "https://youtube.com/@your-channel",
  instagram: "https://instagram.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-username",
  twitter: "https://x.com/your-username",
  resume: "/resume.pdf",           // put your PDF in /public as resume.pdf

  nav: [
    { label: "Home", to: "/" },
    { label: "Projects", to: "/projects" },
    { label: "Designs", to: "/designs" },
    { label: "Blog", to: "/blog" },
  ],
  talkLabel: "let's talk",

  primaryCta: { label: "View Designs", to: "/designs" },
  secondaryCta: { label: "View Resume", href: "/resume.pdf" },

  aboutTitle: "Who is Your Name?",
  about: [
    "I build products that feel **effortless to use and enjoyable to interact with**. From the first wireframe to the final line of code, I enjoy shaping digital experiences where **thoughtful design and engineering work as one**.",
    "Currently working as a **software engineer**, I spend most of my time designing interfaces, building them with **modern frontend tools**, and **obsessing over the little details** that make a product memorable.",
  ],

  // name must exist in the ICONS map in src/components/TechStack.jsx.
  // cat = which filter tab it belongs to: "Frontend" | "Backend" | "Design" | "Tools"
  // (the hover sound is picked from the category + the position in this list)
  skills: [
    { name: "JavaScript", cat: "Frontend" },
    { name: "TypeScript", cat: "Frontend" },
    { name: "React", cat: "Frontend" },
    { name: "Next.js", cat: "Frontend" },
    { name: "Tailwind CSS", cat: "Frontend" },
    { name: "HTML5", cat: "Frontend" },
    { name: "CSS3", cat: "Frontend" },
    { name: "Redux", cat: "Frontend" },
    { name: "Framer Motion", cat: "Design" },
    { name: "Figma", cat: "Design" },
    { name: "Node.js", cat: "Backend" },
    { name: "Express.js", cat: "Backend" },
    { name: "MongoDB", cat: "Backend" },
    { name: "PostgreSQL", cat: "Backend" },
    { name: "JWT", cat: "Backend" },
    { name: "Git", cat: "Tools" },
    { name: "GitHub", cat: "Tools" },
    { name: "Vercel", cat: "Tools" },
    { name: "Docker", cat: "Tools" },
    { name: "Postman", cat: "Tools" },
    { name: "Axios", cat: "Tools" },
  ],

  ctaLines: ["Have an idea?", "Let's build something together."], // big line above the footer

  freelanceTitle: "Freelancing",
  freelance: [
    "I'm a freelance **full-stack developer** who transforms ideas into **fast, polished products**. From landing pages to complete web apps, I handle design, development and deployment.",
    "Have a project in mind? Let's build something great together.",
  ],

  projects: [
    {
      title: "Project One",
      description: "One line about what it does and who it is for. Add a real number if you have one.",
      tags: ["React", "Node.js", "PostgreSQL"],
      live: "https://example.com",
      code: "https://github.com/your-username/project-one",
    },
    {
      title: "Project Two",
      description: "Another highlight. Keep it to two lines: the idea, your role, the stack.",
      tags: ["Next.js", "TypeScript", "Tailwind"],
      live: "https://example.com",
      code: "https://github.com/your-username/project-two",
    },
    {
      title: "Project Three",
      description: "A third project. Delete the live link if it is not deployed yet.",
      tags: ["React", "Express", "MongoDB"],
      live: "",
      code: "https://github.com/your-username/project-three",
    },
  ],

  // Designs page: add screenshots to /public/designs/ and set image: "/designs/one.png"
  designs: [
    { title: "Landing page concept", tag: "Web", image: "" },
    { title: "Mobile app UI", tag: "App", image: "" },
    { title: "Dashboard design", tag: "Web", image: "" },
    { title: "Brand kit", tag: "Branding", image: "" },
    { title: "Portfolio redesign", tag: "Web", image: "" },
    { title: "Icon set", tag: "Icons", image: "" },
  ],

  // Blog page: link each post to Medium, Dev.to, Hashnode, Notion...
  posts: [
    { title: "How I built this portfolio", date: "Sep 2026", summary: "The tools, the mistakes and what I would do differently.", href: "" },
    { title: "Things I learned shipping my first product", date: "Aug 2026", summary: "A short list of lessons from launch week.", href: "" },
  ],
};
```

---

## `src/lib/sound.js`

```js
// Sounds are generated in code with the Web Audio API — no audio files needed.

let ctx = null;
let on = (() => {
  try { return localStorage.getItem("sound") !== "off"; } catch { return true; }
})();
const listeners = new Set();

export const isSoundOn = () => on;
export const subscribeSound = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export function setSoundOn(value) {
  on = value;
  try { localStorage.setItem("sound", value ? "on" : "off"); } catch { /* private mode */ }
  listeners.forEach((fn) => fn());
  if (value) playPop();
}

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

// one soft "bloop" that glides from one pitch to another
function tone(c, { from, to, start = 0, dur = 0.18, type = "sine", vol = 0.12 }) {
  const t = c.currentTime + start;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, t);
  osc.frequency.exponentialRampToValueAtTime(to, t + dur);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(vol, t + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain).connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

// airy whoosh that follows the circular reveal
function whoosh(c, up) {
  const t = c.currentTime;
  const len = c.sampleRate * 0.6;
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 1.2;
  filter.frequency.setValueAtTime(up ? 400 : 2400, t);
  filter.frequency.exponentialRampToValueAtTime(up ? 2400 : 400, t + 0.55);
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.06, t + 0.12);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
  src.connect(filter).connect(gain).connect(c.destination);
  src.start(t);
}

export function playThemeSound(toDark) {
  if (!on) return;
  const c = getCtx();
  if (!c) return;
  if (toDark) {            // to night: low and sleepy
    tone(c, { from: 520, to: 260, dur: 0.22 });
    tone(c, { from: 390, to: 196, start: 0.07, dur: 0.3, vol: 0.09 });
  } else {                 // to day: bright and sparkly
    tone(c, { from: 392, to: 784, dur: 0.2 });
    tone(c, { from: 784, to: 1175, start: 0.08, dur: 0.28, vol: 0.09 });
    tone(c, { from: 1175, to: 1568, start: 0.16, dur: 0.3, vol: 0.05, type: "triangle" });
  }
  whoosh(c, !toDark);
}

// tiny "click" when the rope is pulled far enough
export function playTick() {
  if (!on) return;
  const c = getCtx();
  if (!c) return;
  tone(c, { from: 1400, to: 700, dur: 0.05, type: "square", vol: 0.04 });
}

export function playPop() {
  if (!on) return;
  const c = getCtx();
  if (!c) return;
  tone(c, { from: 500, to: 1000, dur: 0.12, vol: 0.1 });
  tone(c, { from: 900, to: 1500, start: 0.06, dur: 0.14, vol: 0.06, type: "triangle" });
}

// ---------------------------------------------------------------
// Tech-stack hover sounds. Every tech gets its own note:
//   category  -> the "instrument" (timbre + octave)
//   position  -> which note of a pentatonic scale, so any run of hovers sounds musical.
// ---------------------------------------------------------------
const PENTA = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21];   // semitones above the base note
const VOICES = {
  Frontend: { base: 523.25, type: "sine",     dur: 0.38, vol: 0.10, overtone: 2 },      // clear bell
  Backend:  { base: 196.0,  type: "triangle", dur: 0.30, vol: 0.14, overtone: 0.5 },    // deep wood
  Design:   { base: 1046.5, type: "sine",     dur: 0.45, vol: 0.07, overtone: 1.5 },    // sparkle chime
  Tools:    { base: 349.23, type: "square",   dur: 0.12, vol: 0.035, overtone: 0 },     // short pluck
};
let lastStack = 0;

export function playStack(cat, index = 0) {
  if (!on) return;
  const now = performance.now();
  if (now - lastStack < 60) return;      // don't machine-gun when the mouse sweeps across
  lastStack = now;
  const c = getCtx();
  if (!c) return;
  const v = VOICES[cat] || VOICES.Frontend;
  const f = v.base * Math.pow(2, PENTA[index % PENTA.length] / 12);
  tone(c, { from: f * 1.01, to: f, dur: v.dur, type: v.type, vol: v.vol });
  if (v.overtone) tone(c, { from: f * v.overtone, to: f * v.overtone, start: 0.01, dur: v.dur * 0.7, type: "sine", vol: v.vol * 0.4 });
}
```

---

## `src/lib/theme.js`

```js
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
```

---

## `src/components/Navbar.jsx`

```jsx
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
          <NavLink to="/contact" className={linkClass}>{site.talkLabel}</NavLink>
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
            {[...site.nav, { label: site.talkLabel, to: "/contact" }].map((l) => (
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
```

---

## `src/components/ThemeSwitch.jsx`

```jsx
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
```

---

## `src/components/SoundToggle.jsx`

```jsx
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
```

---

## `src/components/ThemeRope.jsx`

```jsx
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
```

---

## `src/components/HireBoard.jsx`

```jsx
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
```

---

## `src/components/Banner.jsx`

```jsx
import { useState } from "react";
import { FiImage } from "react-icons/fi";
import { site } from "../data/site";

// A plain space for YOUR banner image.
// Save your picture in the  public  folder as  banner.jpg  (any size, around 1500 x 420 looks great)
// or change the path in  src/data/site.js  ->  banner.
// Until the file exists, a placeholder box is shown.
export default function Banner() {
  const [ok, setOk] = useState(true);
  return (
    <div className="banner">
      {ok ? (
        <img src={site.banner} alt="" className="banner-img" onError={() => setOk(false)} />
      ) : (
        <div className="banner-empty">
          <FiImage size={26} />
          <p>Your banner image goes here</p>
          <code>public/banner.jpg</code>
        </div>
      )}
    </div>
  );
}
```

---

## `src/components/Avatar.jsx`

```jsx
import { useState } from "react";
import { site } from "../data/site";

// Round profile photo over the banner.
// Put your photo in the  public  folder as  photo.jpg  (square works best, ~600 x 600),
// or change the path in  src/data/site.js -> photo.
// Until the file exists, a simple placeholder is shown.
export default function Avatar() {
  const [src, setSrc] = useState(site.photo);
  return (
    <div className="avatar">
      <img
        src={src}
        alt={site.name}
        width="104"
        height="104"
        onError={() => src !== "/photo-placeholder.svg" && setSrc("/photo-placeholder.svg")}
      />
    </div>
  );
}
```

---

## `src/components/Hero.jsx`

```jsx
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
```

---

## `src/components/TechStack.jsx`

```jsx
import { useMemo, useState } from "react";
import {
  SiAxios, SiCss, SiDocker, SiExpress, SiFigma, SiFramer, SiGit, SiGithub, SiHtml5, SiJavascript,
  SiJsonwebtokens, SiMongodb, SiNextdotjs, SiNodedotjs, SiPostgresql, SiPostman, SiReact, SiRedux,
  SiTailwindcss, SiTypescript, SiVercel,
} from "react-icons/si";
import { site } from "../data/site";
import { playStack } from "../lib/sound";

// name (as written in src/data/site.js) -> [icon, hover colour].
// Icons are grey until you hover them. Need another? Import it from "react-icons/si" and add a line.
const INK = "var(--ink)";
const ICONS = {
  JavaScript: [SiJavascript, "#f7df1e"],
  TypeScript: [SiTypescript, "#3b82f6"],
  React: [SiReact, "#61dafb"],
  "Next.js": [SiNextdotjs, INK],
  "Tailwind CSS": [SiTailwindcss, "#38bdf8"],
  HTML5: [SiHtml5, "#e34f26"],
  CSS3: [SiCss, "#1572b6"],
  Redux: [SiRedux, "#764abc"],
  "Framer Motion": [SiFramer, "#ff4fd8"],
  Figma: [SiFigma, "#f24e1e"],
  "Node.js": [SiNodedotjs, "#5fa04e"],
  "Express.js": [SiExpress, INK],
  MongoDB: [SiMongodb, "#47a248"],
  PostgreSQL: [SiPostgresql, "#4169e1"],
  JWT: [SiJsonwebtokens, "#d63aff"],
  Git: [SiGit, "#f05032"],
  GitHub: [SiGithub, INK],
  Vercel: [SiVercel, INK],
  Docker: [SiDocker, "#2496ed"],
  Postman: [SiPostman, "#ff6c37"],
  Axios: [SiAxios, "#7c5cff"],
};

const TABS = ["All", "Frontend", "Backend", "Design", "Tools"];

export default function TechStack() {
  const [tab, setTab] = useState("All");

  // remember each tech's position inside its own category -> that decides its note
  const items = useMemo(() => {
    const seen = {};
    return site.skills.map((s) => {
      const i = (seen[s.cat] = (seen[s.cat] ?? -1) + 1);
      return { ...s, i };
    });
  }, []);
  const shown = items.filter((s) => tab === "All" || s.cat === tab);

  return (
    <section className="section" id="stack">
      <div className="stack-head">
        <h2 className="display !mb-0 flex items-baseline gap-3">
          Tech Stack <span className="hint">( hover to play )</span>
        </h2>
        <div className="stack-tabs" role="tablist" aria-label="Filter tech stack">
          {TABS.map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <ul className="stack-grid">
        {shown.map((s) => {
          const [Icon, color] = ICONS[s.name] || [null, INK];
          const play = () => playStack(s.cat, s.i);
          return (
            <li
              key={s.name}
              className="stack-pill"
              style={{ "--c": color }}
              tabIndex={0}
              onPointerEnter={play}
              onFocus={play}
              onClick={play}
            >
              {Icon && <Icon size={19} />}
              {s.name}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
```

---

## `src/components/ProjectCard.jsx`

```jsx
import { FiExternalLink, FiGithub } from "react-icons/fi";

export default function ProjectCard({ project }) {
  return (
    <article className="card-box flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li key={t} className="rounded-full border border-line bg-card2 px-3 py-1 text-xs font-medium text-muted">{t}</li>
          ))}
        </ul>
      </div>
      <div className="mt-5 flex gap-5 text-sm font-medium">
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-brand">
            Live <FiExternalLink size={14} />
          </a>
        )}
        {project.code && (
          <a href={project.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-brand">
            Code <FiGithub size={14} />
          </a>
        )}
      </div>
    </article>
  );
}
```

---

## `src/components/Connect.jsx`

```jsx
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
```

---

## `src/components/GitHubActivity.jsx`

```jsx
import { useEffect, useRef, useState } from "react";
import { site } from "../data/site";

// Real GitHub contribution graph. It reads your PUBLIC profile through a free
// community API (github-contributions-api.jogruber.de) — no token needed.
// Set your username in src/data/site.js -> githubUser. If it can't load,
// an empty graph is shown so the layout never breaks.

const BLANK = Array.from({ length: 371 }, () => ({ level: 0, count: 0 }));

export default function GitHubActivity() {
  const [data, setData] = useState(null);
  const scroller = useRef(null);
  const placeholder = !site.githubUser || site.githubUser === "your-username";

  useEffect(() => {
    if (placeholder) return;
    let live = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${site.githubUser}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => live && setData(j))
      .catch(() => {});
    return () => { live = false; };
  }, [placeholder]);

  // show the newest weeks first on small screens
  useEffect(() => {
    if (scroller.current) scroller.current.scrollLeft = scroller.current.scrollWidth;
  }, [data]);

  const days = data?.contributions ?? BLANK;
  const offset = data ? new Date(days[0].date + "T00:00:00").getDay() : 0; // start on the right weekday row
  const total = data?.total?.lastYear ?? data?.total?.[Object.keys(data.total)[0]] ?? 0;

  return (
    <div>
      <div ref={scroller} className="gh-scroll" aria-label="GitHub contributions">
        <div className="gh-grid">
          {Array.from({ length: offset }).map((_, i) => <span key={`o${i}`} />)}
          {days.map((d, i) => <span key={i} className={`gh-cell l${d.level}`} title={d.date ? `${d.count} on ${d.date}` : undefined} />)}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[13px] text-muted">
        <span>
          {data ? `${total} contributions in the last year` : placeholder ? "Add your GitHub username in site.js" : "Loading contributions…"}
        </span>
        <span className="flex items-center gap-1.5">
          Less
          {[0, 1, 2, 3, 4].map((l) => <span key={l} className={`gh-cell l${l}`} />)}
          More
        </span>
      </div>
    </div>
  );
}
```

---

## `src/components/PixelPets.jsx`

```jsx
import { useState } from "react";
import { site } from "../data/site";

// A row of tiny pixel animals. Each one is drawn from a grid of letters:
//   "." = empty, every other letter = a colour from that animal's palette.
// Want a different animal? Copy one block, change the letters/colours.
// (All 12 x 12, all original — draw your own with the same idea.)

const PETS = [
  { name: "Cat",
    pal: { b: "#3b3445", w: "#ffffff", e: "#1a1620", p: "#ffa7b8" },
    rows: [
      "bb........bb",
      "bbb......bbb",
      "bbbbbbbbbbbb",
      "bbbbbbbbbbbb",
      "bbebbbbbbebb",
      "bbbbbwwbbbbb",
      "bpbbwwwwbbpb",
      "bbbwwwwwwbbb",
      ".bbwwwwwwbb.",
      ".bwwwwwwwwb.",
      ".bwwwwwwwwb.",
      ".bb.bwwb.bb.",
    ] },
  { name: "Kitten",
    pal: { o: "#ffb86b", w: "#ffffff", e: "#3a2a26", p: "#ff9fb2", r: "#ff7d94" },
    rows: [
      "oo........oo",
      "owo......owo",
      "owoooooooowo",
      "oooooooooooo",
      "ooeooooooeoo",
      "oppowwwwoppo",
      "owwwwrrwwwwo",
      ".owwwwwwwwo.",
      ".owwwwwwwwo.",
      ".owwwwwwwwo.",
      ".owwwwwwwwo.",
      ".oo.oooo.oo.",
    ] },
  { name: "Puppy",
    pal: { d: "#a8672f", l: "#e0a468", e: "#2d1d14", n: "#2d1d14", p: "#ff9aa8" },
    rows: [
      "............",
      "dd........dd",
      "ddd.dddd.ddd",
      "dddddddddddd",
      "ddeddddddedd",
      "dddllllllddd",
      "ddlllnnlllld",
      "ddllllpplldd",
      ".dddllllddd.",
      "..dddddddd..",
      "..dddddddd..",
      "..dd.dd.dd..",
    ] },
  { name: "Frog",
    pal: { g: "#78d36f", d: "#4a9f48", w: "#ffffff", e: "#1d2a1d", p: "#ff9ab0", y: "#e9f7a8" },
    rows: [
      "..ww....ww..",
      ".weew..weew.",
      ".gwwggggwwg.",
      "gggggggggggg",
      "gpggggggggpg",
      "gggggggggggg",
      "gddddddddddg",
      "gggggggggggg",
      ".gyyyyyyyyg.",
      ".gyyyyyyyyg.",
      ".gggggggggg.",
      ".dd.dddd.dd.",
    ] },
  { name: "Dino",
    pal: { g: "#9ee07a", d: "#6cbf53", e: "#1d2a1d", p: "#ff9ab0", w: "#f4ffd9" },
    rows: [
      "...gggggg...",
      "..gggggggg..",
      "..ggeggegg..",
      "..gpggggpg..",
      "..gggggggg..",
      "d.gwwwwwwg.d",
      "dgggwwwwgggd",
      ".ggggwwgggg.",
      ".gggggggggg.",
      "..gggggggg..",
      "..gg.gg.gg..",
      "..dd.dd.dd..",
    ] },
  { name: "Lion",
    pal: { m: "#b9722a", y: "#ffd25e", e: "#2d1d14", n: "#2d1d14", p: "#ff9aa8", w: "#fff6d8" },
    rows: [
      "..mmmmmmmm..",
      ".mmmmmmmmmm.",
      "mmmyyyyyymmm",
      "mmyyyyyyyymm",
      "mmyeyyyyeymm",
      "mmpyyyyyypmm",
      "mmyyynnyyymm",
      "mmyywwwwyymm",
      ".mmywwwwymm.",
      ".mmyyyyyymm.",
      "..mmmmmmmm..",
      "..yy.yy.yy..",
    ] },
  { name: "Elephant",
    pal: { g: "#d8dce6", s: "#aeb4c4", e: "#2b2a36", p: "#ffb0c0", w: "#ffffff" },
    rows: [
      "sss.gggg.sss",
      "ssssggggssss",
      "sssggggggsss",
      "sssgegggegss",
      ".sggggggggs.",
      "..gpggggpg..",
      "...gggggg...",
      "....gggg....",
      "....gggg....",
      "....gsgg....",
      "...gggggg...",
      "..gg....gg..",
    ] },
];

function Sprite({ pet, delay }) {
  const rows = pet.rows.map((r) => r.padEnd(12, ".").slice(0, 12));
  return (
    <svg
      className="pet"
      viewBox="0 0 12 12"
      shapeRendering="crispEdges"
      style={{ "--dl": `${delay}s` }}
      role="img"
      aria-label={pet.name}
    >
      <ellipse cx="6" cy="11.8" rx="5" ry=".45" fill="#000" opacity=".25" />
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) =>
          ch !== "." && pet.pal[ch] ? <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={pet.pal[ch]} /> : null
        )
      )}
    </svg>
  );
}

// Your own picture of all the pets in ONE image (transparent background, PNG or WebP):
// save it as  public/pets.png  (or change  petsImage  in src/data/site.js).
// If that file doesn't exist, the little animals drawn above are shown instead.
export default function PixelPets() {
  const [imgOk, setImgOk] = useState(Boolean(site.petsImage));
  if (imgOk) {
    return (
      <div className="zoo">
        <img src={site.petsImage} alt="" className="pets-img" onError={() => setImgOk(false)} />
      </div>
    );
  }
  return (
    <div className="zoo">
      {PETS.map((p, i) => <Sprite key={p.name} pet={p} delay={i * 0.35} />)}
    </div>
  );
}
```

---

## `src/components/Footer.jsx`

```jsx
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
import { site } from "../data/site";
import PixelPets from "./PixelPets";

// little hearts that float up behind the animals (fixed positions so it looks the same every load)
const HEARTS = [
  { l: 14, s: 14, d: 7, dl: 0, x: 18 }, { l: 27, s: 11, d: 9, dl: -3, x: -14 }, { l: 39, s: 16, d: 8, dl: -5, x: 10 },
  { l: 52, s: 12, d: 10, dl: -1, x: -20 }, { l: 63, s: 18, d: 8.5, dl: -6, x: 16 }, { l: 74, s: 13, d: 9.5, dl: -2, x: -10 },
  { l: 85, s: 15, d: 7.5, dl: -4, x: 12 },
];

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

      <div className="heart-field" aria-hidden="true">
        {HEARTS.map((h, i) => (
          <FaHeart key={i} className="fheart" size={h.s} style={{ left: `${h.l}%`, "--d": `${h.d}s`, "--dl": `${h.dl}s`, "--x": `${h.x}px` }} />
        ))}
        <PixelPets />
      </div>
    </footer>
  );
}
```

---

## `src/components/Rich.jsx`

```jsx
// Turns "some **bold** text" into text with <strong> parts.
export default function Rich({ text }) {
  return text.split("**").map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold text-ink">{part}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}
```

---

## `src/pages/Home.jsx`

```jsx
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { site } from "../data/site";
import Hero from "../components/Hero";
import Rich from "../components/Rich";
import TechStack from "../components/TechStack";
import ProjectCard from "../components/ProjectCard";
import Connect from "../components/Connect";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section" id="about">
        <h2 className="display">{site.aboutTitle}</h2>
        {site.about.map((p) => (
          <p key={p} className="lead"><Rich text={p} /></p>
        ))}
      </section>

      <TechStack />

      <section className="section" id="freelancing">
        <h2 className="display">{site.freelanceTitle}</h2>
        <div className="dashed-card">
          {site.freelance.map((p) => (
            <p key={p} className="lead"><Rich text={p} /></p>
          ))}
          <Link to="/contact" className="btn btn-primary mt-7">
            {site.talkLabel} <FiArrowRight />
          </Link>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="display !mb-0">Projects</h2>
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-brand">
            View all <FiArrowRight />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {site.projects.slice(0, 2).map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>
      </section>

      <Connect />
      <div className="h-24" />
    </>
  );
}
```

---

## `src/pages/Projects.jsx`

```jsx
import { site } from "../data/site";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <section>
      <h1 className="display text-5xl">Projects</h1>
      <p className="lead mt-4">Things I've built recently. Click through for the live site or the code.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {site.projects.map((p) => <ProjectCard key={p.title} project={p} />)}
      </div>
    </section>
  );
}
```

---

## `src/pages/Designs.jsx`

```jsx
import { site } from "../data/site";

// A clean grid of design work. Add images to /public/designs/ and set `image` in site.js.
const GRADIENTS = [
  "linear-gradient(135deg,#ff9fc6,#a98bff)",
  "linear-gradient(135deg,#a9d4ff,#ffe0ec)",
  "linear-gradient(135deg,#ffd0a6,#ff8fb8)",
  "linear-gradient(135deg,#b7f0d0,#7bb8ff)",
  "linear-gradient(135deg,#d6c2ff,#ffc4dc)",
  "linear-gradient(135deg,#ffe08a,#ff9fc6)",
];

export default function Designs() {
  return (
    <section>
      <h1 className="display text-5xl">Designs</h1>
      <p className="lead mt-4">A collection of interfaces, concepts and experiments.</p>
      <div className="mt-10 grid grid-cols-2 gap-4">
        {site.designs.map((d, i) => (
          <figure key={d.title} className="card-box !p-0 overflow-hidden">
            {d.image ? (
              <img src={d.image} alt={d.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
            ) : (
              <div className="aspect-[4/3] w-full" style={{ background: GRADIENTS[i % GRADIENTS.length] }} aria-hidden="true" />
            )}
            <figcaption className="flex items-center justify-between gap-2 px-4 py-3">
              <span className="text-sm font-medium">{d.title}</span>
              <span className="rounded-full border border-line bg-card2 px-2.5 py-0.5 text-xs text-muted">{d.tag}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
```

---

## `src/pages/Blog.jsx`

```jsx
import { FiArrowUpRight } from "react-icons/fi";
import { site } from "../data/site";

export default function Blog() {
  return (
    <section>
      <h1 className="display text-5xl">Blog</h1>
      <p className="lead mt-4">Notes on building, learning and shipping.</p>
      <div className="mt-10 flex flex-col gap-4">
        {site.posts.map((p) => {
          const Tag = p.href ? "a" : "div";
          return (
            <Tag
              key={p.title}
              {...(p.href ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : {})}
              className="card-box block"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-muted">{p.date}</p>
                  <h2 className="mt-1 text-lg font-semibold">{p.title}</h2>
                  <p className="mt-2 text-[15px] text-muted">{p.summary}</p>
                </div>
                {p.href && <FiArrowUpRight className="mt-1 shrink-0 text-muted" size={20} />}
              </div>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
```

---

## `src/pages/Contact.jsx`

```jsx
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
```
