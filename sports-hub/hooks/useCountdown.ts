'use client';

import { useState, useEffect } from 'react';
import { getCountdown } from '@/lib/timezone';

export function useCountdown(utc: string | undefined) {
  const [countdown, setCountdown] = useState<string | null>(null);

  useEffect(() => {
    if (!utc) return;
    const update = () => setCountdown(getCountdown(utc));
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [utc]);

  return countdown;
}
