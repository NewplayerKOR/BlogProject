---
title: "Next.js 16으로 만드는 기술 블로그 프로젝트"
date: "2025-01-26"
category: "프로젝트"
tags: ["Next.js", "React", "TypeScript", "Blog"]
description: "Next.js 16과 App Router를 활용하여 개인 기술 블로그를 구축한 경험을 공유합니다."
---

# Next.js 16으로 만드는 기술 블로그 프로젝트

개발자라면 한 번쯤 자신만의 기술 블로그를 만들어보고 싶을 겁니다. 저도 그랬고, 직접 블로그를 구축해봤습니다!

## 🎯 프로젝트 개요

### 목표
- 학습 내용을 기록하고 공유할 수 있는 플랫폼
- 마크다운 기반의 간편한 포스트 작성
- 빠른 로딩 속도와 SEO 최적화

### 기술 스택
- **프레임워크**: Next.js 16 (App Router)
- **UI 라이브러리**: React 19
- **언어**: TypeScript
- **스타일링**: Tailwind CSS v4
- **콘텐츠**: Markdown (gray-matter, remark)

### 개발 기간
- **계획**: 1일
- **개발**: 3일
- **배포**: 반나절

## 🏗️ 아키텍처 설계

### 폴더 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 전역 레이아웃
│   ├── page.tsx           # 홈페이지
│   ├── posts/[slug]/      # 동적 라우팅
│   ├── category/          # 카테고리별 페이지
│   └── about/             # 자기소개
├── components/
│   ├── layout/            # 레이아웃 컴포넌트
│   └── post/              # 포스트 관련 컴포넌트
├── content/posts/         # 마크다운 포스트
├── lib/                   # 유틸리티 함수
└── types/                 # 타입 정의
```

### 핵심 설계 원칙

1. **파일 기반 콘텐츠 관리**
   - CMS 없이 마크다운으로 관리
   - Git으로 버전 관리
   - 배포 자동화

2. **서버 컴포넌트 우선**
   - 기본은 서버 컴포넌트
   - 필요한 경우만 클라이언트 컴포넌트
   - 번들 사이즈 최소화

3. **타입 안정성**
   - 모든 데이터에 TypeScript 타입 정의
   - 컴파일 시점에 에러 감지
   - IDE 자동완성 지원

## 💡 주요 기능 구현

### 1. 마크다운 파싱 시스템

마크다운 파일을 읽고 HTML로 변환하는 시스템입니다.

```typescript
// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 프론트매터와 본문 분리
    const { data, content } = matter(fileContents);

    // 마크다운 → HTML 변환
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);

    return {
      slug,
      ...data,
      content: processedContent.toString(),
    };
  } catch (error) {
    return null;
  }
}
```

**왜 이렇게 했나?**
- `gray-matter`: YAML 프론트매터 파싱
- `remark`: 확장 가능한 마크다운 처리
- 파일 시스템 직접 접근 (서버 컴포넌트)

### 2. 동적 라우팅 + SSG

각 포스트는 빌드 시점에 정적 페이지로 생성됩니다.

```typescript
// app/posts/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

**장점:**
- 빌드 시 모든 페이지 미리 생성
- 빠른 페이지 로딩 (HTML 즉시 제공)
- CDN 캐싱 가능
- SEO 최적화

### 3. 좌측 사이드바 레이아웃

고정된 사이드바와 스크롤 가능한 메인 콘텐츠 영역입니다.

```typescript
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="flex min-h-screen bg-gray-50">
          {/* 좌측 고정 사이드바 */}
          <Sidebar />
          
          {/* 메인 콘텐츠 */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
```

**CSS 포인트:**
```css
.flex              /* Flexbox 컨테이너 */
.min-h-screen      /* 최소 높이 100vh */
.flex-1            /* 남은 공간 모두 차지 */
```

### 4. 목차 (Table of Contents) 자동 생성

클라이언트 사이드에서 헤딩을 추출하여 목차를 생성합니다.

```typescript
'use client';

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // DOM에서 h2, h3 찾기
    const elements = Array.from(
      document.querySelectorAll('article h2, article h3')
    );

    const headingData = elements.map((element, index) => {
      if (!element.id) {
        element.id = `heading-${index}`;
      }
      
      return {
        id: element.id,
        text: element.textContent || '',
        level: parseInt(element.tagName.substring(1)),
      };
    });

    setHeadings(headingData);

    // 스크롤 위치 추적
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ... 렌더링
}
```

