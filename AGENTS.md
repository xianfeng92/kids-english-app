# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains the React app entry points and UI (`main.jsx`, `App.jsx`) plus global styles in `index.css`.
- `public/` is for static assets (e.g., `favicon.ico`) that are served as-is.
- Root config files include `vite.config.js`, `tailwind.config.js`, and `postcss.config.js`.
- Environment variables live in `.env` (see Security & Configuration below).

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start the Vite dev server at `http://localhost:3000` (auto-opens the browser).
- `npm run build`: create a production build in `dist/`.
- `npm run preview`: locally preview the production build.

## Coding Style & Naming Conventions
- Language: React + JSX with ES modules.
- Indentation: 2 spaces; keep lines readable and avoid deep nesting.
- Filenames: `PascalCase` for React components (e.g., `App.jsx`), `kebab-case` for assets where applicable.
- Styling: Tailwind CSS utilities in JSX; global styles live in `src/index.css`.
- Prefer descriptive state names and handlers (e.g., `prompt`, `setPrompt`, `onGenerate`).

## Testing Guidelines
- No automated tests are configured yet. If adding tests, document the framework and add scripts to `package.json` (e.g., `npm test`).
- Suggested naming: `ComponentName.test.jsx` colocated near the component or in a `tests/` folder.

## Commit & Pull Request Guidelines
- This repository has no Git history yet, so there is no established commit message convention.
- Suggested convention: short, imperative subject lines (e.g., `Add prompt validation`).
- PRs should include a summary, testing notes, and UI screenshots for visual changes.

## Security & Configuration Tips
- Store API keys in `.env` using Vite’s `VITE_` prefix (e.g., `VITE_GEMINI_API_KEY`).
- Do not commit real secrets; keep `.env` local or use `.env.example` when needed.