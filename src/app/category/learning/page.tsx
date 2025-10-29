import PostCard from '@/components/post/PostCard';
import { getPostsByCategory } from '@/lib/posts';

/**
 * 학습내용 카테고리 페이지
 */
export const metadata = {
  title: 'TIL | 기술 블로그',
  description: '매일 배운 내용을 기록하고 공유합니다.',
};

export default function LearningPage() {
  const posts = getPostsByCategory('학습내용');

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      {/* 헤더 */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          📚 TIL (Today I Learned)
        </h1>
        <p className="text-gray-600">
          매일 배운 내용을 기록하고 공유합니다.
        </p>
      </header>

      {/* 포스트 목록 */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            아직 작성된 학습내용 포스트가 없습니다.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
