# Resumely — Premium Resume Builder

A production-quality, client-only resume builder built with **React 18 + TypeScript + Vite + Tailwind CSS**. No backend, no authentication, no AI — everything is saved to your browser's `localStorage`.

## ✨ Features

- **Landing page** — hero, feature grid, live template previews, stats, testimonials, FAQ accordion, footer, full light/dark mode, Framer Motion animations
- **Dashboard** — create, rename, duplicate, delete, and search resumes; recently-edited shelf; JSON import
- **Resume builder** — sidebar-driven multi-section editor:
  - Personal Info
  - Professional Summary
  - Education, Experience, Projects, Certifications, Achievements, Languages, References — all **unlimited entries**
  - Skills (technical + soft, with a 1–5 level slider)
  - Interests (chip input)
  - Unlimited **custom sections**
- **Drag-and-drop reordering** (via `dnd-kit`) for experience, education, projects, skills, and the top-level section order itself
- **6 fully distinct templates** — Modern, Professional, Minimal, Creative, Executive, Classic ATS
- **Theme customization** — primary/secondary/accent color, font family & size, line height, page margins, icon visibility — applied live
- **PDF export**  — multi-page, A4 or Letter
- **Browser print** support
- **JSON export/import** for portability
- **LocalStorage persistence** — unlimited resumes, no account needed
- Toast notifications, skeleton loaders, confirm dialogs, responsive layout (desktop/tablet/mobile)

## 📦 Tech Stack

React 18 · TypeScript · Vite · Tailwind CSS · React Router · dnd-kit · Framer Motion · jsPDF · html2canvas · Lucide React

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## 🗂️ Project Structure

```
src/
  components/
    landing/      → landing page sections (Navbar, Hero, Features, ...)
    dashboard/     → ResumeCard, NewResumeModal
    builder/        → Sidebar, DragList, SortableEntryCard, PreviewOverlay
      sections/     → one form component per resume section
    ui/            → Toast, Modal, ConfirmDialog, Skeleton
  context/          → ResumeContext (CRUD + persistence), ThemeContext (dark mode)
  pages/            → Landing, Dashboard, Builder, NotFound
  templates/        → the 6 resume templates + shared section renderers
  types/            → resume.ts — all TypeScript interfaces
  utils/            → storage.ts (localStorage), pdfExport.ts, id.ts
```

## 📝 Notes on Scope

This build focuses on 6 fully distinct, high-quality templates rather than 8 thinner ones — every template has its own layout logic (single column, sidebar, header-band, ATS-plain, etc.), not just a palette swap.

The "Preview & Export" screen is intentionally the only place the fully rendered resume appears (no live split-pane preview while typing), matching a focused editing experience — you can jump into it any time from the top bar.

## 🔒 Privacy

Everything — your resume text and settings — stays in your browser's `localStorage`. Nothing is ever sent to a server.
