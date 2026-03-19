// Maps World Rugby API responses to Game[]
import type { Game } from '@/lib/types';
import type { WRMatch } from '../fetchers/world-rugby';
import { WR_KNOWN_COMPETITIONS } from '../config';
import { resolveTeam } from '../team-resolver';

function mapStatus(wrStatus: string): 'upcoming' | 'live' | 'final' {
  switch (wrStatus) {
    case 'U': return 'upcoming';
    case 'L':
    case 'LT': return 'live';
    case 'C': return 'final';
    default: return 'upcoming';
  }
}

/**
 * Strip the year suffix from a World Rugby event label.
 * e.g. "Super Rugby 2026" → "Super Rugby"
 */
function stripYear(label: string): string {
  return label.replace(/\s*\d{4}$/, '').trim();
}

/**
 * Generate a competition ID from an event label.
 * Checks known mappings first, then creates a slug from the label.
 */
function getCompetitionId(eventLabel: string): string {
  const baseName = stripYear(eventLabel);

  // Check known mappings
  if (WR_KNOWN_COMPETITIONS[baseName]) {
    return WR_KNOWN_COMPETITIONS[baseName];
  }

  // Generate a slug from the label
  return baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function mapWorldRugbyMatches(matches: WRMatch[]): Game[] {
  const games: Game[] = [];

  for (const match of matches) {
    const event = match.events?.[0];
    if (!event) continue;

    // All World Rugby competitions are rugby
    const sportId = 'rugby';
    const competitionId = getCompetitionId(event.label);
    const competitionName = stripYear(event.label);

    // Get teams
    const homeTeam = match.teams?.[0];
    const awayTeam = match.teams?.[1];
    if (!homeTeam || !awayTeam) continue;

    const home = resolveTeam(homeTeam.name, String(homeTeam.id));
    const away = resolveTeam(awayTeam.name, String(awayTeam.id));

    const utc = match.time?.label || '';
    if (!utc) continue;

    const venue = match.venue;

    const game: Game = {
      id: `wr-${match.matchId}`,
      sportId,
      competitionId,
      home,
      away,
      utc: utc.includes('T') ? utc : `${utc}T00:00`,
      venue: venue?.name || 'TBC',
      city: venue?.city || '',
      country: venue?.country || '',
      status: mapStatus(match.status),
      round: competitionName,
    };

    // Add scores for completed/live matches
    if (match.status === 'C' || match.status === 'L' || match.status === 'LT') {
      if (match.scores && match.scores.length >= 2) {
        game.homeScore = match.scores[0];
        game.awayScore = match.scores[1];
      }
    }

    games.push(game);
  }

  return games;
}
