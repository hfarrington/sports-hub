'use client';

import { SPORTS } from '@/lib/constants';
import type { Competition, Team } from '@/lib/types';

interface TeamPickerProps {
  sportId: string;
  selectedCompetitions: string[];
  selectedTeams: string[];
  followAll: boolean;
  onToggleCompetition: (compId: string) => void;
  onToggleTeam: (teamId: string) => void;
  onToggleAll: () => void;
}

export default function TeamPicker({
  sportId,
  selectedCompetitions,
  selectedTeams,
  followAll,
  onToggleCompetition,
  onToggleTeam,
  onToggleAll,
}: TeamPickerProps) {
  const sport = SPORTS.find(s => s.id === sportId);
  if (!sport) return null;

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-black tracking-wide uppercase" style={{ fontFamily: 'var(--font-heading)', color: sport.accent }}>
          {sport.name}
        </h2>
        <p className="text-text-secondary mt-1 text-sm">
          Select competitions and/or teams to follow
        </p>
      </div>

      {/* Follow All toggle */}
      <button
        onClick={onToggleAll}
        className="w-full rounded-xl p-3 border-2 transition-all text-center font-bold uppercase text-sm tracking-wider"
        style={{
          fontFamily: 'var(--font-heading)',
          background: followAll ? `${sport.accent}15` : 'rgba(255,255,255,0.03)',
          borderColor: followAll ? sport.accent : 'rgba(255,255,255,0.08)',
          color: followAll ? sport.accent : '#888',
        }}
      >
        {followAll ? '✓ Following Everything' : 'Follow All'}
      </button>

      {!followAll && sport.competitions.map(comp => (
        <CompetitionSection
          key={comp.id}
          competition={comp}
          accent={sport.accent}
          isCompSelected={selectedCompetitions.includes(comp.id)}
          selectedTeams={selectedTeams}
          onToggleCompetition={() => onToggleCompetition(comp.id)}
          onToggleTeam={onToggleTeam}
        />
      ))}
    </div>
  );
}

function CompetitionSection({
  competition,
  accent,
  isCompSelected,
  selectedTeams,
  onToggleCompetition,
  onToggleTeam,
}: {
  competition: Competition;
  accent: string;
  isCompSelected: boolean;
  selectedTeams: string[];
  onToggleCompetition: () => void;
  onToggleTeam: (teamId: string) => void;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] overflow-hidden">
      {/* Competition header */}
      <button
        onClick={onToggleCompetition}
        className="w-full flex items-center gap-3 p-3 transition-all"
        style={{
          background: isCompSelected ? `${accent}10` : 'rgba(255,255,255,0.02)',
        }}
      >
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold border"
          style={{
            borderColor: isCompSelected ? accent : 'rgba(255,255,255,0.15)',
            background: isCompSelected ? accent : 'transparent',
            color: isCompSelected ? '#000' : '#888',
          }}
        >
          {isCompSelected ? '✓' : ''}
        </div>
        <span
          className="font-bold text-sm uppercase tracking-wider"
          style={{ fontFamily: 'var(--font-heading)', color: isCompSelected ? '#fff' : '#888' }}
        >
          {competition.name}
        </span>
      </button>

      {/* Teams grid */}
      {competition.teams.length > 0 && (
        <div className="grid grid-cols-2 gap-1.5 p-2.5 bg-white/[0.01]">
          {competition.teams.map(team => (
            <TeamButton
              key={team.id}
              team={team}
              accent={accent}
              isSelected={selectedTeams.includes(team.id)}
              onToggle={() => onToggleTeam(team.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TeamButton({
  team,
  accent,
  isSelected,
  onToggle,
}: {
  team: Team;
  accent: string;
  isSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 rounded-lg p-2 transition-all border"
      style={{
        background: isSelected ? `${accent}10` : 'transparent',
        borderColor: isSelected ? `${accent}40` : 'transparent',
      }}
    >
      <div className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center overflow-hidden flex-shrink-0">
        {team.icon.startsWith('/') ? (
          <span className="text-[10px] font-bold" style={{ color: team.accent || accent }}>
            {team.shortName}
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={team.icon} alt={team.name} className="w-5 h-5 object-contain" />
        )}
      </div>
      <span
        className="text-xs font-semibold truncate"
        style={{ color: isSelected ? '#fff' : '#666' }}
      >
        {team.name}
      </span>
    </button>
  );
}
