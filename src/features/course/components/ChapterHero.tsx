import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { CourseChapter } from "@/data/course";
import { CHAPTER_VISUAL_IDENTITIES } from "@/features/course/chapter-visuals";
import ContentStatusLabel from "./ContentStatusLabel";

export default function ChapterHero({ chapter }: { chapter: CourseChapter }) {
  const visual = CHAPTER_VISUAL_IDENTITIES[chapter.id];
  return (
    <header className="chapter-hero">
      <div className="course-container">
        <Link className="course-back-link" href="/chapters">
          <ArrowLeft aria-hidden="true" size={16} /> Tất cả chương
        </Link>
        <div className="chapter-hero__grid">
          <div className="chapter-hero__number" aria-hidden="true">
            {chapter.number.toString().padStart(2, "0")}
          </div>
          <div className="chapter-hero__content">
            <p className="course-eyebrow">Chương {chapter.number} · {visual.label}</p>
            <h1>{chapter.title}</h1>
            <ContentStatusLabel status={chapter.status} hideVerified />
          </div>
          <p className="chapter-hero__index">{visual.indexLabel}</p>
        </div>
      </div>
    </header>
  );
}
