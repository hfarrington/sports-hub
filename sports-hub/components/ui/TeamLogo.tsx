'use client';

import { useState } from 'react';

interface TeamLogoProps {
  src: string;
  name: string;
  shortName: string;
  accent?: string;
  size?: number;
}

export default function TeamLogo({ src, name, shortName, accent = '#888', size = 24 }: TeamLogoProps) {
  const [error, setError] = useState(false);

  if (error || !src || src.startsWith('/icons/')) {
    // Fallback: styled initials
    return (
      <div
        className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
        style={{
          width: size,
          height: size,
          background: `${accent}20`,
          color: accent,
          fontSize: size * 0.4,
          fontFamily: 'var(--font-heading)',
        }}
      >
        {shortName.slice(0, 3)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      className="object-contain flex-shrink-0"
      style={{ width: size, height: size }}
      onError={() => setError(true)}
    />
  );
}
