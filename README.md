# NewplayerKOR 기술 블로그

Next.js, React, TypeScript 기반의 개인 기술 블로그입니다.

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
│   └── page.tsx             # 홈페이지
├── components/              # 재사용 가능한 컴포넌트
│   ├── layout/
│   │   └── Sidebar.tsx     # 좌측 사이드바 (프로필 + 카테고리)
│   └── post/
│       └── PostCard.tsx    # 블로그 포스트 카드
├── content/                 # 마크다운 포스트
│   └── posts/
│       ├── react-hooks-useState.md
│       ├── typescript-basics.md
│       └── nextjs-app-router.md
├── lib/                     # 유틸리티 함수
│   └── posts.ts            # 포스트 데이터 처리
└── types/                   # TypeScript 타입 정의
    ├── post.ts
    └── index.ts
```

## 🎨 주요 기능

### 현재 구현된 기능 (Phase 1)

- ✅ 좌측 사이드바 레이아웃
  - 프로필 이미지 영역
  - 카테고리 네비게이션 (자기소개, 학습내용, 트러블슈팅, 프로젝트)
- ✅ 마크다운 기반 블로그 시스템
  - 파일 기반 콘텐츠 관리
  - 프론트매터(Front Matter)를 통한 메타데이터 관리
- ✅ 반응형 포스트 카드 레이아웃
  - 카테고리 뱃지
  - 태그 표시
  - 날짜 포맷팅 (한국어)

### 다음 단계 (Phase 2-5)

- [ ] 카테고리별 페이지 구현
- [ ] 개별 포스트 상세 페이지
- [ ] 검색 기능
- [ ] 다크모드
- [ ] 댓글 시스템

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

### 1. 새 마크다운 파일 생성

`src/content/posts/` 폴더에 `.md` 파일을 생성합니다.

```
src/content/posts/my-first-post.md
```

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
- `자기소개`: 소개 및 이력
- `프로젝트`: 진행한 프로젝트

## 📝 타입 정의

### PostCategory

```typescript
type PostCategory = '학습내용' | '트러블슈팅' | '자기소개' | '프로젝트';
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

## 🎯 핵심 설계 원칙

1. **파일 기반 라우팅**: Next.js App Router의 폴더 구조 활용
2. **서버 컴포넌트 우선**: 성능 최적화를 위해 기본적으로 서버 컴포넌트 사용
3. **타입 안정성**: TypeScript로 모든 데이터 타입 정의
4. **컴포넌트 분리**: 재사용 가능한 작은 컴포넌트로 구성
5. **콘텐츠와 코드 분리**: 마크다운 파일로 콘텐츠 관리

## 📚 학습 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 공식 문서](https://react.dev)
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)

## 📄 라이선스

MIT License

---

**Made with ❤️ by NewplayerKOR**