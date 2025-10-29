---
title: "여기에 글 제목을 입력하세요"
date: "YYYY-MM-DD"
category: "학습내용"
tags: ["태그1", "태그2", "태그3"]
description: "이 글에 대한 간단한 설명을 입력하세요 (목록에서 표시됨)"
thumbnail: "/images/posts/thumbnail-name.jpg"
---

## 개요

이 글에서 다루는 내용을 간단히 소개합니다.

## 본문

### 소제목 1

내용을 작성하세요.

```javascript
// 코드 예시
const example = "코드를 작성하세요";
```

### 소제목 2

- 리스트 항목 1
- 리스트 항목 2
- 리스트 항목 3

## 결론

배운 내용을 정리하고 마무리합니다.

---

## 📝 작성 가이드

### 1. Front Matter (맨 위 --- 사이)

**필수 항목:**
- `title`: 글 제목
- `date`: 작성 날짜 (형식: YYYY-MM-DD, 예: 2025-10-28)
- `category`: 카테고리 선택
  - `"학습내용"` - TIL, 새로 배운 내용
  - `"트러블슈팅"` - 문제 해결 과정
  - `"프로젝트"` - 프로젝트 소개
- `tags`: 태그 배열 (예: ["React", "TypeScript", "Next.js"])
- `description`: 글 요약 (1-2줄)

**선택 항목:**
- `thumbnail`: 썸네일 이미지 경로 (없으면 생략 가능)

### 2. 이미지 사용법

#### 방법 1: 외부 URL (R2, Imgur 등)
```markdown
![이미지 설명](https://your-image-url.com/image.png)
```

#### 방법 2: public 폴더 사용
1. 이미지를 `public/images/posts/` 폴더에 저장
2. 마크다운에서 참조:
```markdown
![이미지 설명](/images/posts/your-image.png)
```

### 3. 코드 블록

\`\`\`언어명
코드 내용
\`\`\`

지원 언어: javascript, typescript, python, java, css, html 등

### 4. 표 만들기

| 제목1 | 제목2 | 제목3 |
|-------|-------|-------|
| 내용1 | 내용2 | 내용3 |

### 5. 인용구

> 인용할 내용을 작성합니다.

### 6. 링크

[링크 텍스트](https://example.com)

### 7. 강조

- **굵게**: `**텍스트**`
- *기울임*: `*텍스트*`
- ~~취소선~~: `~~텍스트~~`
- `인라인 코드`: \`코드\`

---

## 🚀 글 작성 후 확인사항

1. [ ] Front Matter가 올바르게 작성되었나요?
2. [ ] category가 정확한가요? (학습내용/트러블슈팅/프로젝트)
3. [ ] date 형식이 맞나요? (YYYY-MM-DD)
4. [ ] 이미지가 제대로 표시되나요?
5. [ ] 파일명이 영문으로 되어있나요? (예: react-hooks-guide.md)

## 📂 파일 저장 위치

카테고리에 맞는 폴더에 저장하세요:

- `src/content/posts/learning/` - 학습내용
- `src/content/posts/troubleshooting/` - 트러블슈팅  
- `src/content/posts/projects/` - 프로젝트

**파일명 규칙:**
- 영문, 숫자, 하이픈(-) 사용
- 공백 사용 금지
- 예: `react-state-management.md`
