import { SITE_URL } from "@/lib/site-config";
import { blogPosts } from "@/content/blog/posts";

export default function sitemap() {
  const lastModified = new Date();
  const pages = ["/", "/about", "/services", "/contact", "/privacy-policy", "/blog"];
  return [...pages.map((path) => ({ url: `${SITE_URL}${path}`, lastModified })), ...blogPosts.map((post) => ({ url: `${SITE_URL}/blog/${post.slug}`, lastModified: new Date(post.date) }))];
}
