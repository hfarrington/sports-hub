// API configuration and constants

export const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// World Rugby API — free, no auth
export const WORLD_RUGBY_BASE = 'https://api.wr-rims-prod.pulselive.com/rugby/v3';

// World Rugby competition labels (as returned by the API)
export const WR_COMPETITIONS: Record<string, { sportId: string; competitionId: string }> = {
  'Super Rugby 2026': { sportId: 'rugby', competitionId: 'super-rugby' },
  'Super Rugby 2027': { sportId: 'rugby', competitionId: 'super-rugby' },
  'Six Nations 2026': { sportId: 'rugby', competitionId: 'six-nations' },
  'Six Nations 2027': { sportId: 'rugby', competitionId: 'six-nations' },
  'U20 Six Nations 2026': { sportId: 'rugby', competitionId: 'six-nations' },
  "Men's Internationals 2026": { sportId: 'rugby', competitionId: 'internationals' },
  "Women's Internationals 2026": { sportId: 'rugby', competitionId: 'internationals' },
  "Men's Internationals 2027": { sportId: 'rugby', competitionId: 'internationals' },
  'URC 2026': { sportId: 'rugby', competitionId: 'super-rugby' }, // Map URC to rugby
};

// Ergast/Jolpi API — free, no auth
export const ERGAST_BASE = 'https://api.jolpi.ca/ergast/f1';

// Fetch timeout
export const FETCH_TIMEOUT = 8000; // 8 seconds
