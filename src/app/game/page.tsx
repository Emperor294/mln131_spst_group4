'use client';

import Link from 'next/link';

export default function GamePage() {
  return (
    <div className="min-h-screen bg-[#fcfbf9]">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-center min-h-[80vh]">
          
          {/* Cột trái - Cổng chuyển tiếp tới bảo tàng chính */}
          <div className="space-y-6 lg:col-span-4 px-12">
            <div className="bg-white/80 backdrop-blur-md rounded-none shadow-[15px_15px_0px_0px_rgba(153,27,27,0.1)] p-8 border-2 border-red-900">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight font-primary uppercase tracking-tighter">
                  SOCIALISM <br /> <span className="text-red-900">360</span>
                </h1>
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-600 font-sub mb-5 italic">
                  Cổng trải nghiệm bảo tàng 3D
                </h2>
              </div>
              
              <div className="space-y-6 text-base text-gray-700 leading-relaxed font-serif">
                <p className="border-l-4 border-red-900 pl-4">
                  Từ những kỷ vật giản dị như chiếc áo sờn vai đến hệ thống lý luận soi sáng, Hồ Chí Minh đã đặt nền móng vững chắc cho cách mạng Việt Nam theo con đường <strong>Xã hội chủ nghĩa</strong>.
                </p>
                
                <div className="space-y-3">
                  <p className="font-bold text-red-900 uppercase text-sm tracking-widest">Trục nội dung tương tác:</p>
                  <ul className="list-none space-y-3 text-sm">
                    <li className="flex gap-2">
                      <span className="text-red-900 font-bold">01.</span>
                      <span><strong>Thiết chế Dân chủ:</strong> Khám phá tư tưởng “Bao nhiêu quyền hạn đều là của dân” gắn liền với mô hình Nhà nước của dân, do dân, vì dân.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-900 font-bold">02.</span>
                      <span><strong>Đạo đức Công vụ:</strong> Từ hiện vật “Áo sờn vai” liên tưởng đến triết lý người cán bộ là “đầy tớ trung thành của nhân dân”, chống đặc quyền đặc lợi.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-900 font-bold">03.</span>
                      <span><strong>Chủ nghĩa Xã hội:</strong> Logic vận động từ giải phóng dân tộc đến xây dựng xã hội tự quản, công bằng và nhân văn.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-8">
                <Link 
                  href="/baotang"
                  className="inline-flex items-center px-8 py-4 bg-red-900 text-white text-sm uppercase tracking-widest font-bold hover:bg-black transition-all duration-300 shadow-xl group"
                >
                  <svg 
                    className="w-5 h-5 mr-3 transform group-hover:translate-x-2 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                  Vào bảo tàng 3D
                </Link>
              </div>
            </div>
          </div>

          {/* Cột phải - Không gian bảo tàng 3D (Sketchfab) */}
          <div className="w-full lg:col-span-6 overflow-hidden flex justify-center">
            <div className="sketchfab-embed-wrapper relative group">
              {/* Hiệu ứng viền trang trí cho Frame 3D */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-900 to-gray-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              
              <iframe
                title="Mô hình bảo tàng 3D kế thừa đang được rà soát"
                src="https://sketchfab.com/models/617be5181a35411cbbfefa536af7e87f/embed?autospin=1&autostart=1&preload=1&transparent=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_hint=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=1&ui_annotations=0&dnt=1"
                width="850"
                height="600"
                loading="lazy"
                allow="accelerometer; gyroscope; autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
                style={{ border: "none", position: "relative" }}
                className="rounded-lg shadow-2xl"
                xr-spatial-tracking="true"
                execution-while-out-of-viewport="true"
                execution-while-not-rendered="true"
                web-share="true"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
