// ─── Core Types ─────────────────────────────────────────────────────────────

export interface Sport {
  id: string;
  name: string;
  icon: string; // URL to official logo
  accent: string; // Tailwind color class or hex
  competitions: Competition[];
}

export interface Competition {
  id: string;
  name: string;
  icon: string;
  teams: Team[];
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  icon: string; // URL to official logo/badge
  accent?: string;
}

export interface Game {
  id: string;
  sportId: string;
  competitionId: string;
  home: TeamRef;
  away: TeamRef;
  utc: string; // ISO datetime e.g. "2026-03-21T07:30"
  venue: string;
  city: string;
  country: string;
  countryFlag?: string;
  status: 'upcoming' | 'live' | 'final';
  homeScore?: number;
  awayScore?: number;
  round?: string;
  comment?: string;
  broadcast?: Record<string, string>; // countryId → channel/service name
}

export interface TeamRef {
  id: string;
  name: string;
  shortName: string;
  icon: string;
}

export interface Standing {
  pos: number;
  team: string;
  teamIcon?: string;
  played: number;
  won: number;
  lost: number;
  drawn?: number;
  points: number;
  diff: string;
  highlight?: boolean;
}

// ─── Timezone Types ─────────────────────────────────────────────────────────

export interface TimezoneOption {
  id: string;
  label: string;
  city: string;
  region: string;
  baseOffset: number; // UTC offset in hours (standard time)
  hasDST: boolean;
  color: string;
}

export interface TimezoneResult {
  time: string; // e.g. "Sat 7:30pm"
  label: string; // e.g. "NZDT"
  color: string;
}

// ─── Preferences ────────────────────────────────────────────────────────────

export interface UserPreferences {
  onboarded: boolean;
  homeCountry: string; // country ID
  selectedSports: string[]; // sport IDs
  selectedCompetitions: Record<string, string[]>; // sportId → competitionIds
  selectedTeams: Record<string, string[]>; // sportId → teamIds
  followAll: Record<string, boolean>; // sportId → true if following all
  timezone1: string; // timezone ID
  timezone2: string; // timezone ID
  favorites: string[]; // section IDs that are pinned
  collapsedSections: string[];
  theme: 'dark' | 'light';
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  onboarded: false,
  homeCountry: 'nz',
  selectedSports: [],
  selectedCompetitions: {},
  selectedTeams: {},
  followAll: {},
  timezone1: 'auckland',
  timezone2: 'melbourne',
  favorites: [],
  collapsedSections: [],
  theme: 'dark',
};

// ─── Weekend ────────────────────────────────────────────────────────────────

export interface Weekend {
  id: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
  label: string; // e.g. "Sat 22 – Sun 23 Mar"
  tag: 'past' | 'current' | 'future';
}
