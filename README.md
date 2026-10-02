# Professional developer portfolio — React + Vite + Tailwind

Dark-first portfolio: fixed navbar with a script logo and a pill theme switch, a centred column with dashed borders, a banner space for your own image, your avatar overlapping it, a verified-badge name with a typewriter line, a flowing Tech Stack, a Freelancing card, projects, and pages for Projects, Designs, Blog and Contact.

## What's in it

| Feature | Where |
|---|---|
| Fixed navbar: script logo, Home / Projects / Designs / Blog / let's talk, **pill dark/light switch** (mobile menu included) | `src/components/Navbar.jsx`, `ThemeSwitch.jsx` |
| **Banner image space**: just put your own picture at `public/banner.jpg` (until then a placeholder box shows). | `src/components/Banner.jsx` |
| **Ending section**: GitHub contribution graph, social buttons, "Have an idea? Let's build something together.", Let's Talk button, "Made with ♥", floating hearts and a row of hopping pixel animals. | `Connect.jsx`, `GitHubActivity.jsx`, `Footer.jsx`, `PixelPets.jsx` |
| **Left pull-rope** hangs from the navbar. Drag the knob down and let go (or just tap it) to switch dark/light. The new theme spreads out as a circle from the knob, with a click and a sound. | `src/components/ThemeRope.jsx` |
| **Right rope with a wooden "HIRE ME" board**. It sways, swings harder on hover and links to the contact page. | `src/components/HireBoard.jsx` |
| **Your photo** in a round gradient ring over the banner. | `src/components/Avatar.jsx` |
| Name with **verified badge**, **typewriter** role line, small grey meta line | `src/components/Hero.jsx` |
| **Who is …?** paragraphs with bold highlights | `src/pages/Home.jsx` |
| **Tech Stack**: All / Frontend / Backend / Design / Tools tabs. Hover (or tap) a pill and it plays its own note: each category has its own "instrument" and every tech its own pitch. | `src/components/TechStack.jsx`, `playStack` in `src/lib/sound.js` |
| **Freelancing** dashed card | `src/pages/Home.jsx` |
| Projects, **Designs (grid)**, Blog and "let's talk" (contact form) pages | `src/pages/` |
| **Sound** on theme switch, rope and tech-stack hover (generated in code, no audio files) + a mute icon | `src/lib/sound.js` |
| **Circular reveal** when switching theme (View Transitions API), starting at the switch | `src/lib/theme.js` |
| Responsive: laptop, tablet, phone | Tailwind breakpoints |

## Tech

React 19, Vite 7, Tailwind CSS 4, react-router-dom, react-icons. Files are `.jsx` (JavaScript). No TypeScript needed.

## Files

```
portfolio-react/
├── index.html                 ← fonts, meta, sets theme before first paint
├── package.json  vite.config.js  vercel.json
├── public/
│   ├── photo-placeholder.svg  ← shown until you add photo.jpg
│   ├── photo.jpg              ← ADD: YOUR profile photo, square ~600×600
│   ├── banner.jpg             ← YOUR banner image (any size, around 1500 x 420 looks best)
│   ├── resume.pdf             ← ADD: your resume
│   ├── designs/               ← OPTIONAL: screenshots for the Designs page
│   └── _redirects             ← Netlify: makes /contact etc. work after refresh
└── src/
    ├── main.jsx  App.jsx
    ├── index.css              ← ★ colours (light + dark) and all custom styling
    ├── data/site.js           ← ★ YOUR CONTENT: name, roles, links, text, skills, projects, designs, posts
    ├── lib/sound.js  theme.js
    ├── components/
    │   Navbar  ThemeSwitch  SoundToggle  ThemeRope  HireBoard
    │   Banner  Avatar  Hero
    │   TechStack  ProjectCard  Connect  GitHubActivity  PixelPets  Footer  Rich
    └── pages/  Home  Projects  Designs  Blog  Contact
```

## Install and run

Needs Node.js 18+ (https://nodejs.org).

```bash
cd portfolio-react
npm install
npm run dev          # http://localhost:5173
npm run build        # creates dist/ for deployment
```

## Make it yours

1. **`src/data/site.js`** — change everything there: logo text (`handle`), name, typewriter `roles`, `meta` line, links, About text, skills, Freelancing text, projects, designs, blog posts. Put `**double stars**` around words you want bold/white.
2. **`public/photo.jpg`** — your profile photo (square works best). It shows directly in the round avatar. Different file name? Change `photo` in `src/data/site.js`.
3. **`public/banner.jpg`** — your banner image. Any picture or GIF works; if it has another name or extension, change `banner` in `src/data/site.js`.
   - **GitHub graph:** set `githubUser` in `site.js` to your GitHub username (profile must be public). Social buttons use `github`, `youtube`, `instagram`, `twitter`, `linkedin` from the same file; delete a link and its button disappears.
   - **Pixel animals:** each is a 12 x 12 grid of letters in `PixelPets.jsx`. Change letters/colours to redesign them, or delete a block to remove one.
4. **`public/resume.pdf`** — your resume.
5. **Colours** — top of `src/index.css` (`--bg`, `--frame`, `--brand` ...). Light and dark are separate blocks.
6. **Nav labels / buttons** — `nav`, `primaryCta`, `secondaryCta`, `talkLabel` in `site.js`.
7. **Skill icons** — every name in `skills` must exist in the `ICONS` map in `TechStack.jsx`. Add more by importing from `react-icons/si`.
8. **No sound?** Delete `<SoundToggle />` in `Navbar.jsx`.
9. **Ropes:** in `ThemeRope.jsx` change `BASE` (rope length), `MAX` and `TRIGGER` (how far you must pull). The board text is in `HireBoard.jsx`; its colours and size are in the ROPES block of `src/index.css`. To remove a rope, delete its line in `App.jsx`. The pill switch in the navbar does the same job as the left rope, so you can delete `<ThemeSwitch />` from `Navbar.jsx` if you only want the rope.

On screens 1100px and wider the ropes hang in the empty side margins and stay in place while you scroll. On smaller screens they hang over the top corners and scroll away with the page.

The contact form opens the visitor's email app with the message ready. To send from the page itself, plug EmailJS or Formspree into `submit()` in `src/pages/Contact.jsx`.

## Deploy (free)

**Vercel:** push to GitHub → vercel.com → *Add New Project* → import → *Deploy* (Vite is detected automatically).
**Netlify:** *Add new site → Import from Git*; build `npm run build`, publish `dist`.
**GitHub Pages:** set `base: "/repo-name/"` in `vite.config.js` and use `HashRouter` instead of `BrowserRouter` in `main.jsx`.

## Notes

- The circular theme reveal needs View Transitions (Chrome/Edge 111+, Safari 18+, Firefox 144+). Other browsers switch theme without the reveal.
- Everything here (code, banner, text, avatar) is original; replace the placeholder text with your own.


### Changing the tech stack
In `src/data/site.js` the `skills` list is `{ name, cat }`. `cat` is one of Frontend / Backend / Design / Tools and picks the filter tab. The icon comes from the `ICONS` map in `TechStack.jsx` (add a line for a new tech). The hover sound is the category's instrument plus a note chosen by the tech's position inside its category, so just reorder the list to change the melody. Edit the instruments in `VOICES` in `sound.js`.

### Footer pets from your own image
Save ONE transparent PNG/WebP with all your pets as `public/pets.png` (or change `petsImage` in `site.js`). It replaces the drawn animals; delete the file to bring the drawn ones back. Make it about 1280 px wide, cropped tight around the pets.
