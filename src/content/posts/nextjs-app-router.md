---
title: "Next.js App Router 완벽 이해하기"
date: "2025-01-25"
category: "학습내용"
tags: ["Next.js", "React", "App Router", "SSR"]
description: "Next.js 13에서 도입된 App Router의 핵심 개념과 사용법을 알아봅니다."
---

# Next.js App Router 완벽 이해하기

Next.js 13부터 도입된 App Router는 기존의 Pages Router를 대체하는 새로운 라우팅 시스템입니다.

## App Router vs Pages Router

### Pages Router (기존 방식)
```
pages/
├── index.tsx          → /
├── about.tsx          → /about
└── posts/
    └── [id].tsx       → /posts/:id
```

### App Router (새로운 방식)
```
app/
├── page.tsx           → /
├── about/
│   └── page.tsx       → /about
└── posts/
    └── [id]/
        └── page.tsx   → /posts/:id
```

## 핵심 개념

### 1. 폴더 기반 라우팅

App Router는 **폴더 구조가 곧 URL 구조**입니다.

```
app/
├── page.tsx                    # /
├── blog/
│   ├── page.tsx               # /blog
│   └── [slug]/
│       └── page.tsx           # /blog/:slug
└── dashboard/
    ├── layout.tsx             # 대시보드 레이아웃
    ├── page.tsx               # /dashboard
    └── settings/
        └── page.tsx           # /dashboard/settings
```

### 2. 특수 파일들

- `page.tsx`: 실제 페이지 컴포넌트
- `layout.tsx`: 공유 레이아웃
- `loading.tsx`: 로딩 UI
- `error.tsx`: 에러 UI
- `not-found.tsx`: 404 페이지

```typescript
// app/blog/layout.tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>블로그 네비게이션</nav>
      {children}
    </div>
  );
}

// app/blog/loading.tsx
export default function Loading() {
  return <div>로딩 중...</div>;
}
```

### 3. 서버 컴포넌트 (기본)

App Router의 모든 컴포넌트는 **기본적으로 서버 컴포넌트**입니다.

```typescript
// app/posts/page.tsx (서버 컴포넌트)
async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts(); // 서버에서 데이터 페칭

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

**장점**:
- 번들 사이즈 감소
- 서버에서 직접 데이터베이스 접근 가능
- SEO 최적화

### 4. 클라이언트 컴포넌트

상호작용이 필요한 경우 `'use client'` 지시어를 사용합니다.

```typescript
// components/Counter.tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**클라이언트 컴포넌트가 필요한 경우**:
- `useState`, `useEffect` 등 Hook 사용
- 이벤트 리스너 (`onClick`, `onChange` 등)
- 브라우저 API 사용

### 5. 동적 라우팅

```typescript
// app/posts/[slug]/page.tsx
interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function PostPage({ params }: PageProps) {
  return <h1>포스트: {params.slug}</h1>;
}

// 정적 페이지 생성
export async function generateStaticParams() {
  const posts = await getPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

## 데이터 페칭 패턴

### 1. 서버 컴포넌트에서 직접 페칭

```typescript
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'force-cache', // 기본값: 캐싱
  });
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>;
}
```

### 2. 캐싱 전략

```typescript
// 캐싱 안 함 (항상 최신 데이터)
fetch(url, { cache: 'no-store' });

// 10초마다 재검증
fetch(url, { next: { revalidate: 10 } });

// 무한 캐싱
fetch(url, { cache: 'force-cache' });
```

### 3. 병렬 데이터 페칭

```typescript
export default async function Page() {
  // 병렬로 실행
  const [posts, users] = await Promise.all([
    getPosts(),
    getUsers(),
  ]);

  return (
    <div>
      <Posts data={posts} />
      <Users data={users} />
    </div>
  );
}
```

## 메타데이터 관리

```typescript
// app/posts/[slug]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: [post.thumbnail],
    },
  };
}
```

## 실전 팁

### 1. 서버/클라이언트 컴포넌트 분리

```typescript
// app/dashboard/page.tsx (서버)
import ClientCounter from './ClientCounter';

async function getData() {
  return fetch('https://api.example.com/data').then(r => r.json());
}

export default async function Dashboard() {
  const data = await getData();

  return (
    <div>
      <h1>서버에서 렌더링: {data.title}</h1>
      <ClientCounter /> {/* 클라이언트에서만 실행 */}
    </div>
  );
}
```

### 2. 스트리밍과 Suspense

```typescript
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>즉시 표시</h1>
      <Suspense fallback={<div>로딩 중...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
```

### 3. Route Handlers (API Routes)

```typescript
// app/api/posts/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const data = await request.json();
  // 포스트 생성 로직
  return NextResponse.json({ success: true });
}
```

## 마무리

App Router는 처음에는 복잡해 보이지만, 서버 컴포넌트를 활용하면 더 나은 성능과 개발자 경험을 제공합니다.

**핵심은**:
- 기본은 서버 컴포넌트
- 필요할 때만 클라이언트 컴포넌트
- 폴더 구조가 곧 라우팅

이 개념들을 이해하면 Next.js의 진정한 힘을 느낄 수 있습니다!
