# Ally Descoteaux — Personal Homepage

**Author:** Ally Descoteaux  
**Class:** CSE 110 — Software Engineering  
**License:** MIT

---

## Project Objective

Personal homepage built with vanilla HTML5, CSS3, and ES6+ JavaScript modules. No frameworks, no jQuery, no component libraries. The design takes a brutalist editorial magazine aesthetic — ruled lines, condensed type, asymmetric layouts — rather than the typical portfolio grid.

---

## Screenshot

> *(Add after deploying — screenshot of index.html)*

---

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `index.html` | Masthead, hero, about, experience table, projects, terminal |
| Projects | `pages/projects.html` | Full project list with live tag filtering |
| AI-generated | `pages/wrapped.html` | GitHub Wrapped — AI-analyzed commit data *(to add)* |

---

## Creative Feature

An **interactive terminal** in the "ask me anything" section — visitors type commands to learn about me:

`about` · `skills` · `experience` · `projects` · `education` · `interests` · `contact` · `whoami` · `clear`

Easter eggs: `git log`, `git status`, `sudo`, `hire`, `coffee`, `ls`, `pwd`, `cd projects`

Arrow keys navigate command history. Built entirely in vanilla ES6 (`js/terminal.js`).

---

## Project Structure

```
ally-homepage/
├── index.html
├── pages/
│   ├── projects.html
│   └── wrapped.html        ← AI-generated page (to add)
├── css/
│   ├── styles.css          ← global design tokens & shared components
│   ├── home.css            ← homepage layout
│   └── projects.css        ← projects page layout
├── js/
│   ├── main.js             ← ES6 entry point
│   ├── nav.js              ← mobile nav toggle
│   ├── ticker.js           ← infinite ticker duplication
│   ├── counters.js         ← scroll-triggered animated counters
│   ├── timeline.js         ← staggered row reveal
│   ├── terminal.js         ← interactive terminal (creative feature)
│   └── projects.js         ← projects page entry + filter
├── images/
│   └── favicon.svg
├── package.json
├── eslint.config.js        # ESLint flat config (includes Prettier rules)
├── LICENSE
└── README.md
```

---

## Setup

```bash
npm install

# Run locally
npm run dev        # live-server at localhost:3000
# or
npm start          # serve at localhost:3000

# Format
npm run format

# Lint
npm run lint
```

**Deploy:** GitHub Pages, Vercel, or Netlify — all work with static files.

---

## GenAI Tools Used

**Model:** Claude Sonnet 4.6 (Anthropic)

**Used for:** Full code generation — HTML, CSS, and JS modules — based on my personal information and a brutalist editorial design direction I specified.

**Prompts (paraphrased):**
- "Build a personal homepage with a brutalist editorial magazine aesthetic — ruled lines, condensed type, newspaper columns, asymmetric layout. Light theme on a warm paper background."
- "Redo the styling completely — it's too common of an AI setup."
- "Update bio: finished BS April 2026, finishing Plus One MSCS at Northeastern in April 2027."

**How I used it:** AI scaffolded all files. I reviewed content for accuracy, edited the bio and experience to match my actual background, adjusted copy to sound like me, and tested the terminal commands. All real project links and employer names are mine.

---

## Rubric Checklist

- [x] ES6 modules (`type="module"` in HTML + `"type": "module"` in package.json)
- [x] No jQuery, no component libraries
- [x] CSS, JS, Images in separate folders
- [x] Meta: author, description, icon
- [x] Original JS feature >5 lines, no libraries (terminal.js, ~120 lines)
- [x] Prettier formatted
- [x] W3C compliant — validate at validator.w3.org
- [x] ESLint config present
- [x] All images have alt attributes
- [x] 2+ HTML pages at different URLs
- [x] CSS classes used throughout
- [x] Semantic HTML only (no div-buttons etc.)
- [x] Clean CSS, no `!important`
- [x] Flexbox and CSS Grid used
- [x] MIT License
- [x] package.json with all dependencies
- [x] GenAI usage documented above
