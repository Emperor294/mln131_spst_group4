'use client';

import type { MuseumConcept } from '@/data/course';

interface MuseumConceptCardProps {
  concept: MuseumConcept;
  selected: boolean;
  onSelect: () => void;
}

export default function MuseumConceptCard({ concept, selected, onSelect }: MuseumConceptCardProps) {
  return (
    <article className={`border p-5 transition-colors ${selected ? 'border-[#c76c53] bg-[#1b2238]' : 'border-white/10 bg-white/[0.03]'}`}>
      <button
        type="button"
        aria-pressed={selected}
        onClick={onSelect}
        className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3a06d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1020]"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#d3a06d]">{concept.visualizationType}</span>
        <h3 className="mt-2 text-lg font-medium leading-snug text-white">{concept.title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/65">{concept.summary}</p>
        <span className="mt-4 inline-flex min-h-10 items-center text-xs font-medium tracking-[0.08em] text-[#d3a06d]">
          {selected ? 'Đang xem' : 'Mở khái niệm'}
        </span>
      </button>
    </article>
  );
}
