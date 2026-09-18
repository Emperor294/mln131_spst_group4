'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { COURSE_LESSONS, getChapterById, getMuseumConceptById, getMuseumZoneById } from '@/data/course';
import type { MuseumConceptStation } from '../data/concept-stations';
import Dialog from '@/components/ui/dialog';
import SourceList from '@/features/course/components/SourceList';

interface ConceptDialogProps {
  isOpen: boolean;
  station: MuseumConceptStation | null;
  onClose: () => void;
}

export default function ConceptDialog({ isOpen, station, onClose }: ConceptDialogProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const concepts = useMemo(
    () => station?.conceptIds.map((id) => getMuseumConceptById(id)).filter((concept): concept is NonNullable<typeof concept> => Boolean(concept)) ?? [],
    [station],
  );
  const activeConcept = concepts[activeIndex] ?? concepts[0];
  const zone = station ? getMuseumZoneById(station.zoneId) : undefined;
  const chapter = activeConcept ? getChapterById(activeConcept.chapterId) : undefined;
  const relatedLessons = activeConcept?.lessonIds
    .map((lessonId) => COURSE_LESSONS.find((lesson) => lesson.id === lessonId))
    .filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson)) ?? [];

  useEffect(() => {
    if (isOpen) setActiveIndex(0);
  }, [isOpen, station?.id]);

  if (!station || !activeConcept || !zone || !chapter) return null;

  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex < concepts.length - 1;

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={activeConcept.title}>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
          <span>Zone {zone.order.toString().padStart(2, '0')}</span>
          <span aria-hidden="true">·</span>
          <span>{zone.shortTitle}</span>
        </div>

        <p className="-mt-3 text-xs leading-5 text-slate-500">{chapter.title}</p>

        <p className="text-base leading-7 text-slate-700">{activeConcept.summary}</p>

        <div className="border-l-2 border-[#b23a48] bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <p className="font-medium text-slate-900">Liên hệ bài học</p>
          <ul className="mt-1 list-inside list-disc leading-6">
            {relatedLessons.map((lesson) => <li key={lesson.id}>{lesson.title}</li>)}
          </ul>
        </div>

        {concepts.length > 1 && (
          <div className="flex items-center justify-between gap-3 border-y border-slate-200 py-3">
            <button
              type="button"
              disabled={!hasPrevious}
              onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}
              className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowLeft aria-hidden="true" size={15} /> Trước
            </button>
            <span className="text-xs text-slate-500">{activeIndex + 1} / {concepts.length}</span>
            <button
              type="button"
              disabled={!hasNext}
              onClick={() => setActiveIndex((index) => Math.min(concepts.length - 1, index + 1))}
              className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-35"
            >
              Sau <ArrowRight aria-hidden="true" size={15} />
            </button>
          </div>
        )}

        <SourceList sourceRefs={activeConcept.sourceRefs} headingLevel="h3" />

        <Link
          href={`/chapters/${chapter.id}`}
          onClick={onClose}
          className="inline-flex w-full items-center justify-center rounded-full bg-[#7c1d2a] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#5f1620] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c1d2a] focus-visible:ring-offset-2"
        >
          Khám phá bài học <ArrowRight aria-hidden="true" size={16} className="ml-2" />
        </Link>
      </div>
    </Dialog>
  );
}
