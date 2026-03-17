'use client';

import type { Standing } from '@/lib/types';

interface StandingsTableProps {
  standings: Standing[];
  accent: string;
  title?: string;
}

export default function StandingsTable({ standings, accent, title }: StandingsTableProps) {
  return (
    <div className="mt-3">
      {title && (
        <h4
          className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h4>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-text-muted border-b border-white/[0.06]">
              <th className="text-left py-1.5 pr-2 w-6">#</th>
              <th className="text-left py-1.5">Team</th>
              <th className="text-center py-1.5 w-8">P</th>
              <th className="text-center py-1.5 w-8">W</th>
              <th className="text-center py-1.5 w-8">L</th>
              <th className="text-center py-1.5 w-10">Pts</th>
              <th className="text-right py-1.5 w-12">Diff</th>
            </tr>
          </thead>
          <tbody>
            {standings.map(row => (
              <tr
                key={row.pos}
                className="border-b border-white/[0.03]"
                style={row.highlight ? { background: `${accent}08` } : undefined}
              >
                <td className="py-1.5 pr-2 text-text-muted font-bold">{row.pos}</td>
                <td className="py-1.5 font-semibold" style={{ color: row.highlight ? accent : '#dde4f0' }}>
                  {row.team}
                </td>
                <td className="text-center py-1.5 text-text-secondary">{row.played}</td>
                <td className="text-center py-1.5 text-text-secondary">{row.won}</td>
                <td className="text-center py-1.5 text-text-secondary">{row.lost}</td>
                <td className="text-center py-1.5 font-bold" style={{ color: accent }}>{row.points}</td>
                <td className="text-right py-1.5 text-text-muted">{row.diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
