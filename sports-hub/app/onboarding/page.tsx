'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePreferences } from '@/providers/PreferencesProvider';
import CountryPicker from '@/components/onboarding/CountryPicker';
import SportPicker from '@/components/onboarding/SportPicker';
import TeamPicker from '@/components/onboarding/TeamPicker';
import TimezonePicker from '@/components/onboarding/TimezonePicker';
import { SPORTS } from '@/lib/constants';

export default function OnboardingPage() {
  const router = useRouter();
  const { updatePreferences } = usePreferences();
  const [step, setStep] = useState(0); // 0 = country, 1 = sports, 2..N+1 = team pickers, N+2 = timezone

  // Local state for building preferences
  const [homeCountry, setHomeCountry] = useState('nz');
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedCompetitions, setSelectedCompetitions] = useState<Record<string, string[]>>({});
  const [selectedTeams, setSelectedTeams] = useState<Record<string, string[]>>({});
  const [followAll, setFollowAll] = useState<Record<string, boolean>>({});
  const [timezone1, setTimezone1] = useState('auckland');
  const [timezone2, setTimezone2] = useState('melbourne');

  const totalSteps = selectedSports.length + 3; // country + sports + N team pickers + timezone
  const isCountryStep = step === 0;
  const isSportsStep = step === 1;
  const isTimezoneStep = step === selectedSports.length + 2;
  const currentSportIndex = step - 2; // which sport we're picking teams for

  function toggleSport(id: string) {
    setSelectedSports(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  }

  function toggleCompetition(sportId: string, compId: string) {
    setSelectedCompetitions(prev => {
      const current = prev[sportId] || [];
      return {
        ...prev,
        [sportId]: current.includes(compId) ? current.filter(c => c !== compId) : [...current, compId],
      };
    });
  }

  function toggleTeam(sportId: string, teamId: string) {
    setSelectedTeams(prev => {
      const current = prev[sportId] || [];
      return {
        ...prev,
        [sportId]: current.includes(teamId) ? current.filter(t => t !== teamId) : [...current, teamId],
      };
    });
  }

  function toggleFollowAll(sportId: string) {
    setFollowAll(prev => ({ ...prev, [sportId]: !prev[sportId] }));
  }

  function handleNext() {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      // Save and go to dashboard
      updatePreferences({
        onboarded: true,
        homeCountry,
        selectedSports,
        selectedCompetitions,
        selectedTeams,
        followAll,
        timezone1,
        timezone2,
      });
      router.push('/');
    }
  }

  function handleBack() {
    if (step > 0) setStep(step - 1);
  }

  const canProceed = isCountryStep
    ? !!homeCountry
    : isSportsStep
      ? selectedSports.length > 0
      : isTimezoneStep
        ? !!timezone1 && !!timezone2
        : true; // team selection is optional

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted" style={{ fontFamily: 'var(--font-heading)' }}>
              Step {step + 1} of {totalSteps}
            </span>
            <span className="text-xs text-text-muted">
              {isCountryStep ? 'Country' : isSportsStep ? 'Sports' : isTimezoneStep ? 'Timezones' : selectedSports[currentSportIndex]}
            </span>
          </div>
          <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${((step + 1) / totalSteps) * 100}%`,
                background: 'linear-gradient(90deg, #00c9ff, #b0ff4e)',
              }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="animate-fade-in">
          {isCountryStep && (
            <CountryPicker value={homeCountry} onChange={setHomeCountry} />
          )}

          {isSportsStep && (
            <SportPicker selected={selectedSports} onToggle={toggleSport} />
          )}

          {step > 1 && !isTimezoneStep && selectedSports[currentSportIndex] && (
            <TeamPicker
              sportId={selectedSports[currentSportIndex]}
              selectedCompetitions={selectedCompetitions[selectedSports[currentSportIndex]] || []}
              selectedTeams={selectedTeams[selectedSports[currentSportIndex]] || []}
              followAll={followAll[selectedSports[currentSportIndex]] || false}
              onToggleCompetition={(compId) => toggleCompetition(selectedSports[currentSportIndex], compId)}
              onToggleTeam={(teamId) => toggleTeam(selectedSports[currentSportIndex], teamId)}
              onToggleAll={() => toggleFollowAll(selectedSports[currentSportIndex])}
            />
          )}

          {isTimezoneStep && (
            <TimezonePicker
              timezone1={timezone1}
              timezone2={timezone2}
              onSetTimezone1={setTimezone1}
              onSetTimezone2={setTimezone2}
            />
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button
              onClick={handleBack}
              className="flex-1 py-3 rounded-xl border border-white/[0.15] text-text-secondary font-bold uppercase text-sm tracking-wider transition-all hover:border-white/[0.3] hover:text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="flex-1 py-3 rounded-xl font-bold uppercase text-sm tracking-wider transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              fontFamily: 'var(--font-heading)',
              background: canProceed ? 'linear-gradient(135deg, #00c9ff, #b0ff4e)' : 'rgba(255,255,255,0.06)',
              color: canProceed ? '#000' : '#666',
            }}
          >
            {isTimezoneStep ? "Let's Go!" : isCountryStep ? 'Next — Pick Sports' : isSportsStep ? 'Next — Pick Teams' : 'Next'}
          </button>
        </div>

        {/* Skip team selection hint */}
        {step > 1 && !isTimezoneStep && (
          <p className="text-center text-xs text-text-muted mt-3">
            You can skip — this just filters what you see on the dashboard
          </p>
        )}
      </div>
    </div>
  );
}
