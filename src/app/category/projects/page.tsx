import PostCard from '@/components/post/PostCard';
import { getPostsByCategory } from '@/lib/posts';

/**
 * 프로젝트 카테고리 페이지
 */
export const metadata = {
  title: '프로젝트 | NewplayerKOR 블로그',
  description: '진행했던 프로젝트들을 소개합니다.',
};

export default function ProjectsPage() {
  const posts = getPostsByCategory('프로젝트');

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      {/* 헤더 */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🚀 프로젝트
        </h1>
        <p className="text-gray-600">
          개발하고 운영했던 프로젝트들을 소개합니다.
        </p>
      </header>

      {/* 포스트 목록 */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            아직 작성된 프로젝트 포스트가 없습니다.
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
