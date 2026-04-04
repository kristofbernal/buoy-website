'use client';
import { useState } from 'react';

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="shrink-0 px-3 py-1.5 rounded text-xs font-medium transition-colors duration-200"
      style={{
        background: copied ? '#1a3a1a' : '#4BA6C1',
        color: copied ? '#4ade80' : '#ffffff',
        border: copied ? '1px solid #4ade80' : '1px solid #4BA6C1',
      }}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
