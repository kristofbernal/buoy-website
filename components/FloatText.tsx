'use client';

export default function FloatText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={className} style={style}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block transition-transform duration-200 ease-out hover:-translate-y-2"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
