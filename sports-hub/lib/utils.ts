import type { Weekend, Game } from './types';

export function generateWeekends(year: number): Weekend[] {
  const weekends: Weekend[] = [];
  const now = new Date();

  // Start from first Saturday of the year
  const start = new Date(year, 0, 1);
  while (start.getDay() !== 6) start.setDate(start.getDate() + 1);

  for (let i = 0; i < 52; i++) {
    const sat = new Date(start);
    sat.setDate(start.getDate() + i * 7);
    const sun = new Date(sat);
    sun.setDate(sat.getDate() + 1);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const label = `Sat ${sat.getDate()} – Sun ${sun.getDate()} ${months[sun.getMonth()]}`;

    let tag: Weekend['tag'] = 'future';
    if (sun < now) tag = 'past';
    else if (sat <= now && now <= sun) tag = 'current';

    weekends.push({
      id: `wk-${i}`,
      startDate: sat.toISOString().split('T')[0],
      endDate: sun.toISOString().split('T')[0],
      label,
      tag,
    });
  }

  return weekends;
}

export function getCurrentWeekendIndex(weekends: Weekend[]): number {
  const idx = weekends.findIndex(w => w.tag === 'current');
  if (idx !== -1) return idx;
  // Find next future weekend
  const futureIdx = weekends.findIndex(w => w.tag === 'future');
  return futureIdx !== -1 ? futureIdx : weekends.length - 1;
}

export function filterGamesBySearch(games: Game[], query: string): Game[] {
  if (!query.trim()) return games;
  const q = query.toLowerCase();
  return games.filter(g =>
    g.home.name.toLowerCase().includes(q) ||
    g.away.name.toLowerCase().includes(q) ||
    g.venue.toLowerCase().includes(q) ||
    g.city.toLowerCase().includes(q)
  );
}

export function filterGamesByTeams(
  games: Game[],
  selectedTeams: string[],
  followAll: boolean
): Game[] {
  if (followAll || selectedTeams.length === 0) return games;
  return games.filter(g =>
    selectedTeams.includes(g.home.id) || selectedTeams.includes(g.away.id)
  );
}

export function isGameOnWeekend(game: Game, startDate: string, endDate: string): boolean {
  if (!game.utc) return false;
  const gameDate = game.utc.split('T')[0];
  // Include Friday evening through Monday morning to catch all weekend games
  const start = new Date(startDate);
  start.setDate(start.getDate() - 1); // Include Friday
  const end = new Date(endDate);
  end.setDate(end.getDate() + 1); // Include Monday
  const gd = new Date(gameDate);
  return gd >= start && gd <= end;
}

export function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
