// World Rugby API fetcher — free, no auth required
import { WORLD_RUGBY_BASE, FETCH_TIMEOUT } from '../config';

export interface WRMatch {
  matchId: string;
  status: string; // 'U' = upcoming, 'L' = live, 'C' = complete, 'LT' = live text
  time: {
    label: string; // ISO date
    millis: number;
    gmtOffset: number;
  };
  events: Array<{
    id: string;
    label: string; // competition name e.g. "Super Rugby 2026"
  }>;
  teams: Array<{
    id: string | number;
    name: string;
    abbreviation?: string;
    score?: number;
  }>;
  venue?: {
    name: string;
    city: string;
    country: string;
  };
}

interface WRResponse {
  content: WRMatch[];
  totalElements: number;
  totalPages: number;
}

/**
 * Fetch matches from the World Rugby API within a date range.
 * Returns up to 100 matches sorted by date.
 */
export async function fetchWorldRugbyMatches(
  startDate: string, // YYYY-MM-DD
  endDate: string,    // YYYY-MM-DD
): Promise<WRMatch[]> {
  const url = `${WORLD_RUGBY_BASE}/match?startDate=${startDate}&endDate=${endDate}&sort=asc&pageSize=100`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`World Rugby API returned ${res.status}`);
    }

    const data: WRResponse = await res.json();
    return data.content || [];
  } finally {
    clearTimeout(timeout);
  }
}
