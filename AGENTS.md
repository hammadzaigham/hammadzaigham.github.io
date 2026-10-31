# Repository agent instructions — Hammad Ahmed's Research Atlas

This is a **research-first academic portfolio**, not a marketing site or generic React portfolio. The primary audiences are PhD admissions faculty, research collaborators, and technical readers.

- The source of truth for art direction, content order, design tokens and acceptance criteria is `DESIGN_BRIEF.md`. Consult the relevant section before design/architecture changes, not necessarily for trivial code edits.
- Treat CV, manuscripts, real repositories and project assets as authoritative. **Do not fabricate achievements, publication statuses, metrics, authorship, images, URLs, affiliations or project demos.** Flag missing information visibly in development and omit unverified links from the production build.
- Prioritize the home-page first impression: hero research identity, true visual artifacts, fast access to publications and CV.
- Prefer Astro static-first + TypeScript and modern semantic HTML/CSS; do not add dependency-heavy UI frameworks without a concrete need. If an existing functional site already exists, audit and build on it rather than replacing blindly.
- Use the specified restrained scientific editorial design language; one meaningful signature SVG research map, no distracting generic AI visuals.
- Design at mobile and desktop sizes concurrently; support keyboard, `prefers-reduced-motion`, semantic structure and contrast.
- Work in stages: inspect existing repo and source materials -> formulate an explicit plan -> implement -> run build/tests -> visually inspect screenshots on desktop and mobile -> repair issues -> summarize actual changes and missing content.
- Keep every interactive link and control functional. Never ship `href="#"` or dummy buttons.
- For GitHub Pages, ensure base path, static assets and deployment workflow are correct; do not assume a server-side API exists.
- Reuse the project-specific skill `.agents/skills/research-portfolio-design/SKILL.md` for new pages and large redesigns.
