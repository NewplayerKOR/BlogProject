import PostCard from '@/components/post/PostCard';
import { getAllPosts } from '@/lib/posts';

/**
 * 홈페이지
 * - 학습내용 포스트 목록을 카드 형태로 표시
 */
export default function Home() {
  // 모든 포스트 가져오기
  const posts = getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      {/* 헤더 */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          학습 내용
        </h1>
        <p className="text-gray-600">
          개발하면서 배운 내용들을 기록하고 공유합니다.
        </p>
      </header>

      {/* 포스트 목록 */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            아직 작성된 포스트가 없습니다.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            src/content/posts 폴더에 마크다운 파일을 추가해보세요!
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
