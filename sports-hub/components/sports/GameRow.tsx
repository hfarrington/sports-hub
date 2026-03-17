'use client';

import type { Game } from '@/lib/types';
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
      {/* Top row: teams + score */}
      <div className="flex items-center gap-2 flex-wrap">
        {game.round && (
          <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{game.round}</span>
        )}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <TeamLogo src={game.home.icon} name={game.home.name} shortName={game.home.shortName} accent={accent} size={20} />
          <Link href={`/${game.sportId}/${game.home.id}`} className="font-bold text-[15px] truncate hover:text-white transition-colors" style={{ fontFamily: 'var(--font-heading)', color: game.status === 'final' ? '#888' : '#fff' }}>
            {game.home.shortName}
          </Link>
        </div>

        {/* Score or status */}
        {game.status === 'final' || game.status === 'live' ? (
          <div
            className="font-black text-lg px-3 py-0.5 rounded-md min-w-[80px] text-center whitespace-nowrap"
            style={{ fontFamily: 'var(--font-heading)', background: 'rgba(255,255,255,0.06)' }}
          >
            {game.homeScore} – {game.awayScore}
          </div>
        ) : (
          <Pill status="upcoming" />
        )}

        <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end">
          <Link href={`/${game.sportId}/${game.away.id}`} className="font-bold text-[15px] truncate text-right hover:text-white transition-colors" style={{ fontFamily: 'var(--font-heading)', color: game.status === 'final' ? '#888' : '#fff' }}>
            {game.away.shortName}
          </Link>
          <TeamLogo src={game.away.icon} name={game.away.name} shortName={game.away.shortName} accent={accent} size={20} />
        </div>

        {game.status === 'live' && <Pill status="live" />}
        {game.status === 'final' && <Pill status="final" />}
      </div>

      {/* Meta row: timezone, venue, countdown */}
      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
        {game.utc && <TimezoneBadge utc={game.utc} />}
        {game.status === 'upcoming' && game.utc && <CountdownTimer utc={game.utc} />}
        <span className="text-[12px] text-text-muted flex items-center gap-1">
          {game.countryFlag && <span>{game.countryFlag}</span>}
          {game.venue}, {game.city}
        </span>
      </div>
    </div>
  );
}
