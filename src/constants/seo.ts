import { SITE_CONFIG } from "@/config/site";

export const DEFAULT_SEO = {
  title: SITE_CONFIG.metadata.defaultTitle,
  description: SITE_CONFIG.metadata.defaultDescription,
  keywords: [...SITE_CONFIG.keywords],
  image: SITE_CONFIG.socialImage,
};
