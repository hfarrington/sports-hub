import type { TimezoneOption, TimezoneResult } from './types';

// ─── Timezone Registry ──────────────────────────────────────────────────────

export const TIMEZONES: TimezoneOption[] = [
  { id: 'auckland', label: 'NZT', city: 'New Zealand', region: 'New Zealand', baseOffset: 12, hasDST: true, color: '#00c9ff' },
  { id: 'fiji', label: 'FJT', city: 'Fiji', region: 'Pacific', baseOffset: 12, hasDST: true, color: '#00bcd4' },
  { id: 'samoa', label: 'WST', city: 'Samoa', region: 'Pacific', baseOffset: 13, hasDST: true, color: '#0097a7' },
  { id: 'tonga', label: 'TOT', city: 'Tonga', region: 'Pacific', baseOffset: 13, hasDST: false, color: '#00838f' },
  { id: 'melbourne', label: 'AET', city: 'Melbourne', region: 'Australia', baseOffset: 10, hasDST: true, color: '#e879f9' },
  { id: 'sydney', label: 'AET', city: 'Sydney', region: 'Australia', baseOffset: 10, hasDST: true, color: '#e879f9' },
  { id: 'brisbane', label: 'AEST', city: 'Brisbane', region: 'Australia', baseOffset: 10, hasDST: false, color: '#d946ef' },
  { id: 'adelaide', label: 'ACT', city: 'Adelaide', region: 'Australia', baseOffset: 9.5, hasDST: true, color: '#c026d3' },
  { id: 'perth', label: 'AWST', city: 'Perth', region: 'Australia', baseOffset: 8, hasDST: false, color: '#ffa040' },
  { id: 'tokyo', label: 'JST', city: 'Tokyo', region: 'Asia', baseOffset: 9, hasDST: false, color: '#ef4444' },
  { id: 'london', label: 'GMT', city: 'London', region: 'Europe', baseOffset: 0, hasDST: true, color: '#a3a3a3' },
  { id: 'new_york', label: 'ET', city: 'New York', region: 'Americas', baseOffset: -5, hasDST: true, color: '#3b82f6' },
  { id: 'los_angeles', label: 'PT', city: 'Los Angeles', region: 'Americas', baseOffset: -8, hasDST: true, color: '#f59e0b' },
];

// ─── DST Calculation Helpers ────────────────────────────────────────────────

function nthSunday(year: number, month: number, nth: number): Date {
  if (nth > 0) {
    const d = new Date(year, month, 1);
    const dow = d.getDay();
    const first = dow === 0 ? 1 : 8 - dow;
    return new Date(year, month, first + (nth - 1) * 7);
  } else {
    const d = new Date(year, month + 1, 0); // last day of month
    const dow = d.getDay();
    return new Date(year, month, d.getDate() - dow);
  }
}

export function getOffset(utcStr: string, tzId: string): { offset: number; label: string; color: string } {
  const tz = TIMEZONES.find(t => t.id === tzId);
  if (!tz) return { offset: 0, label: 'UTC', color: '#888' };

  if (!tz.hasDST) {
    return { offset: tz.baseOffset, label: getDSTLabel(tzId, false), color: tz.color };
  }

  const [dp, tp] = utcStr.split('T');
  const [y, mo, d] = dp.split('-').map(Number);
  const hour = parseInt((tp || '00:00').split(':')[0]);
  const min = parseInt((tp || '00:00').split(':')[1]);
  const utcDate = new Date(Date.UTC(y, mo - 1, d, hour, min));

  const isDST = checkDST(utcDate, y, tzId);
  const offset = isDST ? tz.baseOffset + 1 : tz.baseOffset;
  const label = getDSTLabel(tzId, isDST);

  return { offset, label, color: tz.color };
}

