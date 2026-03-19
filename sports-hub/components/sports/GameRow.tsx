'use client';

import type { Game } from '@/lib/types';
import { usePreferences } from '@/providers/PreferencesProvider';
import { getBroadcast } from '@/lib/broadcast';
import Pill from '@/components/ui/Pill';
import TimezoneBadge from '@/components/ui/TimezoneBadge';
import TeamLogo from '@/components/ui/TeamLogo';
import CountdownTimer from '@/components/ui/CountdownTimer';
import Link from 'next/link';

interface GameRowProps {
  game: Game;
  accent: string;
}

export default function GameRow({ game, accent }: GameRowProps) {
  const { preferences } = usePreferences();
  const broadcast = getBroadcast(game.sportId, preferences.homeCountry, game.broadcast);

  const statusBg = {
    final: 'bg-white/[0.03]',
    live: 'bg-red-500/[0.07]',
    upcoming: 'bg-white/[0.02]',
  };

  return (
    <div
      className={`rounded-lg p-3 mb-2 border-l-[3px] ${statusBg[game.status]}`}
      style={{ borderLeftColor: game.status === 'live' ? '#ff4444' : game.status === 'upcoming' ? accent : 'transparent' }}
    >
      {/* Round + Status */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          {game.round && (
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{game.round}</span>
          )}
          <Pill status={game.status} />
        </div>
        {game.status === 'upcoming' && game.utc && <CountdownTimer utc={game.utc} />}
      </div>

      {/* Teams — inline "Home vs Away" layout */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <TeamLogo src={game.home.icon} name={game.home.name} shortName={game.home.shortName} accent={accent} size={22} />
        <Link
          href={`/${game.sportId}/${game.home.id}`}
          className="font-bold text-[15px] hover:text-white transition-colors"
          style={{ fontFamily: 'var(--font-heading)', color: game.status === 'final' ? '#999' : '#fff' }}
        >
          {game.home.name}
        </Link>

        {/* Score or "vs" */}
        {game.status === 'final' || game.status === 'live' ? (
          <div
            className="font-black text-sm px-2 py-0.5 rounded-md whitespace-nowrap"
            style={{ fontFamily: 'var(--font-heading)', background: 'rgba(255,255,255,0.06)' }}
          >
            {game.homeScore} – {game.awayScore}
          </div>
        ) : (
          <span className="text-xs font-bold text-text-muted" style={{ fontFamily: 'var(--font-heading)' }}>
            vs
          </span>
        )}

        <Link
          href={`/${game.sportId}/${game.away.id}`}
          className="font-bold text-[15px] hover:text-white transition-colors"
          style={{ fontFamily: 'var(--font-heading)', color: game.status === 'final' ? '#999' : '#fff' }}
        >
          {game.away.name}
        </Link>
        <TeamLogo src={game.away.icon} name={game.away.name} shortName={game.away.shortName} accent={accent} size={22} />
      </div>

      {/* Meta row: timezone, broadcast, venue — indented to align with team names */}
      <div className="flex items-center gap-2 mt-1.5 flex-wrap" style={{ paddingLeft: '30px' }}>
        {game.utc && <TimezoneBadge utc={game.utc} />}
        {broadcast && (
          broadcast.url ? (
            <a
              href={broadcast.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold px-2 py-0.5 rounded-full hover:brightness-125 transition-all"
              style={{ background: 'rgba(0,201,255,0.12)', color: '#00c9ff' }}
            >
              📺 {broadcast.name}
            </a>
          ) : (
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(0,201,255,0.12)', color: '#00c9ff' }}
            >
              📺 {broadcast.name}
            </span>
          )
        )}
        <span className="text-[12px] text-text-muted flex items-center gap-1">
          {game.countryFlag && <span>{game.countryFlag}</span>}
          {game.venue}, {game.city}
        </span>
      </div>
    </div>
  );
}
