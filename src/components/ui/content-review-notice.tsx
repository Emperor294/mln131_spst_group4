export default function ContentReviewNotice() {
  return (
    <aside
      aria-label="Trạng thái nội dung học thuật"
      className="mx-auto mb-6 w-[min(1120px,calc(100%-2rem))] border border-amber-700/30 bg-amber-50/90 px-4 py-3 text-sm text-amber-950"
    >
      <strong>Nội dung này đang được rà soát.</strong>{" "}
      Thông tin đang được đối chiếu với giáo trình MLN131 đang sử dụng và chưa được đánh dấu là đã xác minh.
    </aside>
  );
}
