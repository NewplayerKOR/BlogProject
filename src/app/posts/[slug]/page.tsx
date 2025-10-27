import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { getPostBySlug, getAllPostSlugs, getAdjacentPosts } from '@/lib/posts';
import PostNavigation from '@/components/post/PostNavigation';
import TableOfContents from '@/components/post/TableOfContents';
import type { Metadata } from 'next';

/**
 * 동적 라우팅을 위한 정적 경로 생성
 * 빌드 시점에 모든 포스트의 경로를 미리 생성합니다.
 */
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

/**
 * 메타데이터 생성 (SEO 최적화)
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: '포스트를 찾을 수 없습니다',
    };
  }

  return {
    title: `${post.title} | NewplayerKOR 블로그`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

/**
 * 개별 포스트 상세 페이지
 */
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // 포스트가 없으면 404 페이지 표시
  if (!post) {
    notFound();
  }

  // 이전 글 / 다음 글 가져오기
  const { prevPost, nextPost } = getAdjacentPosts(slug);

  const formattedDate = format(new Date(post.date), 'yyyy년 MM월 dd일', {
    locale: ko,
  });

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="flex gap-12">
        {/* 메인 콘텐츠 */}
        <article className="flex-1 max-w-4xl">
          {/* 헤더 영역 */}
          <header className="mb-12">
            {/* 카테고리 뱃지 */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
                {post.category}
              </span>
            </div>

            {/* 제목 */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {/* 메타 정보 */}
            <div className="flex items-center gap-4 text-gray-600">
              <time dateTime={post.date}>{formattedDate}</time>
              {post.tags.length > 0 && (
                <>
                  <span>•</span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* 구분선 */}
            <hr className="mt-8 border-gray-200" />
          </header>

          {/* 본문 내용 */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-gray-900 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-medium prose-code:before:content-[''] prose-code:after:content-['']
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
              prose-ul:list-disc prose-ul:ml-6 prose-ul:my-4
              prose-ol:list-decimal prose-ol:ml-6 prose-ol:my-4
              prose-li:text-gray-900 prose-li:my-2
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700
              prose-img:rounded-lg prose-img:shadow-md
              prose-table:text-gray-900"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* 하단 태그 */}
          {post.tags.length > 0 && (
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </footer>
          )}

          {/* 이전 글 / 다음 글 네비게이션 */}
          <PostNavigation prevPost={prevPost} nextPost={nextPost} />
        </article>

        {/* 우측 목차 */}
        <aside className="w-64 flex-shrink-0">
          <TableOfContents />
        </aside>
      </div>
    </div>
  );
}
