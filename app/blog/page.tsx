"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import MarketingNav from "@/components/MarketingNav";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  category: string;
  readTime: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch blog posts from API route
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blog posts:', err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    // Parse date components and format directly to avoid timezone conversion
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day, 12, 0, 0); // Set to noon to avoid timezone edge cases
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Product':
        return '🚀';
      case 'Behind the Scenes':
        return '🛠️';
      case 'Industry Insights':
        return '💡';
      default:
        return '📝';
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <MarketingNav />

      {/* Hero Section */}
      <section className="px-8 py-20 max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-[#0A0A0A] mb-6">
          From the <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A4A] bg-clip-text text-transparent">Blog</span>
        </h1>
        <p className="text-xl text-black/70 max-w-2xl mx-auto">
          Insights on marketing, product development, and <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A4A] bg-clip-text text-transparent font-bold">building in public</span> from the Mark team.
        </p>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-8 pb-32 max-w-6xl mx-auto flex-1">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-[#FF6A1A]/30 border-t-[#FF6A1A] rounded-full animate-spin" />
            <p className="mt-4 text-black/50">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-black/50">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
            {posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group w-full md:w-[calc(50%-1rem)] max-w-md"
              >
                {/* PERFORMANCE: Changed to dark card pattern matching main page */}
                {/* Removed backdrop-blur-md, hover:shadow-2xl, transition-all */}
                {/* Using transition-transform and hover:scale instead */}
                <article className="h-full bg-[#0A0A0A] border border-black/10 rounded-2xl p-6 hover:border-[#FF6A1A]/50 hover:scale-[1.02] transition-transform duration-200 shadow-lg">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{getCategoryIcon(post.category)}</span>
                    <span className="text-xs font-semibold text-[#FF6A1A] uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 
                    className="text-2xl font-bold text-white mb-3 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />

                  {/* Excerpt */}
                  <p className="text-white/60 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-white/40 pt-4 border-t border-white/10">
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ================================================== */}
      {/* FOOTER - Matching main page design                */}
      {/* ================================================== */}
      <footer className="bg-white py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-8">
          
          {/* Social Links */}
          <div className="flex justify-center items-center gap-6 mb-8">
            <a 
              href="https://x.com/usemarkapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/5 border border-black/10 hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
              aria-label="Follow Mark on X (Twitter)"
            >
              <svg className="w-5 h-5 text-black/50 group-hover:text-[#FF6A1A] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            <a 
              href="https://www.instagram.com/usemarkapp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/5 border border-black/10 hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
              aria-label="Follow Mark on Instagram"
            >
              <svg className="w-5 h-5 text-black/50 group-hover:text-[#FF6A1A] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a 
              href="https://www.tiktok.com/@usemarkapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/5 border border-black/10 hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
              aria-label="Follow Mark on TikTok"
            >
              <svg className="w-5 h-5 text-black/50 group-hover:text-[#FF6A1A] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>

            <a 
              href="https://www.facebook.com/usemarkapp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/5 border border-black/10 hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
              aria-label="Follow Mark on Facebook"
            >
              <svg className="w-5 h-5 text-black/50 group-hover:text-[#FF6A1A] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a 
              href="https://www.youtube.com/@usemarkapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/5 border border-black/10 hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
              aria-label="Subscribe to Mark on YouTube"
            >
              <svg className="w-5 h-5 text-black/50 group-hover:text-[#FF6A1A] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-black/50">
            © {new Date().getFullYear()} Mark. Built in public by Brendan Goforth.
          </div>
        </div>
      </footer>
    </main>
  );
}
