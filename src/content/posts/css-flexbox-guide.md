---
title: "CSS Flexbox 완벽 가이드"
date: "2025-01-12"
category: "학습내용"
tags: ["CSS", "Flexbox", "Layout", "Web Design"]
description: "복잡한 레이아웃을 쉽게 만드는 CSS Flexbox의 모든 속성을 실전 예제와 함께 알아봅니다."
---

# CSS Flexbox 완벽 가이드

레이아웃을 만들 때 `float`나 `position`으로 고생했던 시절이 있었습니다. 이제는 **Flexbox**로 모든 게 쉬워졌습니다!

## 🎯 Flexbox란?

**Flexible Box Layout**의 약자로, 1차원 레이아웃 시스템입니다.

```
┌─────────────────────────────────┐
│  ┌───┐  ┌───┐  ┌───┐  ┌───┐   │ ← 가로 (Row)
│  │ A │  │ B │  │ C │  │ D │   │
│  └───┘  └───┘  └───┘  └───┘   │
└─────────────────────────────────┘
```

또는

```
┌───────────┐
│  ┌───┐   │ ↓
│  │ A │   │  세로 (Column)
│  └───┘   │
│  ┌───┐   │
│  │ B │   │
│  └───┘   │
│  ┌───┐   │
│  │ C │   │
│  └───┘   │
└───────────┘
```

### 언제 사용하나?

- ✅ 네비게이션 바
- ✅ 카드 레이아웃
- ✅ 수직/수평 중앙 정렬
- ✅ 동일한 높이의 컬럼
- ✅ 반응형 레이아웃

## 📦 기본 구조

### Container와 Items

```html
<div class="container">  <!-- Flex Container -->
  <div class="item">1</div>  <!-- Flex Item -->
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

```css
.container {
  display: flex;  /* Flexbox 활성화! */
}
```

**이것만으로도 변화가 일어납니다:**
- 모든 자식이 가로로 배치
- 높이가 자동으로 같아짐

## 🎨 Container 속성

### 1. flex-direction (방향)

```css
.container {
  display: flex;
  flex-direction: row;  /* 기본값: 가로 → */
}
```

**옵션:**
```css
flex-direction: row;           /* → 가로 (기본) */
flex-direction: row-reverse;   /* ← 가로 역순 */
flex-direction: column;        /* ↓ 세로 */
flex-direction: column-reverse; /* ↑ 세로 역순 */
```

**실전 예제:**
```css
/* 모바일: 세로 배치 */
.container {
  flex-direction: column;
}

/* 데스크톱: 가로 배치 */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}
```

### 2. justify-content (주축 정렬)

**주축 = flex-direction과 같은 방향**

```css
.container {
  display: flex;
  justify-content: flex-start;  /* 기본값 */
}
```

**옵션:**
```css
justify-content: flex-start;    /* ┌─1──2──3 */
justify-content: flex-end;      /*  1──2──3─┘ */
justify-content: center;        /*   ──1─2─3── */
justify-content: space-between; /* ┌1──────2──────3┘ */
justify-content: space-around;  /* ─1───2───3─ */
justify-content: space-evenly;  /* ──1──2──3── */
```

**시각화:**
```
flex-start:     [1][2][3]           
flex-end:                  [1][2][3]
center:            [1][2][3]         
space-between:  [1]     [2]     [3] 
space-around:    [1]   [2]   [3]    
space-evenly:   [1]  [2]  [3]       
```

### 3. align-items (교차축 정렬)

**교차축 = flex-direction과 수직 방향**

```css
.container {
  display: flex;
  height: 200px;
  align-items: stretch;  /* 기본값 */
}
```

**옵션:**
```css
align-items: stretch;     /* 높이를 컨테이너에 맞춤 */
align-items: flex-start;  /* 위쪽 정렬 */
align-items: flex-end;    /* 아래쪽 정렬 */
align-items: center;      /* 중앙 정렬 */
align-items: baseline;    /* 텍스트 기준선 정렬 */
```

**완벽한 중앙 정렬:**
```css
.container {
  display: flex;
  justify-content: center;  /* 수평 중앙 */
  align-items: center;      /* 수직 중앙 */
  height: 100vh;
}
```

### 4. flex-wrap (줄 바꿈)

```css
.container {
  display: flex;
  flex-wrap: nowrap;  /* 기본값: 줄 바꿈 없음 */
}
```

**옵션:**
```css
flex-wrap: nowrap;      /* 한 줄에 다 넣음 (압축) */
flex-wrap: wrap;        /* 필요하면 줄 바꿈 */
flex-wrap: wrap-reverse; /* 줄 바꿈 (역순) */
```

**실전 예제:**
```css
/* 반응형 카드 레이아웃 */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px;  /* 최소 300px, 늘어남 */
}
```

### 5. gap (간격)

```css
.container {
  display: flex;
  gap: 20px;  /* 아이템 간 간격 */
}

