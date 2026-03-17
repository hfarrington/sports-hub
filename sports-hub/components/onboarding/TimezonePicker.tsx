'use client';

import { TIMEZONES } from '@/lib/timezone';

interface TimezonePickerProps {
  timezone1: string;
  timezone2: string;
  onSetTimezone1: (id: string) => void;
  onSetTimezone2: (id: string) => void;
}

export default function TimezonePicker({
  timezone1,
  timezone2,
  onSetTimezone1,
  onSetTimezone2,
}: TimezonePickerProps) {
  const regions = Array.from(new Set(TIMEZONES.map(tz => tz.region)));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-black tracking-wide uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
          Your Timezones
        </h2>
        <p className="text-text-secondary mt-2 text-sm">
          Pick 2 timezones to show game times in. DST adjusts automatically.
        </p>
      </div>

      <TimezoneSelect
        label="Primary Timezone"
        value={timezone1}
        onChange={onSetTimezone1}
        excludeId={timezone2}
        regions={regions}
        number={1}
      />

      <TimezoneSelect
        label="Secondary Timezone"
        value={timezone2}
        onChange={onSetTimezone2}
        excludeId={timezone1}
        regions={regions}
        number={2}
      />

      {/* Preview */}
      <div className="rounded-xl border border-white/[0.06] p-4 bg-white/[0.02]">
        <p className="text-xs text-text-muted uppercase tracking-wider mb-3 font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
          Preview — Example kickoff time
        </p>
        <div className="flex gap-3">
          <TimezoneBadgePreview tzId={timezone1} utc="2026-03-21T07:30" />
          <TimezoneBadgePreview tzId={timezone2} utc="2026-03-21T07:30" />
        </div>
      </div>
    </div>
  );
}

function TimezoneSelect({
  label,
  value,
  onChange,
  excludeId,
  regions,
  number,
}: {
  label: string;
  value: string;
  onChange: (id: string) => void;
  excludeId: string;
  regions: string[];
  number: number;
}) {
  const selectedTz = TIMEZONES.find(tz => tz.id === value);

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-text-secondary" style={{ fontFamily: 'var(--font-heading)' }}>
        {label}
      </label>
      <div className="space-y-1.5">
        {regions.map(region => {
          const tzs = TIMEZONES.filter(tz => tz.region === region && tz.id !== excludeId);
          if (tzs.length === 0) return null;
          return (
            <div key={region}>
              <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1 pl-1">{region}</p>
              <div className="flex flex-wrap gap-1.5">
                {tzs.map(tz => (
                  <button
                    key={tz.id}
                    onClick={() => onChange(tz.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      background: value === tz.id ? `${tz.color}15` : 'rgba(255,255,255,0.03)',
                      borderColor: value === tz.id ? tz.color : 'rgba(255,255,255,0.08)',
                      color: value === tz.id ? tz.color : '#666',
                    }}
                  >
                    {tz.city}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {selectedTz && (
        <p className="text-xs text-text-secondary">
          Selected: <span style={{ color: selectedTz.color }} className="font-bold">{selectedTz.city}</span> (UTC{selectedTz.baseOffset >= 0 ? '+' : ''}{selectedTz.baseOffset})
        </p>
      )}
    </div>
  );
}

function TimezoneBadgePreview({ tzId, utc }: { tzId: string; utc: string }) {
  // Import dynamically to avoid SSR issues — just use a simple calc here
  const tz = TIMEZONES.find(t => t.id === tzId);
  if (!tz) return null;

  // Simple preview calculation (approximate)
  const offset = tz.baseOffset + (tz.hasDST ? 1 : 0); // assume DST for preview
  const [, tp] = utc.split('T');
  const [h, m] = tp.split(':').map(Number);
  let mins = h * 60 + m + offset * 60;
  if (mins >= 1440) mins -= 1440;
  if (mins < 0) mins += 1440;
  const hh = Math.floor(mins / 60) % 24;
  const mm = mins % 60;
  const ap = hh >= 12 ? 'pm' : 'am';
  const h12 = hh % 12 || 12;
  const timeStr = `${h12}${mm ? ':' + String(mm).padStart(2, '0') : ''}${ap}`;

  return (
    <div
      className="rounded-md px-3 py-1.5 text-xs font-bold"
      style={{ background: `${tz.color}15`, color: tz.color }}
    >
      {timeStr} {tz.city}
    </div>
  );
}
