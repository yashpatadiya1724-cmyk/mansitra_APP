import { SITE_URL } from "@/lib/site-config";

export default function robots() {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/chat", "/api"] }], sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
