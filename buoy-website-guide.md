# Buoy Waitlist Website — Build Guide

## Prerequisites

- [x] Node.js 18+ installed
- [x] GitHub repo `buoy-website` created (Public)
- [x] Domain `gabemempin.me` registered via Namecheap

---

## Step 1 — Init the Project

```bash
npx create-next-app@latest buoy-website
```

When prompted:
- TypeScript → **Yes**
- ESLint → Yes
- Tailwind CSS → **Yes**
- `src/` directory → No
- App Router → **Yes**
- Customize import alias → No

```bash
cd buoy-website
```

---

## Step 2 — Configure for GitHub Pages

Replace the contents of **`next.config.js`** (or `next.config.ts`) with:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/buoy-website',
  images: { unoptimized: true },
};
module.exports = nextConfig;
```

> This `basePath` is temporary — it will be removed in Step 6 when you set up the custom subdomain.

---

## Step 3 — Create the Waitlist Form Component

Create **`components/WaitlistForm.tsx`** with a placeholder form. This will be replaced with Loops in Step 6.

```tsx
'use client';

import { useState } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(
        'https://app.loops.so/api/v1/contacts/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_LOOPS_API_KEY}`,
          },
          body: JSON.stringify({ email, userGroup: 'waitlist' }),
        }
      );

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'loading' || status === 'success'}
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {status === 'loading' ? 'Joining...' : status === 'success' ? 'You\'re in!' : 'Join Waitlist'}
      </button>

      {status === 'success' && (
        <p className="text-green-600 text-sm mt-2">Thanks! I'll be in touch.</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-sm mt-2">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
```

---

## Step 4 — Build the Landing Page

Replace **`app/page.tsx`** with:

```tsx
import Image from 'next/image';
import WaitlistForm from '@/components/WaitlistForm';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-white text-gray-900">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 flex items-center gap-2 px-6 py-4">
        <Image src="/icon.png" alt="Buoy" width={28} height={28} className="rounded-md" />
        <span className="font-semibold">Buoy</span>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center gap-6 max-w-xl">
        <Image src="/icon.png" alt="Buoy icon" width={80} height={80} className="rounded-2xl shadow-md" />
        <h1 className="text-4xl font-bold">A notepad that floats above everything.</h1>
        <p className="text-gray-500 text-lg">
          Buoy lives in your menu bar. Pull it up with a hotkey, jot something down, keep moving.
        </p>
        <WaitlistForm />
      </section>

      {/* Features */}
      <section className="mt-20 grid sm:grid-cols-3 gap-8 max-w-2xl text-center">
        {[
          { title: 'Always on top', desc: 'Floats above every window so you never lose your place.' },
          { title: 'Global hotkey', desc: 'Toggle it instantly from anywhere on your Mac.' },
          { title: 'Auto-saved', desc: 'Notes are saved the moment you type them.' },
        ].map((f) => (
          <div key={f.title}>
            <h3 className="font-semibold mb-1">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-24 text-gray-400 text-sm">
        © {new Date().getFullYear()} Buoy
      </footer>
    </main>
  );
}
```

Add your **`public/icon.png`** — export the Buoy app icon at 512×512 and drop it there.

---

## Step 5 — Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000/buoy-website` — the basePath applies even in dev.

---

## Step 6 — Set Up Loops Waitlist Form

### 6a — Create a Loops account

1. Go to [loops.so](https://loops.so) and sign up (free)
2. During onboarding, set up your sending domain using `gabemempin.me`
   - Loops will give you DNS records (DKIM/SPF) to add in Namecheap
   - In Namecheap → Domain List → Manage → Advanced DNS → add each record
3. Go to **Settings → API Keys** → create a key and copy it

### 6b — Add the API key

Create **`.env.local`** in the project root:

```
NEXT_PUBLIC_LOOPS_API_KEY=your_api_key_here
```

> Add `.env.local` to `.gitignore` if it isn't already. The key will be visible in the browser bundle — this is an acceptable tradeoff for a static site.

### 6c — Add the API key to GitHub Actions

In your GitHub repo → **Settings → Secrets and variables → Actions** → add a secret:
- Name: `LOOPS_API_KEY`
- Value: your Loops API key

Update **`.github/workflows/deploy.yml`** to pass it at build time:

```yaml
      - run: npm run build
        env:
          NEXT_PUBLIC_LOOPS_API_KEY: ${{ secrets.LOOPS_API_KEY }}
```

### 6d — Verify the form works

Run `npm run dev`, submit a test email, and confirm it appears in your Loops contacts dashboard under the `waitlist` group.

---

## Step 7 — Set Up the `buoy.gabemempin.me` Subdomain

### 7a — Add DNS record in Namecheap

In Namecheap → Domain List → **gabemempin.me** → Manage → Advanced DNS → Add New Record:
- Type: `CNAME`
- Host: `buoy`
- Value: `kristofbernal.github.io`
- TTL: Automatic

### 7b — Add CNAME file to the repo

Create **`public/CNAME`** containing exactly:

```
buoy.gabemempin.me
```

### 7c — Update next.config.ts

Remove `basePath` — it's no longer needed with a real domain:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};
module.exports = nextConfig;
```

### 7d — Update GitHub Pages settings

In your `buoy-website` repo → **Settings → Pages**:
- Custom domain: `buoy.gabemempin.me`
- Enable **Enforce HTTPS** once it appears

---

## Step 8 — Set Up GitHub Actions Deploy

Create **`.github/workflows/deploy.yml`**:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          NEXT_PUBLIC_LOOPS_API_KEY: ${{ secrets.LOOPS_API_KEY }}
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

---

## Step 9 — Push and Deploy

```bash
git init
git add .
git commit -m "Initial waitlist site"
git remote add origin https://github.com/kristofbernal/buoy-website.git
git push -u origin main
```

Then in your GitHub repo settings → **Pages** → set source to the **`gh-pages` branch**.

Your site will be live at: `https://buoy.gabemempin.me`

---

## Checklist

- [ ] Loops account created and sending domain verified
- [ ] `NEXT_PUBLIC_LOOPS_API_KEY` in `.env.local`
- [ ] `LOOPS_API_KEY` secret added to GitHub repo
- [ ] `public/icon.png` added
- [ ] `npm run dev` works locally
- [ ] Test email submit appears in Loops contacts dashboard
- [ ] `public/CNAME` file added with `buoy.gabemempin.me`
- [ ] `basePath` removed from `next.config.ts`
- [ ] Namecheap CNAME record added for `buoy` subdomain
- [ ] GitHub Pages custom domain set to `buoy.gabemempin.me`
- [ ] HTTPS enforced on GitHub Pages
- [ ] GitHub Actions workflow passes on push
