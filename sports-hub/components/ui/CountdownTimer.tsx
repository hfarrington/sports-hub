'use client';

import { useCountdown } from '@/hooks/useCountdown';

interface CountdownTimerProps {
  utc: string;
}

export default function CountdownTimer({ utc }: CountdownTimerProps) {
  const countdown = useCountdown(utc);

  if (!countdown) return null;

  return (
    <span className="text-[11px] font-bold text-accent-lime ml-1">
      {countdown}
    </span>
  );
}
