import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";
import AssessmentProgressProvider from "@/features/assessment/progress/AssessmentProgressProvider";
import ProgressDashboard from "@/features/assessment/components/ProgressDashboard";

export const metadata: Metadata = {
  title: `Tiến độ luyện tập | ${SITE_CONFIG.brand}`,
  description: "Xem lại lịch sử luyện tập cục bộ của bảy chương MLN131.",
};

export default function ProgressPage() {
  return (
    <AssessmentProgressProvider>
      <ProgressDashboard />
    </AssessmentProgressProvider>
  );
}
