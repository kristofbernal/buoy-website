'use client';

import { useEffect, useState } from 'react';

function CircleLeftHalfFilled({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 1a9 9 0 0 0 0 18V1z" fill="currentColor" />
    </svg>
  );
}

function CircleLeftHalfFilledInverse({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 1a9 9 0 0 1 0 18V1z" fill="currentColor" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-4 right-4 z-50 p-2 rounded-full backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10 text-gray-800 dark:text-gray-100 shadow-sm transition-colors"
      aria-label="Toggle dark mode"
    >
      {dark ? <CircleLeftHalfFilledInverse /> : <CircleLeftHalfFilled />}
    </button>
  );
}
