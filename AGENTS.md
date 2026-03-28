# AGENTS.md

Guidance for AI coding agents (Codex, Gemini CLI, etc.) when working in this repository.

## What This Is

A Next.js landing page + waitlist site for **Buoy** — a macOS menu bar notepad app.

- **Live URL:** https://buoy.gabemempin.me
- **Hosting:** Netlify (auto-deploys on push to `main`, ~15-30s per deploy)
- **Repo:** https://github.com/kristofbernal/buoy-website
- **Waitlist:** Loops (https://app.loops.so) — API key in `.env.local` as `LOOPS_API_KEY`

## Commands

```bash
npm run dev      # Dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

No test suite configured.

## Architecture

**App Router** (`app/`) — NOT a static export. Netlify runs Next.js server-side.

- `app/layout.tsx` — root layout with Geist fonts
- `app/page.tsx` — landing page (hero, features, footer)
- `app/api/waitlist/route.ts` — POST endpoint, forwards email to Loops API
- `components/WaitlistForm.tsx` — `'use client'` email form, POSTs to `/api/waitlist`
- `components/ThemeToggle.tsx` — light/dark mode toggle
- `public/icon.png` — 512×512 app icon
- `public/hero-light.png` / `public/hero-dark.png` — hero images (crossfade on theme switch)

**Styling:** Tailwind CSS v4 via `@tailwindcss/postcss` — no `tailwind.config.js`. CSS variables for theme in `app/globals.css`.

**Import alias:** `@/*` resolves to the project root.

## Key Configuration

- `next.config.ts` — minimal config, no `output: 'export'` (Netlify handles SSR)
- `netlify.toml` — Netlify build settings
- `.env.local` — contains `LOOPS_API_KEY` (gitignored, set in Netlify environment variables for production)
- No GitHub Actions workflows — Netlify CD handles all deployments

## Next.js Version Warning

This version may have breaking changes from your training data. Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/` and heed deprecation notices.

## Mobile / CSS Notes

- iOS Safari ignores fixed `h-*` heights on `<input>` elements — use `py-*` padding instead
- Add `appearance-none` to inputs to strip iOS default styling
- Use `sm:` breakpoint for desktop-only sizing adjustments

## Important Rules

- Do NOT add `output: 'export'` or `basePath` to `next.config.ts` — the site is server-rendered on Netlify
- Do NOT create or restore `.github/workflows/` — Netlify handles all CD, no GitHub Actions needed
- Do NOT commit `.env.local` — it is gitignored intentionally
- Do NOT commit `buoy-website-guide.md` — it is gitignored intentionally
- Only commit when explicitly asked by the user
