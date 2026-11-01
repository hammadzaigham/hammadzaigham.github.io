# The Research Atlas — Design Brief & Specification
**Candidate:** Hammad Ahmed (BS Computer Science, University of Southern Mississippi '27)  
**Primary Audience:** Fall 2027 PhD admissions faculty, research lab PIs, and technical collaborators  
**Target Repository & URL:** `hammadzaigham.github.io` &rarr; `https://hammadzaigham.github.io/`

---

## 1. Visual Direction & Identity

- **Concept:** Scientific editorial minimalism × Swiss grid design × technical information design × restrained interactive storytelling.
- **Reference Philosophy:** Academic credibility of Jon Barron's research site paired with the curated editorial layout of a modern university research institute annual report.
- **Tone:** A serious research scientist's personal laboratory, an academic publication, and a sophisticated engineering portfolio combined.
- **Core Principle:** *Research first, visual sophistication second, decoration last.*
- **Deliberate Non-Goals:**
  - NO generic developer landing pages or marketing hype.
  - NO futuristic AI dashboard covered in glowing purple/cyan gradients.
  - NO skill bars, vanity metric counters, or empty placeholders.
  - NO heavy WebGL or unnecessary client-side router bloat.

---

## 2. Design System & Design Tokens

| Token / Element | Choice & Value | Usage Notes |
| :--- | :--- | :--- |
| **Primary Aesthetic** | Scientific editorial, sophisticated & restrained | Clean asymmetric modules, 12-column grid |
| **Display Typography** | `Newsreader` (Google Fonts, serif, optical size 6–72) | Authoritative academic editorial headlines |
| **Body Typography** | `IBM Plex Sans` (Google Fonts, sans-serif) | Clean, highly legible prose and summaries |
| **Technical / Code** | `IBM Plex Mono` (Google Fonts, monospaced) | Metadata labels, registers, metrics, DOI tags |
| **Background (Light)** | `#F5F7FA` (Cool porcelain) | Primary default appearance |
| **Surface Cards (Light)** | `#FFFFFF` with hairline borders `#E2E8F0` | High-contrast, clean academic cards |
| **Primary Text (Light)** | `#182334` (Deep ink) | Uncompromising readability |
| **Muted Text (Light)** | `#5A6B82` | Secondary academic annotations |
| **Accent Color** | `#3157B8` (Academic cobalt) | Links, active tabs, author highlighting |
| **Subtle Accent** | `#10B981` (Emerald), `#D97706` (Amber) | Minimalist status indicators |
| **Dark Mode (Optional)** | `#0D131F` (Charcoal void), surface `#141C2B`, text `#E2E8F0` | Accessible toggle, retains editorial elegance |
| **Transitions** | `150–250ms cubic-bezier(0.16, 1, 0.3, 1)` | Subtle and restrained |

---

## 3. Core Architecture & Sections

1. **Header & Research Identity (Hero):**
   - Candidate name: **Hammad Ahmed**
   - Current standing: Undergraduate Computer Science Researcher & Systems Engineer at USM (GPA: 4.00/4.00, President's List).
   - Research vision statement: Connecting perception, relational reasoning, and trustworthy systems.
   - Immediate access to: rendered CV, Email, GitHub, and DOI links. Do not expose raw LaTeX downloads, print/export buttons, or unverified scholarly profiles.

2. **The Signature Research Map (The Atlas Visual):**
   - A meaningful, interactive SVG technical diagram connecting:
     - **Perception:** Real-time road perception (RoadWatch: YOLOv8s + SegFormer-B0 ONNX).
     - **Reasoning:** Dynamic grounding over topological navigation graphs (DyGRAV: VLN in R2R, *Information 2026*).
     - **Trustworthy Systems:** Low-latency authentication protocols (DWC-FastAuth: Dynamic EV charging, Springer LNNS) and firmware reverse engineering (PreySense: ACPI/EC bounds).
   - Shows real research pathways rather than generic AI animations.

3. **Publications (Jon Barron-Inspired Bibliographic Grid):**
   - High-density bibliographic entries with research thumbnails / figures.
   - Authorship with `Hammad Ahmed` prominently highlighted in bold cobalt.
   - Direct links: [Paper DOI], [BibTeX (1-click drawer)], [Preprint/Code].
   - Publications recorded in the source CV (retain exact authorship and status):
     1. *DyGRAV: Dynamic Grounding and Relational Reasoning for Vision–Language Navigation* (*Information*, 17(10), 1030, 2026).
     2. *Novel Classification of Authentication Schemes in Electric Vehicle Charging* (accepted at ISBCom 2026; Springer LNNS proceedings forthcoming).

4. **Featured Research & Engineering Case Studies (Bento Composition):**
   - **RoadWatch:** Mississippi AI Innovation Hub &mdash; 3-way accept/review/reject gating, 19,784 dashcam frames evaluated, 162 off-road false alarms filtered, live AWS EC2 deployment (`https://3-141-198-95.sslip.io/`).
   - **DyGRAV:** 80.28% SR, 76.41% SPL on R2R val_unseen, 97.33% compute-budget compliance.
   - **PreySense:** Acer firmware reverse engineering, ACPI/SSDT disassembly, embedded-controller interfaces. Prefer technical contributions over changing star-count badges.
   - **DWC-FastAuth (EV Charging):** ongoing RSU-assisted dynamic wireless charging authentication protocol research. Distinguish this from the related accepted survey (4×4 taxonomy of 53 studies); do not present protocol targets as measured results.

5. **Research Appointments & Lab Affiliations:**
   - SPEN Lab (Advisor: Dr. Ahmed Sherif) &mdash; Undergraduate Research Assistant.
   - CRA UR2PhD Fellow (Summer 2026).
   - BitStorm Solutions (Full Stack Developer).

6. **Honors & Competitions:**
   - Radiance Technologies Innovation Bowl &mdash; Joint Runner-Up 2025–26 (Neuro-Symbolic LLM validation with PDDL planning).
   - NASA&ndash;Mississippi Space Grant IDCC &mdash; 2nd Place 2026.
   - USM Full-Tuition Academic Excellence Scholarship.

7. **Rendered Curriculum vitae:**
   - Render the repository's `CV.tex` into readable HTML at `/cv/`. Keep the source as a build input and remove public `.tex` downloads and print/export controls.
   - Avoid publication-status badges and decorative tags; communicate status plainly alongside the venue.
   - Research thumbnails must be clearly labeled conceptual schematics unless they are actual figures from the paper. Do not label illustrations as verified architectures.

---

## 4. Technology Stack & Deployment

- **Framework:** Astro static-first + TypeScript
- **Styling:** Custom Vanilla CSS (12-column Swiss grid, CSS custom properties, zero runtime framework overhead)
- **Deployment:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- **Accessibility:** WCAG 2.2 AA compliant, full keyboard navigation, `prefers-reduced-motion` support.

## Approved refinement: research journal

The current composition uses a compact introduction with research interests and education in a quiet sidebar, followed immediately by publications. Selected projects feature RoadWatch with a clearly labeled conceptual pipeline, followed by quieter supporting entries. Use direct section headings and readable venue, authorship, and description text. Preserve the serif/cobalt identity, text links without arrows, and the dedicated A4-width Curriculum vitae without download or print/export controls. Prefer verified research figures or project screenshots when available; never substitute invented experimental evidence.
