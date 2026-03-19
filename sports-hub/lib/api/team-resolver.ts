// Resolves API team names to existing TeamRef from SPORTS constants
import { SPORTS } from '@/lib/constants';
import type { TeamRef } from '@/lib/types';

// Build a lookup map: lowercase name/shortName → TeamRef
const teamLookup = new Map<string, TeamRef>();

for (const sport of SPORTS) {
  for (const comp of sport.competitions) {
    for (const team of comp.teams) {
      const ref: TeamRef = {
        id: team.id,
        name: team.name,
        shortName: team.shortName,
        icon: team.icon,
      };
      teamLookup.set(team.name.toLowerCase(), ref);
      teamLookup.set(team.shortName.toLowerCase(), ref);
      // Also add without common suffixes for fuzzy matching
      const simplified = team.name.toLowerCase()
        .replace(/\s*(rugby|fc|afc|united|city)$/i, '')
        .trim();
      if (simplified && simplified !== team.name.toLowerCase()) {
        teamLookup.set(simplified, ref);
      }
    }
  }
}

// World Rugby API uses specific team names — add known aliases
const ALIASES: Record<string, string> = {
  'new zealand': 'all-blacks',
  'australia': 'wallabies',
  'south africa': 'springboks',
  'nsw waratahs': 'waratahs',
  'queensland reds': 'reds',
  'act brumbies': 'brumbies',
  'wellington hurricanes': 'hurricanes',
  'auckland blues': 'blues',
  'canterbury crusaders': 'crusaders',
  'otago highlanders': 'highlanders',
  'waikato chiefs': 'chiefs',
  'sydney roosters': 'roosters',
  'melbourne storm': 'storm',
  'penrith panthers': 'panthers',
  'brisbane broncos': 'broncos',
  'new zealand warriors': 'warriors',
  // FixtureDownload short NRL names
  'knights': 'knights',
  'cowboys': 'cowboys',
  'eels': 'eels',
  'dragons': 'dragons',
  'raiders': 'raiders',
  'titans': 'titans',
  'bulldogs': 'bulldogs',
  'sea eagles': 'sea-eagles',
  'wests tigers': 'tigers',
  'rabbitohs': 'rabbitohs',
  'dolphins': 'dolphins',
  'sharks': 'sharks',
  'roosters': 'roosters',
  'storm': 'storm',
  'panthers': 'panthers',
  'broncos': 'broncos',
  'warriors': 'warriors',
};

// Register aliases
for (const [alias, teamId] of Object.entries(ALIASES)) {
  const existing = Array.from(teamLookup.values()).find(t => t.id === teamId);
  if (existing) {
    teamLookup.set(alias, existing);
  }
}

/**
 * Resolve an API team name to a TeamRef.
 * Returns existing team from constants if found, otherwise constructs a minimal one.
 */
export function resolveTeam(apiName: string, fallbackId?: string): TeamRef {
  const key = apiName.toLowerCase().trim();

  // Exact match
  const exact = teamLookup.get(key);
  if (exact) return exact;

  // Substring match — check if any known team name is contained in the API name
  for (const [name, ref] of teamLookup.entries()) {
    if (name.length >= 4 && key.includes(name)) return ref;
  }

  // Construct a fallback TeamRef
  const shortName = apiName
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 3);

  return {
    id: fallbackId || apiName.toLowerCase().replace(/\s+/g, '-'),
    name: apiName,
    shortName,
    icon: '',
  };
}
