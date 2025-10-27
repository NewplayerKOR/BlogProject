# 기술 블로그

Next.js, React, TypeScript 기반의 개인 기술 블로그 프로젝트입니다.

## 🚀 기술 스택

- **Framework**: Next.js 16.0.0 (App Router)
- **UI Library**: React 19.2.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Content**: Markdown (gray-matter, remark)
- **Linting**: ESLint

## 📁 프로젝트 구조

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 홈페이지
│   ├── about/               # 소개 페이지
│   ├── category/            # 카테고리별 페이지
│   │   ├── projects/
│   │   └── troubleshooting/
│   └── posts/               # 개별 포스트 페이지
│       └── [slug]/
├── components/              # 재사용 가능한 컴포넌트
│   ├── layout/
│   │   └── Sidebar.tsx     # 좌측 사이드바 (프로필 + 카테고리)
│   ├── post/
│   │   ├── PostCard.tsx    # 블로그 포스트 카드
│   │   ├── PostNavigation.tsx
│   │   └── TableOfContents.tsx
│   └── ui/
├── content/                 # 마크다운 포스트
│   └── posts/
│       ├── learning/        # 학습내용 카테고리
│       ├── projects/        # 프로젝트 카테고리
│       └── troubleshooting/ # 트러블슈팅 카테고리
├── lib/                     # 유틸리티 함수
│   └── posts.ts            # 포스트 데이터 처리
└── types/                   # TypeScript 타입 정의
    ├── post.ts
    └── index.ts
```

## 🎨 주요 기능

### 현재 구현된 기능

- ✅ 좌측 사이드바 레이아웃
  - 프로필 이미지 영역
  - 카테고리 네비게이션 (자기소개, 학습내용, 트러블슈팅, 프로젝트, 전체보기)
- ✅ 마크다운 기반 블로그 시스템
  - 파일 기반 콘텐츠 관리
  - 프론트매터(Front Matter)를 통한 메타데이터 관리
- ✅ 반응형 포스트 카드 레이아웃
  - 카테고리 뱃지
  - 태그 표시
  - 날짜 포맷팅 (한국어)
- ✅ 카테고리별 페이지 (부분 구현)
- ✅ 개별 포스트 상세 페이지
- ✅ 목차(Table of Contents)
- ✅ 포스트 네비게이션

### 향후 추가 예정

- [ ] 검색 기능
- [ ] 다크모드
- [ ] 댓글 시스템
- [ ] SEO 최적화
- [ ] 태그별 필터링

## 🛠️ 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속

### 3. 빌드

```bash
npm run build
npm start
```

## ✍️ 블로그 포스트 작성하기

### 1. 카테고리별 폴더에 마크다운 파일 생성

포스트는 카테고리별로 영문 폴더명에 저장됩니다:

```
src/content/posts/
├── learning/           # 학습내용
│   └── my-learning-post.md
├── troubleshooting/   # 트러블슈팅
│   └── my-troubleshooting.md
└── projects/          # 프로젝트
    └── my-project.md
```

**참고**: 폴더명은 영문이지만, 포스트의 `category` 필드는 한글을 사용합니다.

### 2. 프론트매터 작성

파일 상단에 YAML 형식의 메타데이터를 작성합니다.

```markdown
---
title: "포스트 제목"
date: "2025-01-27"
category: "학습내용"
tags: ["React", "TypeScript"]
description: "포스트 설명"
thumbnail: "/images/posts/thumbnail.jpg"
---

# 본문 내용 시작

여기에 마크다운 형식으로 내용을 작성합니다.
```

### 3. 카테고리 종류

- `학습내용`: 새로 배운 기술이나 개념
- `트러블슈팅`: 문제 해결 과정
- `프로젝트`: 진행한 프로젝트

**참고**: `자기소개`는 별도의 정적 페이지(`/about`)로 제공됩니다.

### 4. 파일명 규칙

- 파일명은 URL의 slug로 사용됩니다
- 영문, 숫자, 하이픈(-) 사용 권장
- 예: `react-hooks-guide.md` → `/posts/react-hooks-guide`

## 📝 타입 정의

### PostCategory

포스트의 카테고리 타입입니다.

```typescript
type PostCategory = '학습내용' | '트러블슈팅' | '프로젝트';
```

### PostMetadata

```typescript
interface PostMetadata {
  title: string;
  date: string;
  category: PostCategory;
  tags: string[];
  description: string;
  thumbnail?: string;
}
```

## 🎯 개발 참고사항

### 기술적 선택
- **파일 기반 라우팅**: Next.js App Router의 폴더 구조 활용
- **서버 컴포넌트 우선**: 성능 최적화를 위해 기본적으로 서버 컴포넌트 사용
- **타입 안정성**: TypeScript로 모든 데이터 타입 정의
- **컴포넌트 분리**: 재사용 가능한 작은 컴포넌트로 구성
- **콘텐츠와 코드 분리**: 마크다운 파일로 콘텐츠 관리

## 📚 학습 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 공식 문서](https://react.dev)
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)