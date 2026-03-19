import type { Weekend, Game } from './types';

export function generateWeekends(year: number): Weekend[] {
  const weekends: Weekend[] = [];
  const now = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Start from first Monday of the year
  const start = new Date(year, 0, 1);
  while (start.getDay() !== 1) start.setDate(start.getDate() + 1);

  for (let i = 0; i < 52; i++) {
    const mon = new Date(start);
    mon.setDate(start.getDate() + i * 7);
    const sun = new Date(mon);
    sun.setDate(mon.getDate() + 6);

    const pad = (n: number) => String(n).padStart(2, '0');
    const label = `Week ${pad(mon.getDate())}/${pad(mon.getMonth() + 1)} – ${pad(sun.getDate())}/${pad(sun.getMonth() + 1)}`;

    let tag: Weekend['tag'] = 'future';
    if (sun < now) tag = 'past';
    else if (mon <= now && now <= sun) tag = 'current';

    weekends.push({
      id: `wk-${i}`,
      startDate: mon.toISOString().split('T')[0],
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
  const gd = new Date(gameDate);
  const start = new Date(startDate);
  const end = new Date(endDate);
  return gd >= start && gd <= end;
}

export function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
