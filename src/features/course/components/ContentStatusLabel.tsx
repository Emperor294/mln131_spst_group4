import type { ContentStatus } from "@/data/course";

const STATUS_LABELS = {
  placeholder: "Nội dung đang được cập nhật",
  draft: "Đang rà soát học thuật",
  verified: "Nội dung đã sẵn sàng",
} as const satisfies Record<ContentStatus, string>;

interface ContentStatusLabelProps {
  status: ContentStatus;
  hideVerified?: boolean;
}

export default function ContentStatusLabel({ status, hideVerified = false }: ContentStatusLabelProps) {
  if (status === "verified" && hideVerified) return null;

  return (
    <span className="course-status" data-status={status}>
      <span aria-hidden="true" />
      {STATUS_LABELS[status]}
    </span>
  );
}
