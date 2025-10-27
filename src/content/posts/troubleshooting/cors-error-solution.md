---
title: "CORS 에러 완벽 해결 가이드"
date: "2025-01-22"
category: "트러블슈팅"
tags: ["CORS", "HTTP", "Web", "API"]
description: "프론트엔드 개발 중 가장 흔하게 만나는 CORS 에러의 원인과 해결 방법을 알아봅니다."
---

# CORS 에러 완벽 해결 가이드

API를 호출하는 순간 콘솔에 빨간 글씨로 나타나는 에러:

```
Access to fetch at 'https://api.example.com' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

프론트엔드 개발을 하다 보면 **가장 자주 만나는 에러** 중 하나입니다.

## 문제 상황

Next.js 프로젝트에서 외부 API를 호출하려고 했습니다.

```javascript
// 클라이언트 컴포넌트에서 API 호출
'use client';

import { useEffect, useState } from 'react';

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

결과는? **CORS 에러** 💥

## CORS가 뭔가요?

**CORS (Cross-Origin Resource Sharing)**는 **다른 출처의 리소스 공유**를 의미합니다.

### Origin(출처)이란?

URL의 구성 요소 중:
- **프로토콜** (http, https)
- **도메인** (example.com)
- **포트** (3000, 8080)

이 **세 가지가 모두 같아야** 같은 출처입니다.

```
http://localhost:3000       ← 우리 앱
https://api.example.com     ← 다른 출처!

프로토콜도 다르고, 도메인도 다르고, 포트도 없음
```

### 왜 CORS가 필요한가?

**보안 때문입니다!**

만약 CORS 정책이 없다면:
1. 악의적인 사이트가 사용자의 쿠키를 가져감
2. 그 쿠키로 은행 API를 호출
3. 사용자 몰래 송금 😱

브라우저는 이런 공격을 막기 위해 **다른 출처로의 요청을 기본적으로 차단**합니다.

## 해결 방법

### ❌ 방법 1: 브라우저 CORS 끄기 (절대 사용 금지)

```bash
# Chrome에서 CORS 비활성화 (개발용)
chrome.exe --disable-web-security --user-data-dir="C:/temp"
```

**왜 안 되나요?**
- 보안 위험
- 다른 사용자 환경에서는 작동 안 함
- 근본적인 해결 아님

### ✅ 방법 2: 서버에서 CORS 헤더 추가 (정석)

백엔드에서 CORS를 허용해야 합니다.

```javascript
// Express.js 예시
const express = require('express');
const cors = require('cors');
const app = express();

// 모든 출처 허용 (개발용)
app.use(cors());

// 특정 출처만 허용 (프로덕션)
app.use(cors({
  origin: 'https://myapp.com',
  credentials: true
}));

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }]);
});
```

**서버 응답 헤더에 추가됨:**
```
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Credentials: true
```

### ✅ 방법 3: Next.js API Routes 사용 (프록시)

백엔드를 수정할 수 없다면? **Next.js가 중간에서 대신 요청**하게 합니다.

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // 서버에서 API 호출 (CORS 문제 없음)
  const res = await fetch('https://api.example.com/users', {
    headers: {
      'Authorization': `Bearer ${process.env.API_KEY}`
    }
  });
  
  const data = await res.json();
  return NextResponse.json(data);
}
```

```javascript
// 클라이언트에서는 자신의 API를 호출
'use client';

useEffect(() => {
  fetch('/api/users')  // ← 같은 출처!
    .then(res => res.json())
    .then(data => setUsers(data));
}, []);
```

**장점:**
- CORS 문제 완전 해결
- API 키를 클라이언트에 노출하지 않음
- 캐싱, 에러 처리 등 추가 로직 구현 가능

### ✅ 방법 4: Next.js rewrites 사용

`next.config.js`에서 URL을 다시 쓸 수 있습니다.

```typescript
// next.config.ts
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*'
      }
    ];
  }
};

export default nextConfig;
```

```javascript
// 클라이언트
fetch('/api/users')  // ← 실제로는 https://api.example.com/users로 요청
```

### ✅ 방법 5: 서버 컴포넌트 사용 (Next.js 추천)

Next.js App Router의 **서버 컴포넌트**를 사용하면 CORS 걱정 없습니다!

```typescript
// app/users/page.tsx (서버 컴포넌트)
async function getUsers() {
  const res = await fetch('https://api.example.com/users', {
    headers: {
      'Authorization': `Bearer ${process.env.API_KEY}`
    }
  });
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

**왜 CORS 에러가 안 날까?**
- 서버에서 실행되므로 브라우저가 관여하지 않음
- 서버 간 통신은 CORS 정책 적용 안 됨

## 정리

### CORS 에러가 발생하는 이유
- 브라우저의 보안 정책
- 다른 출처로의 요청 차단

### 해결 방법 선택 가이드

| 상황 | 추천 방법 |
|------|----------|
| 백엔드 수정 가능 | 서버에서 CORS 헤더 추가 |
| 백엔드 수정 불가 | Next.js API Routes (프록시) |
| 정적 데이터 | 서버 컴포넌트 사용 |
| 실시간 데이터 | API Routes + 클라이언트 polling |

### 핵심 포인트
1. **CORS는 브라우저의 보안 기능**
2. **서버에서 해결하는 것이 정석**
3. **Next.js는 다양한 우회 방법 제공**
4. **가능하면 서버 컴포넌트 사용**

CORS 에러가 나면 당황하지 말고, 상황에 맞는 해결책을 선택하세요! 🚀
