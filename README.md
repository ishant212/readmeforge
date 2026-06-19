# 🔨 ReadMeForge

> A README builder that actually writes its own README. Irony acknowledged.

![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-black?style=flat-square&logo=framer)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)

---

## 📌 Overview

ReadMeForge is a visual, drag-and-drop README builder for developers. Pick your sections, fill in your content, reorder them, and get a production-ready `README.md` in seconds — no markdown knowledge required.

It scores your README in real time, suggests what's missing, and auto-generates a Table of Contents. Built for speed and shipped as a free tool.

---

## 🌐 Live Demo

**[readmeforge.vercel.app](https://readmeforge-ten.vercel.app/)**

---

## ✨ Features

### Builder
- 12 section types: Badges, About, Features, Tech Stack, Installation, Usage, Folder Structure, API Reference, Screenshots, Contributing, License, Contact
- Toggle each section on/off — only enabled sections appear in the output
- Drag-and-drop reordering: the markdown output updates instantly to match

### Live Preview
- Full GitHub-style markdown rendering side-by-side with the builder
- Auto-generated Table of Contents, always in sync with section order
- Content changes flash the corresponding preview block for instant visual feedback

### README Score Card
- Live 0–100 score based on completeness rules (badges, installation, screenshots, license, etc.)
- Top 3 actionable suggestions shown above the section list
- Score updates as you type

### Export
- **Copy Markdown** — copies the full output to clipboard with a clipboard-to-checkmark animation
- **Download README.md** — downloads the file with the exact filename `README.md`

### UX Details
- Empty state when no sections are enabled — friendly prompt in both panels
- Smooth animate-in/out when toggling sections (Framer Motion `AnimatePresence`)
- Anime.js micro-interactions: header glow on load, copy icon morph, download press feedback
- Responsive layout: panels stack vertically on mobile, drag works via touch
- Accessible: visible focus rings, `<label>` on all inputs, WCAG-compliant contrast in dark mode

---

## 🛠 Tech Stack

| Technology | Role |
|---|---|
| React 18 + TypeScript | Core framework + type safety |
| Vite | Build toolchain |
| Tailwind CSS | Styling (dark mode default) |
| Framer Motion | Layout animations, AnimatePresence |
| Anime.js | Micro-interaction animations |
| @dnd-kit | Drag-and-drop reordering |
| react-markdown + remark-gfm | GitHub-style markdown rendering |

---

## 🚀 Running Locally

### Prerequisites

- Node.js 18+
- npm 9+

### Steps

```bash
# Clone the repo
git clone https://github.com/ishant212/readmeforge
cd readmeforge

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run preview
```

---

## 🗂 Folder Structure

```
readmeforge/
│
├── src/
│   ├── components/
│   │   ├── layout/         ← TopBar, Footer, BuilderPanel, PreviewPanel
│   │   ├── sections/       ← One component per section type (12 total)
│   │   └── ui/             ← Button, Toggle, Card
│   │
│   ├── types/
│   │   └── section.ts      ← Section, SectionType interfaces
│   │
│   ├── utils/
│   │   ├── markdownGenerator.ts  ← Pure functions, one per section type
│   │   └── scoreReadme.ts        ← Scoring rules + suggestions
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── public/
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 📐 Architecture Notes

**Single source of truth.** The `sections: Section[]` array in `App.tsx` drives everything: the builder form, the drag-reorder list, the markdown generator, the score card, and the preview. Reordering the array is sufficient to reorder the rendered output.

**Pure markdown generation.** `generateMarkdown()` is a pure function — no side effects, no state. Each section type has its own small generator function. Easy to test, easy to extend.

**Score card as a rule table.** `scoreReadme()` takes the sections array and runs it against a static array of `{ check, points, label }` rules. Adding a new rule is one line. Suggestions are unmet rules, sorted by impact, top 3 shown.

---

## ⚠️ Known Limitations

- No backend — all state is in-memory and lost on page refresh (by design; this is a generation tool, not a persistence tool)
- Image URLs in the Screenshots section are taken as-is; no upload or hosting is provided
- The license badge in the Badges section auto-merges with the license selected in the License section — if both are enabled, the badge appears once

---

## 👤 Author

**Ishant Shekhar Eeshu**
[GitHub](https://github.com/ishant212) · ishant212@example.com

---

> Built for Digital Heroes · [digitalheroesco.com](https://digitalheroesco.com)
