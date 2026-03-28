'use client';

import { useState } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
        const res = await fetch('/api/waitlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

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
    <div className="flex flex-col items-center w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
          <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              className="flex-1 px-5 py-4 sm:py-2 text-lg sm:text-base appearance-none rounded-[10px] border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FCC527] transition-colors duration-500"
          />
          <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="px-6 py-4 sm:py-2 text-lg sm:text-base rounded-[10px] bg-[#FCC527] text-white font-bold hover:bg-[#e0b020] disabled:opacity-50 transition-colors"
          >
              {status === 'loading' ? 'Joining...' : status === 'success' ? "You're in!" : 'Join Waitlist'}
          </button>
      </form>
      {status === 'success' && (
          <p className="text-green-600 text-sm mt-2 w-full text-center">Thanks for joining the waitlist! I&apos;ll be in touch.</p>
      )}
      {status === 'error' && (
          <p className="text-red-500 text-sm mt-2 w-full text-center">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