function checkDST(utcDate: Date, year: number, tzId: string): boolean {
  // Southern hemisphere DST (NZ, Melbourne, Sydney, Adelaide, Fiji, Samoa)
  // DST starts last Sun Sep/first Sun Oct, ends first Sun Apr
  if (['auckland', 'wellington'].includes(tzId)) {
    const dstEnd = nthSunday(year, 3, 1); // first Sun April
    dstEnd.setUTCHours(14, 0, 0, 0); // 3am NZDT = 14:00 UTC
    const dstStart = nthSunday(year, 8, -1); // last Sun Sep
    dstStart.setUTCHours(14, 0, 0, 0); // 2am NZST = 14:00 UTC
    return utcDate < dstEnd || utcDate >= dstStart;
  }

  if (['melbourne', 'sydney', 'adelaide'].includes(tzId)) {
    const dstEnd = nthSunday(year, 3, 1); // first Sun April
    dstEnd.setUTCHours(16, 0, 0, 0); // 3am AEDT = 16:00 UTC
    const dstStart = nthSunday(year, 9, 1); // first Sun October
    dstStart.setUTCHours(16, 0, 0, 0); // 2am AEST = 16:00 UTC
    return utcDate < dstEnd || utcDate >= dstStart;
  }

  if (tzId === 'fiji') {
    const dstEnd = nthSunday(year, 0, 3); // 3rd Sun Jan
    dstEnd.setUTCHours(14, 0, 0, 0);
    const dstStart = nthSunday(year, 10, 1); // 1st Sun Nov
    dstStart.setUTCHours(14, 0, 0, 0);
    return utcDate < dstEnd || utcDate >= dstStart;
  }

  if (tzId === 'samoa') {
    const dstEnd = nthSunday(year, 3, 1);
    dstEnd.setUTCHours(14, 0, 0, 0);
    const dstStart = nthSunday(year, 8, -1);
    dstStart.setUTCHours(14, 0, 0, 0);
    return utcDate < dstEnd || utcDate >= dstStart;
  }

  // Northern hemisphere DST (London, New York, LA)
  if (tzId === 'london') {
    const dstStart = nthSunday(year, 2, -1); // last Sun March
    dstStart.setUTCHours(1, 0, 0, 0);
    const dstEnd = nthSunday(year, 9, -1); // last Sun October
    dstEnd.setUTCHours(1, 0, 0, 0);
    return utcDate >= dstStart && utcDate < dstEnd;
  }

  if (['new_york', 'los_angeles'].includes(tzId)) {
    const dstStart = nthSunday(year, 2, 2); // 2nd Sun March
    dstStart.setUTCHours(tzId === 'new_york' ? 7 : 10, 0, 0, 0);
    const dstEnd = nthSunday(year, 10, 1); // 1st Sun November
    dstEnd.setUTCHours(tzId === 'new_york' ? 6 : 9, 0, 0, 0);
    return utcDate >= dstStart && utcDate < dstEnd;
  }

  return false;
}

function getDSTLabel(tzId: string, isDST: boolean): string {
  const labels: Record<string, [string, string]> = {
    auckland: ['NZST', 'NZDT'],
    wellington: ['NZST', 'NZDT'],
    melbourne: ['AEST', 'AEDT'],
    sydney: ['AEST', 'AEDT'],
    adelaide: ['ACST', 'ACDT'],
    brisbane: ['AEST', 'AEST'],
    perth: ['AWST', 'AWST'],
    fiji: ['FJT', 'FJST'],
    samoa: ['WST', 'WSDT'],
    tonga: ['TOT', 'TOT'],
    tokyo: ['JST', 'JST'],
    london: ['GMT', 'BST'],
    new_york: ['EST', 'EDT'],
    los_angeles: ['PST', 'PDT'],
  };
  const pair = labels[tzId] || ['UTC', 'UTC'];
  return isDST ? pair[1] : pair[0];
}

// ─── Format Time ────────────────────────────────────────────────────────────

export function formatTime(utc: string, offset: number): string {
  if (!utc) return '';
  const [dp, tp] = utc.split('T');
  const [y, mo, d] = dp.split('-').map(Number);
  const [h, m] = (tp || '00:00').split(':').map(Number);
  let mins = h * 60 + m + offset * 60;
  const date = new Date(y, mo - 1, d);
  if (mins >= 1440) { mins -= 1440; date.setDate(date.getDate() + 1); }
  if (mins < 0) { mins += 1440; date.setDate(date.getDate() - 1); }
  const hh = Math.floor(mins / 60) % 24;
  const mm = mins % 60;
  const ap = hh >= 12 ? 'pm' : 'am';
  const h12 = hh % 12 || 12;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return `${days[date.getDay()]} ${h12}${mm ? ':' + String(mm).padStart(2, '0') : ''}${ap}`;
}

export function getTimezoneDisplay(utc: string, tzId: string): TimezoneResult {
  const { offset, label, color } = getOffset(utc, tzId);
  return {
    time: formatTime(utc, offset),
    label,
    color,
  };
}

export function formatDate(utc: string): string {
  if (!utc) return '';
  const [dp] = utc.split('T');
  const [y, mo, d] = dp.split('-').map(Number);
  const date = new Date(y, mo - 1, d);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[date.getDay()]} ${d} ${months[mo - 1]}`;
}

export function getCountdown(utc: string): string | null {
  if (!utc) return null;
  const [dp, tp] = utc.split('T');
  const [y, mo, d] = dp.split('-').map(Number);
  const [h, m] = (tp || '00:00').split(':').map(Number);
  const eventDate = new Date(Date.UTC(y, mo - 1, d, h, m));
  const now = new Date();
  const diff = eventDate.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}
