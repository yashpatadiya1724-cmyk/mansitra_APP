import Link from "next/link";
import Navbar from "@/shared/components/navbar";
import Footer from "@/shared/components/footer";
import { blogPosts } from "@/content/blog/posts";
import { SITE_URL } from "@/lib/site-config";
import JsonLd from "@/components/json-ld";

export const metadata = { title: "Student Wellbeing Blog", description: "Practical, compassionate guides for exam stress, placements, sleep and student wellbeing.", alternates: { canonical: "/blog" } };

export default function BlogPage() {
  return <main className="min-h-screen bg-[#faf9f8] text-black"><JsonLd data={{ "@context": "https://schema.org", "@type": "Blog", url: `${SITE_URL}/blog`, name: "Mansitra Student Wellbeing Blog" }} /><Navbar /><section className="mx-auto max-w-6xl px-6 pb-24 pt-40"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Mansitra Journal</p><h1 className="max-w-3xl text-5xl font-medium tracking-tight md:text-7xl">Calmer minds make room for what matters.</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">Practical guides for Indian students navigating exam stress, placements, sleep and the complicated middle parts of growing up.</p><div className="mt-16 grid gap-6 md:grid-cols-2">{blogPosts.map((post) => <article key={post.slug} className="rounded-3xl border border-black/10 bg-white p-8 transition-transform hover:-translate-y-1"><div className="flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">{tag}</span>)}</div><h2 className="mt-6 text-2xl font-semibold"><Link href={`/blog/${post.slug}`} className="hover:text-teal-700">{post.title}</Link></h2><p className="mt-3 leading-relaxed text-neutral-600">{post.description}</p><p className="mt-8 text-sm text-neutral-500">{post.readTime} · {post.date}</p></article>)}</div></section><Footer /></main>;
}
