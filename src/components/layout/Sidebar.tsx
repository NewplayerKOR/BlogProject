'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

/**
 * 좌측 사이드바 컴포넌트
 * - 프로필 이미지
 * - 카테고리 네비게이션
 * - 현재 위치 하이라이트
 */
export default function Sidebar() {
  const pathname = usePathname();

  const categories: { name: string; href: string; icon?: string }[] = [
    { name: '최신 글', href: '/', icon: '✨' },
    { name: '자기소개', href: '/about', icon: '👋' },
    { name: 'TIL', href: '/category/learning', icon: '📚' },
    { name: '트러블슈팅', href: '/category/troubleshooting', icon: '🔧' },
    { name: '프로젝트', href: '/category/projects', icon: '🚀' },
    { name: '전체보기', href: '/posts', icon: '📖' },
  ];

  /**
   * 현재 경로가 해당 카테고리인지 확인
   */
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-6 flex flex-col">
        {/* 프로필 섹션 */}
        <div className="mb-8">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                <Image
                    src="https://pub-8645696b761c495498795a6b2b48c318.r2.dev/ProfileImage/DrawProfile.png" // ✅ 여기에 본인 R2 이미지 URL 넣기
                    alt="프로필 이미지"
                    fill // 부모 div 크기(w-32 h-32)에 맞춰 꽉 채우기
                    sizes="128px" // 이미지 최적화용
                    className="object-cover" // 이미지 비율 유지하며 꽉 채움
                    priority // 초기 렌더링 시 미리 로드
                />
            </div>

            <h2 className="text-xl font-bold text-center text-gray-800">
                NewplayerKOR
            </h2>
            <p className="text-sm text-center text-gray-600 mt-2">개발 블로그</p>
        </div>

      {/* 카테고리 네비게이션 */}
      <nav className="flex-1">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map((category) => {
            const active = isActive(category.href);
            
            return (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className={`
                    block px-4 py-2 rounded-lg transition-all duration-200
                    ${active 
                      ? 'bg-blue-100 text-blue-900 font-semibold shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  {category.icon && <span className="mr-2">{category.icon}</span>}
                  {category.name}
                </Link>
              </li>
            );
          })}
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
