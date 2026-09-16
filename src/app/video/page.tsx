export default function VideoPage() {
  const videos = [
    {
      id: '3BWtVH2TDS8',
      title: 'Bản chất của nền dân chủ xã hội chủ nghĩa (Phương diện Chính trị - Kinh tế - Tư tưởng)',
    },
    {
      id: 'o8s-KQUSGx8',
      title: 'Sự ra đời và bản chất của nền dân chủ xã hội chủ nghĩa',
    },
    {
      id: 'vEVTFCI59c8',
      title: 'Tại sao khi tiến lên chủ nghĩa Cộng sản, Nhà nước và Dân chủ sẽ tự tiêu vong?',
    },
    {
      id: 'FqIMPMXDJyM',
      title: 'Tư tưởng Hồ Chí Minh về đặc trưng của chủ nghĩa xã hội và dân chủ ở Việt Nam',
    },
    {
      id: 'DEbg4zRr8YY',
      title: 'Mối quan hệ biện chứng giữa Dân chủ XHCN và Nhà nước pháp quyền XHCN',
    },
    {
      id: 'gm6YxGBn-ig',
      title: 'Tính ưu việt của chế độ dân chủ xã hội chủ nghĩa trong thực tiễn Việt Nam',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbfaf7] via-white to-[#faf7f4] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="font-primary text-3xl md:text-4xl text-black mb-2 tracking-tight uppercase">
            HỌC LIỆU THAM KHẢO <br />
            <span className="text-red-900">CHỦ NGHĨA XÃ HỘI KHOA HỌC</span>
          </h1>
          <div className="mx-auto h-0.5 w-24 bg-red-900" />
          <p className="font-sub text-black/70 mt-3">
            Tuyển tập video kế thừa đang được rà soát cho môn MLN131
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v) => (
            <div key={v.id} className="bg-white/90 backdrop-blur-md border border-black rounded-none p-0 flex flex-col hover:shadow-xl transition-shadow duration-300">
              {/* Thanh kẻ đỏ trang trí phía trên thẻ */}
              <div className="h-1 w-full bg-red-900" />
              
              <div className="relative w-full pt-[56.25%] overflow-hidden rounded-none bg-black">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              
              <div className="px-4 py-4 border-t border-black/80 flex-grow bg-white/50">
                <div className="text-sm font-sub font-bold text-black/90 line-clamp-2 leading-relaxed uppercase">
                  {v.title}
                </div>
                <div className="mt-2 h-[1px] w-8 bg-red-900/30" />
              </div>
            </div>
          ))}
        </div>

        {/* Phần trích dẫn tóm kết ở cuối trang */}
        <div className="mt-16 max-w-3xl mx-auto text-center border-t border-black/10 pt-10">
          <p className="font-serif italic text-black/60 text-sm">
            “Dân chủ xã hội chủ nghĩa là nền dân chủ cao hơn về chất, nơi quyền lực thực sự thuộc về nhân dân dưới sự lãnh đạo của Đảng.”
          </p>
        </div>
      </div>
    </div>
  );
}
