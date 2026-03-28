# CLAUDE.md

Guidance for Claude Code when working in this repository.

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

This version may have breaking changes from training data. Before writing any Next.js-specific code, check `node_modules/next/dist/docs/` for current APIs.

## Mobile / CSS Notes

- iOS Safari ignores fixed `h-*` heights on `<input>` elements — use `py-*` padding instead
- Add `appearance-none` to inputs to strip iOS default styling
- Use `sm:` breakpoint for desktop-only sizing adjustments

## Maintenance Guide (for Gabe)

### Making changes
1. Edit files locally
2. `git add <files> && git commit -m "message" && git push`
3. Netlify auto-deploys — check status at netlify.com → your site → Deploys

### Waitlist / Loops
- Dashboard: https://app.loops.so
- API key lives in `.env.local` locally and in Netlify environment variables in production
- If you rotate the API key, update it in both places

### Netlify limits
- Free tier: 300 build minutes/month
- Each deploy takes ~15-30s — you'd need ~600 deploys/month to hit the limit, so don't worry about it

### Environment variables
- Local: `.env.local` (gitignored)
- Production: Netlify dashboard → Site → Environment Variables

### Adding features
- New pages: add a folder under `app/` with a `page.tsx`
- New components: add to `components/`
- Styling: Tailwind v4 utility classes — no config file needed
