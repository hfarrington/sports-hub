'use client';

import { usePreferences } from '@/providers/PreferencesProvider';
import type { ReactNode } from 'react';

interface SportCardProps {
  id: string;
  title: string;
  subtitle?: string;
  emoji: string;
  accent: string;
  children: ReactNode;
}

export default function SportCard({ id, title, subtitle, emoji, accent, children }: SportCardProps) {
  const { preferences, toggleFavorite, toggleCollapsed } = usePreferences();
  const isFavorited = preferences.favorites.includes(id);
  const isCollapsed = preferences.collapsedSections.includes(id);

  return (
    <div className="rounded-[14px] p-4 mb-4 animate-fade-in" style={{ background: 'rgba(255,255,255,0.025)' }}>
      {/* Section header */}
      <div className="flex items-center gap-2.5 mb-3">
        <button
          onClick={() => toggleFavorite(id)}
          className="text-base transition-all"
          style={{ color: isFavorited ? '#ffd700' : '#666' }}
          title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorited ? '★' : '☆'}
        </button>
        <span className="text-xl flex-shrink-0">{emoji}</span>
        <div className="min-w-0">
          <h3
            className="font-black text-[19px] uppercase tracking-wide leading-none text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {title}
          </h3>
          {subtitle && <p className="text-[11px] text-text-muted mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex-1 h-px ml-2" style={{ background: `${accent}30` }} />
        <button
          onClick={() => toggleCollapsed(id)}
          className="text-text-muted hover:text-white transition-colors text-sm px-1"
        >
          {isCollapsed ? '▸' : '▾'}
        </button>
      </div>

      {/* Content */}
      {!isCollapsed && <div>{children}</div>}
    </div>
  );
}
