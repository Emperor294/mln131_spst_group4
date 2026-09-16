'use client';

import {
  ClientAnimatedSection,
  MotionDiv,
  MotionH2,
  MotionP,
  containerVariants,
  FadeUp,
} from '../../../components/animation/AnimatedWrapper';

export default function BanChatDanChuPage() {
  return (
    <ClientAnimatedSection className="min-h-screen bg-gradient-to-br from-[#f8f7f3] to-white py-16">
      <MotionDiv className="container mx-auto px-4" variants={containerVariants} initial="hidden" animate="visible">
        
        <FadeUp className="text-center mb-16">
          <MotionH2 className="font-primary text-4xl md:text-5xl text-black mb-6">
            BẢN CHẤT NỀN <span className="text-red-900">DÂN CHỦ XHCN</span>
          </MotionH2>
          <MotionP className="font-serif text-lg text-black/70 max-w-3xl mx-auto leading-relaxed">
            Nền dân chủ cao hơn về chất, xác lập quyền làm chủ thực sự của nhân dân trên mọi phương diện đời sống xã hội.
          </MotionP>
        </FadeUp>

        <div className="max-w-4xl mx-auto space-y-12 font-gothic">
          {/* Bản chất Chính trị */}
          <FadeUp delay={0.1}>
            <MotionDiv className="relative bg-white border border-red-900/20 rounded-2xl p-10 shadow-sm">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#81181a]" />
              <h2 className="text-2xl font-bold text-[#81181a] mb-6 uppercase">1. Bản chất Chính trị</h2>
              <p className="text-black/80 mb-6 italic">Quyền lực thuộc về nhân dân lao động dưới sự lãnh đạo của Đảng Cộng sản.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-red-50 rounded-xl">
                  <h3 className="font-bold text-red-900">Dân là chủ</h3>
                  <p className="text-sm">Nhân dân là chủ thể quyền lực, tham gia quản lý nhà nước và xã hội.</p>
                </div>
                <div className="p-4 bg-red-50 rounded-xl">
                  <h3 className="font-bold text-red-900">Thực thi pháp quyền</h3>
                  <p className="text-sm">Thực hiện thông qua Nhà nước pháp quyền XHCN, đảm bảo quyền con người.</p>
                </div>
              </div>
            </MotionDiv>
          </FadeUp>

          {/* Bản chất Kinh tế */}
          <FadeUp delay={0.2}>
            <MotionDiv className="relative bg-white border border-red-900/20 rounded-2xl p-10 shadow-sm">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#81181a]" />
              <h2 className="text-2xl font-bold text-[#81181a] mb-6 uppercase">2. Bản chất Kinh tế</h2>
              <p className="text-black/80 mb-6">Dựa trên chế độ sở hữu xã hội về tư liệu sản xuất chủ yếu.</p>
              <ul className="space-y-4 text-black/70">
                <li className="flex gap-3 items-start">
                  <span className="w-2 h-2 mt-2 bg-red-900 rounded-full" />
                  <span>Xóa bỏ áp bức, bóc lột, giải phóng lực lượng sản xuất.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-2 h-2 mt-2 bg-red-900 rounded-full" />
                  <span>Phân phối theo kết quả lao động và phúc lợi xã hội công bằng.</span>
                </li>
              </ul>
            </MotionDiv>
          </FadeUp>
        </div>
      </MotionDiv>
    </ClientAnimatedSection>
  );
}