**왜 클라이언트 컴포넌트?**
- `document` 객체 접근 필요
- 스크롤 이벤트 리스닝
- 동적 상태 관리

## 🎨 디자인 시스템

### 색상 팔레트

```typescript
// Tailwind CSS 기본 팔레트 사용
{
  primary: 'blue-600',      // 링크, 버튼
  text: 'gray-900',         // 본문 텍스트
  textLight: 'gray-600',    // 부가 정보
  border: 'gray-200',       // 구분선
  background: 'gray-50',    // 배경
}
```

### 타이포그래피

```css
/* 제목 */
h1: text-4xl font-bold
h2: text-2xl font-bold
h3: text-xl font-bold

/* 본문 */
p: text-gray-700 leading-relaxed

/* 코드 */
code: text-pink-600 bg-gray-100 rounded
pre: bg-gray-900 text-gray-100
```

### 반응형 디자인

```typescript
// 모바일 우선 (Mobile First)
className="
  text-base       /* 기본 */
  md:text-lg      /* 768px 이상 */
  lg:text-xl      /* 1024px 이상 */
  
  grid-cols-1     /* 기본: 1열 */
  md:grid-cols-2  /* 768px 이상: 2열 */
  lg:grid-cols-3  /* 1024px 이상: 3열 */
"
```

## 🚀 성능 최적화

### 1. 정적 생성 (SSG)

```typescript
// 빌드 시 모든 페이지 생성
export async function generateStaticParams() {
  return getAllPostSlugs().map(slug => ({ slug }));
}
```

**결과:**
- TTFB (Time to First Byte): < 100ms
- FCP (First Contentful Paint): < 500ms

### 2. 이미지 최적화

```typescript
import Image from 'next/image';

<Image
  src="/images/thumbnail.jpg"
  alt="Post thumbnail"
  width={800}
  height={400}
  priority={isAboveFold}
/>
```

**자동 최적화:**
- WebP 변환
- 적절한 사이즈 제공
- Lazy loading

### 3. 코드 분할

```typescript
// 클라이언트 컴포넌트만 번들에 포함
'use client';

import { useState } from 'react';
// → 약 2KB 번들

// 서버 컴포넌트는 번들 사이즈 0
// → 서버에서만 실행
```

## 📊 결과 및 성과

### Lighthouse 점수
- **Performance**: 98/100
- **Accessibility**: 100/100
- **Best Practices**: 100/100
- **SEO**: 100/100

### 번들 사이즈
- **First Load JS**: 87 KB
- **페이지별 추가**: 2-5 KB

### 개발 경험
- ✅ 마크다운으로 빠른 포스트 작성
- ✅ Git으로 버전 관리
- ✅ Vercel로 자동 배포
- ✅ 타입 안정성으로 버그 감소

## 🔧 개선할 점

### 현재 한계
1. **댓글 시스템 부재**
   - 고려 중: giscus (GitHub Discussions 기반)

2. **검색 기능 없음**
   - 계획: Algolia 또는 클라이언트 사이드 검색

3. **다크모드 미지원**
   - 구현 예정: Tailwind dark mode

### 향후 계획
- [ ] 댓글 시스템 추가
- [ ] 전체 검색 기능
- [ ] 다크모드 지원
- [ ] RSS 피드 생성
- [ ] 조회수 통계

## 💭 회고

### 잘한 점
- Next.js App Router의 장점을 최대한 활용
- 타입스크립트로 안정적인 코드베이스
- 간결하고 유지보수 가능한 구조

### 배운 점
- 서버/클라이언트 컴포넌트 분리의 중요성
- 정적 생성의 강력함
- 마크다운 생태계의 다양성

### 아쉬운 점
- 초기 설계에 더 시간을 투자할걸
- 테스트 코드 작성 못함
- 접근성 개선 여지 있음

## 🔗 참고 자료

- [프로젝트 GitHub](https://github.com/NewplayerKOR/blog)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com)

## 마무리

직접 블로그를 만들면서 Next.js의 강력함을 체감했습니다. 특히 App Router의 서버 컴포넌트는 게임 체인저입니다.

여러분도 자신만의 블로그를 만들어보세요! 🚀

**코드는 GitHub에서 확인하실 수 있습니다.**
