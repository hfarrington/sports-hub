'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { UserPreferences } from '@/lib/types';
import { DEFAULT_PREFERENCES } from '@/lib/types';

const STORAGE_KEY = 'sportsHubPrefs';

interface PreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (partial: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
  toggleFavorite: (sectionId: string) => void;
  toggleCollapsed: (sectionId: string) => void;
}

const PreferencesContext = createContext<PreferencesContextType | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    }
  }, [preferences, loaded]);

  const updatePreferences = useCallback((partial: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...partial }));
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const toggleFavorite = useCallback((sectionId: string) => {
    setPreferences(prev => ({
      ...prev,
      favorites: prev.favorites.includes(sectionId)
        ? prev.favorites.filter(f => f !== sectionId)
        : [...prev.favorites, sectionId],
    }));
  }, []);

  const toggleCollapsed = useCallback((sectionId: string) => {
    setPreferences(prev => ({
      ...prev,
      collapsedSections: prev.collapsedSections.includes(sectionId)
        ? prev.collapsedSections.filter(s => s !== sectionId)
        : [...prev.collapsedSections, sectionId],
    }));
  }, []);

  if (!loaded) {
    return <div className="min-h-screen bg-bg-main" />;
  }

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences, resetPreferences, toggleFavorite, toggleCollapsed }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used within PreferencesProvider');
  return ctx;
}
