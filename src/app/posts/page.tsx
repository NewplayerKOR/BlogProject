import PostCard from '@/components/post/PostCard';
import { getAllPosts } from '@/lib/posts';

/**
 * 전체 포스트 목록 페이지
 */
export const metadata = {
  title: '전체 포스트 | NewplayerKOR 블로그',
  description: '모든 카테고리의 포스트를 확인하세요.',
};

export default function AllPostsPage() {
  const posts = getAllPosts();

  // 카테고리별로 그룹화
  const postsByCategory = posts.reduce((acc, post) => {
    const category = post.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);

  const categories = Object.keys(postsByCategory);

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      {/* 헤더 */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          📖 전체 포스트
        </h1>
        <p className="text-gray-600">
          모든 카테고리의 포스트를 한눈에 확인하세요.
        </p>
        <div className="mt-4 flex gap-2">
          <span className="text-sm text-gray-500">
            총 {posts.length}개의 포스트
          </span>
        </div>
      </header>

      {/* 카테고리별 포스트 */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            아직 작성된 포스트가 없습니다.
          </p>
        </div>
      ) : (
        <div className="space-y-16">
          {categories.map((category) => (
            <section key={category}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {category === '학습내용' && '📚 '}
                {category === '트러블슈팅' && '🔧 '}
                {category === '프로젝트' && '🚀 '}
                {category === '자기소개' && '👋 '}
                {category}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({postsByCategory[category].length})
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {postsByCategory[category].map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
