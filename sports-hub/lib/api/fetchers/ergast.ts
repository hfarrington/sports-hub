// Ergast/Jolpi API fetcher — F1 schedule and results, free, no auth
import { ERGAST_BASE, FETCH_TIMEOUT } from '../config';

export interface ErgastRace {
  season: string;
  round: string;
  raceName: string;
  Circuit: {
    circuitId: string;
    circuitName: string;
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
    };
  };
  date: string; // YYYY-MM-DD
  time?: string; // HH:MM:SSZ
  Results?: Array<{
    position: string;
    Driver: {
      driverId: string;
      givenName: string;
      familyName: string;
      code: string;
    };
    Constructor: {
      constructorId: string;
      name: string;
    };
    Time?: { time: string };
    status: string;
    points: string;
  }>;
}

interface ErgastResponse {
  MRData: {
    RaceTable: {
      season: string;
      Races: ErgastRace[];
    };
  };
}

async function ergastFetch(path: string): Promise<ErgastResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const res = await fetch(`${ERGAST_BASE}${path}`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error(`Ergast API returned ${res.status}`);
    return res.json();
  } finally {
    clearTimeout(timeout);
  }
}

/** Fetch the full F1 race schedule for a season */
export async function fetchF1Schedule(year: number): Promise<ErgastRace[]> {
  const data = await ergastFetch(`/${year}/races/`);
  return data.MRData.RaceTable.Races;
}

/** Fetch F1 race results for a season (only completed races) */
export async function fetchF1Results(year: number): Promise<ErgastRace[]> {
  const data = await ergastFetch(`/${year}/results/`);
  return data.MRData.RaceTable.Races;
}
