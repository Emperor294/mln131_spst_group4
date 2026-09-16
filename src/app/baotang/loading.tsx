export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-white/95">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-900 border-t-transparent" />
        <div className="text-sm font-sub text-black/80">Đang tải bảo tàng 3D…</div>
      </div>
    </div>
  );
}


