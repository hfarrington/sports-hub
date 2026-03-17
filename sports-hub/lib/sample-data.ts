import type { Game } from './types';

// Sample games for MVP demo — these will be replaced by live API data
export const SAMPLE_GAMES: Game[] = [
  // ─── Super Rugby Round 5 (Mar 21-22) ──────────────
  {
    id: 'sr-r5-1', sportId: 'rugby', competitionId: 'super-rugby',
    home: { id: 'hurricanes', name: 'Hurricanes', shortName: 'HUR', icon: '' },
    away: { id: 'chiefs', name: 'Chiefs', shortName: 'CHI', icon: '' },
    utc: '2026-03-20T07:05', venue: 'Sky Stadium', city: 'Wellington', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: 'Rd 5',
  },
  {
    id: 'sr-r5-2', sportId: 'rugby', competitionId: 'super-rugby',
    home: { id: 'blues', name: 'Blues', shortName: 'BLU', icon: '' },
    away: { id: 'reds', name: 'Reds', shortName: 'RED', icon: '' },
    utc: '2026-03-21T07:05', venue: 'Eden Park', city: 'Auckland', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: 'Rd 5',
  },
  {
    id: 'sr-r5-3', sportId: 'rugby', competitionId: 'super-rugby',
    home: { id: 'crusaders', name: 'Crusaders', shortName: 'CRU', icon: '' },
    away: { id: 'brumbies', name: 'Brumbies', shortName: 'BRU', icon: '' },
    utc: '2026-03-21T04:35', venue: 'Orangetheory Stadium', city: 'Christchurch', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: 'Rd 5',
  },
  {
    id: 'sr-r5-4', sportId: 'rugby', competitionId: 'super-rugby',
    home: { id: 'highlanders', name: 'Highlanders', shortName: 'HIG', icon: '' },
    away: { id: 'waratahs', name: 'Waratahs', shortName: 'WAR', icon: '' },
    utc: '2026-03-22T04:35', venue: 'Forsyth Barr Stadium', city: 'Dunedin', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: 'Rd 5',
  },
  // Past Super Rugby Round 4
  {
    id: 'sr-r4-1', sportId: 'rugby', competitionId: 'super-rugby',
    home: { id: 'hurricanes', name: 'Hurricanes', shortName: 'HUR', icon: '' },
    away: { id: 'highlanders', name: 'Highlanders', shortName: 'HIG', icon: '' },
    utc: '2026-03-14T07:05', venue: 'Sky Stadium', city: 'Wellington', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'final', homeScore: 38, awayScore: 17, round: 'Rd 4',
  },

  // ─── NRL Round 3 (Mar 21-22) ──────────────
  {
    id: 'nrl-r3-1', sportId: 'nrl', competitionId: 'nrl-premiership',
    home: { id: 'warriors', name: 'Warriors', shortName: 'WAR', icon: '' },
    away: { id: 'roosters', name: 'Roosters', shortName: 'ROO', icon: '' },
    utc: '2026-03-21T05:00', venue: 'Go Media Stadium', city: 'Auckland', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: 'Rd 3',
  },
  {
    id: 'nrl-r3-2', sportId: 'nrl', competitionId: 'nrl-premiership',
    home: { id: 'storm', name: 'Storm', shortName: 'STO', icon: '' },
    away: { id: 'panthers', name: 'Panthers', shortName: 'PAN', icon: '' },
    utc: '2026-03-21T07:30', venue: 'AAMI Park', city: 'Melbourne', country: 'Australia', countryFlag: '🇦🇺',
    status: 'upcoming', round: 'Rd 3',
  },
  {
    id: 'nrl-r3-3', sportId: 'nrl', competitionId: 'nrl-premiership',
    home: { id: 'broncos', name: 'Broncos', shortName: 'BRO', icon: '' },
    away: { id: 'sharks', name: 'Sharks', shortName: 'SHA', icon: '' },
    utc: '2026-03-22T06:00', venue: 'Suncorp Stadium', city: 'Brisbane', country: 'Australia', countryFlag: '🇦🇺',
    status: 'upcoming', round: 'Rd 3',
  },

  // ─── F1 Australian GP (Mar 20-22) ──────────────
  {
    id: 'f1-aus-1', sportId: 'f1', competitionId: 'f1-championship',
    home: { id: 'f1-race', name: 'Australian GP', shortName: 'AUS', icon: '' },
    away: { id: 'f1-race', name: 'Race', shortName: 'RACE', icon: '' },
    utc: '2026-03-22T04:00', venue: 'Albert Park Circuit', city: 'Melbourne', country: 'Australia', countryFlag: '🇦🇺',
    status: 'upcoming', round: 'Race',
    comment: 'Qualifying Sat 04:00 UTC | Race Sun 04:00 UTC',
  },

  // ─── Cricket — Black Caps ──────────────
  {
    id: 'cri-1', sportId: 'cricket', competitionId: 'intl-cricket',
    home: { id: 'black-caps', name: 'Black Caps', shortName: 'NZ', icon: '' },
    away: { id: 'england-cricket', name: 'England', shortName: 'ENG', icon: '' },
    utc: '2026-05-28T10:00', venue: 'Basin Reserve', city: 'Wellington', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: '1st Test',
  },

  // ─── A-League ──────────────
  {
    id: 'al-1', sportId: 'football', competitionId: 'a-league',
    home: { id: 'wellington-phoenix', name: 'Wellington Phoenix', shortName: 'WEL', icon: '' },
    away: { id: 'sydney-fc', name: 'Sydney FC', shortName: 'SYD', icon: '' },
    utc: '2026-03-21T06:00', venue: 'Sky Stadium', city: 'Wellington', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming',
  },

  // ─── NBA ──────────────
  {
    id: 'nba-1', sportId: 'nba', competitionId: 'nba-season',
    home: { id: 'okc-thunder', name: 'Thunder', shortName: 'OKC', icon: '' },
    away: { id: 'la-lakers', name: 'Lakers', shortName: 'LAL', icon: '' },
    utc: '2026-03-22T01:00', venue: 'Paycom Center', city: 'Oklahoma City', country: 'USA', countryFlag: '🇺🇸',
    status: 'upcoming',
  },

  // ─── UFC ──────────────
  {
    id: 'ufc-1', sportId: 'ufc', competitionId: 'ufc-events',
    home: { id: 'ufc-main', name: 'UFC 315', shortName: 'UFC', icon: '' },
    away: { id: 'ufc-main', name: 'Main Card', shortName: 'MAIN', icon: '' },
    utc: '2026-03-22T02:00', venue: 'T-Mobile Arena', city: 'Las Vegas', country: 'USA', countryFlag: '🇺🇸',
    status: 'upcoming', round: 'Main Card',
  },
];
