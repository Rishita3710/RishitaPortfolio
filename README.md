# My Portfolio

A soft, modern developer portfolio built with **React, Vite and Tailwind CSS**. It works on laptop, tablet and phone, in dark and light mode.

## Features

- **Pull-rope theme switch.** Drag the rope on the left (or tap it) to switch dark and light mode. The new theme spreads out from the knob as a circle, with a soft sound.
- **HIRE ME board** on the right-hand rope. It sways, swings on hover, and opens the Let's Talk page.
- **Banner** with a separate image for dark mode and light mode, and your profile photo over it.
- **Typewriter intro** under your name, with a verified badge.
- **Tech Stack** with All / Frontend / Backend / Design / Tools tabs. Hover a tech and it bounces and plays its own note.
- **Experience**, **Freelancing** and **Projects** sections on the Home page, plus full Experience and Projects pages.
- **Live GitHub activity graph** and social buttons.
- **Tech garden footer.** Real tech logos growing on stems, with sparkles, flowers, glowing dots and floating hearts.
- **Let's Talk page** with a contact form. It is not in the navbar. Open it from the HIRE ME board or the footer button.
- Sounds are generated in code with the Web Audio API (no audio files). Use the speaker icon in the navbar to mute.

## Tech used

React 19, Vite 7, Tailwind CSS 4, React Router 7, react-icons, Web Audio API, View Transitions API.

## Run it on your computer

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Open the link it prints (usually http://localhost:5173).

## Where to edit your content

Almost everything is in **one file: `src/data/site.js`**.

| What                           | Where in `site.js`                                                         |
| ------------------------------ | -------------------------------------------------------------------------- |
| Logo (top-left) and big name   | `handle`, `name`                                                           |
| Typewriter words               | `roles`                                                                    |
| Small grey line (age, country) | `meta`                                                                     |
| Email and social links         | `email`, `github`, `youtube`, `instagram`, `linkedin`, `twitter`           |
| GitHub activity graph          | `githubUser` (your username; profile must be public)                       |
| Navbar links                   | `nav`                                                                      |
| Buttons next to the photo      | `primaryCta`, `secondaryCta`                                               |
| About section                  | `aboutTitle`, `about` (wrap words in `**double stars**` to make them bold) |
| Tech Stack                     | `skills` (`{ name, cat }`; `cat` is Frontend, Backend, Design or Tools)    |
| Experience                     | `experience`                                                               |
| Freelancing card               | `freelanceTitle`, `freelance`                                              |
| Projects                       | `projects`                                                                 |
| Text above the footer          | `ctaLines`                                                                 |

Other places:

| What                                  | File                                                      |
| ------------------------------------- | --------------------------------------------------------- |
| Logos in the footer garden            | `src/components/TechGarden.jsx` (the `PLANTS` list)       |
| Icon for a new tech in the Tech Stack | `src/components/TechStack.jsx` (the `ICONS` list)         |
| HIRE ME board text and link           | `src/components/HireBoard.jsx`                            |
| Rope length and pull distance         | `src/components/ThemeRope.jsx` (`BASE`, `MAX`, `TRIGGER`) |
| Colours of the whole site             | top of `src/index.css`                                    |
| Hover sounds                          | `src/lib/sound.js` (`VOICES`)                             |
| Browser tab title                     | `index.html`                                              |

## Images

Put these in the `public` folder:

```
public/
  photo.jpg          your profile photo (square works best)
  banner-dark.jpg    banner shown in dark mode
  banner-light.jpg   banner shown in light mode
  resume.pdf         your resume
```

Use the exact names, or change the paths in `site.js`. Only have one banner? Save it under both names. A missing image shows a placeholder, so the page never breaks.

## Project structure

```
index.html
vercel.json              page-refresh fix for Vercel
public/                  images, resume, _redirects (Netlify)
src/
  main.jsx
  App.jsx                routes + ropes
  index.css              colours and all styles
  data/site.js           YOUR CONTENT
  lib/
    theme.js             dark/light + circular reveal
    sound.js             all sounds
  components/
    Navbar  ThemeSwitch  SoundToggle  ThemeRope  HireBoard
    Banner  Avatar  Hero  TechStack  ExperienceList
    ProjectCard  Connect  GitHubActivity  TechGarden  Footer  Rich
  pages/
    Home  Experience  Projects  Contact
```

## Deploy (free)

### Vercel (easiest)

1. Push this project to a GitHub repository. Do not upload `node_modules` or `dist`.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, click **Add New, then Project**, and pick the repository.
3. Vercel detects Vite. Keep the defaults (build command `npm run build`, output folder `dist`) and click **Deploy**.
4. You get a link like `your-name.vercel.app`. Every `git push` updates the site automatically.

### Netlify

Same steps at [netlify.com](https://netlify.com): build command `npm run build`, publish folder `dist`. The file `public/_redirects` is already set up.

## Troubleshooting

- **Placeholder box instead of my image.** The file name or folder is wrong. It must be inside `public`, not `src`.
- **Old image still shows.** Hard refresh with Ctrl + Shift + R (Cmd + Shift + R on Mac).
- **Page goes blank after editing `site.js`.** A comma or quote is missing near the lines you changed.
- **GitHub graph is empty.** Check `githubUser` is your exact username and your profile is public.
- **No sound.** Browsers allow sound only after the first click on the page. Check the speaker icon in the navbar is not muted.
- **Push to GitHub fails with `RPC failed; HTTP 400`.** Run `git config --global http.postBuffer 524288000` and push again.

## License

Use it, change it and make it yours.
