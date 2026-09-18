'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { COURSE_LESSONS, getChapterById, getMuseumZoneById } from '@/data/course';
import type { MuseumConcept } from '@/data/course';
import SourceList from '@/features/course/components/SourceList';

interface MuseumConceptPanelProps {
  concept: MuseumConcept;
  onNavigate?: () => void;
}

export default function MuseumConceptPanel({ concept, onNavigate }: MuseumConceptPanelProps) {
  const zone = getMuseumZoneById(concept.chapterId.replace('chapter-', 'museum-zone-'));
  const chapter = getChapterById(concept.chapterId);
  const lessons = concept.lessonIds
    .map((lessonId) => COURSE_LESSONS.find((lesson) => lesson.id === lessonId))
    .filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson));

  return (
    <aside className="border border-white/15 bg-[#11172a] p-5 shadow-2xl sm:p-7" aria-labelledby="museum-fallback-concept-title">
      <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#d3a06d]">
        <span>{zone ? `Zone ${zone.order.toString().padStart(2, '0')}` : 'Không gian học tập'}</span>
        <span aria-hidden="true">·</span>
        <span>{chapter?.shortTitle ?? chapter?.title}</span>
      </div>
      <h2 id="museum-fallback-concept-title" className="mt-3 font-serif text-2xl leading-tight text-white sm:text-3xl">{concept.title}</h2>
      <p className="mt-4 text-sm leading-7 text-white/75">{concept.summary}</p>

      <div className="mt-5 border-l-2 border-[#c76c53] bg-white/[0.04] px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/55">Liên hệ bài học</p>
        <ul className="mt-2 space-y-1 text-sm leading-6 text-white/75">
          {lessons.map((lesson) => <li key={lesson.id}>{lesson.title}</li>)}
        </ul>
      </div>

      <div className="museum-fallback-source mt-6 text-white/80">
        <SourceList sourceRefs={concept.sourceRefs} headingLevel="h3" />
      </div>

      {chapter && (
        <Link
          href={`/chapters/${chapter.id}`}
          onClick={onNavigate}
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#7c1d2a] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#5f1620] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3a06d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11172a]"
        >
          Khám phá bài học <ArrowRight aria-hidden="true" size={16} className="ml-2" />
        </Link>
      )}
    </aside>
  );
}
