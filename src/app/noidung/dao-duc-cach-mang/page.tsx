'use client';

import Carousel, { type CarouselItem } from '../../../components/Carousel';
import {
  ClientAnimatedSection,
  MotionDiv,
  MotionH2,
  MotionP,
  containerVariants,
  FadeUp,
} from '../../../components/animation/AnimatedWrapper';

const theoryCarousel: CarouselItem[] = [
  {
    id: 1,
    title: "Dân chủ là một phạm trù lịch sử",
    description: "Dân chủ gắn liền với nhà nước. Khi nhà nước tiêu vong trong giai đoạn cao của CNCS, dân chủ với tư cách một hình thức chính trị cũng sẽ tiêu vong.",
    icon: <span className="carousel-icon">L</span>
  },
  {
    id: 2,
    title: "Thực chất của sự tiêu vong",
    description: "Theo V.I. Lênin, đó là tính chính trị của dân chủ sẽ mất đi trên cơ sở không ngừng mở rộng dân chủ đối với nhân dân, xác lập địa vị chủ thể quyền lực của nhân dân tạo điều kiện để họ tham gia ngày càng đông đảo và ngày càng có ý nghĩa quyết định vào sự quản lý nhà nước, quản lý xã hội(xã hội tự quản). Quá trình đó làm cho dân chủ trở thành một thói quen, một tập quán trong sinh hoạt xã hội... để đến lúc nó không còn tồn tại như một thể chế nhà nước, một chế độ, tức là mất đi tính chính trị của nó. Tuy nhiên chủ nghĩa Mác - Lênin cũng lưu ý đây là quá trình dài, khi xã hội đạt đến trình độ phát triển rất cao, xã hội không còn sự phân chia giai cấp, đó là xã hội cộng sản chủ nghĩa với tư cách là một chế độ nhà nước cũng tiêu vong, không còn nửa.",
    icon: <span className="carousel-icon">G</span>
  }
];

export default function LyLuanTieuVongPage() {
  return (
    <ClientAnimatedSection className="min-h-screen bg-[#f8f7f3] py-16">
      <MotionDiv className="container mx-auto px-4" variants={containerVariants} initial="hidden" animate="visible">
        <FadeUp className="text-center mb-10">
          <MotionH2 className="font-primary text-4xl text-black">
            CƠ SỞ LÝ LUẬN VỀ SỰ <span className="text-red-900">TIÊU VONG</span>
          </MotionH2>
          <MotionP className="font-serif italic mt-4 max-w-2xl mx-auto">
            “Dân chủ cũng có nghĩa là nhà nước tiêu vong” - V.I. Lênin
          </MotionP>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <FadeUp delay={0.2}>
            <div className="bg-white p-8 border-2 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-bold text-red-900 mb-6">Tiến trình vận động</h3>
              <p className="mb-4">Theo logic Mác-Lênin, dân chủ không mất đi đột ngột mà là quá trình <strong>“tự tiêu vong”</strong>.</p>
              <ul className="space-y-4">
                <li className="p-3 border-b">1. Dân chủ tư sản (Dành cho thiểu số)</li>
                <li className="p-3 border-b">2. Dân chủ XHCN (Dành cho đa số)</li>
                <li className="p-3 font-bold text-red-900 uppercase tracking-tighter">3. Xã hội cộng sản (Dân chủ tự tiêu vong)</li>
              </ul>
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
             <Carousel items={theoryCarousel} baseWidth={500} autoplay={true} />
          </FadeUp>
        </div>
      </MotionDiv>
    </ClientAnimatedSection>
  );
}
