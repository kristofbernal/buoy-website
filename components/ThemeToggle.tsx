'use client';

import { useEffect, useRef, useState } from 'react';

function CircleLeftHalfFilled({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ? `block ${className}` : 'block'}
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 1a9 9 0 0 0 0 18V1z" fill="currentColor" />
    </svg>
  );
}

function CircleLeftHalfFilledInverse({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ? `block ${className}` : 'block'}
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 1a9 9 0 0 1 0 18V1z" fill="currentColor" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [spinKey, setSpinKey] = useState(0);
  const hasManualOverrideRef = useRef(false);

  function applyTheme(nextDark: boolean) {
    document.documentElement.classList.toggle('dark', nextDark);
    document.documentElement.style.colorScheme = nextDark ? 'dark' : 'light';
  }

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = (e: MediaQueryListEvent) => {
      if (hasManualOverrideRef.current) {
        return;
      }

      applyTheme(e.matches);
    };

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  function handleToggle() {
    hasManualOverrideRef.current = true;

    const nextDark = !document.documentElement.classList.contains('dark');

    applyTheme(nextDark);
    setSpinKey((k) => k + 1);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="fixed top-4 right-4 z-50 grid size-12 place-items-center rounded-full border border-white/40 bg-white/30 text-gray-800 shadow-sm backdrop-blur-md transition-colors leading-none dark:border-white/10 dark:bg-black/30 dark:text-gray-100"
      aria-label="Toggle dark mode"
    >
      <span
        key={spinKey}
        className="grid place-items-center"
        style={{ animation: spinKey > 0 ? 'theme-spin 0.35s ease-out' : 'none' }}
      >
        <span className="dark:hidden">
          <CircleLeftHalfFilled />
        </span>
        <span className="hidden dark:block">
          <CircleLeftHalfFilledInverse />
        </span>
      </span>
    </button>
  );
}
