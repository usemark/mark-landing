import { NextResponse } from 'next/server';
import { getSortedPostsData } from '@/lib/blog';

export async function GET() {
  try {
    const posts = getSortedPostsData();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}
