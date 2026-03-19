'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePreferences } from '@/providers/PreferencesProvider';
import { SPORTS } from '@/lib/constants';
import { useGames } from '@/lib/hooks/useGames';
import { generateWeekends, getCurrentWeekendIndex, isGameOnWeekend } from '@/lib/utils';
import { getBroadcast } from '@/lib/broadcast';
import TeamLogo from '@/components/ui/TeamLogo';
import Pill from '@/components/ui/Pill';
import TimezoneBadge from '@/components/ui/TimezoneBadge';
import type { Game } from '@/lib/types';

const PANEL_OPTIONS = [1, 2, 3, 4] as const;

export default function WatchPage() {
  const router = useRouter();
  const { preferences } = usePreferences();

  if (!preferences.onboarded) {
    router.push('/onboarding');
    return <div className="min-h-screen" />;
  }

  return <WatchContent />;
}

function WatchContent() {
  const { preferences } = usePreferences();
  const { games: allGames } = useGames();
  const [panelCount, setPanelCount] = useState(4);

  // Get games for the upcoming weekend from user's sports
  const weekends = useMemo(() => generateWeekends(2026), []);
  const weekendIndex = useMemo(() => getCurrentWeekendIndex(weekends), [weekends]);
  const currentWeekend = weekends[weekendIndex];

  const availableGames = useMemo(() => {
    if (!currentWeekend) return [];

    return allGames.filter(game => {
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

      return isGameOnWeekend(game, currentWeekend.startDate, currentWeekend.endDate);
    }).sort((a, b) => {
      // Live first, then by time
      if (a.status === 'live' && b.status !== 'live') return -1;
      if (b.status === 'live' && a.status !== 'live') return 1;
      return new Date(a.utc).getTime() - new Date(b.utc).getTime();
    });
  }, [preferences, currentWeekend]);

  // Selected tiles — user picks which games go in each slot
  const maxSlots = panelCount;
  const [selectedGameIds, setSelectedGameIds] = useState<(string | null)[]>(
    () => {
      // Auto-fill with first available games
      const initial: (string | null)[] = [];
      for (let i = 0; i < maxSlots; i++) {
        initial.push(availableGames[i]?.id || null);
      }
      return initial;
    }
  );

  // Ensure slots match grid size
  const slots = useMemo(() => {
    const result: (string | null)[] = [];
    for (let i = 0; i < maxSlots; i++) {
      result.push(selectedGameIds[i] || null);
    }
    return result;
  }, [selectedGameIds, maxSlots]);

  function setSlot(index: number, gameId: string | null) {
    setSelectedGameIds(prev => {
      const next = [...prev];
      // Ensure array is long enough
      while (next.length <= index) next.push(null);
      next[index] = gameId;
      return next;
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/[0.06]" style={{ background: 'rgba(6,10,17,0.85)' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.15] text-text-secondary hover:text-white transition-all text-sm"
            >
              ←
            </Link>
            <h1
              className="font-black text-lg uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Multiwall
            </h1>
          </div>

          {/* Panel count toggle */}
          <div className="flex items-center gap-1">
            {PANEL_OPTIONS.map(count => (
              <button
                key={count}
                onClick={() => setPanelCount(count)}
                className="w-8 h-8 rounded-lg text-xs font-bold transition-all"
                style={{
                  fontFamily: 'var(--font-heading)',
                  background: panelCount === count ? 'rgba(0,201,255,0.15)' : 'rgba(255,255,255,0.04)',
                  color: panelCount === count ? '#00c9ff' : '#666',
                  border: `1px solid ${panelCount === count ? 'rgba(0,201,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Grid */}
      <div
        className="flex-1 grid gap-2 p-2"
        style={{
          gridTemplateColumns: panelCount <= 1 ? '1fr' : 'repeat(2, 1fr)',
          gridAutoRows: panelCount <= 2 ? 'minmax(300px, 1fr)' : 'minmax(200px, 1fr)',
        }}
      >
        {slots.map((gameId, index) => (
          <WatchTile
            key={index}
            index={index}
            game={gameId ? availableGames.find(g => g.id === gameId) || null : null}
            availableGames={availableGames}
            selectedIds={slots}
            onSelect={(id) => setSlot(index, id)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Watch Tile ──────────────────────────────────────────────────────────────

interface WatchTileProps {
  index: number;
  game: Game | null;
  availableGames: Game[];
  selectedIds: (string | null)[];
  onSelect: (gameId: string | null) => void;
}

function WatchTile({ index, game, availableGames, selectedIds, onSelect }: WatchTileProps) {
  const { preferences } = usePreferences();
  const [showPicker, setShowPicker] = useState(false);

  if (!game) {
    return (
      <div className="rounded-xl border-2 border-dashed border-white/[0.08] flex flex-col items-center justify-center gap-3 min-h-[200px]">
        <span className="text-3xl opacity-30">📺</span>
        <button
          onClick={() => setShowPicker(true)}
          className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all"
          style={{
            fontFamily: 'var(--font-heading)',
            background: 'rgba(0,201,255,0.1)',
            color: '#00c9ff',
            border: '1px solid rgba(0,201,255,0.2)',
          }}
        >
          Add Stream
        </button>
        {showPicker && (
          <GamePickerDropdown
            games={availableGames}
            selectedIds={selectedIds}
            onPick={(id) => { onSelect(id); setShowPicker(false); }}
            onClose={() => setShowPicker(false)}
          />
        )}
      </div>
    );
  }

  const sport = SPORTS.find(s => s.id === game.sportId);
  const accent = sport?.accent || '#00c9ff';
  const broadcast = getBroadcast(game.sportId, preferences.homeCountry, game.broadcast);

  return (
    <div
      className="rounded-xl border border-white/[0.08] flex flex-col overflow-hidden relative group"
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      {/* Stream placeholder — where video would embed */}
      <div
        className="flex-1 flex flex-col items-center justify-center relative min-h-[120px]"
        style={{ background: `linear-gradient(135deg, ${accent}08, ${accent}03)` }}
      >
        {/* Live indicator */}
        {game.status === 'live' && (
          <div className="absolute top-3 left-3">
            <Pill status="live" />
          </div>
        )}

        {/* Swap button */}
        <button
          onClick={() => setShowPicker(true)}
          className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-xs"
          style={{ background: 'rgba(0,0,0,0.6)', color: '#aaa', border: '1px solid rgba(255,255,255,0.1)' }}
          title="Change stream"
        >
          ⇄
        </button>

        {/* Teams display */}
        <div className="flex items-center gap-3 px-4">
          <div className="flex flex-col items-center gap-1">
            <TeamLogo src={game.home.icon} name={game.home.name} shortName={game.home.shortName} accent={accent} size={40} />
            <span className="text-xs font-bold text-center" style={{ fontFamily: 'var(--font-heading)', color: '#ccc' }}>
              {game.home.shortName}
            </span>
          </div>

          {game.status === 'live' || game.status === 'final' ? (
            <div
              className="font-black text-2xl px-3 py-1 rounded-lg"
              style={{ fontFamily: 'var(--font-heading)', background: 'rgba(255,255,255,0.06)' }}
            >
              {game.homeScore} – {game.awayScore}
            </div>
          ) : (
            <span className="text-sm font-bold text-text-muted" style={{ fontFamily: 'var(--font-heading)' }}>vs</span>
          )}

          <div className="flex flex-col items-center gap-1">
            <TeamLogo src={game.away.icon} name={game.away.name} shortName={game.away.shortName} accent={accent} size={40} />
            <span className="text-xs font-bold text-center" style={{ fontFamily: 'var(--font-heading)', color: '#ccc' }}>
              {game.away.shortName}
            </span>
          </div>
        </div>

        {/* Watch button */}
        {broadcast?.url && (
          <a
            href={broadcast.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all hover:brightness-125"
            style={{
              fontFamily: 'var(--font-heading)',
              background: 'rgba(0,201,255,0.15)',
              color: '#00c9ff',
              border: '1px solid rgba(0,201,255,0.25)',
            }}
          >
            📺 Watch on {broadcast.name}
          </a>
        )}
      </div>

      {/* Info bar */}
      <div className="px-3 py-2 border-t border-white/[0.06] flex items-center gap-2 flex-wrap" style={{ background: 'rgba(0,0,0,0.3)' }}>
        {game.round && (
          <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{game.round}</span>
        )}
        {game.utc && <TimezoneBadge utc={game.utc} />}
        <span className="text-[11px] text-text-muted">
          {game.venue}
        </span>
      </div>

      {/* Picker overlay */}
      {showPicker && (
        <GamePickerDropdown
          games={availableGames}
          selectedIds={selectedIds}
          onPick={(id) => { onSelect(id); setShowPicker(false); }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}

// ─── Game Picker Dropdown ────────────────────────────────────────────────────

interface GamePickerDropdownProps {
  games: Game[];
  selectedIds: (string | null)[];
  onPick: (gameId: string) => void;
  onClose: () => void;
}

function GamePickerDropdown({ games, selectedIds, onPick, onClose }: GamePickerDropdownProps) {
  const unselected = games.filter(g => !selectedIds.includes(g.id));

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      {/* Dropdown */}
      <div
        className="absolute inset-x-2 top-2 z-50 rounded-xl border border-white/[0.1] shadow-2xl max-h-[300px] overflow-y-auto"
        style={{ background: 'rgba(15,20,30,0.97)' }}
      >
        <div className="p-2 border-b border-white/[0.06] flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted" style={{ fontFamily: 'var(--font-heading)' }}>
            Select a game
          </span>
          <button onClick={onClose} className="text-text-muted hover:text-white text-sm px-2">✕</button>
        </div>
        {unselected.length === 0 ? (
          <div className="p-4 text-center text-text-muted text-xs">
            No more games available to add.
          </div>
        ) : (
          unselected.map(game => {
            const sport = SPORTS.find(s => s.id === game.sportId);
            return (
              <button
                key={game.id}
                onClick={() => onPick(game.id)}
                className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-white/[0.04] transition-all text-left border-b border-white/[0.04] last:border-0"
              >
                <Pill status={game.status} />
                <TeamLogo src={game.home.icon} name={game.home.name} shortName={game.home.shortName} accent={sport?.accent || '#888'} size={18} />
                <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                  {game.home.shortName}
                </span>
                <span className="text-xs text-text-muted">vs</span>
                <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                  {game.away.shortName}
                </span>
                <TeamLogo src={game.away.icon} name={game.away.name} shortName={game.away.shortName} accent={sport?.accent || '#888'} size={18} />
                <span className="ml-auto text-[10px] text-text-muted uppercase tracking-wider">{sport?.name}</span>
              </button>
            );
          })
        )}
      </div>
    </>
  );
}
