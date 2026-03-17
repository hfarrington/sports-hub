'use client';

import type { Weekend } from '@/lib/types';

interface TimelineProps {
  weekends: Weekend[];
  currentIndex: number;
  onChange: (index: number) => void;
}

export default function Timeline({ weekends, currentIndex, onChange }: TimelineProps) {
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < weekends.length - 1;
  const current = weekends[currentIndex];

  // Show a window of weekends around the current one
  const windowSize = 5;
  const start = Math.max(0, currentIndex - Math.floor(windowSize / 2));
  const end = Math.min(weekends.length, start + windowSize);
  const visible = weekends.slice(start, end);

  function goToThisWeekend() {
    const idx = weekends.findIndex(w => w.tag === 'current');
    if (idx !== -1) onChange(idx);
    else {
      const futureIdx = weekends.findIndex(w => w.tag === 'future');
      if (futureIdx !== -1) onChange(futureIdx);
    }
  }

  return (
    <div className="rounded-xl p-3.5 border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.04)' }}>
      {/* Top row: nav buttons + label */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => canPrev && onChange(currentIndex - 1)}
          disabled={!canPrev}
          className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.15] text-text-secondary hover:text-white hover:border-white/[0.3] transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm"
        >
          ◂
        </button>

        <div className="text-center flex-1 px-2">
          <p className="font-black text-sm uppercase tracking-wider text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            {current?.label || '—'}
          </p>
        </div>

        <button
          onClick={goToThisWeekend}
          className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/10 transition-all mr-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          This Weekend
        </button>

        <button
          onClick={() => canNext && onChange(currentIndex + 1)}
          disabled={!canNext}
          className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.15] text-text-secondary hover:text-white hover:border-white/[0.3] transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm"
        >
          ▸
        </button>
      </div>

      {/* Weekend dots / mini selector */}
      <div className="flex gap-1">
        {visible.map((wk, i) => {
          const idx = start + i;
          const isActive = idx === currentIndex;
          return (
            <button
              key={wk.id}
              onClick={() => onChange(idx)}
              className="flex-1 py-1.5 rounded-lg text-center transition-all border"
              style={{
                background: isActive
                  ? wk.tag === 'current' ? 'rgba(0,201,255,0.12)' : 'rgba(255,255,255,0.08)'
                  : 'rgba(255,255,255,0.03)',
                borderColor: isActive
                  ? wk.tag === 'current' ? '#00c9ff' : 'rgba(255,255,255,0.2)'
                  : 'transparent',
              }}
            >
              <span
                className="text-[10px] font-bold block"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: wk.tag === 'past' ? '#555' : wk.tag === 'current' ? '#00c9ff' : '#b0ff4e',
                }}
              >
                {wk.startDate.split('-')[2]}-{wk.endDate.split('-')[2]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
