import type { Artifact, ArtifactId, ChapterId } from "./types";

const LEGACY_REVIEW_NOTE =
  "Nội dung kế thừa từ phiên bản cũ và cần được đối chiếu với giáo trình MLN131 chính thức.";

export const ARTIFACTS: readonly Artifact[] = [
  {
    id: "artifact-ho-chi-minh-statue",
    title: "Bác Hồ",
    description:
      "Chủ tịch Hồ Chí Minh – người đặt nền tảng cho xây dựng văn hóa, đạo đức và con người Việt Nam: giản dị, vì nước vì dân, nêu gương về cần – kiệm – liêm – chính.",
    image: {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvaFEAnGdVscTQw-VupM2zvDNRHSMl69X6sw&s",
      alt: "Bác Hồ",
    },
    learningConnection:
      "Tư tưởng Hồ Chí Minh là cơ sở định hướng xây dựng hệ giá trị quốc gia, chuẩn mực đạo đức cách mạng và bồi dưỡng con người Việt Nam thời kỳ mới.",
    status: "draft",
    reviewNotes: LEGACY_REVIEW_NOTE,
  },
  {
    id: "artifact-brown-khaki-shirt",
    title: "Áo Ka-ki Nâu",
    description:
      "Chiếc áo ka-ki nâu giản dị gắn liền với hình ảnh Bác Hồ – biểu tượng của phong cách sống mực thước, vì dân phục vụ, đề cao đức tính khiêm nhường.",
    image: {
      src: "https://capnuoctrungan.vn/Images/Uploadimages/13_1(1).jpg",
      alt: "Áo Ka-ki Nâu",
    },
    learningConnection:
      "Góp phần giáo dục đạo đức cách mạng: sống giản dị, trong sạch, chống chủ nghĩa cá nhân – nội dung cốt lõi để xây dựng con người mới.",
    status: "draft",
    reviewNotes: LEGACY_REVIEW_NOTE,
  },
  {
    id: "artifact-declaration-of-independence",
    title: "Tuyên Ngôn Độc Lập",
    description:
      "Văn kiện lịch sử do Chủ tịch Hồ Chí Minh đọc ngày 2/9/1945, khai sinh nước Việt Nam Dân chủ Cộng hòa, khẳng định giá trị tự do, bình đẳng, nhân phẩm con người.",
    image: {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4zIjwMnN0p_Hfmr7PRnik6DZz-0IQ12Mfvg&s",
      alt: "Tuyên Ngôn Độc Lập",
    },
    learningConnection:
      "Tạo nền tảng tinh thần – pháp lý cho việc xây dựng văn hóa dân tộc, tôn trọng con người và phát huy giá trị nhân văn Việt Nam.",
    status: "draft",
    reviewNotes: LEGACY_REVIEW_NOTE,
  },
  {
    id: "artifact-ao-dai",
    title: "Áo Dài",
    description:
      "Áo dài – biểu tượng bản sắc Việt, hài hòa truyền thống và hiện đại, tôn vinh vẻ đẹp kín đáo, thanh lịch của con người Việt Nam.",
    image: {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyjI_4V2S2QuvFmstxT2lbsFnycnKIeXyqhQ&s",
      alt: "Áo Dài",
    },
    learningConnection:
      "Khẳng định yêu cầu xây dựng nền văn hóa tiên tiến, đậm đà bản sắc dân tộc; nuôi dưỡng thẩm mỹ và nhân cách.",
    status: "draft",
    reviewNotes: LEGACY_REVIEW_NOTE,
  },
  {
    id: "artifact-bronze-drum",
    title: "Trống Đồng – Trống Chiêng",
    description:
      "Di sản âm nhạc – nghi lễ cộng đồng, kết nối quá khứ với hiện tại, biểu trưng cho tinh thần cố kết và ý chí vươn lên của dân tộc.",
    image: {
      src: "https://vcdn1-dulich.vnecdn.net/2021/04/19/trongdongngoclu-2851-1618820026.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=ewiiHrtqp4G-TX3YzDgAdw",
      alt: "Trống Đồng – Trống Chiêng",
    },
    learningConnection:
      "Bồi đắp sức mạnh nội sinh của văn hóa; nuôi dưỡng lòng tự hào, ý thức cộng đồng – nền tảng xây dựng con người Việt Nam.",
    status: "draft",
    reviewNotes: LEGACY_REVIEW_NOTE,
  },
  {
    id: "artifact-conical-hat",
    title: "Nón Lá",
    description:
      "Nón lá – vật dụng bình dị gắn bó với người Việt, phản ánh lối sống cần cù, nhân hậu và vẻ đẹp mộc mạc của văn hóa Việt.",
    image: {
      src: "https://baotanglichsu.vn/DataFiles/News/Tintuc_cgs_vn_20167318h25m47s.jpg",
      alt: "Nón Lá",
    },
    learningConnection:
      "Gợi nhắc phẩm chất lao động, tiết kiệm, giàu tình nghĩa – giá trị đạo đức cốt lõi trong xây dựng con người.",
    status: "draft",
    reviewNotes: LEGACY_REVIEW_NOTE,
  },
  {
    id: "artifact-propaganda-poster-1950",
    title: "Tranh Cổ Động 1950",
    description:
      "Tranh cổ động 1950 kêu gọi đoàn kết, hy sinh vì Tổ quốc – truyền cảm hứng về lý tưởng sống đẹp và trách nhiệm công dân.",
    image: {
      src: "https://tuyengiao.hungyen.dcs.vn/images/userfiles/images/tin-tuc/17(4).jpg",
      alt: "Tranh Cổ Động 1950",
    },
    learningConnection:
      "Công cụ giáo dục văn hóa – đạo đức thời chiến; bồi dưỡng lòng yêu nước, tinh thần cộng đồng và ý chí vươn lên.",
    status: "draft",
    reviewNotes: LEGACY_REVIEW_NOTE,
  },
  {
    id: "artifact-subsidy-coupon-1981",
    title: "Phiếu Cấp Thị Cơ Động 1981",
    description:
      "Tư liệu thời bao cấp (1981) phản ánh nỗ lực đảm bảo an sinh trong điều kiện còn khó khăn; nhấn mạnh tính cộng đồng, sẻ chia.",
    image: {
      src: "https://baokhanhhoa.vn/file/e7837c02857c8ca30185a8c39b582c03/102023/ghep_20231020181937.jpg",
      alt: "Phiếu Cấp Thị Cơ Động 1981",
    },
    learningConnection:
      "Gợi mở bài học về liêm chính, tiết kiệm, chống lãng phí; đặt con người làm trung tâm chính sách xã hội.",
    status: "draft",
    reviewNotes: LEGACY_REVIEW_NOTE,
  },
  {
    id: "artifact-vietnamese-cuisine",
    title: "Ẩm Thực Việt",
    description:
      "Những món ăn quen thuộc phản ánh nếp sống gia đình, sự gắn kết cộng đồng và bản sắc văn hóa Việt qua thời gian.",
    image: {
      src: "https://static.tuoitre.vn/tto/i/s626/2017/06/11/7e6c8e28.jpg",
      alt: "Ẩm Thực Việt",
    },
    learningConnection:
      "Ẩm thực là phương tiện gìn giữ bản sắc; nuôi dưỡng lối sống lành mạnh, tình nghĩa – yếu tố hình thành nhân cách con người Việt.",
    status: "draft",
    reviewNotes: LEGACY_REVIEW_NOTE,
  },
] as const;

const ARTIFACT_INDEX = new Map<ArtifactId, Artifact>(
  ARTIFACTS.map((artifact) => [artifact.id, artifact]),
);

export function getArtifactById(id: ArtifactId) {
  return ARTIFACT_INDEX.get(id);
}

export function getArtifactsByChapterId(chapterId: ChapterId) {
  return ARTIFACTS.filter((artifact) => artifact.chapterId === chapterId);
}
