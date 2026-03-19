import type { Sport } from './types';

// TheSportsDB base URL for team badges
const TSDB = 'https://www.thesportsdb.com/images/media/team/badge';

export const SPORTS: Sport[] = [
  {
    id: 'rugby',
    name: 'Rugby',
    icon: '/icons/rugby.svg',
    accent: '#00c9ff',
    competitions: [
      {
        id: 'super-rugby',
        name: 'Super Rugby Pacific',
        icon: '/icons/super-rugby.svg',
        teams: [
          { id: 'blues', name: 'Blues', shortName: 'BLU', icon: `${TSDB}/xvwyrx1473450037.png`, accent: '#003087' },
          { id: 'chiefs', name: 'Chiefs', shortName: 'CHI', icon: `${TSDB}/yvxsqq1473450051.png`, accent: '#ffd700' },
          { id: 'hurricanes', name: 'Hurricanes', shortName: 'HUR', icon: `${TSDB}/sqxqwp1473450065.png`, accent: '#FFD100' },
          { id: 'crusaders', name: 'Crusaders', shortName: 'CRU', icon: `${TSDB}/qpxwrr1473450023.png`, accent: '#cc0000' },
          { id: 'highlanders', name: 'Highlanders', shortName: 'HIG', icon: `${TSDB}/upxyrq1473450079.png`, accent: '#002B5C' },
          { id: 'reds', name: 'Reds', shortName: 'RED', icon: `${TSDB}/wuttpt1473450093.png`, accent: '#cc0000' },
          { id: 'brumbies', name: 'Brumbies', shortName: 'BRU', icon: `${TSDB}/rxxvqt1473450009.png`, accent: '#002B5C' },
          { id: 'waratahs', name: 'Waratahs', shortName: 'WAR', icon: `${TSDB}/wwwyxy1473450107.png`, accent: '#0055A4' },
          { id: 'western-force', name: 'Western Force', shortName: 'FOR', icon: `${TSDB}/xqyrqp1473450121.png`, accent: '#002B5C' },
          { id: 'fijian-drua', name: 'Fijian Drua', shortName: 'FDR', icon: '/icons/fijian-drua.svg', accent: '#009639' },
          { id: 'moana-pasifika', name: 'Moana Pasifika', shortName: 'MPA', icon: '/icons/moana-pasifika.svg', accent: '#003DA5' },
        ],
      },
      {
        id: 'internationals',
        name: 'International Tests',
        icon: '/icons/rugby-intl.svg',
        teams: [
          { id: 'all-blacks', name: 'All Blacks', shortName: 'NZL', icon: `${TSDB}/wwqxyy1473449326.png`, accent: '#000000' },
          { id: 'wallabies', name: 'Wallabies', shortName: 'AUS', icon: `${TSDB}/swtxyt1473449312.png`, accent: '#FFB81C' },
          { id: 'springboks', name: 'Springboks', shortName: 'RSA', icon: `${TSDB}/xqtyrw1473449340.png`, accent: '#00703c' },
          { id: 'england-rugby', name: 'England', shortName: 'ENG', icon: `${TSDB}/swwpyx1473449283.png`, accent: '#ffffff' },
          { id: 'france-rugby', name: 'France', shortName: 'FRA', icon: `${TSDB}/qvsrvw1473449297.png`, accent: '#002654' },
          { id: 'ireland-rugby', name: 'Ireland', shortName: 'IRE', icon: `${TSDB}/tuxyrq1473449254.png`, accent: '#009A49' },
        ],
      },
      {
        id: 'six-nations',
        name: 'Six Nations',
        icon: '/icons/six-nations.svg',
        teams: [
          { id: 'england-6n', name: 'England', shortName: 'ENG', icon: `${TSDB}/swwpyx1473449283.png` },
          { id: 'france-6n', name: 'France', shortName: 'FRA', icon: `${TSDB}/qvsrvw1473449297.png` },
          { id: 'ireland-6n', name: 'Ireland', shortName: 'IRE', icon: `${TSDB}/tuxyrq1473449254.png` },
          { id: 'italy-6n', name: 'Italy', shortName: 'ITA', icon: '/icons/italy-rugby.svg' },
          { id: 'scotland-6n', name: 'Scotland', shortName: 'SCO', icon: '/icons/scotland-rugby.svg' },
          { id: 'wales-6n', name: 'Wales', shortName: 'WAL', icon: '/icons/wales-rugby.svg' },
        ],
      },
      {
        id: 'rwc-2027',
        name: 'RWC 2027',
        icon: '/icons/rwc.svg',
        teams: [],
      },
    ],
  },
  {
    id: 'nrl',
    name: 'NRL',
    icon: '/icons/nrl.svg',
    accent: '#b0ff4e',
    competitions: [
      {
        id: 'nrl-premiership',
        name: 'NRL Premiership',
        icon: '/icons/nrl.svg',
        teams: [
          { id: 'warriors', name: 'Warriors', shortName: 'WAR', icon: `${TSDB}/ppwutu1578753498.png`, accent: '#003a70' },
          { id: 'roosters', name: 'Sydney Roosters', shortName: 'ROO', icon: `${TSDB}/prxuyw1578753563.png`, accent: '#cc0000' },
          { id: 'storm', name: 'Melbourne Storm', shortName: 'STO', icon: `${TSDB}/strswr1578753510.png`, accent: '#562A8A' },
          { id: 'panthers', name: 'Penrith Panthers', shortName: 'PAN', icon: `${TSDB}/qxpvtw1578753546.png`, accent: '#2D3A4F' },
          { id: 'broncos', name: 'Brisbane Broncos', shortName: 'BRO', icon: `${TSDB}/uwwxqw1578753443.png`, accent: '#6E1A3A' },
          { id: 'rabbitohs', name: 'South Sydney Rabbitohs', shortName: 'SOU', icon: `${TSDB}/wvvrvy1578753557.png`, accent: '#003B2A' },
          { id: 'sea-eagles', name: 'Manly Sea Eagles', shortName: 'MAN', icon: `${TSDB}/rsqyyp1578753504.png`, accent: '#6E1A3A' },
          { id: 'sharks', name: 'Cronulla Sharks', shortName: 'SHA', icon: `${TSDB}/vuqpyq1578753462.png`, accent: '#009FDF' },
          { id: 'cowboys', name: 'North Qld Cowboys', shortName: 'COW', icon: `${TSDB}/twuqsy1578753526.png`, accent: '#002B5C' },
          { id: 'eels', name: 'Parramatta Eels', shortName: 'EEL', icon: `${TSDB}/svyxxp1578753539.png`, accent: '#0055A4' },
          { id: 'knights', name: 'Newcastle Knights', shortName: 'KNI', icon: `${TSDB}/usypvx1578753519.png`, accent: '#cc0000' },
          { id: 'dragons', name: 'St George Dragons', shortName: 'DRA', icon: `${TSDB}/vswqrp1578753571.png`, accent: '#cc0000' },
          { id: 'raiders', name: 'Canberra Raiders', shortName: 'RAI', icon: `${TSDB}/xtrwsp1578753455.png`, accent: '#00703c' },
          { id: 'titans', name: 'Gold Coast Titans', shortName: 'TIT', icon: `${TSDB}/ywvvqu1578753476.png`, accent: '#0055A4' },
          { id: 'bulldogs', name: 'Canterbury Bulldogs', shortName: 'BUL', icon: `${TSDB}/vvxwuy1578753449.png`, accent: '#004B87' },
          { id: 'tigers', name: 'Wests Tigers', shortName: 'TIG', icon: `${TSDB}/ruyxvq1578753580.png`, accent: '#F47920' },
          { id: 'dolphins', name: 'Dolphins', shortName: 'DOL', icon: '/icons/dolphins.svg', accent: '#cc0000' },
        ],
      },
    ],
  },
  {
    id: 'f1',
    name: 'Formula 1',
    icon: '/icons/f1.svg',
    accent: '#ff1801',
    competitions: [
      {
        id: 'f1-championship',
        name: 'F1 World Championship',
        icon: '/icons/f1.svg',
        teams: [
          { id: 'mclaren', name: 'McLaren', shortName: 'MCL', icon: '/icons/mclaren.svg', accent: '#FF8000' },
          { id: 'red-bull', name: 'Red Bull Racing', shortName: 'RBR', icon: '/icons/redbull.svg', accent: '#3671C6' },
          { id: 'ferrari', name: 'Ferrari', shortName: 'FER', icon: '/icons/ferrari.svg', accent: '#E8002D' },
          { id: 'mercedes', name: 'Mercedes', shortName: 'MER', icon: '/icons/mercedes.svg', accent: '#27F4D2' },
          { id: 'aston-martin', name: 'Aston Martin', shortName: 'AMR', icon: '/icons/aston-martin.svg', accent: '#006F62' },
          { id: 'alpine', name: 'Alpine', shortName: 'ALP', icon: '/icons/alpine.svg', accent: '#FF87BC' },
          { id: 'williams', name: 'Williams', shortName: 'WIL', icon: '/icons/williams.svg', accent: '#64C4FF' },
          { id: 'haas', name: 'Haas', shortName: 'HAA', icon: '/icons/haas.svg', accent: '#B6BABD' },
          { id: 'rb', name: 'RB', shortName: 'RB', icon: '/icons/rb.svg', accent: '#6692FF' },
          { id: 'sauber', name: 'Sauber', shortName: 'SAU', icon: '/icons/sauber.svg', accent: '#52E252' },
        ],
      },
    ],
  },
  {
    id: 'football',
    name: 'Football',
    icon: '/icons/football.svg',
    accent: '#5b21b6',
    competitions: [
      {
        id: 'a-league',
        name: 'A-League',
        icon: '/icons/a-league.svg',
        teams: [
          { id: 'wellington-phoenix', name: 'Wellington Phoenix', shortName: 'WEL', icon: '/icons/wellington-phoenix.svg', accent: '#FFD700' },
          { id: 'auckland-fc', name: 'Auckland FC', shortName: 'AKL', icon: '/icons/auckland-fc.svg', accent: '#000000' },
          { id: 'sydney-fc', name: 'Sydney FC', shortName: 'SYD', icon: '/icons/sydney-fc.svg', accent: '#0055A4' },
          { id: 'melbourne-victory', name: 'Melbourne Victory', shortName: 'MVI', icon: '/icons/melb-victory.svg', accent: '#002B5C' },
          { id: 'melbourne-city', name: 'Melbourne City', shortName: 'MCI', icon: '/icons/melb-city.svg', accent: '#6CADDF' },
        ],
      },
      {
        id: 'wc-2026',
        name: 'FIFA World Cup 2026',
        icon: '/icons/fifa-wc.svg',
        teams: [
          { id: 'all-whites', name: 'All Whites', shortName: 'NZL', icon: '/icons/all-whites.svg', accent: '#ffffff' },
          { id: 'socceroos', name: 'Socceroos', shortName: 'AUS', icon: '/icons/socceroos.svg', accent: '#FFB81C' },
        ],
      },
    ],
  },
];

export function getSport(id: string): Sport | undefined {
  return SPORTS.find(s => s.id === id);
}

export function getCompetition(sportId: string, compId: string) {
  const sport = getSport(sportId);
  return sport?.competitions.find(c => c.id === compId);
}

export function getAllTeamsForSport(sportId: string) {
  const sport = getSport(sportId);
  if (!sport) return [];
  return sport.competitions.flatMap(c => c.teams);
}
