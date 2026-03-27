'use client';

import { useState } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
        const res = await fetch('https://app.kit.com/forms/9254307/subscriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email_address: email }),
        }
        );

        if (res.ok) {
            setStatus('success');
            setEmail('');
        } else {
            setStatus('error');
        }
    } catch (error) {
        setStatus('error');
  
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm: flex-row gap-2 w-full max-w-md">
        <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail (e.target.value)}
            disabled = {status === 'loading' || status === 'success'}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-non focus:ring-2 focus:ring-blue-500"
        />
        <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
            {status === 'loading' ? 'Joining...' : status === 'success' ? 'You\'re in!' : 'Join Waitlist'}
        </button>

         {status === 'success' && (
            <p className="text-green-600 text-sm mt-2">Thanks for joining the waitlist! I'll be in touch.</p>
        )}
         {status === 'error' && (
            <p className="text-red-500 text-sm mt-2">Something went wrong. Please try again.</p>
        )}
    </form>
  );
}