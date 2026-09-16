export default function MusicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbfaf7] via-white to-[#faf7f4] py-18">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="font-primary text-3xl md:text-4xl text-black mb-2 tracking-tight uppercase">Gốc người Việt</h1>
          <div className="mx-auto h-0.5 w-24 bg-red-900" />
          <p className="font-sub text-black/70 mt-3 text-sm">Bài hát do AI tạo — Thể loại: Rap nhẹ – Hiphop truyền cảm hứng</p>
        </div>

        <div className="bg-black/10 backdrop-blur-md border border-black rounded-none p-6 md:p-8 shadow-xl">
          <div className="prose prose-sm max-w-none">
            <h2 className="font-primary text-xl text-black mb-3 uppercase">Lyrics</h2>
            <div className="h-0.5 w-16 bg-red-900 mb-6" />

            {/* Verse 1 */}
            <section className="mb-6">
              <h3 className="font-sub uppercase tracking-widest text-[12px] text-red-900 mb-2 font-bold">Verse 1</h3>
              <p className="text-black/80 whitespace-pre-line leading-relaxed">
                {`Người dạy ta sống cho trọn nghĩa vẹn tình
Đạo đức là gốc, là ánh sáng bình minh
"Cần, Kiệm, Liêm, Chính" – bốn chữ vàng sáng mãi
Sống vì dân, vì nước tim không ngừng chảy
Học làm người, đừng chạy theo danh
Giữ lòng trong sáng, đó mới là thành
Dù đường dài, dù đời có đổi thay
Người Việt vẫn sáng như ngôi sao trên mây.`}
              </p>
            </section>

            <div className="my-4 h-px w-full bg-black/20" />

            {/* Hook */}
            <section className="mb-6">
              <h3 className="font-sub uppercase tracking-widest text-[12px] text-red-900 mb-2 font-bold">Hook</h3>
              <p className="text-black/80 whitespace-pre-line leading-relaxed font-semibold">
                {`Sống đẹp như Bác, hiền hòa, chân thật
Giữ hồn dân tộc trong mỗi ánh mắt
Văn hóa Việt Nam muôn đời rực sáng
Đạo đức trong tim là sức mạnh vĩnh hằng.`}
              </p>
            </section>

            <div className="my-4 h-px w-full bg-black/20" />

            {/* Verse 2 */}
            <section className="mb-6">
              <h3 className="font-sub uppercase tracking-widest text-[12px] text-red-900 mb-2 font-bold">Verse 2</h3>
              <p className="text-black/80 whitespace-pre-line leading-relaxed">
                {`Dù thời công nghệ người trẻ không quên
Gốc thế làm người chẳng thể bị chênh
Ứng xử văn minh lời nói thân thiện
Giúp đời mỗi ngày chính là điều hiển nhiên
Không chỉ yêu nước mà còn yêu người
Sống biết sẻ chia nụ cười rạng ngời
Theo tư tưởng Bác ta vững bước đi
Xây văn hóa Việt đẹp từ trong suy nghĩ.`}
              </p>
            </section>

            <div className="my-4 h-px w-full bg-black/20" />

            {/* Pre-Chorus */}
            <section className="mb-6">
              <h3 className="font-sub uppercase tracking-widest text-[12px] text-red-900 mb-2 font-bold">Pre-Chorus</h3>
              <p className="text-black/80 whitespace-pre-line leading-relaxed">
                {`Từ Bắc vô Nam chung một nhịp tim
Dựng xây đất nước chẳng quản khó tìm
Đạo đức, văn hóa – hai cánh tay đan
Cho Việt Nam vững giữa thế gian ngàn vàng.`}
              </p>
            </section>

            <div className="my-4 h-px w-full bg-black/20" />

            {/* Bridge */}
            <section className="mb-6">
              <h3 className="font-sub uppercase tracking-widest text-[12px] text-red-900 mb-2 font-bold">Bridge (Cao trào)</h3>
              <p className="text-black/80 whitespace-pre-line leading-relaxed italic">
                {`Người dạy ta sống sao cho sáng
Tâm trong, trí vững, lòng chẳng vướng mang
Theo bước Hồ Chí Minh – rạng ngời trang sử
Xây văn hóa đạo đức muôn đời bất tử!`}
              </p>
            </section>

            <div className="my-4 h-px w-full bg-black/20" />

            {/* Outro */}
            <section>
              <h3 className="font-sub uppercase tracking-widest text-[12px] text-red-900 mb-2 font-bold">Outro</h3>
              <p className="font-serif text-black/80 whitespace-pre-line leading-relaxed">
                {`Xây văn hóa Việt...
Đạo đức muôn đời bất tử...
Theo bước chân Người...`}
              </p>
            </section>
          </div>

          <div className="mt-8 pt-4 border-t border-black/10 text-[11px] font-sub text-black/50 flex justify-between items-center uppercase tracking-widest">
            <span>Âm nhạc truyền cảm hứng</span>
            <span>Nguồn và quyền sử dụng đang được rà soát</span>
          </div>
        </div>
      </div>
    </div>
  );
}
