'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * 포스트의 목차(Table of Contents) 컴포넌트
 * 클라이언트 컴포넌트로, 스크롤 위치에 따라 현재 섹션 하이라이트
 */
export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 페이지의 모든 h2, h3 헤딩 가져오기
    const elements = Array.from(
      document.querySelectorAll('article h2, article h3')
    );

    const headingData: Heading[] = elements.map((element, index) => {
      const level = parseInt(element.tagName.substring(1));
      const text = element.textContent || '';
      
      // ID가 없으면 생성
      if (!element.id) {
        const id = `heading-${index}`;
        element.id = id;
      }

      return {
        id: element.id,
        text,
        level,
      };
    });

    setHeadings(headingData);

    // 스크롤 감지
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i] as HTMLElement;
        if (element.offsetTop <= scrollPosition) {
          setActiveId(element.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-8 hidden xl:block">
      <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
        목차
      </h3>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`block py-1 transition-colors border-l-2 pl-3 ${
                activeId === heading.id
                  ? 'border-blue-600 text-blue-600 font-medium'
                  : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
