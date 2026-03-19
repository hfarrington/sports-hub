// FixtureDownload.com fetcher — free JSON feeds for NRL and other leagues
import { FETCH_TIMEOUT } from '../config';

export interface FDMatch {
  MatchNumber: number;
  RoundNumber: number;
  DateUtc: string; // "2026-03-01 02:15:00Z"
  Location: string;
  HomeTeam: string;
  AwayTeam: string;
  Group: string | null;
  HomeTeamScore: number | null;
  AwayTeamScore: number | null;
}

/**
 * Fetch all matches for a league/season from FixtureDownload.com
 * Free, no auth, no rate limits documented.
 */
export async function fetchFixtureDownload(feedId: string): Promise<FDMatch[]> {
  const url = `https://fixturedownload.com/feed/json/${feedId}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`FixtureDownload returned ${res.status}`);
    }

    const data: FDMatch[] = await res.json();
    return data;
  } finally {
    clearTimeout(timeout);
  }
}
