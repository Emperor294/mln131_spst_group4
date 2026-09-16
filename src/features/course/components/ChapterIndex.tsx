import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COURSE_CHAPTERS } from "@/data/course";
import { CHAPTER_VISUAL_IDENTITIES } from "@/features/course/chapter-visuals";
import ContentStatusLabel from "./ContentStatusLabel";

export default function ChapterIndex() {
  return (
    <ol className="course-index" aria-label="Danh sách bảy chương MLN131">
      {COURSE_CHAPTERS.map((chapter) => {
        const visual = CHAPTER_VISUAL_IDENTITIES[chapter.id];
        return (
          <li key={chapter.id} className="course-index__item" data-featured={chapter.id === "chapter-05" || undefined}>
            <Link href={`/chapters/${chapter.id}`} className="course-index__link">
              <span className="course-index__number">{chapter.number.toString().padStart(2, "0")}</span>
              <span className="course-index__content">
                <span className="course-index__label">{visual.label}</span>
                <strong>{chapter.title}</strong>
                <ContentStatusLabel status={chapter.status} />
              </span>
              <span className="course-index__meta">
                <span>{visual.indexLabel}</span>
                <ArrowUpRight aria-hidden="true" size={22} />
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
