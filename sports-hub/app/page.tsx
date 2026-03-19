'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { usePreferences } from '@/providers/PreferencesProvider';
import Header from '@/components/layout/Header';
import Timeline from '@/components/layout/Timeline';
import SportCard from '@/components/sports/SportCard';
import GameRow from '@/components/sports/GameRow';
import { SPORTS } from '@/lib/constants';
import { useGames } from '@/lib/hooks/useGames';
import { generateWeekends, getCurrentWeekendIndex, filterGamesBySearch, isGameOnWeekend } from '@/lib/utils';
import type { Game } from '@/lib/types';

const SPORT_EMOJIS: Record<string, string> = {
  rugby: '🏉', nrl: '⚔️', f1: '🏎️', football: '⚽',
};

export default function Dashboard() {
  const router = useRouter();
  const { preferences } = usePreferences();

  // Redirect to onboarding if not set up
  if (!preferences.onboarded) {
    router.push('/onboarding');
    return <div className="min-h-screen" />;
  }

  return <DashboardContent />;
}

function DashboardContent() {
  const { preferences } = usePreferences();
  const { games: allGames, loading, isLive } = useGames();
  const [searchQuery, setSearchQuery] = useState('');

  const weekends = useMemo(() => generateWeekends(2026), []);
  const initialIndex = useMemo(() => getCurrentWeekendIndex(weekends), [weekends]);
  const [weekendIndex, setWeekendIndex] = useState(initialIndex);

  const currentWeekend = weekends[weekendIndex];

  // Filter games for this weekend + user's sports
  const weekendGames = useMemo(() => {
    if (!currentWeekend) return [];
    return allGames.filter(game => {
      // Must be a sport the user follows
      if (!preferences.selectedSports.includes(game.sportId)) return false;

      // Filter by selected teams (unless following all)
      if (!preferences.followAll[game.sportId]) {
        const selectedTeams = preferences.selectedTeams[game.sportId] || [];
        const selectedComps = preferences.selectedCompetitions[game.sportId] || [];
        if (selectedTeams.length > 0 || selectedComps.length > 0) {
          const teamMatch = selectedTeams.length === 0 ||
            selectedTeams.includes(game.home.id) || selectedTeams.includes(game.away.id);
          const compMatch = selectedComps.length === 0 ||
            selectedComps.includes(game.competitionId);
          if (!teamMatch && !compMatch) return false;
        }
      }

      // Must be on this weekend
      return isGameOnWeekend(game, currentWeekend.startDate, currentWeekend.endDate);
    });
  }, [currentWeekend, preferences]);

  // Apply search filter
  const filteredGames = useMemo(
    () => filterGamesBySearch(weekendGames, searchQuery),
    [weekendGames, searchQuery]
  );

  // Group by sport
  const gamesBySport = useMemo(() => {
    const groups: Record<string, Game[]> = {};
    for (const game of filteredGames) {
      if (!groups[game.sportId]) groups[game.sportId] = [];
      groups[game.sportId].push(game);
    }
    return groups;
  }, [filteredGames]);

  // Sort sports: favorites first, then by order in preferences
  const orderedSports = useMemo(() => {
    const sports = preferences.selectedSports.filter(id => gamesBySport[id]?.length);
    return sports.sort((a, b) => {
      const aFav = preferences.favorites.includes(a) ? -1 : 0;
      const bFav = preferences.favorites.includes(b) ? -1 : 0;
      return aFav - bFav;
    });
  }, [preferences.selectedSports, preferences.favorites, gamesBySport]);

  return (
    <div className="min-h-screen pb-16">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        <Timeline
          weekends={weekends}
          currentIndex={weekendIndex}
          onChange={setWeekendIndex}
        />

        {/* Data source indicator */}
        {!loading && (
          <div className="flex items-center gap-2 text-[10px] text-text-muted">
            <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-500' : 'bg-yellow-500'}`} />
            {isLive ? 'Live data' : 'Sample data'}
          </div>
        )}

        {orderedSports.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📺</p>
            <p className="text-text-secondary text-sm">
              {searchQuery
                ? 'No matches found for your search.'
                : 'No games this weekend for your selected sports.'}
            </p>
            <p className="text-text-muted text-xs mt-1">
              Try navigating to another weekend or adjusting your selections.
            </p>
          </div>
        )}

        {orderedSports.map(sportId => {
          const sport = SPORTS.find(s => s.id === sportId);
          if (!sport) return null;
          const games = gamesBySport[sportId] || [];

          return (
            <SportCard
              key={sportId}
              id={sportId}
              title={sport.name}
              subtitle={`${games.length} game${games.length !== 1 ? 's' : ''} this weekend`}
              emoji={SPORT_EMOJIS[sportId] || '🏆'}
              accent={sport.accent}
            >
              {games.map(game => (
                <GameRow key={game.id} game={game} accent={sport.accent} />
              ))}
            </SportCard>
          );
        })}

        {/* Sports with no games this weekend but user follows them */}
        {preferences.selectedSports
          .filter(id => !gamesBySport[id]?.length && !searchQuery)
          .map(sportId => {
            const sport = SPORTS.find(s => s.id === sportId);
            if (!sport) return null;
            return (
              <SportCard
                key={sportId}
                id={sportId}
                title={sport.name}
                subtitle="No games this weekend"
                emoji={SPORT_EMOJIS[sportId] || '🏆'}
                accent={sport.accent}
              >
                <p className="text-text-muted text-xs py-2">
                  No fixtures scheduled for this weekend.
                </p>
              </SportCard>
            );
          })}
      </div>
    </div>
  );
}
