import type { Lesson } from "@/data/course";
import ContentStatusLabel from "./ContentStatusLabel";

export default function LessonList({ lessons }: { lessons: readonly Lesson[] }) {
  if (lessons.length === 0) {
    return (
      <div className="course-empty-state">
        <span aria-hidden="true">00</span>
        <div>
          <h3>Cấu trúc bài học đang được chuẩn hóa</h3>
          <p>Danh sách bài học sẽ xuất hiện tại đây sau khi được đối chiếu với tài liệu môn học.</p>
        </div>
      </div>
    );
  }

  return (
    <ol className="lesson-list">
      {lessons.map((lesson) => (
        <li key={lesson.id}>
          <a href={`#${lesson.id}`}>
            <span>{lesson.order.toString().padStart(2, "0")}</span>
            <strong>{lesson.title}</strong>
            <ContentStatusLabel status={lesson.status} hideVerified />
          </a>
        </li>
      ))}
    </ol>
  );
}
