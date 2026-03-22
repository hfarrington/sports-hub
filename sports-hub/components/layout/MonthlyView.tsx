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

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
    const lbl = `${pad(start.getDate())} ${MONTHS[start.getMonth()]} ${start.getFullYear()} – ${pad(end.getDate())} ${MONTHS[end.getMonth()]} ${end.getFullYear()}`;

    return { startDate: start, endDate: end, label: lbl };
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
        const hasTeamFilter = selectedTeams.length > 0;
        const hasCompFilter = selectedComps.length > 0;

        if (hasTeamFilter || hasCompFilter) {
          if (hasTeamFilter && !selectedTeams.includes(game.home.id) && !selectedTeams.includes(game.away.id)) {
            return false;
          }
          if (hasCompFilter && !selectedComps.includes(game.competitionId)) {
            return false;
          }
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
    for (const date of Object.keys(groups)) {
      groups[date].sort((a, b) => new Date(a.utc).getTime() - new Date(b.utc).getTime());
    }
    return groups;
  }, [filteredGames]);

  const sortedDates = useMemo(() => Object.keys(gamesByDate).sort(), [gamesByDate]);

  const today = new Date().toISOString().split('T')[0];

  // Count by sport for summary
  const sportCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const game of filteredGames) {
      counts[game.sportId] = (counts[game.sportId] || 0) + 1;
    }
    return counts;
  }, [filteredGames]);

  return (
    <div className="space-y-3">
      {/* Navigation header */}
      <div className="rounded-xl p-4 border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setOffsetWeeks(w => w - 1)}
            className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/[0.15] text-text-secondary hover:text-white hover:border-white/[0.3] transition-all text-sm"
            title="Back 2 weeks"
          >
            ◂
          </button>

          <div className="text-center flex-1 px-3">
            <p className="font-black text-base uppercase tracking-wider text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              {label}
            </p>
          </div>

          {offsetWeeks !== 0 && (
            <button
              onClick={() => setOffsetWeeks(0)}
              className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/10 transition-all mr-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Today
            </button>
          )}

          <button
            onClick={() => setOffsetWeeks(w => w + 1)}
            className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/[0.15] text-text-secondary hover:text-white hover:border-white/[0.3] transition-all text-sm"
            title="Forward 2 weeks"
          >
            ▸
          </button>
        </div>

        {/* Sport summary pills */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[11px] text-text-muted">
            {filteredGames.length} event{filteredGames.length !== 1 ? 's' : ''} across {sortedDates.length} day{sortedDates.length !== 1 ? 's' : ''}
          </span>
          <div className="flex gap-1.5 ml-auto">
            {Object.entries(sportCounts).map(([sportId, count]) => {
              const sport = SPORTS.find(s => s.id === sportId);
              return (
                <span
                  key={sportId}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    background: `${sport?.accent || '#888'}15`,
                    color: sport?.accent || '#888',
                    border: `1px solid ${sport?.accent || '#888'}30`,
                  }}
                >
                  {SPORT_EMOJIS[sportId] || ''} {count}
                </span>
              );
            })}
          </div>
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
        <div className="space-y-2">
          {sortedDates.map(dateStr => {
            const date = new Date(dateStr + 'T00:00:00');
            const dayName = DAYS[date.getDay()];
            const dayNum = date.getDate();
            const month = MONTHS[date.getMonth()];
            const isToday = dateStr === today;
            const isPast = dateStr < today;
            const dayGames = gamesByDate[dateStr];

            return (
              <div
                key={dateStr}
                className="rounded-xl overflow-hidden border"
                style={{
                  borderColor: isToday ? 'rgba(0,201,255,0.3)' : 'rgba(255,255,255,0.06)',
                  background: isToday ? 'rgba(0,201,255,0.03)' : 'rgba(255,255,255,0.02)',
                }}
              >
                {/* Date header */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5"
                  style={{
                    background: isToday ? 'rgba(0,201,255,0.08)' : 'rgba(255,255,255,0.03)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span
                    className="font-black text-sm uppercase tracking-wider"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: isToday ? '#00c9ff' : isPast ? '#555' : '#ccc',
                    }}
                  >
                    {dayName}
                  </span>
                  <span
                    className="font-black text-sm uppercase tracking-wider"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: isToday ? '#00c9ff' : isPast ? '#666' : '#fff',
                    }}
                  >
                    {dayNum} {month}
                  </span>
                  {isToday && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent-cyan/20 text-accent-cyan">
                      Today
                    </span>
                  )}
                  <span className="text-[10px] text-text-muted ml-auto">
                    {dayGames.length} game{dayGames.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Games for this day */}
                {dayGames.map(game => (
                  <CompactGameRow key={game.id} game={game} />
                ))}
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
      className="flex items-center gap-2.5 px-4 py-2.5 border-b border-white/[0.04] last:border-0"
      style={{ borderLeft: `3px solid ${accent}` }}
    >
      {/* Sport emoji */}
      <span className="text-base flex-shrink-0">{emoji}</span>

      {/* Status pill */}
      <Pill status={game.status} />

      {/* Teams + score */}
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        <span
          className="font-bold text-sm"
          style={{
            fontFamily: 'var(--font-heading)',
            color: game.status === 'final' ? '#777' : '#fff',
          }}
        >
          {game.home.name}
        </span>

        {game.status === 'final' || game.status === 'live' ? (
          <span
            className="font-black text-sm px-1.5"
            style={{ fontFamily: 'var(--font-heading)', color: accent }}
          >
            {game.homeScore}–{game.awayScore}
          </span>
        ) : (
          <span className="text-[11px] text-text-muted px-1">vs</span>
        )}

        <span
          className="font-bold text-sm"
          style={{
            fontFamily: 'var(--font-heading)',
            color: game.status === 'final' ? '#777' : '#fff',
          }}
        >
          {game.away.name}
        </span>
      </div>

      {/* Round */}
      {game.round && (
        <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider flex-shrink-0 hidden sm:block">
          {game.round}
        </span>
      )}

      {/* Time */}
      <div className="flex-shrink-0">
        <TimezoneBadge utc={game.utc} />
      </div>

      {/* Broadcast link */}
      {broadcast && (
        broadcast.url ? (
          <a
            href={broadcast.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold px-2 py-1 rounded-lg flex-shrink-0 hover:brightness-125 transition-all hidden sm:flex items-center gap-1"
            style={{ background: 'rgba(0,201,255,0.1)', color: '#00c9ff' }}
          >
            📺 {broadcast.name}
          </a>
        ) : (
          <span className="text-[10px] text-text-muted flex-shrink-0 hidden sm:block">
            📺 {broadcast.name}
          </span>
        )
      )}
    </div>
  );
}
