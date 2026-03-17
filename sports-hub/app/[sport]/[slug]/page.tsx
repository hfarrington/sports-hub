'use client';

import { useParams, useRouter } from 'next/navigation';
import { SPORTS } from '@/lib/constants';
import { SAMPLE_GAMES } from '@/lib/sample-data';
import GameRow from '@/components/sports/GameRow';

export default function DetailPage() {
  const params = useParams();
  const router = useRouter();
  const sportId = params.sport as string;
  const slug = params.slug as string;

  const sport = SPORTS.find(s => s.id === sportId);
  if (!sport) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-secondary">Sport not found</p>
      </div>
    );
  }

  // Find the team or competition
  const team = sport.competitions.flatMap(c => c.teams).find(t => t.id === slug);
  const competition = sport.competitions.find(c => c.id === slug);
  const entityName = team?.name || competition?.name || slug;

  // Filter games for this team/competition
  const games = SAMPLE_GAMES.filter(g => {
    if (g.sportId !== sportId) return false;
    if (team) return g.home.id === slug || g.away.id === slug;
    if (competition) return g.competitionId === slug;
    return false;
  });

  const upcoming = games.filter(g => g.status === 'upcoming');
  const results = games.filter(g => g.status === 'final' || g.status === 'live');

  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/[0.06]" style={{ background: 'rgba(6,10,17,0.85)' }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.15] text-text-secondary hover:text-white transition-all text-sm"
          >
            ←
          </button>
          <div>
            <h1
              className="font-black text-lg uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-heading)', color: sport.accent }}
            >
              {entityName}
            </h1>
            <p className="text-[11px] text-text-muted">{sport.name}</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-6">
        {/* Upcoming Fixtures */}
        <section>
          <h2
            className="text-sm font-black uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-heading)', color: '#b0ff4e' }}
          >
            Upcoming Fixtures ({upcoming.length})
          </h2>
          {upcoming.length > 0 ? (
            upcoming.map(game => (
              <GameRow key={game.id} game={game} accent={sport.accent} />
            ))
          ) : (
            <p className="text-text-muted text-xs">No upcoming fixtures.</p>
          )}
        </section>

        {/* Results */}
        <section>
          <h2
            className="text-sm font-black uppercase tracking-wider mb-3"
            style={{ fontFamily: 'var(--font-heading)', color: '#888' }}
          >
            Results ({results.length})
          </h2>
          {results.length > 0 ? (
            results.map(game => (
              <GameRow key={game.id} game={game} accent={sport.accent} />
            ))
          ) : (
            <p className="text-text-muted text-xs">No results yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
