---
name: research-portfolio-design
description: Design, implement, and review Hammad Ahmed's research-first academic portfolio for GitHub Pages. Use when creating or changing homepage sections, research and publication listings, project case studies, page layouts, visual tokens, or responsive behavior.
---

# Research Portfolio Design

## Intent
Create a site that is unmistakably a credible early-career computer science researcher's home. Distinctive scientific-editorial design should support **verification of contributions**, not compete with it.

## Workflow
1. Inspect existing site components, content sources (CV, research PDFs, repos), and current deployed configuration. Do not assume the project is blank.
2. Read the relevant portions of `DESIGN_BRIEF.md`, paying special attention to content accuracy and visual tokens.
3. Before coding, write a concise design hypothesis: one-sentence audience goal, main composition, typography, palette, one memorable element, and mobile adaptation. Name what you deliberately will not do.
4. Implement semantic, lightweight components; prefer static Astro/HTML output, data-driven publications/projects, and real links. For every item, distinguish proven research outputs, projects/demos, and drafts.
5. Use legitimate research figures/screenshots with captions where available. Never generate or source decorative "AI" artwork as a replacement for evidence. Original abstract SVGs may explain real systems if clearly illustrative.
6. Verify at 375px, 768px, 1280px and 1600px via actual browser rendering. Capture screenshots, inspect cropping, typography, alignment, overflow, and hierarchy. Make at least one improvement based on the visual critique.
7. Run actual build and any available accessibility tests. Test keyboard navigation and `prefers-reduced-motion`. Confirm CV/paper/demo links before concluding.
8. Report what was built, tests run, any outstanding verification questions, and the deployed or preview URL only if available.

## Guardrails
- No fabricated academic statuses, author order, citations, metrics or awards.
- No fabricated affiliations, CV PDF, screenshot, live demo, or externally accessible link.
- No fake interaction or empty call-to-action.
- No indiscriminate bento-card grid, purple gradients, AI neuron backgrounds, excessive motion, skill bars, or vanity badges.
- No heavy WebGL, large client-side router, or back-end dependencies for static GitHub Pages.
- Preserve credit for collaborative work and upstream projects.

## Definition of done
A faculty member can understand the research agenda, inspect an actual publication, understand one concrete contribution, and open the CV in less than 60 seconds. Site renders beautifully and accessibly on both laptop and phone. The main visual feels specific to perception, reasoning, and trusted systems, not something copied from a startup template.
