# Buoy — Waitlist Website

Landing page and waitlist for [Buoy](https://buoy.gabemempin.me), a lightweight always-on-top floating notepad for macOS.

Built with Next.js and deployed on Netlify.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

## Environment Variables

Create a `.env.local` file in the project root:

```
LOOPS_API_KEY=your_api_key_here
```

## Deployment

Deployed automatically to Netlify on every push to `main`. Set `LOOPS_API_KEY` in the Netlify dashboard under Site settings → Environment variables.
