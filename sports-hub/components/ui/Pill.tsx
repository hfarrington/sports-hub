'use client';

interface PillProps {
  status: 'upcoming' | 'live' | 'final';
}

const PILL_STYLES = {
  upcoming: { bg: 'rgba(176, 255, 78, 0.12)', color: '#b0ff4e', text: 'UPCOMING' },
  live: { bg: 'rgba(255, 68, 68, 0.15)', color: '#ff4444', text: 'LIVE' },
  final: { bg: 'rgba(255, 255, 255, 0.06)', color: '#888', text: 'FT' },
};

export default function Pill({ status }: PillProps) {
  const style = PILL_STYLES[status];
  return (
    <span
      className={`inline-block text-[11px] font-extrabold px-2 py-0.5 rounded tracking-wider uppercase whitespace-nowrap ${status === 'live' ? 'animate-pulse-live' : ''}`}
      style={{ background: style.bg, color: style.color }}
    >
      {style.text}
    </span>
  );
}
