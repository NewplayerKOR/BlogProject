---
title: "npm install 에러 해결: ERESOLVE 충돌 완벽 가이드"
date: "2025-01-18"
category: "트러블슈팅"
tags: ["npm", "Node.js", "Package Manager", "의존성"]
description: "npm install 시 발생하는 의존성 충돌 에러를 해결하는 방법을 알아봅니다."
---

# npm install 에러 해결: ERESOLVE 충돌

새 프로젝트를 시작하거나 라이브러리를 추가하려는데:

```bash
npm install some-package

npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! Found: react@18.2.0
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^17.0.0" from some-package@1.0.0
```

😫 **또 에러다...**

## 문제 상황

React 18 프로젝트에 라이브러리를 추가하려고 했습니다.

```bash
npm install react-beautiful-dnd
```

결과:
```
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! 
npm ERR! While resolving: my-project@0.1.0
npm ERR! Found: react@18.2.0
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^16.8.0 || ^17.0.0" from react-beautiful-dnd@13.1.1
```

## 왜 이런 에러가 날까?

### Peer Dependency란?

라이브러리가 "나는 이 버전의 React와 함께 사용해야 해!"라고 요구하는 것입니다.

```json
// react-beautiful-dnd의 package.json
{
  "peerDependencies": {
    "react": "^16.8.0 || ^17.0.0"  // React 16 또는 17만 지원
  }
}
```

**문제**: 우리는 React 18을 사용 중! ⚠️

### npm 7+ 의 엄격한 정책

- **npm 6 이하**: 경고만 하고 설치 진행
- **npm 7+**: 충돌 시 설치 중단

더 안전하지만, 호환 가능한 경우에도 막히는 단점이 있습니다.

## 해결 방법

### ❌ 방법 1: --force (비추천)

```bash
npm install react-beautiful-dnd --force
```

**문제점:**
- 의존성 트리 완전히 무시
- 다른 패키지까지 영향
- 예상치 못한 버그 발생 가능

### ⚠️ 방법 2: --legacy-peer-deps

```bash
npm install react-beautiful-dnd --legacy-peer-deps
```

**동작:**
- npm 6처럼 경고만 하고 설치
- 의존성 트리는 유지
- 비교적 안전

**언제 사용?**
- 라이브러리가 업데이트 안 된 경우
- 실제로는 호환되는 것을 알고 있을 때

### ✅ 방법 3: 대체 라이브러리 찾기 (추천)

```bash
# react-beautiful-dnd 대신 dnd-kit 사용
npm install @dnd-kit/core @dnd-kit/sortable
```

**장점:**
- React 18 완전 지원
- 더 나은 성능
- 활발한 유지보수

### ✅ 방법 4: 라이브러리 업데이트 대기

GitHub Issues에서 업데이트 진행 상황 확인:
```
https://github.com/[library]/issues
```

React 18 지원 이슈가 있다면 👍 를 눌러주세요!

### ✅ 방법 5: .npmrc 설정

프로젝트 루트에 `.npmrc` 파일 생성:

```
legacy-peer-deps=true
```

이제 모든 `npm install`에 자동 적용됩니다.

**주의**: 팀 프로젝트라면 팀원과 상의 필요!

## 실전 해결 과정

### 상황: Tailwind CSS v3 + PostCSS 8 충돌

```bash
npm install tailwindcss postcss autoprefixer

npm ERR! ERESOLVE unable to resolve dependency tree
```

### 1단계: 에러 메시지 분석

```
Could not resolve dependency:
peer postcss@"^7.0.0" from some-plugin@1.0.0
Found: postcss@8.4.21
```

**원인**: 플러그인이 PostCSS 7만 지원

### 2단계: 해결책 선택

옵션:
1. ❌ `--force` 사용
2. ⚠️ `--legacy-peer-deps` 사용
3. ✅ 호환되는 플러그인 버전 찾기

### 3단계: 구현

```bash
# 최신 버전 확인
npm view some-plugin versions

# 호환되는 버전 설치
npm install some-plugin@2.0.0
```

또는:

```bash
# 일단 legacy-peer-deps로 설치
npm install --legacy-peer-deps

# 나중에 업데이트
npm update
```

### 4단계: package.json 정리

```json
{
  "dependencies": {
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.21",
    "some-plugin": "^2.0.0"  // 업데이트된 버전
  }
}
```

## 의존성 충돌 예방하기

### 1. 정기적인 업데이트

```bash
# 오래된 패키지 확인
npm outdated

# 안전한 업데이트
npm update

# 메이저 업데이트
npx npm-check-updates -u
npm install
```

### 2. package-lock.json 커밋

```bash
git add package-lock.json
git commit -m "Update dependencies"
```

**이유:**
- 모든 팀원이 같은 버전 사용
- 배포 환경도 동일하게 유지

### 3. 의존성 최소화

```bash
# 정말 필요한 패키지만 설치
npm install lodash  # ❌ 전체 설치 (70KB)
npm install lodash.debounce  # ✅ 필요한 것만 (2KB)
```

### 4. peerDependencies 확인

```bash
# 설치 전 패키지 정보 확인
npm view react-beautiful-dnd peerDependencies

# 출력:
# {
#   react: '^16.8.0 || ^17.0.0',
#   react-dom: '^16.8.0 || ^17.0.0'
# }
```

## yarn vs npm

### yarn을 사용한다면?

```bash
# npm의 --legacy-peer-deps와 동일
yarn install --ignore-engines

# 또는 .yarnrc 파일에 설정
echo "ignore-engines true" > .yarnrc
```

### pnpm을 사용한다면?

```bash
# 엄격한 peer dependencies
pnpm install

# 관대하게 설치
pnpm install --no-strict-peer-dependencies
```

## 정리

### ERESOLVE 에러 발생 원인
- npm 7+의 엄격한 peer dependency 검사
- 라이브러리 간 버전 불일치
- 오래된 라이브러리 사용

### 해결 방법 우선순위

1. ✅ **대체 라이브러리** 찾기 (가장 추천)
2. ✅ **호환 버전** 설치
3. ⚠️ `--legacy-peer-deps` 사용
4. ❌ `--force` 사용 (최후의 수단)

### 예방책
- 정기적인 의존성 업데이트
- package-lock.json 관리
- 설치 전 peerDependencies 확인

### 실무 팁

```bash
# 프로젝트별 npm 버전 고정
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

```bash
# 설치 에러 시 캐시 정리
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

의존성 지옥에서 탈출하세요! 🚀

## 참고 자료

- [npm 공식 문서 - peer dependencies](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies)
- [npm 블로그 - npm 7 changes](https://blog.npmjs.org/post/626173315965468672/npm-v7-series-beta-release-and-semver-major)
