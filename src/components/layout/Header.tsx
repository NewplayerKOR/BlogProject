'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * 상단 헤더 컴포넌트
 * - 홈으로 돌아가는 로고/버튼
 * - 현재 페이지 위치 표시
 */
export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* 홈 버튼 */}
          <Link 
            href="/"
            className="group flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            <svg 
              className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
              홈으로
            </span>
          </Link>

          {/* 현재 위치 표시 (breadcrumb) */}
          <div className="hidden md:block">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                홈
              </Link>
              {pathname !== '/' && (
                <>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-900 font-medium">
                    {pathname === '/about' && '자기소개'}
                    {pathname === '/category/learning' && 'TIL'}
                    {pathname === '/category/troubleshooting' && '트러블슈팅'}
                    {pathname === '/category/projects' && '프로젝트'}
                    {pathname === '/posts' && '전체보기'}
                    {pathname.startsWith('/posts/') && '포스트'}
                  </span>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
