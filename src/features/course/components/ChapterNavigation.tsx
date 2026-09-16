import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getChapterNeighbors, type CourseChapter } from "@/data/course";

export default function ChapterNavigation({ chapter }: { chapter: CourseChapter }) {
  const { previous, next } = getChapterNeighbors(chapter.id);
  return (
    <nav className="chapter-navigation" aria-label="Điều hướng giữa các chương">
      <div>
        {previous && (
          <Link href={`/chapters/${previous.id}`} rel="prev">
            <ArrowLeft aria-hidden="true" size={18} />
            <span><small>Chương trước</small>Chương {previous.number}</span>
          </Link>
        )}
      </div>
      <Link className="chapter-navigation__all" href="/chapters">Chỉ mục 01—07</Link>
      <div>
        {next && (
          <Link href={`/chapters/${next.id}`} rel="next">
            <span><small>Chương tiếp</small>Chương {next.number}</span>
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        )}
      </div>
    </nav>
  );
}
