import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { PostSummary } from '@/types';

interface PostCardProps {
  post: PostSummary;
}

/**
 * 블로그 포스트 카드 컴포넌트
 * - 썸네일 이미지
 * - 제목, 설명, 날짜
 * - 태그 표시
 */
export default function PostCard({ post }: PostCardProps) {
  const formattedDate = format(new Date(post.date), 'yyyy년 MM월 dd일', {
    locale: ko,
  });

  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        {/* 썸네일 */}
        {post.thumbnail && (
          <div className="relative w-full h-48 bg-gray-100">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* 내용 */}
        <div className="p-6">
          {/* 카테고리 뱃지 */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
              {post.category}
            </span>
          </div>

          {/* 제목 */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {post.title}
          </h3>

          {/* 설명 */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {post.description}
          </p>

          {/* 날짜 */}
          <time className="text-xs text-gray-500">{formattedDate}</time>

          {/* 태그 */}
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
