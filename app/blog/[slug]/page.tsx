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
    <main className="min-h-screen bg-white">
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
      <section className="px-8 py-20 border-t">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-[#0A0A0A] mb-4">
            Ready to <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A4A] bg-clip-text text-transparent">transform</span> your marketing?
          </h2>
          <p className="text-lg text-black/70 mb-8">
            Join the waitlist for Mark—the <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A4A] bg-clip-text text-transparent font-bold">marketing operating system</span> built for creators and marketers.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm md:text-[15px] font-semibold tracking-tight bg-gradient-to-r from-[#FF6A1A] to-[#FF8A4A] text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            Join the Waitlist
          </Link>
        </div>
      </section>
    </main>
  );
}
