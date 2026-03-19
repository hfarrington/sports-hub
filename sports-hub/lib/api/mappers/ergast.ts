// Maps Ergast/Jolpi F1 API responses to Game[]
import type { Game, TeamRef } from '@/lib/types';
import type { ErgastRace } from '../fetchers/ergast';

// F1 is modeled as: home = GP name, away = "Race"
// Winner info is stored in the comment field

function gpToTeamRef(race: ErgastRace): TeamRef {
  return {
    id: `gp-${race.Circuit.circuitId}`,
    name: race.raceName.replace(' Grand Prix', ' GP'),
    shortName: race.round.padStart(2, '0'),
    icon: '', // Could add flag icons later
  };
}

const RACE_REF: TeamRef = {
  id: 'f1-race',
  name: 'Race',
  shortName: 'F1',
  icon: '',
};

/**
 * Maps F1 schedule + results into Game[].
 * @param schedule - Full season race list
 * @param results - Races with results (completed only)
 */
export function mapF1Races(schedule: ErgastRace[], results: ErgastRace[]): Game[] {
  // Build a results lookup: round → results
  const resultsMap = new Map<string, ErgastRace>();
  for (const race of results) {
    resultsMap.set(race.round, race);
  }

  return schedule.map((race): Game => {
    const result = resultsMap.get(race.round);
    const raceDate = race.date;
    const raceTime = race.time || '00:00:00Z';
    const utc = `${raceDate}T${raceTime.replace('Z', '')}`;

    const isComplete = !!result?.Results?.length;
    const now = new Date();
    const raceDateTime = new Date(`${raceDate}T${raceTime}`);
    const isLive = !isComplete && Math.abs(now.getTime() - raceDateTime.getTime()) < 3 * 60 * 60 * 1000; // within 3h

    // Build winner comment for completed races
    let comment: string | undefined;
    if (result?.Results?.length) {
      const winner = result.Results[0];
      comment = `Winner: ${winner.Driver.givenName} ${winner.Driver.familyName} (${winner.Constructor.name})`;
    }

    return {
      id: `f1-${race.season}-r${race.round}`,
      sportId: 'f1',
      competitionId: 'f1-championship',
      home: gpToTeamRef(race),
      away: RACE_REF,
      utc,
      venue: race.Circuit.circuitName,
      city: race.Circuit.Location.locality,
      country: race.Circuit.Location.country,
      status: isComplete ? 'final' : isLive ? 'live' : 'upcoming',
      round: `Rd ${race.round}`,
      comment,
    };
  });
}
