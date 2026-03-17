'use client';

import { SPORTS } from '@/lib/constants';

const SPORT_EMOJIS: Record<string, string> = {
  rugby: '🏉',
  nrl: '⚔️',
  f1: '🏎️',
  cricket: '🏏',
  football: '⚽',
  nba: '🏀',
  nfl: '🏈',
  tennis: '🎾',
  ufc: '🥊',
};

interface SportPickerProps {
  selected: string[];
  onToggle: (sportId: string) => void;
}

export default function SportPicker({ selected, onToggle }: SportPickerProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-black tracking-wide uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
          Pick Your Sports
        </h2>
        <p className="text-text-secondary mt-2 text-sm">Select the sports you want to follow</p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
        {SPORTS.map(sport => {
          const isSelected = selected.includes(sport.id);
          return (
            <button
              key={sport.id}
              onClick={() => onToggle(sport.id)}
              className="relative flex flex-col items-center gap-2 rounded-xl p-4 transition-all duration-200 border-2"
              style={{
                background: isSelected ? `${sport.accent}15` : 'rgba(255,255,255,0.03)',
                borderColor: isSelected ? sport.accent : 'rgba(255,255,255,0.08)',
              }}
            >
              <span className="text-3xl">{SPORT_EMOJIS[sport.id] || '🏆'}</span>
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-heading)', color: isSelected ? sport.accent : '#888' }}
              >
                {sport.name}
              </span>
              {isSelected && (
                <div
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-black"
                  style={{ background: sport.accent }}
                >
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
