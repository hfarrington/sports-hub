// Maps World Rugby API responses to Game[]
import type { Game } from '@/lib/types';
import type { WRMatch } from '../fetchers/world-rugby';
import { WR_COMPETITIONS } from '../config';
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

export function mapWorldRugbyMatches(matches: WRMatch[]): Game[] {
  const games: Game[] = [];

  for (const match of matches) {
    // Get competition mapping
    const event = match.events?.[0];
    if (!event) continue;

    const compMapping = WR_COMPETITIONS[event.label];
    if (!compMapping) continue; // Skip competitions we don't track

    const { sportId, competitionId } = compMapping;

    // Get teams
    const homeTeam = match.teams?.[0];
    const awayTeam = match.teams?.[1];
    if (!homeTeam || !awayTeam) continue;

    // Resolve to our TeamRef
    const home = resolveTeam(homeTeam.name, String(homeTeam.id));
    const away = resolveTeam(awayTeam.name, String(awayTeam.id));

    // Build UTC time from the API date
    const utc = match.time?.label || '';
    if (!utc) continue;

    // Venue info
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
      round: event.label.replace(/\s*\d{4}$/, ''), // Strip year from comp name for round
    };

    // Add scores for completed/live matches
    if (match.status === 'C' || match.status === 'L' || match.status === 'LT') {
      if (homeTeam.score != null) game.homeScore = homeTeam.score;
      if (awayTeam.score != null) game.awayScore = awayTeam.score;
    }

    games.push(game);
  }

  return games;
}
