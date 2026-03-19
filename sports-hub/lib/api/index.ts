// Main aggregator — fetches from all sport APIs and merges into Game[]
import type { Game } from '@/lib/types';
import { cacheGet, cacheSet, cacheGetStale } from './cache';
import { CACHE_TTL } from './config';
import { fetchWorldRugbyMatches } from './fetchers/world-rugby';
import { mapWorldRugbyMatches } from './mappers/world-rugby';
import { fetchF1Schedule, fetchF1Results } from './fetchers/ergast';
import { mapF1Races } from './mappers/ergast';
import { fetchFixtureDownload } from './fetchers/fixturedownload';
import { mapFixtureDownloadMatches } from './mappers/fixturedownload';
import { SAMPLE_GAMES } from '@/lib/sample-data';

/**
 * Fetch rugby games from World Rugby API.
 * Covers Super Rugby, Six Nations, and International Tests.
 */
async function fetchRugbyGames(): Promise<Game[]> {
  const cacheKey = 'rugby-games';
  const cached = cacheGet<Game[]>(cacheKey);
  if (cached) return cached;

  try {
    // Fetch a wide window: 8 weeks back + 26 weeks forward (~6 months)
    const now = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() - 56);
    const end = new Date(now);
    end.setDate(end.getDate() + 182);

    const startStr = start.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];

    const matches = await fetchWorldRugbyMatches(startStr, endStr);
    const games = mapWorldRugbyMatches(matches);

    cacheSet(cacheKey, games, CACHE_TTL);
    return games;
  } catch (error) {
    console.error('[API] World Rugby fetch failed:', error);
    // Try stale cache first, then fall back to sample data
    const stale = cacheGetStale<Game[]>(cacheKey);
    if (stale) return stale;
    return SAMPLE_GAMES.filter(g => g.sportId === 'rugby');
  }
}

/**
 * Fetch F1 games from Ergast/Jolpi API.
 */
async function fetchF1Games(): Promise<Game[]> {
  const year = new Date().getFullYear();
  const cacheKey = `f1-games-${year}`;
  const cached = cacheGet<Game[]>(cacheKey);
  if (cached) return cached;

  try {
    // Fetch schedule and results in parallel
    const [schedule, results] = await Promise.all([
      fetchF1Schedule(year),
      fetchF1Results(year),
    ]);

    const games = mapF1Races(schedule, results);
    cacheSet(cacheKey, games, CACHE_TTL);
    return games;
  } catch (error) {
    console.error('[API] Ergast F1 fetch failed:', error);
    const stale = cacheGetStale<Game[]>(cacheKey);
    if (stale) return stale;
    return SAMPLE_GAMES.filter(g => g.sportId === 'f1');
  }
}

/**
 * Fetch NRL games from FixtureDownload.com — free, no auth.
 */
async function fetchNRLGames(): Promise<Game[]> {
  const cacheKey = 'nrl-games';
  const cached = cacheGet<Game[]>(cacheKey);
  if (cached) return cached;

  try {
    const matches = await fetchFixtureDownload('nrl-2026');
    const games = mapFixtureDownloadMatches(matches, 'nrl', 'nrl-premiership');
    cacheSet(cacheKey, games, CACHE_TTL);
    return games;
  } catch (error) {
    console.error('[API] FixtureDownload NRL fetch failed:', error);
    const stale = cacheGetStale<Game[]>(cacheKey);
    if (stale) return stale;
    return SAMPLE_GAMES.filter(g => g.sportId === 'nrl');
  }
}

/**
 * Get sample data for sports without live APIs yet (Football)
 */
function getSampleOnlyGames(): Game[] {
  const liveApiSports = new Set(['rugby', 'f1', 'nrl']);
  const supportedSports = new Set(['rugby', 'f1', 'nrl', 'football']);
  return SAMPLE_GAMES.filter(g => !liveApiSports.has(g.sportId) && supportedSports.has(g.sportId));
}

/**
 * Fetch all games from all available APIs.
 * Uses Promise.allSettled so one failing API doesn't block others.
 */
export async function fetchAllGames(): Promise<Game[]> {
  const results = await Promise.allSettled([
    fetchRugbyGames(),
    fetchF1Games(),
    fetchNRLGames(),
  ]);

  const allGames: Game[] = [];

  for (const result of results) {
    if (result.status === 'fulfilled') {
      allGames.push(...result.value);
    }
  }

  // Add sample data for sports without live APIs
  allGames.push(...getSampleOnlyGames());

  return allGames;
}
