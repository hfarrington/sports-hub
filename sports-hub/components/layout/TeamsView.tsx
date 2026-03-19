'use client';

import { useState, useMemo } from 'react';
import { SPORTS } from '@/lib/constants';
import { getBroadcast } from '@/lib/broadcast';
import { usePreferences } from '@/providers/PreferencesProvider';
import TeamLogo from '@/components/ui/TeamLogo';
import TimezoneBadge from '@/components/ui/TimezoneBadge';
import Pill from '@/components/ui/Pill';
import type { Game, Team } from '@/lib/types';

const SPORT_EMOJIS: Record<string, string> = {
  rugby: '🏉', nrl: '⚔️', f1: '🏎️', football: '⚽',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface TeamsViewProps {
  games: Game[];
}

export default function TeamsView({ games }: TeamsViewProps) {
  const { preferences } = usePreferences();
  const [selectedTeamIds, setSelectedTeamIds] = useState<Set<string>>(new Set());
  const [offsetWeeks, setOffsetWeeks] = useState(0);

  // Get all teams from user's selected sports
  const availableTeams = useMemo(() => {
    const teams: Array<Team & { sportId: string; sportAccent: string }> = [];
    for (const sportId of preferences.selectedSports) {
      const sport = SPORTS.find(s => s.id === sportId);
      if (!sport) continue;
      for (const comp of sport.competitions) {
        for (const team of comp.teams) {
          teams.push({ ...team, sportId, sportAccent: sport.accent });
        }
      }
    }
    return teams;
  }, [preferences.selectedSports]);

  // Group available teams by sport
  const teamsBySport = useMemo(() => {
    const groups: Record<string, typeof availableTeams> = {};
    for (const team of availableTeams) {
      if (!groups[team.sportId]) groups[team.sportId] = [];
      groups[team.sportId].push(team);
    }
    return groups;
  }, [availableTeams]);

  function toggleTeam(teamId: string) {
    setSelectedTeamIds(prev => {
      const next = new Set(prev);
      if (next.has(teamId)) next.delete(teamId);
      else next.add(teamId);
      return next;
    });
  }

  // Time window for viewing — rolling 8 weeks from offset
  const { windowStart, windowEnd, windowLabel } = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() - 28 + offsetWeeks * 14); // 4 weeks back + offset
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 56); // 8 weeks window

    const pad = (n: number) => String(n).padStart(2, '0');
    const label = `${pad(start.getDate())} ${MONTHS[start.getMonth()]} – ${pad(end.getDate())} ${MONTHS[end.getMonth()]}`;
    return { windowStart: start.toISOString().split('T')[0], windowEnd: end.toISOString().split('T')[0], windowLabel: label };
  }, [offsetWeeks]);

  // Filter games for selected teams within time window
  const teamGames = useMemo(() => {
    if (selectedTeamIds.size === 0) return [];
    return games
      .filter(g => {
        if (!selectedTeamIds.has(g.home.id) && !selectedTeamIds.has(g.away.id)) return false;
        const gameDate = g.utc.split('T')[0];
        return gameDate >= windowStart && gameDate <= windowEnd;
      })
      .sort((a, b) => new Date(a.utc).getTime() - new Date(b.utc).getTime());
  }, [games, selectedTeamIds, windowStart, windowEnd]);

  const today = new Date().toISOString().split('T')[0];

  // Split into past results and upcoming
  const pastGames = teamGames.filter(g => g.status === 'final');
  const upcomingGames = teamGames.filter(g => g.status !== 'final');

  return (
    <div className="space-y-4">
      {/* Team selector */}
      <div className="rounded-xl p-4 border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center justify-between mb-3">
          <h2
            className="font-black text-sm uppercase tracking-wider text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Select Teams
          </h2>
          {selectedTeamIds.size > 0 && (
            <button
              onClick={() => setSelectedTeamIds(new Set())}
              className="text-[10px] font-bold uppercase tracking-wider text-text-muted hover:text-white transition-all"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Clear All
            </button>
          )}
        </div>

        {Object.entries(teamsBySport).map(([sportId, teams]) => {
          const sport = SPORTS.find(s => s.id === sportId);
          if (!sport) return null;
          return (
            <div key={sportId} className="mb-3 last:mb-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1.5" style={{ fontFamily: 'var(--font-heading)' }}>
                {SPORT_EMOJIS[sportId] || ''} {sport.name}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {teams.map(team => {
                  const isSelected = selectedTeamIds.has(team.id);
                  return (
                    <button
                      key={team.id}
                      onClick={() => toggleTeam(team.id)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        background: isSelected ? `${team.sportAccent}20` : 'rgba(255,255,255,0.03)',
                        color: isSelected ? '#fff' : '#888',
                        borderColor: isSelected ? `${team.sportAccent}50` : 'rgba(255,255,255,0.08)',
                      }}
                    >
                      <TeamLogo src={team.icon} name={team.name} shortName={team.shortName} accent={team.sportAccent} size={16} />
                      {team.shortName}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Time navigation */}
      {selectedTeamIds.size > 0 && (
        <div className="rounded-xl p-3.5 border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setOffsetWeeks(w => w - 1)}
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/[0.15] text-text-secondary hover:text-white hover:border-white/[0.3] transition-all text-sm"
              title="Back 2 weeks"
            >
              ◂
            </button>
            <div className="text-center flex-1 px-3">
              <p className="font-black text-sm uppercase tracking-wider text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                {windowLabel}
              </p>
              <p className="text-[10px] text-text-muted mt-0.5">
                {teamGames.length} fixture{teamGames.length !== 1 ? 's' : ''} — {pastGames.length} played, {upcomingGames.length} upcoming
              </p>
            </div>
            {offsetWeeks !== 0 && (
              <button
                onClick={() => setOffsetWeeks(0)}
                className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/10 transition-all mr-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Now
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
        </div>
      )}

      {/* Results */}
      {selectedTeamIds.size === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">👆</p>
          <p className="text-text-secondary text-sm">Select one or more teams above</p>
          <p className="text-text-muted text-xs mt-1">to see all their fixtures and results.</p>
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="flex items-center gap-3 text-[11px] text-text-muted">
            <span>{teamGames.length} total fixture{teamGames.length !== 1 ? 's' : ''}</span>
            <span>•</span>
            <span>{pastGames.length} played</span>
            <span>•</span>
            <span>{upcomingGames.length} upcoming</span>
          </div>

          {/* Upcoming fixtures */}
          {upcomingGames.length > 0 && (
            <div>
              <h3
                className="font-black text-xs uppercase tracking-wider text-accent-cyan mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Upcoming Fixtures
              </h3>
              <div className="rounded-xl border border-white/[0.08] overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                {upcomingGames.map(game => (
                  <TeamGameRow key={game.id} game={game} highlightTeamIds={selectedTeamIds} />
                ))}
              </div>
            </div>
          )}

          {/* Past results */}
          {pastGames.length > 0 && (
            <div>
              <h3
                className="font-black text-xs uppercase tracking-wider text-text-muted mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Recent Results
              </h3>
              <div className="rounded-xl border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(255,255,255,0.015)' }}>
                {pastGames.slice(-20).reverse().map(game => (
                  <TeamGameRow key={game.id} game={game} highlightTeamIds={selectedTeamIds} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Team Game Row ──────────────────────────────────────────────────────────

function TeamGameRow({ game, highlightTeamIds }: { game: Game; highlightTeamIds: Set<string> }) {
  const { preferences } = usePreferences();
  const sport = SPORTS.find(s => s.id === game.sportId);
  const accent = sport?.accent || '#888';
  const broadcast = getBroadcast(game.sportId, preferences.homeCountry, game.broadcast);

  const gameDate = new Date(game.utc);
  const dayName = DAYS[gameDate.getUTCDay()];
  const dayNum = gameDate.getUTCDate();
  const month = MONTHS[gameDate.getUTCMonth()];

  const homeHighlighted = highlightTeamIds.has(game.home.id);
  const awayHighlighted = highlightTeamIds.has(game.away.id);

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

      {/* Teams + score */}
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        <span
          className="font-bold text-sm"
          style={{
            fontFamily: 'var(--font-heading)',
            color: homeHighlighted ? '#fff' : '#666',
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
            color: awayHighlighted ? '#fff' : '#666',
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
