import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/shared/components/navbar";
import Footer from "@/shared/components/footer";
import { blogPosts } from "@/content/blog/posts";
import JsonLd from "@/components/json-ld";

export function generateStaticParams() { return blogPosts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) { const { slug } = await params; const post = blogPosts.find((item) => item.slug === slug); return post ? { title: post.title, description: post.description, alternates: { canonical: `/blog/${post.slug}` } } : {}; }

export default async function BlogPostPage({ params }) { const { slug } = await params; const post = blogPosts.find((item) => item.slug === slug); if (!post) notFound(); return <main className="min-h-screen bg-[#faf9f8] text-black"><JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.description, datePublished: post.date, author: { "@type": "Organization", name: post.author } }} /><Navbar /><article className="mx-auto max-w-3xl px-6 pb-24 pt-40"><Link href="/blog" className="text-sm font-semibold text-teal-700">← Back to journal</Link><div className="mt-12 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">{tag}</span>)}</div><h1 className="mt-6 text-5xl font-medium leading-tight tracking-tight md:text-7xl">{post.title}</h1><p className="mt-6 text-lg text-neutral-600">{post.readTime} · {post.date} · {post.author}</p><div className="mt-14 space-y-7 text-lg leading-relaxed text-neutral-700">{post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="mt-16 rounded-3xl bg-[#0b2528] p-8 text-white"><h2 className="text-2xl font-semibold">Need a private place to start?</h2><p className="mt-3 text-white/75">Mansitra is a supportive AI companion for Indian students. It is not therapy or emergency care.</p><Link href="/chat" className="mt-6 inline-flex rounded-full bg-teal-300 px-5 py-3 font-semibold text-[#0b2528]">Open Mansitra</Link></div></article><Footer /></main>; }
