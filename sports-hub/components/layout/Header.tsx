'use client';

import Link from 'next/link';

export type ViewMode = 'weekly' | 'monthly';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
}

export default function Header({ searchQuery, onSearchChange, viewMode = 'weekly', onViewModeChange }: HeaderProps) {
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
          <div className="flex items-center gap-2">
            {/* View mode toggle */}
            {onViewModeChange && (
              <div className="flex gap-1.5">
                <button
                  onClick={() => onViewModeChange('weekly')}
                  className="h-8 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    background: viewMode === 'weekly' ? 'rgba(0,201,255,0.15)' : 'rgba(255,255,255,0.04)',
                    color: viewMode === 'weekly' ? '#00c9ff' : '#666',
                    borderColor: viewMode === 'weekly' ? 'rgba(0,201,255,0.3)' : 'rgba(255,255,255,0.1)',
                  }}
                >
                  Weekly
                </button>
                <button
                  onClick={() => onViewModeChange('monthly')}
                  className="h-8 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    background: viewMode === 'monthly' ? 'rgba(0,201,255,0.15)' : 'rgba(255,255,255,0.04)',
                    color: viewMode === 'monthly' ? '#00c9ff' : '#666',
                    borderColor: viewMode === 'monthly' ? 'rgba(0,201,255,0.3)' : 'rgba(255,255,255,0.1)',
                  }}
                >
                  Monthly
                </button>
              </div>
            )}
            <Link
              href="/watch"
              className="h-8 px-3 rounded-lg flex items-center justify-center border border-white/[0.15] text-text-secondary hover:text-white hover:border-white/[0.3] transition-all text-xs font-bold uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              📺 Watch
            </Link>
            <Link
              href="/settings"
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.15] text-text-secondary hover:text-white hover:border-white/[0.3] transition-all text-sm"
            >
              ⚙
            </Link>
          </div>
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
