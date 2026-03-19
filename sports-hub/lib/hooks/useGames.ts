'use client';

import { useState, useEffect } from 'react';
import type { Game } from '@/lib/types';
import { SAMPLE_GAMES } from '@/lib/sample-data';

interface UseGamesResult {
  games: Game[];
  loading: boolean;
  error: string | null;
  isLive: boolean; // true when showing live API data vs sample fallback
}

export function useGames(): UseGamesResult {
  const [games, setGames] = useState<Game[]>(SAMPLE_GAMES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/games');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Game[] = await res.json();

        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setGames(data);
          setIsLive(true);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('[useGames] API fetch failed, using sample data:', err);
          setError(err instanceof Error ? err.message : 'Failed to fetch');
          // Keep sample data as fallback — already set as initial state
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { games, loading, error, isLive };
}
