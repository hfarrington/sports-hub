'use client';

import { useState, useMemo } from 'react';
import { SPORTS } from '@/lib/constants';
import { getBroadcast } from '@/lib/broadcast';
import { usePreferences } from '@/providers/PreferencesProvider';
import TimezoneBadge from '@/components/ui/TimezoneBadge';
import Pill from '@/components/ui/Pill';
import type { Game } from '@/lib/types';

const SPORT_EMOJIS: Record<string, string> = {
  rugby: '🏉', nrl: '⚔️', f1: '🏎️', football: '⚽',
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface MonthlyViewProps {
  games: Game[];
  searchQuery: string;
}

export default function MonthlyView({ games, searchQuery }: MonthlyViewProps) {
  const { preferences } = usePreferences();
  const [offsetWeeks, setOffsetWeeks] = useState(0);

  // Rolling 6-week window from today + offset
  const { startDate, endDate, label } = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() + offsetWeeks * 14); // shift by 2 weeks per click
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(end.getDate() + 42); // 6 weeks

    const pad = (n: number) => String(n).padStart(2, '0');
    const lbl = `${pad(start.getDate())} ${MONTHS[start.getMonth()]} – ${pad(end.getDate())} ${MONTHS[end.getMonth()]}`;

    return {
      startDate: start,
      endDate: end,
      label: lbl,
    };
  }, [offsetWeeks]);

  // Filter games to this window + user preferences
  const filteredGames = useMemo(() => {
    const startStr = startDate.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];

    return games.filter(game => {
      if (!preferences.selectedSports.includes(game.sportId)) return false;

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

      const gameDate = game.utc.split('T')[0];
      return gameDate >= startStr && gameDate <= endStr;
    }).filter(game => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return game.home.name.toLowerCase().includes(q) ||
        game.away.name.toLowerCase().includes(q) ||
        game.venue.toLowerCase().includes(q);
    });
  }, [games, startDate, endDate, preferences, searchQuery]);

  // Group games by date — only dates with events
  const gamesByDate = useMemo(() => {
    const groups: Record<string, Game[]> = {};
    for (const game of filteredGames) {
      const date = game.utc.split('T')[0];
      if (!groups[date]) groups[date] = [];
      groups[date].push(game);
    }
    // Sort each day's games by time
    for (const date of Object.keys(groups)) {
      groups[date].sort((a, b) => new Date(a.utc).getTime() - new Date(b.utc).getTime());
    }
    return groups;
  }, [filteredGames]);

  const sortedDates = useMemo(() =>
    Object.keys(gamesByDate).sort(),
    [gamesByDate]
  );

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-3">
      {/* Navigation */}
      <div className="rounded-xl p-3.5 border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setOffsetWeeks(w => w - 1)}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.15] text-text-secondary hover:text-white hover:border-white/[0.3] transition-all text-sm"
          >
            ◂
          </button>

          <div className="text-center flex-1 px-2">
            <p className="font-black text-sm uppercase tracking-wider text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              {label}
            </p>
            <p className="text-[10px] text-text-muted mt-0.5">
              {filteredGames.length} event{filteredGames.length !== 1 ? 's' : ''} across {sortedDates.length} day{sortedDates.length !== 1 ? 's' : ''}
            </p>
          </div>

          {offsetWeeks !== 0 && (
            <button
              onClick={() => setOffsetWeeks(0)}
              className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/10 transition-all mr-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Today
            </button>
          )}

          <button
            onClick={() => setOffsetWeeks(w => w + 1)}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.15] text-text-secondary hover:text-white hover:border-white/[0.3] transition-all text-sm"
          >
            ▸
          </button>
        </div>
      </div>

      {/* Day-by-day list — only days with events */}
      {sortedDates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📅</p>
          <p className="text-text-secondary text-sm">No events in this period.</p>
          <p className="text-text-muted text-xs mt-1">Try navigating forward or adjusting your selections.</p>
        </div>
      ) : (
        <div className="space-y-1">
          {sortedDates.map(dateStr => {
            const date = new Date(dateStr + 'T00:00:00');
            const dayName = DAYS[date.getDay()];
            const dayNum = date.getDate();
            const month = MONTHS[date.getMonth()];
            const isToday = dateStr === today;
            const dayGames = gamesByDate[dateStr];

            return (
              <div key={dateStr}>
                {/* Date header */}
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg sticky top-[105px] z-10"
                  style={{
                    background: isToday ? 'rgba(0,201,255,0.08)' : 'rgba(255,255,255,0.03)',
                    borderLeft: isToday ? '3px solid #00c9ff' : '3px solid transparent',
                  }}
                >
                  <span
                    className="font-black text-xs uppercase tracking-wider"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: isToday ? '#00c9ff' : '#888',
                    }}
                  >
                    {dayName} {dayNum} {month}
                  </span>
                  {isToday && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent-cyan/20 text-accent-cyan">
                      Today
                    </span>
                  )}
                  <span className="text-[10px] text-text-muted ml-auto">
                    {dayGames.length} event{dayGames.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Games for this day */}
                <div className="rounded-b-lg border border-white/[0.06] border-t-0 mb-2" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  {dayGames.map(game => (
                    <CompactGameRow key={game.id} game={game} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Compact Game Row for Monthly View ──────────────────────────────────────

function CompactGameRow({ game }: { game: Game }) {
  const { preferences } = usePreferences();
  const sport = SPORTS.find(s => s.id === game.sportId);
  const accent = sport?.accent || '#888';
  const emoji = SPORT_EMOJIS[game.sportId] || '🏆';
  const broadcast = getBroadcast(game.sportId, preferences.homeCountry, game.broadcast);

  return (
    <div
      className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.04] last:border-0"
      style={{
        borderLeft: `3px solid ${accent}`,
      }}
    >
      {/* Sport emoji */}
      <span className="text-sm flex-shrink-0">{emoji}</span>

      {/* Status */}
      <Pill status={game.status} />

      {/* Teams — compact */}
      <div className="flex items-center gap-1 min-w-0 flex-1">
        <span
          className="font-bold text-xs truncate"
          style={{ fontFamily: 'var(--font-heading)', color: game.status === 'final' ? '#888' : '#fff' }}
        >
          {game.home.shortName}
        </span>

        {game.status === 'final' || game.status === 'live' ? (
          <span className="font-black text-xs px-1" style={{ fontFamily: 'var(--font-heading)', color: accent }}>
            {game.homeScore}–{game.awayScore}
          </span>
        ) : (
          <span className="text-[10px] text-text-muted px-0.5">v</span>
        )}

        <span
          className="font-bold text-xs truncate"
          style={{ fontFamily: 'var(--font-heading)', color: game.status === 'final' ? '#888' : '#fff' }}
        >
          {game.away.shortName}
        </span>
      </div>

      {/* Round */}
      {game.round && (
        <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider flex-shrink-0">
          {game.round}
        </span>
      )}

      {/* Time */}
      <div className="flex-shrink-0">
        <TimezoneBadge utc={game.utc} />
      </div>

      {/* Broadcast */}
      {broadcast && (
        broadcast.url ? (
          <a
            href={broadcast.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 hover:brightness-125 transition-all"
            style={{ background: 'rgba(0,201,255,0.1)', color: '#00c9ff' }}
          >
            📺
          </a>
        ) : (
          <span className="text-[9px] text-text-muted flex-shrink-0">📺</span>
        )
      )}
    </div>
  );
}
