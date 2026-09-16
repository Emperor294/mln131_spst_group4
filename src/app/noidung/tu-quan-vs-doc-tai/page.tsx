'use client';

import {
  ClientAnimatedSection,
  FadeUp,
} from '../../../components/animation/AnimatedWrapper';

export default function TuQuanVsDocTaiPage() {
  return (
    <ClientAnimatedSection className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <FadeUp className="text-center mb-16">
          <h1 className="text-4xl font-primary uppercase tracking-tighter">Tự quản xã hội <span className="text-red-900">vs.</span> Độc tài</h1>
          <div className="w-24 h-1 bg-red-900 mx-auto mt-4"></div>
        </FadeUp>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-black">
          {/* Cột Độc tài - Phân tích sai lầm */}
          <div className="p-10 bg-gray-100 border-r-2 border-black">
            <h2 className="text-2xl font-bold mb-6 text-gray-500 line-through">Độc tài / Toàn trị</h2>
            <ul className="space-y-6 font-serif">
              <li>• Duy trì quyền lực bằng sự cưỡng chế của bộ máy nhà nước.</li>
              <li>• Tồn tại sự phân hóa giai cấp thống trị và bị trị.</li>
              <li>• Tự do bị bóp nghẹt để phục vụ lợi ích nhóm nhỏ.</li>
            </ul>
          </div>

          {/* Cột Tự quản - Bản chất thật sự của CSCH */}
          <div className="p-10 bg-red-50">
            <h2 className="text-2xl font-bold mb-6 text-red-900">Tự quản Cộng sản</h2>
            <ul className="space-y-6 font-serif">
              <li>• Nhà nước và các công cụ cưỡng chế không còn tồn tại.</li>
              <li>• Con người tự giác thực hiện các quy tắc chung vì lợi ích cộng đồng.</li>
              <li>• <strong>“Tự do của mỗi người là điều kiện cho tự do của tất cả mọi người.”</strong></li>
            </ul>
          </div>
        </div>

        <FadeUp delay={0.4} className="mt-12 text-center">
          <div className="bg-black text-white p-8 inline-block max-w-3xl">
            <p className="text-lg italic font-serif leading-relaxed">
              “Sự tiêu vong của dân chủ không phải là bước lùi về độc tài, mà là bước tiến tới sự tự do tuyệt đối, nơi con người không còn cần đến thước đo quyền lực để làm chủ cuộc đời mình.”
            </p>
          </div>
        </FadeUp>
      </div>
    </ClientAnimatedSection>
  );
}
