"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    // Parse date as local time to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'America/New_York'
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
    <main className="min-h-screen bg-white">
      {/* Header */}
      <nav className="w-full flex justify-between items-center px-8 py-6 border-b bg-white/70 backdrop-blur-lg sticky top-0 z-50">
        <Link href="/">
          <Image
            src="/mark-logo.png"
            alt="Mark Logo"
            width={80}
            height={26}
            className="object-contain cursor-pointer"
            priority
          />
        </Link>
        <Link 
          href="/"
          className="text-sm font-medium text-black/70 hover:text-[#FF6A1A] transition"
        >
          ← Back to Home
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-20 max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-[#0A0A0A] mb-6">
          <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A4A] bg-clip-text text-transparent">Blog</span>
        </h1>
        <p className="text-xl text-black/70 max-w-2xl mx-auto">
          Insights on marketing, product development, and <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A4A] bg-clip-text text-transparent font-bold">building in public</span> from the Mark team.
        </p>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-8 pb-32 max-w-6xl mx-auto">
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
                <article className="h-full bg-white/80 backdrop-blur-md border border-black/10 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{getCategoryIcon(post.category)}</span>
                    <span className="text-xs font-semibold text-[#FF6A1A] uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 
                    className="text-2xl font-bold text-[#0A0A0A] mb-3 transition line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />

                  {/* Excerpt */}
                  <p className="text-black/70 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-black/50 pt-4 border-t border-black/5">
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
