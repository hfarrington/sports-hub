import type { Game } from './types';

// Sample games for MVP demo — these will be replaced by live API data
export const SAMPLE_GAMES: Game[] = [
  // ═══════════════════════════════════════════════════════════════════
  // MARCH 2026
  // ═══════════════════════════════════════════════════════════════════

  // ─── Past: Super Rugby Round 4 (Mar 14-15) ──────────────
  {
    id: 'sr-r4-1', sportId: 'rugby', competitionId: 'super-rugby',
    home: { id: 'hurricanes', name: 'Hurricanes', shortName: 'HUR', icon: '' },
    away: { id: 'highlanders', name: 'Highlanders', shortName: 'HIG', icon: '' },
    utc: '2026-03-14T07:05', venue: 'Sky Stadium', city: 'Wellington', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'final', homeScore: 38, awayScore: 17, round: 'Rd 4',
  },
  {
    id: 'sr-r4-2', sportId: 'rugby', competitionId: 'super-rugby',
    home: { id: 'blues', name: 'Blues', shortName: 'BLU', icon: '' },
    away: { id: 'crusaders', name: 'Crusaders', shortName: 'CRU', icon: '' },
    utc: '2026-03-14T04:35', venue: 'Eden Park', city: 'Auckland', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'final', homeScore: 24, awayScore: 21, round: 'Rd 4',
  },

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

  // ─── Super Rugby Round 6 (Mar 28-29) ──────────────
  {
    id: 'sr-r6-1', sportId: 'rugby', competitionId: 'super-rugby',
    home: { id: 'chiefs', name: 'Chiefs', shortName: 'CHI', icon: '' },
    away: { id: 'blues', name: 'Blues', shortName: 'BLU', icon: '' },
    utc: '2026-03-28T07:05', venue: 'FMG Stadium Waikato', city: 'Hamilton', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: 'Rd 6',
  },
  {
    id: 'sr-r6-2', sportId: 'rugby', competitionId: 'super-rugby',
    home: { id: 'hurricanes', name: 'Hurricanes', shortName: 'HUR', icon: '' },
    away: { id: 'crusaders', name: 'Crusaders', shortName: 'CRU', icon: '' },
    utc: '2026-03-28T04:35', venue: 'Sky Stadium', city: 'Wellington', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: 'Rd 6',
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

  // ─── NRL Round 4 (Mar 28-29) ──────────────
  {
    id: 'nrl-r4-1', sportId: 'nrl', competitionId: 'nrl-premiership',
    home: { id: 'panthers', name: 'Panthers', shortName: 'PAN', icon: '' },
    away: { id: 'warriors', name: 'Warriors', shortName: 'WAR', icon: '' },
    utc: '2026-03-28T07:30', venue: 'BlueBet Stadium', city: 'Penrith', country: 'Australia', countryFlag: '🇦🇺',
    status: 'upcoming', round: 'Rd 4',
  },
  {
    id: 'nrl-r4-2', sportId: 'nrl', competitionId: 'nrl-premiership',
    home: { id: 'roosters', name: 'Roosters', shortName: 'ROO', icon: '' },
    away: { id: 'storm', name: 'Storm', shortName: 'STO', icon: '' },
    utc: '2026-03-28T05:30', venue: 'Allianz Stadium', city: 'Sydney', country: 'Australia', countryFlag: '🇦🇺',
    status: 'upcoming', round: 'Rd 4',
  },

  // ─── F1 Australian GP (Mar 20-22) ──────────────
  {
    id: 'f1-aus-1', sportId: 'f1', competitionId: 'f1-championship',
    home: { id: 'f1-race', name: 'Australian GP', shortName: 'AUS', icon: '' },
    away: { id: 'f1-race', name: 'Race', shortName: 'RACE', icon: '' },
    utc: '2026-03-22T04:00', venue: 'Albert Park Circuit', city: 'Melbourne', country: 'Australia', countryFlag: '🇦🇺',
    status: 'upcoming', round: 'Race',
  },

  // ─── A-League (Mar 21) ──────────────
  {
    id: 'al-1', sportId: 'football', competitionId: 'a-league',
    home: { id: 'wellington-phoenix', name: 'Wellington Phoenix', shortName: 'WEL', icon: '' },
    away: { id: 'sydney-fc', name: 'Sydney FC', shortName: 'SYD', icon: '' },
    utc: '2026-03-21T06:00', venue: 'Sky Stadium', city: 'Wellington', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming',
  },

  // ─── NBA (Mar 22) ──────────────
  {
    id: 'nba-1', sportId: 'nba', competitionId: 'nba-season',
    home: { id: 'okc-thunder', name: 'Thunder', shortName: 'OKC', icon: '' },
    away: { id: 'la-lakers', name: 'Lakers', shortName: 'LAL', icon: '' },
    utc: '2026-03-22T01:00', venue: 'Paycom Center', city: 'Oklahoma City', country: 'USA', countryFlag: '🇺🇸',
    status: 'upcoming',
  },

  // ─── UFC 315 (Mar 22) ──────────────
  {
    id: 'ufc-1', sportId: 'ufc', competitionId: 'ufc-events',
    home: { id: 'ufc-main', name: 'UFC 315', shortName: 'UFC', icon: '' },
    away: { id: 'ufc-main', name: 'Main Card', shortName: 'MAIN', icon: '' },
    utc: '2026-03-22T02:00', venue: 'T-Mobile Arena', city: 'Las Vegas', country: 'USA', countryFlag: '🇺🇸',
    status: 'upcoming', round: 'Main Card',
  },

  // ═══════════════════════════════════════════════════════════════════
  // APRIL 2026
  // ═══════════════════════════════════════════════════════════════════

  // ─── Super Rugby Round 7 (Apr 4-5) ──────────────
  {
    id: 'sr-r7-1', sportId: 'rugby', competitionId: 'super-rugby',
    home: { id: 'blues', name: 'Blues', shortName: 'BLU', icon: '' },
    away: { id: 'hurricanes', name: 'Hurricanes', shortName: 'HUR', icon: '' },
    utc: '2026-04-04T07:05', venue: 'Eden Park', city: 'Auckland', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: 'Rd 7',
  },
  {
    id: 'sr-r7-2', sportId: 'rugby', competitionId: 'super-rugby',
    home: { id: 'reds', name: 'Reds', shortName: 'RED', icon: '' },
    away: { id: 'chiefs', name: 'Chiefs', shortName: 'CHI', icon: '' },
    utc: '2026-04-04T08:00', venue: 'Suncorp Stadium', city: 'Brisbane', country: 'Australia', countryFlag: '🇦🇺',
    status: 'upcoming', round: 'Rd 7',
  },

  // ─── Super Rugby Round 8 (Apr 11-12) ──────────────
  {
    id: 'sr-r8-1', sportId: 'rugby', competitionId: 'super-rugby',
    home: { id: 'hurricanes', name: 'Hurricanes', shortName: 'HUR', icon: '' },
    away: { id: 'waratahs', name: 'Waratahs', shortName: 'WAR', icon: '' },
    utc: '2026-04-11T07:05', venue: 'Sky Stadium', city: 'Wellington', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: 'Rd 8',
  },

  // ─── NRL Round 5 (Apr 4-5) ──────────────
  {
    id: 'nrl-r5-1', sportId: 'nrl', competitionId: 'nrl-premiership',
    home: { id: 'warriors', name: 'Warriors', shortName: 'WAR', icon: '' },
    away: { id: 'storm', name: 'Storm', shortName: 'STO', icon: '' },
    utc: '2026-04-04T05:00', venue: 'Go Media Stadium', city: 'Auckland', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: 'Rd 5',
  },
  {
    id: 'nrl-r5-2', sportId: 'nrl', competitionId: 'nrl-premiership',
    home: { id: 'sharks', name: 'Sharks', shortName: 'SHA', icon: '' },
    away: { id: 'broncos', name: 'Broncos', shortName: 'BRO', icon: '' },
    utc: '2026-04-04T07:30', venue: 'PointsBet Stadium', city: 'Sydney', country: 'Australia', countryFlag: '🇦🇺',
    status: 'upcoming', round: 'Rd 5',
  },

  // ─── NRL Round 6 (Apr 11-12) ──────────────
  {
    id: 'nrl-r6-1', sportId: 'nrl', competitionId: 'nrl-premiership',
    home: { id: 'bulldogs', name: 'Bulldogs', shortName: 'BUL', icon: '' },
    away: { id: 'warriors', name: 'Warriors', shortName: 'WAR', icon: '' },
    utc: '2026-04-11T07:30', venue: 'Accor Stadium', city: 'Sydney', country: 'Australia', countryFlag: '🇦🇺',
    status: 'upcoming', round: 'Rd 6',
  },

  // ─── F1 Japanese GP (Apr 4-5) ──────────────
  {
    id: 'f1-jpn-1', sportId: 'f1', competitionId: 'f1-championship',
    home: { id: 'f1-race', name: 'Japanese GP', shortName: 'JPN', icon: '' },
    away: { id: 'f1-race', name: 'Race', shortName: 'RACE', icon: '' },
    utc: '2026-04-05T06:00', venue: 'Suzuka Circuit', city: 'Suzuka', country: 'Japan', countryFlag: '🇯🇵',
    status: 'upcoming', round: 'Race',
  },

  // ─── A-League (Apr 4) ──────────────
  {
    id: 'al-2', sportId: 'football', competitionId: 'a-league',
    home: { id: 'auckland-fc', name: 'Auckland FC', shortName: 'AKL', icon: '' },
    away: { id: 'wellington-phoenix', name: 'Wellington Phoenix', shortName: 'WEL', icon: '' },
    utc: '2026-04-04T06:00', venue: 'Go Media Stadium', city: 'Auckland', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming',
  },

  // ─── UFC 316 (Apr 12) ──────────────
  {
    id: 'ufc-2', sportId: 'ufc', competitionId: 'ufc-events',
    home: { id: 'ufc-main', name: 'UFC 316', shortName: 'UFC', icon: '' },
    away: { id: 'ufc-main', name: 'Main Card', shortName: 'MAIN', icon: '' },
    utc: '2026-04-12T02:00', venue: 'Madison Square Garden', city: 'New York', country: 'USA', countryFlag: '🇺🇸',
    status: 'upcoming', round: 'Main Card',
  },

  // ─── NBA (Apr 5) ──────────────
  {
    id: 'nba-2', sportId: 'nba', competitionId: 'nba-season',
    home: { id: 'boston-celtics', name: 'Celtics', shortName: 'BOS', icon: '' },
    away: { id: 'golden-state', name: 'Warriors', shortName: 'GSW', icon: '' },
    utc: '2026-04-05T00:30', venue: 'TD Garden', city: 'Boston', country: 'USA', countryFlag: '🇺🇸',
    status: 'upcoming',
  },

  // ═══════════════════════════════════════════════════════════════════
  // MAY 2026
  // ═══════════════════════════════════════════════════════════════════

  // ─── Super Rugby Round 12 (May 2-3) ──────────────
  {
    id: 'sr-r12-1', sportId: 'rugby', competitionId: 'super-rugby',
    home: { id: 'hurricanes', name: 'Hurricanes', shortName: 'HUR', icon: '' },
    away: { id: 'reds', name: 'Reds', shortName: 'RED', icon: '' },
    utc: '2026-05-02T07:05', venue: 'Sky Stadium', city: 'Wellington', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: 'Rd 12',
  },

  // ─── NRL Round 9 (May 2-3) ──────────────
  {
    id: 'nrl-r9-1', sportId: 'nrl', competitionId: 'nrl-premiership',
    home: { id: 'warriors', name: 'Warriors', shortName: 'WAR', icon: '' },
    away: { id: 'cowboys', name: 'Cowboys', shortName: 'COW', icon: '' },
    utc: '2026-05-02T05:00', venue: 'Go Media Stadium', city: 'Auckland', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: 'Rd 9',
  },

  // ─── F1 Miami GP (May 2-3) ──────────────
  {
    id: 'f1-mia-1', sportId: 'f1', competitionId: 'f1-championship',
    home: { id: 'f1-race', name: 'Miami GP', shortName: 'MIA', icon: '' },
    away: { id: 'f1-race', name: 'Race', shortName: 'RACE', icon: '' },
    utc: '2026-05-03T20:00', venue: 'Miami International Autodrome', city: 'Miami', country: 'USA', countryFlag: '🇺🇸',
    status: 'upcoming', round: 'Race',
  },

  // ─── Cricket — Black Caps vs England (May 28) ──────────────
  {
    id: 'cri-1', sportId: 'cricket', competitionId: 'intl-cricket',
    home: { id: 'black-caps', name: 'Black Caps', shortName: 'NZ', icon: '' },
    away: { id: 'england-cricket', name: 'England', shortName: 'ENG', icon: '' },
    utc: '2026-05-28T22:00', venue: 'Basin Reserve', city: 'Wellington', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: '1st Test',
  },

  // ═══════════════════════════════════════════════════════════════════
  // JUNE 2026 — FIFA WORLD CUP STARTS
  // ═══════════════════════════════════════════════════════════════════

  // ─── Super Rugby Finals (Jun 6-7) ──────────────
  {
    id: 'sr-final-1', sportId: 'rugby', competitionId: 'super-rugby',
    home: { id: 'hurricanes', name: 'Hurricanes', shortName: 'HUR', icon: '' },
    away: { id: 'blues', name: 'Blues', shortName: 'BLU', icon: '' },
    utc: '2026-06-06T07:05', venue: 'Sky Stadium', city: 'Wellington', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: 'Semi Final',
  },

  // ─── FIFA World Cup 2026 (Jun 11+) ──────────────
  {
    id: 'wc-1', sportId: 'football', competitionId: 'wc-2026',
    home: { id: 'all-whites', name: 'All Whites', shortName: 'NZL', icon: '' },
    away: { id: 'wc-tbd', name: 'TBD', shortName: 'TBD', icon: '' },
    utc: '2026-06-14T17:00', venue: 'MetLife Stadium', city: 'New York', country: 'USA', countryFlag: '🇺🇸',
    status: 'upcoming', round: 'Group Stage',
  },
  {
    id: 'wc-2', sportId: 'football', competitionId: 'wc-2026',
    home: { id: 'socceroos', name: 'Socceroos', shortName: 'AUS', icon: '' },
    away: { id: 'wc-tbd', name: 'TBD', shortName: 'TBD', icon: '' },
    utc: '2026-06-15T20:00', venue: 'SoFi Stadium', city: 'Los Angeles', country: 'USA', countryFlag: '🇺🇸',
    status: 'upcoming', round: 'Group Stage',
  },

  // ─── NRL Round 14 (Jun 6-7) ──────────────
  {
    id: 'nrl-r14-1', sportId: 'nrl', competitionId: 'nrl-premiership',
    home: { id: 'warriors', name: 'Warriors', shortName: 'WAR', icon: '' },
    away: { id: 'sea-eagles', name: 'Sea Eagles', shortName: 'MAN', icon: '' },
    utc: '2026-06-06T05:00', venue: 'Go Media Stadium', city: 'Auckland', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: 'Rd 14',
  },

  // ─── NBA Finals (Jun) ──────────────
  {
    id: 'nba-finals-1', sportId: 'nba', competitionId: 'nba-season',
    home: { id: 'boston-celtics', name: 'Celtics', shortName: 'BOS', icon: '' },
    away: { id: 'okc-thunder', name: 'Thunder', shortName: 'OKC', icon: '' },
    utc: '2026-06-07T00:00', venue: 'TD Garden', city: 'Boston', country: 'USA', countryFlag: '🇺🇸',
    status: 'upcoming', round: 'NBA Finals G1',
  },

  // ═══════════════════════════════════════════════════════════════════
  // JULY 2026
  // ═══════════════════════════════════════════════════════════════════

  // ─── All Blacks July Tests ──────────────
  {
    id: 'ab-jul-1', sportId: 'rugby', competitionId: 'internationals',
    home: { id: 'all-blacks', name: 'All Blacks', shortName: 'NZL', icon: '' },
    away: { id: 'england-rugby', name: 'England', shortName: 'ENG', icon: '' },
    utc: '2026-07-04T07:05', venue: 'Eden Park', city: 'Auckland', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: '1st Test',
  },
  {
    id: 'ab-jul-2', sportId: 'rugby', competitionId: 'internationals',
    home: { id: 'all-blacks', name: 'All Blacks', shortName: 'NZL', icon: '' },
    away: { id: 'england-rugby', name: 'England', shortName: 'ENG', icon: '' },
    utc: '2026-07-11T07:05', venue: 'Sky Stadium', city: 'Wellington', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: '2nd Test',
  },
  {
    id: 'ab-jul-3', sportId: 'rugby', competitionId: 'internationals',
    home: { id: 'all-blacks', name: 'All Blacks', shortName: 'NZL', icon: '' },
    away: { id: 'england-rugby', name: 'England', shortName: 'ENG', icon: '' },
    utc: '2026-07-18T07:05', venue: 'Forsyth Barr Stadium', city: 'Dunedin', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: '3rd Test',
  },

  // ─── FIFA World Cup knockout rounds ──────────────
  {
    id: 'wc-r16', sportId: 'football', competitionId: 'wc-2026',
    home: { id: 'all-whites', name: 'All Whites', shortName: 'NZL', icon: '' },
    away: { id: 'wc-tbd', name: 'TBD', shortName: 'TBD', icon: '' },
    utc: '2026-07-04T20:00', venue: 'AT&T Stadium', city: 'Dallas', country: 'USA', countryFlag: '🇺🇸',
    status: 'upcoming', round: 'Round of 32',
  },

  // ─── F1 British GP (Jul 18-19) ──────────────
  {
    id: 'f1-gbr-1', sportId: 'f1', competitionId: 'f1-championship',
    home: { id: 'f1-race', name: 'British GP', shortName: 'GBR', icon: '' },
    away: { id: 'f1-race', name: 'Race', shortName: 'RACE', icon: '' },
    utc: '2026-07-19T14:00', venue: 'Silverstone Circuit', city: 'Silverstone', country: 'UK', countryFlag: '🇬🇧',
    status: 'upcoming', round: 'Race',
  },

  // ─── Wimbledon (Jun 29 – Jul 12) ──────────────
  {
    id: 'tennis-wim-1', sportId: 'tennis', competitionId: 'grand-slams',
    home: { id: 'wimbledon', name: 'Wimbledon', shortName: 'WIM', icon: '' },
    away: { id: 'wimbledon', name: "Men's Final", shortName: 'FINAL', icon: '' },
    utc: '2026-07-12T13:00', venue: 'Centre Court', city: 'London', country: 'UK', countryFlag: '🇬🇧',
    status: 'upcoming', round: "Men's Final",
  },

  // ─── NRL Round 18 (Jul 4-5) ──────────────
  {
    id: 'nrl-r18-1', sportId: 'nrl', competitionId: 'nrl-premiership',
    home: { id: 'storm', name: 'Storm', shortName: 'STO', icon: '' },
    away: { id: 'warriors', name: 'Warriors', shortName: 'WAR', icon: '' },
    utc: '2026-07-04T07:30', venue: 'AAMI Park', city: 'Melbourne', country: 'Australia', countryFlag: '🇦🇺',
    status: 'upcoming', round: 'Rd 18',
  },

  // ═══════════════════════════════════════════════════════════════════
  // AUGUST – OCTOBER 2026 (Rugby Championship, NRL Finals, F1)
  // ═══════════════════════════════════════════════════════════════════

  // ─── Rugby Championship ──────────────
  {
    id: 'rc-1', sportId: 'rugby', competitionId: 'internationals',
    home: { id: 'all-blacks', name: 'All Blacks', shortName: 'NZL', icon: '' },
    away: { id: 'springboks', name: 'Springboks', shortName: 'RSA', icon: '' },
    utc: '2026-08-15T07:05', venue: 'Eden Park', city: 'Auckland', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: 'RC Rd 1',
  },
  {
    id: 'rc-2', sportId: 'rugby', competitionId: 'internationals',
    home: { id: 'wallabies', name: 'Wallabies', shortName: 'AUS', icon: '' },
    away: { id: 'all-blacks', name: 'All Blacks', shortName: 'NZL', icon: '' },
    utc: '2026-08-22T08:00', venue: 'Stadium Australia', city: 'Sydney', country: 'Australia', countryFlag: '🇦🇺',
    status: 'upcoming', round: 'Bledisloe 1',
  },
  {
    id: 'rc-3', sportId: 'rugby', competitionId: 'internationals',
    home: { id: 'all-blacks', name: 'All Blacks', shortName: 'NZL', icon: '' },
    away: { id: 'wallabies', name: 'Wallabies', shortName: 'AUS', icon: '' },
    utc: '2026-09-05T07:05', venue: 'Sky Stadium', city: 'Wellington', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: 'Bledisloe 2',
  },

  // ─── NRL Finals (Sep-Oct) ──────────────
  {
    id: 'nrl-sf-1', sportId: 'nrl', competitionId: 'nrl-premiership',
    home: { id: 'warriors', name: 'Warriors', shortName: 'WAR', icon: '' },
    away: { id: 'panthers', name: 'Panthers', shortName: 'PAN', icon: '' },
    utc: '2026-09-12T07:30', venue: 'Go Media Stadium', city: 'Auckland', country: 'New Zealand', countryFlag: '🇳🇿',
    status: 'upcoming', round: 'Qualifying Final',
  },

  // ─── F1 Singapore GP (Oct 3-4) ──────────────
  {
    id: 'f1-sgp-1', sportId: 'f1', competitionId: 'f1-championship',
    home: { id: 'f1-race', name: 'Singapore GP', shortName: 'SGP', icon: '' },
    away: { id: 'f1-race', name: 'Race', shortName: 'RACE', icon: '' },
    utc: '2026-10-04T12:00', venue: 'Marina Bay Street Circuit', city: 'Singapore', country: 'Singapore', countryFlag: '🇸🇬',
    status: 'upcoming', round: 'Race',
  },

  // ─── UFC 320 (Oct 11) ──────────────
  {
    id: 'ufc-3', sportId: 'ufc', competitionId: 'ufc-events',
    home: { id: 'ufc-main', name: 'UFC 320', shortName: 'UFC', icon: '' },
    away: { id: 'ufc-main', name: 'Main Card', shortName: 'MAIN', icon: '' },
    utc: '2026-10-11T02:00', venue: 'RAC Arena', city: 'Perth', country: 'Australia', countryFlag: '🇦🇺',
    status: 'upcoming', round: 'Main Card',
  },
];
