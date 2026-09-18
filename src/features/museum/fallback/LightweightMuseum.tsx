'use client';

import Link from 'next/link';
import { ArrowLeft, Monitor, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getMuseumConceptById, MUSEUM_CONCEPTS, MUSEUM_ZONES } from '@/data/course';
import type { MuseumConceptId, MuseumZoneId } from '@/data/course';
import MuseumConceptCard from './MuseumConceptCard';
import MuseumConceptPanel from './MuseumConceptPanel';
import MuseumZoneIndex from './MuseumZoneIndex';
import { getMuseumFallbackDataIssues } from './fallback-validation';

const FALLBACK_DATA_ISSUES = getMuseumFallbackDataIssues();

interface LightweightMuseumProps {
  onRequestFull3D?: () => void;
  full3DConfirmationOpen?: boolean;
  onConfirmFull3D?: () => void;
  onCancelFull3D?: () => void;
  notice?: string;
}

export default function LightweightMuseum({
  onRequestFull3D,
  full3DConfirmationOpen = false,
  onConfirmFull3D,
  onCancelFull3D,
  notice,
}: LightweightMuseumProps) {
  const [selectedZoneId, setSelectedZoneId] = useState<MuseumZoneId>(MUSEUM_ZONES[0].id);
  const [selectedConceptId, setSelectedConceptId] = useState<MuseumConceptId | null>(MUSEUM_ZONES[0].conceptIds[0] ?? null);
  const selectedZone = MUSEUM_ZONES.find((zone) => zone.id === selectedZoneId) ?? MUSEUM_ZONES[0];
  const zoneConcepts = useMemo(
    () => selectedZone.conceptIds.map((id) => getMuseumConceptById(id)).filter((concept): concept is NonNullable<typeof concept> => Boolean(concept)),
    [selectedZone],
  );
  const selectedConcept = selectedConceptId ? MUSEUM_CONCEPTS.find((concept) => concept.id === selectedConceptId) : undefined;

  useEffect(() => {
    setSelectedConceptId(zoneConcepts[0]?.id ?? null);
  }, [zoneConcepts]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && FALLBACK_DATA_ISSUES.length > 0) {
      console.warn('[museum] Lightweight museum data issues:', FALLBACK_DATA_ISSUES);
    }
  }, []);

  const handleZoneSelect = (zoneId: MuseumZoneId) => {
    setSelectedZoneId(zoneId);
  };

  return (
    <main className="museum-fallback course-page min-h-screen bg-[#0b1020] text-white">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-12 lg:py-10">
        <header className="flex flex-wrap items-start justify-between gap-5 border-b border-white/10 pb-8">
          <div>
            <Link href="/" className="inline-flex min-h-10 items-center gap-2 text-xs tracking-[0.12em] text-white/55 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3a06d]">
              <ArrowLeft aria-hidden="true" size={15} /> Trang chủ
            </Link>
            <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-[#d3a06d]">SOCIALISM 360 · BẢO TÀNG HỌC TẬP</p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">Bảy không gian học tập</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">Khám phá các khái niệm cốt lõi của giáo trình qua một hành trình triển lãm nhẹ, không cần tải không gian 3D.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/15 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white/55">Chế độ nhẹ</span>
            {onRequestFull3D && (
              <button
                type="button"
                onClick={onRequestFull3D}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#c76c53]/70 px-4 py-2 text-xs font-medium text-white transition hover:bg-[#c76c53]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3a06d]"
              >
                <Monitor aria-hidden="true" size={15} /> Thử chế độ 3D
              </button>
            )}
          </div>
        </header>

        {notice && (
          <div className="mt-6 border border-[#c76c53]/60 bg-[#c76c53]/10 px-4 py-3 text-sm text-white/80" role="alert">
            {notice}
          </div>
        )}

        <section className="pt-8" aria-labelledby="museum-zones-title">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#d3a06d]">01—07</p>
              <h2 id="museum-zones-title" className="mt-2 font-serif text-2xl text-white sm:text-3xl">Chọn một không gian</h2>
            </div>
            <p className="hidden max-w-xs text-right text-xs leading-5 text-white/45 sm:block">Bạn có thể bắt đầu ở bất kỳ khu vực nào.</p>
          </div>
          <MuseumZoneIndex zones={MUSEUM_ZONES} selectedZoneId={selectedZone.id} onSelect={handleZoneSelect} />
        </section>

        <section className="mt-12 border-t border-white/10 pt-8" aria-labelledby="museum-concepts-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#d3a06d]">ZONE {selectedZone.order.toString().padStart(2, '0')}</p>
              <h2 id="museum-concepts-title" className="mt-2 font-serif text-3xl leading-tight text-white sm:text-4xl">{selectedZone.shortTitle}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">{selectedZone.learningGoal}</p>
              <p className="mt-2 max-w-2xl text-xs leading-5 text-white/45">{selectedZone.description}</p>
            </div>
            <Link href={`/chapters/${selectedZone.chapterId}`} className="min-h-11 rounded-full border border-white/15 px-4 py-3 text-xs text-white/70 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3a06d]">Mở chương {selectedZone.order.toString().padStart(2, '0')}</Link>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-start">
            <div className="grid gap-4 sm:grid-cols-2">
              {zoneConcepts.map((concept) => (
                <MuseumConceptCard
                  key={concept.id}
                  concept={concept}
                  selected={concept.id === selectedConceptId}
                  onSelect={() => setSelectedConceptId(concept.id)}
                />
              ))}
            </div>
            {selectedConcept && <MuseumConceptPanel concept={selectedConcept} />}
          </div>
        </section>

        <footer className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45">
          <span>28 khái niệm · 7 không gian</span>
          <Link href="/chapters" className="text-[#d3a06d] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3a06d]">Xem toàn bộ nội dung học tập →</Link>
        </footer>
      </div>

      {full3DConfirmationOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="museum-3d-confirm-title">
          <div className="w-full max-w-md border border-white/15 bg-[#11172a] p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#d3a06d]">Trải nghiệm tùy chọn</p>
                <h2 id="museum-3d-confirm-title" className="mt-2 font-serif text-2xl text-white">Mở không gian 3D?</h2>
              </div>
              <button type="button" onClick={onCancelFull3D} aria-label="Đóng xác nhận" className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3a06d]"><X aria-hidden="true" size={18} /></button>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/70">Không gian 3D cần tải dữ liệu lớn và hoạt động tốt nhất với chuột, bàn phím. Bạn có thể tiếp tục dùng chế độ nhẹ bất cứ lúc nào.</p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button type="button" onClick={onCancelFull3D} className="min-h-11 rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3a06d]">Ở lại chế độ nhẹ</button>
              <button type="button" onClick={onConfirmFull3D} className="min-h-11 rounded-full bg-[#7c1d2a] px-4 py-2 text-sm text-white hover:bg-[#5f1620] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3a06d]">Tiếp tục 3D</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
