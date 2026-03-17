'use client';

import Link from 'next/link';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/[0.06]" style={{ background: 'rgba(6,10,17,0.85)' }}>
      <div className="max-w-2xl mx-auto px-4 py-3">
        {/* Title row */}
        <div className="flex items-center justify-between mb-2">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="font-black text-xl uppercase tracking-wider"
              style={{
                fontFamily: 'var(--font-heading)',
                background: 'linear-gradient(135deg, #00c9ff, #b0ff4e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Sports Hub
            </span>
          </Link>
          <Link
            href="/settings"
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.15] text-text-secondary hover:text-white hover:border-white/[0.3] transition-all text-sm"
          >
            ⚙
          </Link>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search teams, venues..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm bg-white/[0.04] border border-white/[0.08] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-cyan focus:bg-white/[0.06] transition-all"
          style={{ fontFamily: 'var(--font-body)' }}
        />
      </div>
    </header>
  );
}
