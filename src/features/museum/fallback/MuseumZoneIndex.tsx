'use client';

import type { MuseumZone, MuseumZoneId } from '@/data/course';

interface MuseumZoneIndexProps {
  zones: readonly MuseumZone[];
  selectedZoneId: MuseumZoneId;
  onSelect: (zoneId: MuseumZoneId) => void;
}

export default function MuseumZoneIndex({ zones, selectedZoneId, onSelect }: MuseumZoneIndexProps) {
  return (
    <nav aria-label="Bảy không gian học tập">
      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {zones.map((zone) => {
          const selected = zone.id === selectedZoneId;
          return (
            <li key={zone.id}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(zone.id)}
                className={`museum-motion flex min-h-24 w-full flex-col justify-between border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3a06d] ${selected ? 'border-[#c76c53] bg-[#1b2238]' : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'}`}
              >
                <span className="text-[10px] tracking-[0.24em] text-[#d3a06d]">{zone.order.toString().padStart(2, '0')}</span>
                <span className="mt-3 text-sm font-medium tracking-[0.08em] text-white">{zone.shortTitle}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
