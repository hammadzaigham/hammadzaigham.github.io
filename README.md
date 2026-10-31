# Hammad Ahmed · Digital CV & Academic Research Terminal

A modern, high-performance **2.5D Cyber-Academic Terminal** and **LaTeX-fidelity Academic CV** built with React 19, TypeScript, and custom Vanilla CSS. Designed for university research labs, Ph.D. admissions, and engineering teams.

Fully configured for direct hosting on **GitHub Pages** (`https://<username>.github.io/` or `https://<username>.github.io/<repo-name>/`).

---

## ⚡ Flagship Interactive Features

1. **Dual-View Architecture**:
   - **Interactive Terminal (Default)**: Deep obsidian aesthetics with interactive 2.5D canvas topological mesh, real-time metrics, interactive simulation labs, and publication drawers.
   - **Academic Print Mode (`#academic`)**: 100% faithful digital reproduction of Hammad's LaTeX CV with exact section rules, clean margins, and an instant print/export-to-PDF engine via `@media print`.

2. **DyGRAV VLN Trajectory Simulator**:
   - Interactive step-through of a Room-to-Room (R2R) indoor embodied navigation episode (*MDPI Information 2026*).
   - Dynamic grounding attention weights and 97.33% compute-budget compliance telemetry.
   - Direct DOI link (`10.3390/info17101030`) and 1-click BibTeX citation drawer.

3. **PreySense ACPI & EC Hardware Studio**:
   - Interactive SVG PWM fan curve editor with draggable/clickable setpoints.
   - ACPI SSDT dispatch logger, embedded controller (EC) register dump (`0xB2`, `0xB3`), and NVIDIA Dynamic Boost TGP telemetry (70+ GitHub stars).

4. **RoadWatch 3-Way AI Gating Inspector**:
   - Real-time simulation of the three-way `Accept / Review / Reject` triage engine (YOLOv8s + SegFormer-B0 ONNX).
   - Evaluated over 19,784 dashcam frames on AWS EC2 (`https://3-141-198-95.sslip.io/`).

5. **Scholarly Citation Suite**:
   - Formatted publication entries with author highlighting (`Hammad Ahmed`).
   - Modal drawer with full BibTeX citation copyable with a single click.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8 (relative base path `./` for seamless GitHub Pages routing)
- **Styling:** Custom Vanilla CSS Design System (CSS Custom Properties, Glassmorphism, Zero Framework Bloat)
- **Icons:** Lucide React + Custom SVG Brand Glyphs
- **Typography:** `Plus Jakarta Sans`, `Inter`, `JetBrains Mono`, `Newsreader` (via Google Fonts)

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/hammadzaigham/digital-cv.git
cd digital-cv

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 🌐 Deploying to GitHub Pages (`.github.io`)

This project includes a turnkey GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Option 1: User Site (`https://<username>.github.io`)
1. Create a repository named `<your-username>.github.io` on GitHub.
2. Push this project to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Hammad Ahmed Digital CV"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Navigate to **Settings** &rarr; **Pages**.
   - Under **Build and deployment > Source**, select **GitHub Actions**.
4. The workflow will automatically build and publish the site.

### Option 2: Project Site (`https://<username>.github.io/digital-cv/`)
Because `vite.config.ts` uses `base: './'`, all asset paths are relative, meaning the build works out-of-the-box under any subpath without configuration changes!

---

## 📄 Raw LaTeX Source

The exact LaTeX source file is preserved in the repository root as [`cv.tex`](cv.tex) and is also accessible directly from the live site via the "Download cv.tex" button.
