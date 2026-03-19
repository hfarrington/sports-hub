'use client';

import { useState, useMemo } from 'react';
import { SPORTS } from '@/lib/constants';
import { getBroadcast } from '@/lib/broadcast';
import { usePreferences } from '@/providers/PreferencesProvider';
import TimezoneBadge from '@/components/ui/TimezoneBadge';
import Pill from '@/components/ui/Pill';
import type { Game, Competition } from '@/lib/types';

const SPORT_EMOJIS: Record<string, string> = {
  rugby: '🏉', nrl: '⚔️', f1: '🏎️', football: '⚽',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface TournamentsViewProps {
  games: Game[];
}

export default function TournamentsView({ games }: TournamentsViewProps) {
  const { preferences } = usePreferences();
  const [selectedCompIds, setSelectedCompIds] = useState<Set<string>>(new Set());

  // Discover all competitions from actual game data + constants, filtered by user's sports
  const availableComps = useMemo(() => {
    const compMap = new Map<string, { id: string; name: string; sportId: string; sportAccent: string; sportName: string; icon: string; teams: never[] }>();

    // First add competitions from constants
    for (const sportId of preferences.selectedSports) {
      const sport = SPORTS.find(s => s.id === sportId);
      if (!sport) continue;
      for (const comp of sport.competitions) {
        compMap.set(comp.id, {
          id: comp.id,
          name: comp.name,
          sportId,
          sportAccent: sport.accent,
          sportName: sport.name,
          icon: comp.icon,
          teams: [] as never[],
        });
      }
    }

    // Then discover additional competitions from live game data
    for (const game of games) {
      if (!preferences.selectedSports.includes(game.sportId)) continue;
      if (compMap.has(game.competitionId)) continue;

      const sport = SPORTS.find(s => s.id === game.sportId);
      if (!sport) continue;

      // Auto-create a competition entry from game data
      // The round field now contains the competition name from the API
      const compName = game.round || game.competitionId
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

      compMap.set(game.competitionId, {
        id: game.competitionId,
        name: compName,
        sportId: game.sportId,
        sportAccent: sport.accent,
        sportName: sport.name,
        icon: '',
        teams: [] as never[],
      });
    }

    return Array.from(compMap.values());
  }, [preferences.selectedSports, games]);

  // Count games per competition
  const compGameCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const game of games) {
      counts[game.competitionId] = (counts[game.competitionId] || 0) + 1;
    }
    return counts;
  }, [games]);

  function toggleComp(compId: string) {
    setSelectedCompIds(prev => {
      const next = new Set(prev);
      if (next.has(compId)) next.delete(compId);
      else next.add(compId);
      return next;
    });
  }

  // Filter games for selected competitions — upcoming only
  const compGames = useMemo(() => {
    if (selectedCompIds.size === 0) return [];
    return games
      .filter(g => selectedCompIds.has(g.competitionId))
      .sort((a, b) => new Date(a.utc).getTime() - new Date(b.utc).getTime());
  }, [games, selectedCompIds]);

  const upcomingGames = compGames.filter(g => g.status !== 'final');

  return (
    <div className="space-y-4">
      {/* Competition selector */}
      <div className="rounded-xl p-4 border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center justify-between mb-3">
          <h2
            className="font-black text-sm uppercase tracking-wider text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Select Competitions
          </h2>
          {selectedCompIds.size > 0 && (
            <button
              onClick={() => setSelectedCompIds(new Set())}
              className="text-[10px] font-bold uppercase tracking-wider text-text-muted hover:text-white transition-all"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2">
          {availableComps.map(comp => {
            const isSelected = selectedCompIds.has(comp.id);
            const gameCount = compGameCounts[comp.id] || 0;
            return (
              <button
                key={comp.id}
                onClick={() => toggleComp(comp.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all border text-left"
                style={{
                  background: isSelected ? `${comp.sportAccent}15` : 'rgba(255,255,255,0.02)',
                  borderColor: isSelected ? `${comp.sportAccent}40` : 'rgba(255,255,255,0.06)',
                }}
              >
                <span className="text-lg">{SPORT_EMOJIS[comp.sportId] || '🏆'}</span>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold text-sm"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: isSelected ? '#fff' : '#aaa',
                    }}
                  >
                    {comp.name}
                  </p>
                  <p className="text-[10px] text-text-muted">{comp.sportName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      background: `${comp.sportAccent}15`,
                      color: comp.sportAccent,
                    }}
                  >
                    {gameCount} game{gameCount !== 1 ? 's' : ''}
                  </span>
                  {isSelected && (
                    <span className="text-accent-cyan text-sm">✓</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      {selectedCompIds.size === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">🏆</p>
          <p className="text-text-secondary text-sm">Select one or more competitions above</p>
          <p className="text-text-muted text-xs mt-1">to see upcoming fixtures.</p>
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="flex items-center gap-3 text-[11px] text-text-muted flex-wrap">
            <span>{upcomingGames.length} upcoming fixture{upcomingGames.length !== 1 ? 's' : ''}</span>
            {Array.from(selectedCompIds).map(id => {
              const comp = availableComps.find(c => c.id === id);
              if (!comp) return null;
              return (
                <span
                  key={id}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    background: `${comp.sportAccent}15`,
                    color: comp.sportAccent,
                    border: `1px solid ${comp.sportAccent}30`,
                  }}
                >
                  {comp.name}
                </span>
              );
            })}
          </div>

          {/* Upcoming fixtures */}
          {upcomingGames.length > 0 ? (
            <div className="rounded-xl border border-white/[0.08] overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
              {upcomingGames.map(game => (
                <CompGameRow key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-text-muted text-sm">No upcoming fixtures for the selected competitions.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Competition Game Row ───────────────────────────────────────────────────

function CompGameRow({ game }: { game: Game }) {
  const { preferences } = usePreferences();
  const sport = SPORTS.find(s => s.id === game.sportId);
  const accent = sport?.accent || '#888';
  const broadcast = getBroadcast(game.sportId, preferences.homeCountry, game.broadcast);

  const gameDate = new Date(game.utc);
  const dayName = DAYS[gameDate.getUTCDay()];
  const dayNum = gameDate.getUTCDate();
  const month = MONTHS[gameDate.getUTCMonth()];

  return (
    <div
      className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.04] last:border-0"
      style={{ borderLeft: `3px solid ${accent}` }}
    >
      {/* Date */}
      <div className="flex-shrink-0 w-16 text-center">
        <p className="text-[10px] font-bold uppercase text-text-muted" style={{ fontFamily: 'var(--font-heading)' }}>
          {dayName}
        </p>
        <p className="text-sm font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>
          {dayNum} {month}
        </p>
      </div>

      {/* Status */}
      <Pill status={game.status} />

      {/* Round */}
      {game.round && (
        <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider flex-shrink-0 w-10">
          {game.round}
        </span>
      )}

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
          <span className="font-black text-sm px-1.5" style={{ fontFamily: 'var(--font-heading)', color: accent }}>
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

      {/* Time */}
      <div className="flex-shrink-0">
        <TimezoneBadge utc={game.utc} />
      </div>

      {/* Venue */}
      <span className="text-[10px] text-text-muted flex-shrink-0 hidden sm:block max-w-[120px] truncate">
        {game.venue}
      </span>

      {/* Broadcast */}
      {broadcast?.url && (
        <a
          href={broadcast.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-bold px-2 py-1 rounded-lg flex-shrink-0 hover:brightness-125 transition-all hidden sm:block"
          style={{ background: 'rgba(0,201,255,0.1)', color: '#00c9ff' }}
        >
          📺
        </a>
      )}
    </div>
  );
}
