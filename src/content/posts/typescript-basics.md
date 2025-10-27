---
title: "TypeScript 기초: 왜 타입스크립트를 사용해야 할까?"
date: "2025-01-20"
category: "학습내용"
tags: ["TypeScript", "JavaScript", "타입시스템"]
description: "TypeScript의 기본 개념과 JavaScript 대비 장점을 알아봅니다."
---

# TypeScript 기초: 왜 타입스크립트를 사용해야 할까?

JavaScript는 동적 타입 언어입니다. 이는 유연함을 제공하지만, 큰 프로젝트에서는 오히려 버그를 양산하는 원인이 되기도 합니다.

## TypeScript란?

TypeScript는 Microsoft가 개발한 JavaScript의 슈퍼셋(Superset) 언어입니다. JavaScript에 정적 타입 시스템을 추가한 것이 핵심입니다.

```typescript
// JavaScript
function add(a, b) {
  return a + b;
}

add(1, 2);      // 3
add("1", "2");  // "12" (의도하지 않은 결과)

// TypeScript
function add(a: number, b: number): number {
  return a + b;
}

add(1, 2);      // 3
add("1", "2");  // ❌ 컴파일 에러!
```

## 왜 TypeScript를 사용해야 할까?

### 1. 타입 안정성

컴파일 시점에 타입 에러를 잡아낼 수 있습니다.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function getUserName(user: User): string {
  return user.name;
}

const user = { id: 1, name: "김철수" };
getUserName(user); // ❌ email 속성이 없어서 에러!
```

### 2. 뛰어난 개발자 경험

- **자동 완성**: IDE가 정확한 제안을 제공
- **리팩토링**: 타입 정보를 기반으로 안전한 리팩토링
- **문서화**: 타입 자체가 문서 역할

### 3. 대규모 프로젝트에 유리

코드베이스가 커질수록 TypeScript의 진가가 발휘됩니다.

## 기본 타입들

```typescript
// 기본 타입
let isDone: boolean = false;
let count: number = 42;
let userName: string = "홍길동";

// 배열
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Kim", "Lee"];

// 튜플
let person: [string, number] = ["홍길동", 30];

// 객체
let user: { name: string; age: number } = {
  name: "김철수",
  age: 25
};

// any (가급적 사용 자제)
let anything: any = "문자열";
anything = 123; // OK
```

## Interface vs Type

```typescript
// Interface
interface User {
  name: string;
  age: number;
}

// Type Alias
type User = {
  name: string;
  age: number;
};
```

**둘의 차이**:
- Interface는 확장 가능 (extends)
- Type은 유니온, 인터섹션 등 더 다양한 타입 조합 가능
- 대부분의 경우 둘 다 사용 가능하지만, React에서는 Type이 더 선호됨

## 실전 팁

### 1. Union Types 활용

```typescript
type Status = "idle" | "loading" | "success" | "error";

function handleStatus(status: Status) {
  // status는 4가지 값 중 하나만 가능
}
```

### 2. Generic 사용

```typescript
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNumber = getFirstElement([1, 2, 3]); // number
const firstName = getFirstElement(["a", "b"]); // string
```

### 3. Utility Types

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// 모든 속성을 선택적으로
type PartialUser = Partial<User>;

// 특정 속성만 선택
type UserPreview = Pick<User, "id" | "name">;

// 특정 속성 제외
type UserWithoutEmail = Omit<User, "email">;
```

## 마무리

TypeScript는 처음엔 번거롭게 느껴질 수 있지만, 익숙해지면 JavaScript로 돌아가기 어려울 정도로 강력한 도구입니다.

특히 팀 프로젝트나 장기 프로젝트에서는 TypeScript의 장점이 더욱 빛을 발합니다!
