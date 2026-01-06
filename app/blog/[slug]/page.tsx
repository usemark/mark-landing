import Link from "next/link";
import Image from "next/image";
import { getAllPostSlugs, getPostData } from "@/lib/blog";
import MarketingNav from "@/components/MarketingNav";

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);
  return {
    title: `${post.title} | Mark Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);

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

      {/* Article */}
      <article className="px-8 py-16 max-w-3xl mx-auto">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">{getCategoryIcon(post.category)}</span>
          <span className="text-sm font-semibold text-[#FF6A1A] uppercase tracking-wider">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#0A0A0A] mb-6"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-black/60 mb-12 pb-8 border-b border-black/10">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-[#0A0A0A] 
            prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8
            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
            prose-p:text-black/80 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-[#FF6A1A] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#0A0A0A] prose-strong:font-semibold
            prose-ul:my-8 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-3
            prose-li:text-black/80
            prose-blockquote:border-l-4 prose-blockquote:border-[#FF6A1A] prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:text-xl
            prose-hr:my-16 prose-hr:border-black/10
            prose-img:rounded-xl prose-img:shadow-lg prose-img:my-12"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />
      </article>

      {/* CTA Section */}
      <section className="px-8 py-20 border-t border-black/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-[#0A0A0A] mb-4">
            Ready to <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A4A] bg-clip-text text-transparent">transform</span> your marketing?
          </h2>
          <p className="text-lg text-black/70 mb-8">
            Join the waitlist for Mark—the <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A4A] bg-clip-text text-transparent font-bold">marketing operating system</span> built for creators and marketers.
          </p>
          {/* PERFORMANCE: Changed hover:shadow-2xl + transition-all to hover:scale-105 + transition-transform */}
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm md:text-[15px] font-semibold tracking-tight bg-gradient-to-r from-[#FF6A1A] to-[#FF8A4A] text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Join the Waitlist
          </Link>
        </div>
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