/* 또는 개별 지정 */
.container {
  display: flex;
  row-gap: 20px;     /* 세로 간격 */
  column-gap: 10px;  /* 가로 간격 */
}
```

**옛날 방식 (비추천):**
```css
.item {
  margin-right: 20px;
}

.item:last-child {
  margin-right: 0;  /* 마지막 아이템 제외 */
}
```

**새 방식:**
```css
.container {
  gap: 20px;  /* 끝! */
}
```

### 6. align-content (여러 줄 정렬)

`flex-wrap: wrap`일 때만 작동합니다.

```css
.container {
  display: flex;
  flex-wrap: wrap;
  height: 400px;
  align-content: stretch;  /* 기본값 */
}
```

**옵션은 justify-content와 비슷:**
```css
align-content: flex-start;
align-content: flex-end;
align-content: center;
align-content: space-between;
align-content: space-around;
```

## 🧩 Item 속성

### 1. flex-grow (늘어남)

```css
.item {
  flex-grow: 0;  /* 기본값: 늘어나지 않음 */
}
```

**예제:**
```html
<div class="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
</div>
```

```css
.container {
  display: flex;
  width: 600px;
}

.item {
  width: 100px;  /* 기본 크기 */
}

.item-1 { flex-grow: 1; }  /* 남은 공간의 1/3 */
.item-2 { flex-grow: 2; }  /* 남은 공간의 2/3 */
.item-3 { flex-grow: 0; }  /* 늘어나지 않음 */
```

**결과:**
```
[  Item 1 (150px)  ][    Item 2 (250px)    ][ Item 3 (100px) ]
```

### 2. flex-shrink (줄어듦)

```css
.item {
  flex-shrink: 1;  /* 기본값: 줄어들 수 있음 */
}
```

**예제:**
```css
.item-1 { flex-shrink: 1; }  /* 보통 */
.item-2 { flex-shrink: 2; }  /* 2배 더 줄어듦 */
.item-3 { flex-shrink: 0; }  /* 절대 안 줄어듦 */
```

### 3. flex-basis (기본 크기)

```css
.item {
  flex-basis: auto;  /* 기본값: 콘텐츠 크기 */
}
```

**width vs flex-basis:**
```css
/* width: 고정 크기 */
.item {
  width: 200px;
}

/* flex-basis: 권장 크기 (유연함) */
.item {
  flex-basis: 200px;
}
```

### 4. flex (단축 속성)

```css
.item {
  flex: [grow] [shrink] [basis];
}
```

**자주 쓰는 패턴:**
```css
/* 균등하게 늘어남 */
.item {
  flex: 1;
  /* = flex: 1 1 0% */
}

/* 고정 크기 */
.item {
  flex: 0 0 200px;
  /* 늘어나지도 줄어들지도 않음 */
}

/* 최소 크기 보장 */
.item {
  flex: 1 1 300px;
  /* 최소 300px, 늘어남 */
}
```

### 5. align-self (개별 정렬)

Container의 `align-items`를 무시하고 개별 정렬:

```css
.item-special {
  align-self: flex-end;  /* 다른 아이템과 다르게 */
}
```

**옵션:**
```css
align-self: auto;       /* Container 설정 따름 */
align-self: flex-start;
align-self: flex-end;
align-self: center;
align-self: stretch;
```

### 6. order (순서 변경)

```css
.item-1 { order: 3; }
.item-2 { order: 1; }
.item-3 { order: 2; }
```

**HTML 순서:**
```html
<div>Item 1</div>
<div>Item 2</div>
<div>Item 3</div>
```

**화면 순서:**
```
[Item 2] [Item 3] [Item 1]
```

## 🚀 실전 예제

### 1. 네비게이션 바

```html
<nav class="navbar">
  <div class="logo">Logo</div>
  <ul class="menu">
    <li>Home</li>
    <li>About</li>
    <li>Contact</li>
  </ul>
  <button class="login">Login</button>
