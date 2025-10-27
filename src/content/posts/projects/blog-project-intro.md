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
│   ├── posts/             
│   │   ├── [slug]/        # 동적 라우팅
│   │   └── page.tsx       # 전체보기
│   ├── category/          # 카테고리별 페이지
│   └── about/             # 자기소개
├── components/
│   ├── layout/            # 레이아웃 컴포넌트
│   └── post/              # 포스트 관련 컴포넌트
├── content/posts/         # 마크다운 포스트
│   ├── learning/          # 학습내용 (영어 폴더명!)
│   ├── troubleshooting/   # 트러블슈팅
│   ├── projects/          # 프로젝트
│   └── about/             # 자기소개
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

### 1. 카테고리별 폴더 구조

**중요 결정**: 폴더명을 영어로!

```
❌ 한글 폴더 (문제 발생)
posts/학습내용/
posts/트러블슈팅/

✅ 영어 폴더 (안전)
posts/learning/
posts/troubleshooting/
```

**이유:**
- 배포 환경 호환성 (Linux 서버)
- Git 인코딩 문제 방지
- URL 인코딩 이슈 없음

### 2. 재귀 탐색으로 모든 포스트 찾기

```typescript
function readDirectory(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      readDirectory(fullPath);  // 재귀 호출
    } else if (entry.name.endsWith('.md')) {
      // 포스트 처리
    }
  }
}
```

### 3. Next.js 15+ async params 대응

```typescript
// 변경 전 (Next.js 14)
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
}

// 변경 후 (Next.js 15+)
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;  // ✅ await 필요!
  const post = await getPostBySlug(slug);
}
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

### 2. 카테고리별 필터링

```typescript
// 홈페이지: 학습내용만
getPostsByCategory('학습내용')

// 카테고리 페이지: 해당 카테고리만
getPostsByCategory('트러블슈팅')

// 전체보기: 모든 포스트
getAllPosts()
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

## 💭 회고

### 잘한 점
- 폴더명을 영어로 사용 (배포 안정성)
- 카테고리별 명확한 분리
- 타입스크립트로 안정적인 코드베이스

### 배운 점
- Next.js 15의 async params 변경사항
- 파일 시스템 경로는 항상 영어로
- 재귀 탐색의 유용성

### 개선할 점
- 댓글 시스템 추가
- 검색 기능 구현
- 다크모드 지원

## 마무리

직접 블로그를 만들면서 많은 것을 배웠습니다. 특히 **파일 시스템 경로는 영어로 사용해야 한다**는 교훈이 중요했습니다!

여러분도 자신만의 블로그를 만들어보세요! 🚀
