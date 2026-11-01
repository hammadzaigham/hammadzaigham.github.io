# Hammad Ahmed · Research Atlas

A research-first academic portfolio built with Astro, TypeScript, and semantic HTML/CSS. The site covers publications, projects, research appointments, honors, and an in-browser academic CV.

## Local development

Requires Node.js 24 LTS (minimum supported version: 22.23.4).

```sh
npm ci
npm run dev
```

Open the Local URL printed by Astro, normally http://localhost:4321/.

## Validation

```sh
npm run check
npm test
npm run build
npm run test:build
npm run preview
```

The source tests cover CV rendering and publication consistency. Generated-site tests check headings, IDs, internal links, assets, and anchors on both pages. Browser QA should cover 375px, 768px, 1280px, and 1600px widths, keyboard navigation, citation dialogs, and print layout.

## Content and CV

- `CV.tex` is the authoritative academic record. It remains a private build input in the repository; no TeX download is published.
- `/cv/` renders that source as readable HTML. There are no source-download or print/export controls.
- `src/lib/render-cv.ts` supports the LaTeX commands used in the document. Unknown commands deliberately fail the build instead of silently dropping content. Extend the renderer and its tests when introducing new commands.
- `src/data/researchData.ts` contains the homepage summaries. Keep authorship, status, dates, and metrics consistent with the CV.
- `src/components/ResearchFigure.astro` contains original conceptual schematics. They are not experimental figures or measured trajectories.
- The EV authentication survey is accepted, with proceedings forthcoming. DWC-FastAuth is a separate ongoing protocol investigation.

## Deployment

The GitHub Pages workflow checks, builds, and deploys pushes to `main` or `master`. Select **GitHub Actions** as the Pages source in repository settings. The workflow obtains the site origin and base path from GitHub, so user sites and project subpaths work without editing asset links.

For a manual build at a project subpath, set `SITE_URL` to the origin and `BASE_PATH` to the path (for example, `/digital-cv/`). Astro defaults to `https://hammadzaigham.github.io/`. All internal navigation, scripts, styles, and CV links respect the configured base.

## Design

See `DESIGN_BRIEF.md` and `.agents/skills/research-portfolio-design/SKILL.md`. The design uses Newsreader, IBM Plex Sans, and IBM Plex Mono, with system fallbacks when web fonts are unavailable. It honors reduced-motion preferences and includes a skip link, visible focus indicators, native citation dialogs, and a keyboard-accessible mobile menu.
