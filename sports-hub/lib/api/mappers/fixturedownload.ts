// Maps FixtureDownload.com responses to Game[]
import type { Game } from '@/lib/types';
import type { FDMatch } from '../fetchers/fixturedownload';
import { resolveTeam } from '../team-resolver';

/**
 * Maps FixtureDownload matches to Game[].
 * @param matches - Raw matches from the feed
 * @param sportId - Sport ID (e.g., 'nrl')
 * @param competitionId - Competition ID (e.g., 'nrl-premiership')
 */
export function mapFixtureDownloadMatches(
  matches: FDMatch[],
  sportId: string,
  competitionId: string,
): Game[] {
  return matches.map((match): Game => {
    const home = resolveTeam(match.HomeTeam);
    const away = resolveTeam(match.AwayTeam);

    // Convert "2026-03-01 02:15:00Z" to ISO format
    const utc = match.DateUtc.replace(' ', 'T').replace('Z', '');

    const hasScore = match.HomeTeamScore != null && match.AwayTeamScore != null;
    const matchDate = new Date(match.DateUtc);
    const now = new Date();
    const isLive = !hasScore && Math.abs(now.getTime() - matchDate.getTime()) < 3 * 60 * 60 * 1000;

    const game: Game = {
      id: `fd-${sportId}-${match.MatchNumber}`,
      sportId,
      competitionId,
      home,
      away,
      utc,
      venue: match.Location || 'TBC',
      city: '',
      country: 'Australia',
      status: hasScore ? 'final' : isLive ? 'live' : 'upcoming',
      round: `Rd ${match.RoundNumber}`,
    };

    if (hasScore) {
      game.homeScore = match.HomeTeamScore!;
      game.awayScore = match.AwayTeamScore!;
    }

    return game;
  });
}
