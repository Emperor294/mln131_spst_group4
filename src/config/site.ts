const BRAND = "SOCIALISM 360";
const FULL_NAME = "SOCIALISM 360 – Interactive Museum of Scientific Socialism";
const ACADEMIC_TITLE = "Chủ nghĩa Xã hội Khoa học – MLN131";
const SHORT_DESCRIPTION =
  "Khám phá Chủ nghĩa Xã hội Khoa học qua nội dung trực quan và không gian tương tác.";

export const SITE_CONFIG = {
  brand: BRAND,
  fullName: FULL_NAME,
  academicTitle: ACADEMIC_TITLE,
  courseCode: "MLN131",
  englishSubtitle: "Interactive Museum of Scientific Socialism",
  shortDescription: SHORT_DESCRIPTION,
  language: "vi",
  locale: "vi_VN",
  metadata: {
    defaultTitle: FULL_NAME,
    titleTemplate: `%s | ${BRAND}`,
    defaultDescription: SHORT_DESCRIPTION,
    reviewTitle: "Nội dung học tập đang được rà soát",
    reviewDescription:
      "Nội dung kế thừa đang được rà soát và đối chiếu với giáo trình MLN131 đang sử dụng.",
  },
  keywords: [
    "SOCIALISM 360",
    "MLN131",
    "chủ nghĩa xã hội khoa học",
    "bảo tàng học tập tương tác",
  ],
  socialImage: {
    url: "/background.jpg",
    width: 960,
    height: 579,
    alt: `${BRAND} – ${ACADEMIC_TITLE}`,
  },
} as const;