</nav>
```

```css
.navbar {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background: #333;
  color: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.menu {
  display: flex;
  gap: 2rem;
  margin-left: 2rem;
  flex: 1;  /* 남은 공간 차지 */
  list-style: none;
}

.login {
  margin-left: auto;  /* 오른쪽 끝으로 */
}
```

**결과:**
```
[Logo] [Home] [About] [Contact]               [Login]
```

### 2. 카드 그리드

```html
<div class="card-grid">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
</div>
```

```css
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 calc(33.333% - 20px);  /* 3열 */
  min-width: 250px;  /* 최소 너비 */
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .card {
    flex: 1 1 100%;  /* 모바일: 1열 */
  }
}
```

### 3. Holy Grail 레이아웃

```html
<div class="layout">
  <header>Header</header>
  <div class="content">
    <nav>Nav</nav>
    <main>Main Content</main>
    <aside>Aside</aside>
  </div>
  <footer>Footer</footer>
</div>
```

```css
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header, footer {
  padding: 2rem;
  background: #333;
  color: white;
}

.content {
  display: flex;
  flex: 1;
}

nav {
  flex: 0 0 200px;  /* 고정 너비 */
  background: #f0f0f0;
}

main {
  flex: 1;  /* 남은 공간 */
  padding: 2rem;
}

aside {
  flex: 0 0 250px;  /* 고정 너비 */
  background: #f0f0f0;
}
```

### 4. 완벽한 중앙 정렬

```html
<div class="center">
  <div class="modal">
    <h2>Modal Title</h2>
    <p>Modal content goes here</p>
  </div>
</div>
```

```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
}
```

## 💡 꿀팁

### 1. Flexbox Froggy로 연습

[https://flexboxfroggy.com/](https://flexboxfroggy.com/)

게임으로 Flexbox를 배울 수 있습니다!

### 2. 자주 쓰는 패턴

```css
/* 수평 중앙 */
.container {
  display: flex;
  justify-content: center;
}

/* 수직 중앙 */
.container {
  display: flex;
  align-items: center;
}

/* 완벽한 중앙 */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 균등 분할 */
.item {
  flex: 1;
}

/* 오른쪽 정렬 */
.item {
  margin-left: auto;
}
```

### 3. Grid vs Flexbox?

**Flexbox**: 1차원 (가로 또는 세로)
```css
[1] [2] [3] [4]
```

**Grid**: 2차원 (가로 + 세로)
```css
[1] [2]
[3] [4]
```

**언제 무엇을?**
- 네비게이션, 카드 목록 → Flexbox
- 복잡한 레이아웃, 표 → Grid

## 📚 정리

### Container 속성 요약

| 속성 | 설명 | 기본값 |
|------|------|--------|
| `flex-direction` | 방향 | `row` |
| `justify-content` | 주축 정렬 | `flex-start` |
| `align-items` | 교차축 정렬 | `stretch` |
| `flex-wrap` | 줄 바꿈 | `nowrap` |
| `gap` | 간격 | `0` |

### Item 속성 요약

| 속성 | 설명 | 기본값 |
|------|------|--------|
| `flex-grow` | 늘어남 | `0` |
| `flex-shrink` | 줄어듦 | `1` |
| `flex-basis` | 기본 크기 | `auto` |
| `flex` | 단축 속성 | `0 1 auto` |
| `align-self` | 개별 정렬 | `auto` |

### 핵심 포인트

1. **`display: flex`로 시작**
2. **주축(justify)와 교차축(align) 구분**
3. **`gap`으로 간격 조절**
4. **`flex: 1`로 균등 분할**
5. **반응형은 `flex-wrap` 활용**

Flexbox는 처음엔 어렵지만, 익숙해지면 없으면 못 사는 도구가 됩니다! 🎨

## 참고 자료

- [CSS-Tricks Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [MDN Flexbox](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [Flexbox Froggy](https://flexboxfroggy.com/)
