'use client';

import { useRouter } from 'next/navigation';
import { usePreferences } from '@/providers/PreferencesProvider';
import CountryPicker from '@/components/onboarding/CountryPicker';
import SportPicker from '@/components/onboarding/SportPicker';
import TeamPicker from '@/components/onboarding/TeamPicker';
import TimezonePicker from '@/components/onboarding/TimezonePicker';

export default function SettingsPage() {
  const router = useRouter();
  const { preferences, updatePreferences, resetPreferences } = usePreferences();

  function toggleSport(id: string) {
    const current = preferences.selectedSports;
    updatePreferences({
      selectedSports: current.includes(id)
        ? current.filter(s => s !== id)
        : [...current, id],
    });
  }

  function toggleTeam(sportId: string, teamId: string) {
    const current = preferences.selectedTeams[sportId] || [];
    updatePreferences({
      selectedTeams: {
        ...preferences.selectedTeams,
        [sportId]: current.includes(teamId)
          ? current.filter(t => t !== teamId)
          : [...current, teamId],
      },
    });
  }

  function toggleCompetition(sportId: string, compId: string) {
    const current = preferences.selectedCompetitions[sportId] || [];
    updatePreferences({
      selectedCompetitions: {
        ...preferences.selectedCompetitions,
        [sportId]: current.includes(compId)
          ? current.filter(c => c !== compId)
          : [...current, compId],
      },
    });
  }

  function toggleFollowAll(sportId: string) {
    updatePreferences({
      followAll: {
        ...preferences.followAll,
        [sportId]: !preferences.followAll[sportId],
      },
    });
  }

  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/[0.06]" style={{ background: 'rgba(6,10,17,0.85)' }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.push('/')}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.15] text-text-secondary hover:text-white transition-all text-sm"
          >
            ←
          </button>
          <h1
            className="font-black text-lg uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Settings
          </h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-8">
        <CountryPicker
          value={preferences.homeCountry}
          onChange={(id) => updatePreferences({ homeCountry: id })}
        />

        <SportPicker
          selected={preferences.selectedSports}
          onToggle={toggleSport}
        />

        {/* Team/Competition pickers for each selected sport */}
        {preferences.selectedSports.map(sportId => (
          <TeamPicker
            key={sportId}
            sportId={sportId}
            selectedCompetitions={preferences.selectedCompetitions[sportId] || []}
            selectedTeams={preferences.selectedTeams[sportId] || []}
            followAll={preferences.followAll[sportId] || false}
            onToggleCompetition={(compId) => toggleCompetition(sportId, compId)}
            onToggleTeam={(teamId) => toggleTeam(sportId, teamId)}
            onToggleAll={() => toggleFollowAll(sportId)}
          />
        ))}

        <TimezonePicker
          timezone1={preferences.timezone1}
          timezone2={preferences.timezone2}
          onSetTimezone1={(tz) => updatePreferences({ timezone1: tz })}
          onSetTimezone2={(tz) => updatePreferences({ timezone2: tz })}
        />

        <div className="pt-4 border-t border-white/[0.06]">
          <button
            onClick={() => {
              resetPreferences();
              router.push('/onboarding');
            }}
            className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 font-bold uppercase text-sm tracking-wider hover:bg-red-500/10 transition-all"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Reset & Re-onboard
          </button>
        </div>
      </div>
    </div>
  );
}
