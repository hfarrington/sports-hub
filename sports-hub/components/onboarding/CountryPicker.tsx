'use client';

import { COUNTRIES } from '@/lib/broadcast';

interface CountryPickerProps {
  value: string;
  onChange: (id: string) => void;
}

export default function CountryPicker({ value, onChange }: CountryPickerProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-3xl font-black tracking-wide uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
          Where Are You?
        </h2>
        <p className="text-text-secondary mt-2 text-sm">
          We&apos;ll show which TV channel or streaming service has each game in your country
        </p>
      </div>

      <div className="space-y-1.5">
        {COUNTRIES.map(country => {
          const isSelected = value === country.id;
          return (
            <button
              key={country.id}
              onClick={() => onChange(country.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left"
              style={{
                background: isSelected ? 'rgba(0,201,255,0.08)' : 'rgba(255,255,255,0.02)',
                borderColor: isSelected ? '#00c9ff' : 'rgba(255,255,255,0.06)',
              }}
            >
              <span className="text-2xl">{country.flag}</span>
              <span
                className="font-bold text-sm uppercase tracking-wider"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: isSelected ? '#fff' : '#888',
                }}
              >
                {country.name}
              </span>
              {isSelected && (
                <span className="ml-auto text-accent-cyan font-bold text-sm">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
