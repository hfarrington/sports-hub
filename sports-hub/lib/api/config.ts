// API configuration and constants

export const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// World Rugby API — free, no auth
export const WORLD_RUGBY_BASE = 'https://api.wr-rims-prod.pulselive.com/rugby/v3';

// World Rugby competition labels — known mappings to our competition IDs
// Any competition NOT listed here will be auto-mapped with a generated ID
export const WR_KNOWN_COMPETITIONS: Record<string, string> = {
  'Super Rugby': 'super-rugby',
  'Six Nations': 'six-nations',
  'U20 Six Nations': 'six-nations',
  "Men's Internationals": 'internationals',
  "Women's Internationals": 'internationals',
  'URC': 'urc',
  'Premiership Rugby Cup': 'english-premiership',
  'Gallagher Prem': 'english-premiership',
  'Top 14': 'top-14',
  'Pro D2': 'pro-d2',
  'Japan League One': 'japan-league-one',
  'Currie Cup': 'currie-cup',
  'NPC': 'npc',
  'Mitre 10 Cup': 'npc',
  'Super Rugby Americas': 'super-rugby-americas',
  'Rugby Europe International Championship': 'rugby-europe',
  'Celtic Challenge': 'celtic-challenge',
  "Men's Sevens Series": 'sevens',
  "Women's Sevens Series": 'sevens-women',
};

// Ergast/Jolpi API — free, no auth
export const ERGAST_BASE = 'https://api.jolpi.ca/ergast/f1';

// Fetch timeout
export const FETCH_TIMEOUT = 8000; // 8 seconds
