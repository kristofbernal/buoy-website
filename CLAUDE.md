# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A Next.js static landing page + waitlist site for **Buoy** — a macOS menu bar notepad app. Deployed to GitHub Pages at `https://gabemempin.github.io/buoy-website`.

## Commands

```bash
npm run dev      # Dev server — visit http://localhost:3000/buoy-website (basePath applies in dev)
npm run build    # Static export → ./out/
npm run lint     # ESLint
```

No test suite configured.

## Next.js Version Warning

This version of Next.js may have breaking changes from training data. Before writing any Next.js-specific code, check `node_modules/next/dist/docs/` for current APIs and conventions.

## Architecture

**App Router** (`app/`) with static export (`output: 'export'` in `next.config.ts`).

- `app/layout.tsx` — root layout with Geist fonts
- `app/page.tsx` — landing page (hero, features, footer)
- `components/WaitlistForm.tsx` — `'use client'` email form that POSTs directly to Kit's CORS endpoint
- `public/icon.png` — 512×512 app icon (required)

**Styling:** Tailwind CSS v4 via `@tailwindcss/postcss` — no `tailwind.config.js`. CSS variables for theme colors in `app/globals.css`.

**Import alias:** `@/*` resolves to the project root (e.g., `@/components/WaitlistForm`).

## Key Configuration

- `next.config.ts` must have `output: 'export'`, `basePath: '/buoy-website'`, `images: { unoptimized: true }` for GitHub Pages
- Kit Form ID goes in `components/WaitlistForm.tsx` — replace `YOUR_FORM_ID` in the fetch URL `https://app.kit.com/forms/YOUR_FORM_ID/subscriptions`
- Deployment: GitHub Actions (`.github/workflows/deploy.yml`) builds and pushes `./out` to `gh-pages` branch via `peaceiris/actions-gh-pages@v4`
