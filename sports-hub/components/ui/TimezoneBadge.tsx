'use client';

import { getTimezoneDisplay } from '@/lib/timezone';
import { usePreferences } from '@/providers/PreferencesProvider';

interface TimezoneBadgeProps {
  utc: string;
}

export default function TimezoneBadge({ utc }: TimezoneBadgeProps) {
  const { preferences } = usePreferences();
  const tz1 = getTimezoneDisplay(utc, preferences.timezone1);
  const tz2 = getTimezoneDisplay(utc, preferences.timezone2);

  return (
    <div className="flex gap-1 flex-wrap">
      <span
        className="text-[11px] font-bold px-1.5 py-0.5 rounded tracking-wide whitespace-nowrap"
        style={{ background: `${tz1.color}15`, color: tz1.color }}
      >
        {tz1.time} {tz1.label}
      </span>
      <span
        className="text-[11px] font-bold px-1.5 py-0.5 rounded tracking-wide whitespace-nowrap"
        style={{ background: `${tz2.color}15`, color: tz2.color }}
      >
        {tz2.time} {tz2.label}
      </span>
    </div>
  );
}
