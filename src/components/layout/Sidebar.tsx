import Link from 'next/link';
import type { PostCategory } from '@/types';

/**
 * 좌측 사이드바 컴포넌트
 * - 프로필 이미지
 * - 카테고리 네비게이션
 */
export default function Sidebar() {
  const categories: { name: PostCategory; href: string }[] = [
    { name: '자기소개', href: '/about' },
    { name: '학습내용', href: '/' },
    { name: '트러블슈팅', href: '/category/troubleshooting' },
    { name: '프로젝트', href: '/category/projects' },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-6 flex flex-col">
      {/* 프로필 섹션 */}
      <div className="mb-8">
        <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center">
          <span className="text-5xl font-bold text-white">NK</span>
        </div>
        <h2 className="text-xl font-bold text-center text-gray-800">
          NewplayerKOR
        </h2>
        <p className="text-sm text-center text-gray-600 mt-2">
          개발 블로그
        </p>
      </div>

      {/* 카테고리 네비게이션 */}
      <nav className="flex-1">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                href={category.href}
                className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 푸터 정보 */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          © 2025 NewplayerKOR
        </p>
      </div>
    </aside>
  );
}
