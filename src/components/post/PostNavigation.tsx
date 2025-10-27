import Link from 'next/link';
import type { PostSummary } from '@/types';

interface PostNavigationProps {
  prevPost?: PostSummary | null;
  nextPost?: PostSummary | null;
}

/**
 * 이전 글 / 다음 글 네비게이션 컴포넌트
 */
export default function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <nav className="mt-16 pt-8 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 이전 글 */}
        <div>
          {prevPost ? (
            <Link
              href={`/posts/${prevPost.slug}`}
              className="group block p-6 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
            >
              <div className="text-sm text-gray-500 mb-2 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                이전 글
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {prevPost.title}
              </h3>
            </Link>
          ) : (
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg opacity-50">
              <div className="text-sm text-gray-400 mb-2">이전 글</div>
              <p className="text-gray-400">이전 글이 없습니다</p>
            </div>
          )}
        </div>

        {/* 다음 글 */}
        <div>
          {nextPost ? (
            <Link
              href={`/posts/${nextPost.slug}`}
              className="group block p-6 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-right"
            >
              <div className="text-sm text-gray-500 mb-2 flex items-center justify-end">
                다음 글
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {nextPost.title}
              </h3>
            </Link>
          ) : (
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg opacity-50 text-right">
              <div className="text-sm text-gray-400 mb-2">다음 글</div>
              <p className="text-gray-400">다음 글이 없습니다</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
