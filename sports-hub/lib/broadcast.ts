// ─── Countries ──────────────────────────────────────────────────────────────

export interface Country {
  id: string;
  name: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { id: 'nz', name: 'New Zealand', flag: '🇳🇿' },
  { id: 'au', name: 'Australia', flag: '🇦🇺' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
  { id: 'us', name: 'United States', flag: '🇺🇸' },
  { id: 'fj', name: 'Fiji', flag: '🇫🇯' },
  { id: 'ws', name: 'Samoa', flag: '🇼🇸' },
  { id: 'to', name: 'Tonga', flag: '🇹🇴' },
  { id: 'za', name: 'South Africa', flag: '🇿🇦' },
  { id: 'jp', name: 'Japan', flag: '🇯🇵' },
  { id: 'ie', name: 'Ireland', flag: '🇮🇪' },
  { id: 'fr', name: 'France', flag: '🇫🇷' },
];

// ─── Broadcaster Info ────────────────────────────────────────────────────────

export interface BroadcasterInfo {
  name: string;
  url: string;
}

// Maps broadcaster name → streaming URL (primary platform for each)
export const BROADCASTER_URLS: Record<string, string> = {
  'Sky Sport NZ': 'https://www.skysport.co.nz',
  'Stan Sport': 'https://www.stan.com.au/sport',
  'TNT Sports': 'https://www.tntsports.co.uk',
  'Peacock': 'https://www.peacocktv.com',
  'SuperSport': 'https://supersport.com',
  'FBC TV': 'https://www.fbcnews.com.fj',
  'J Sports': 'https://www.jsports.co.jp',
  'RTÉ / Virgin Media': 'https://www.rte.ie/sport',
  'France TV / Canal+': 'https://www.canalplus.com',
  'Fox League / Channel 9': 'https://www.9now.com.au',
  'Sky Sports': 'https://www.skysports.com',
  'Fox Soccer Plus': 'https://www.foxsports.com',
  'Spark Sport': 'https://www.spark.co.nz/sport',
  'Fox Sports / Kayo': 'https://kayosports.com.au',
  'Sky Sports F1': 'https://www.skysports.com/f1',
  'ESPN': 'https://www.espn.com',
  'DAZN / Fuji TV': 'https://www.dazn.com',
  'Fox Cricket / Kayo': 'https://kayosports.com.au',
  'Sky Sports Cricket': 'https://www.skysports.com/cricket',
  'Willow TV': 'https://www.willow.tv',
  'Paramount+ / 10 Play': 'https://www.paramountplus.com/au',
  'ITV / BBC (WC) / Paramount+': 'https://www.itv.com/hub',
  'Fox / Telemundo (WC) / Apple TV': 'https://tv.apple.com/mls',
  'Sky Sport NZ / NBA League Pass': 'https://www.skysport.co.nz',
  'ESPN / Kayo': 'https://kayosports.com.au',
  'Sky Sports / NBA League Pass': 'https://www.nba.com/watch',
  'ESPN / TNT / ABC': 'https://www.espn.com',
  'ESPN / NFL Game Pass': 'https://www.nfl.com/gamepass',
  'Sky Sports NFL / ITV': 'https://www.skysports.com/nfl',
  'Fox / CBS / NBC / ESPN / Amazon': 'https://www.nfl.com/watch',
  'Channel 9 / Stan Sport': 'https://www.stan.com.au/sport',
  'BBC (Wimbledon) / Eurosport': 'https://www.bbc.co.uk/sport/tennis',
  'ESPN / Tennis Channel': 'https://www.espn.com/tennis',
  'UFC Fight Pass / Kayo': 'https://www.ufc.com/fight-pass',
  'ESPN+ / PPV': 'https://plus.espn.com',
};

// ─── Default Broadcast by Sport + Country ───────────────────────────────────
// Maps sportId → countryId → default broadcaster name
// Used as fallback when a game doesn't have specific broadcast info

export const DEFAULT_BROADCASTS: Record<string, Record<string, string>> = {
  rugby: {
    nz: 'Sky Sport NZ',
    au: 'Stan Sport',
    uk: 'TNT Sports',
    us: 'Peacock',
    za: 'SuperSport',
    fj: 'FBC TV',
    jp: 'J Sports',
    ie: 'RTÉ / Virgin Media',
    fr: 'France TV / Canal+',
  },
  nrl: {
    nz: 'Sky Sport NZ',
    au: 'Fox League / Channel 9',
    uk: 'Sky Sports',
    us: 'Fox Soccer Plus',
  },
  f1: {
    nz: 'Spark Sport',
    au: 'Fox Sports / Kayo',
    uk: 'Sky Sports F1',
    us: 'ESPN',
    jp: 'DAZN / Fuji TV',
  },
  cricket: {
    nz: 'Spark Sport',
    au: 'Fox Cricket / Kayo',
    uk: 'Sky Sports Cricket',
    us: 'Willow TV',
  },
  football: {
    nz: 'Sky Sport NZ',
    au: 'Paramount+ / 10 Play',
    uk: 'ITV / BBC (WC) / Paramount+',
    us: 'Fox / Telemundo (WC) / Apple TV',
  },
  nba: {
    nz: 'Sky Sport NZ / NBA League Pass',
    au: 'ESPN / Kayo',
    uk: 'Sky Sports / NBA League Pass',
    us: 'ESPN / TNT / ABC',
  },
  nfl: {
    nz: 'ESPN / NFL Game Pass',
    au: 'ESPN / Kayo',
    uk: 'Sky Sports NFL / ITV',
    us: 'Fox / CBS / NBC / ESPN / Amazon',
  },
  tennis: {
    nz: 'Sky Sport NZ',
    au: 'Channel 9 / Stan Sport',
    uk: 'BBC (Wimbledon) / Eurosport',
    us: 'ESPN / Tennis Channel',
  },
  ufc: {
    nz: 'Sky Sport NZ',
    au: 'UFC Fight Pass / Kayo',
    uk: 'TNT Sports',
    us: 'ESPN+ / PPV',
  },
};

export function getBroadcast(
  sportId: string,
  countryId: string,
  gameBroadcast?: Record<string, string>
): BroadcasterInfo | null {
  const name = gameBroadcast?.[countryId] || DEFAULT_BROADCASTS[sportId]?.[countryId];
  if (!name) return null;
  return { name, url: BROADCASTER_URLS[name] || '' };
}
