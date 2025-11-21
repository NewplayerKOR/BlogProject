---
title: "데브코스 최종 프로젝트 - 시니어를 위한 AI 기반 디지털 교육 플랫폼 'MOCI 3D'"
date: "2025-11-21"
category: "프로젝트"
tags: ["Spring Boot", "Java", "REST API", "AWS", "교육 플랫폼", "팀 프로젝트"]
description: "디지털 소외계층을 위한 AI 멘토링 교육 플랫폼 - 자료실 시스템 및 인프라 관리 담당"
---

## 프로젝트 소개

프로그래머스 백엔드 데브코스 6기 8회차 6팀 **'MOCI'**의 최종 프로젝트로, **시니어와 디지털 초보자를 위한 AI 기반 3D 맞춤형 교육 플랫폼**을 개발했습니다.

- **프로젝트 기간**: 2025_09_15 - 2025_10_15(약 1개월)
- **팀 구성**: 5명 (백엔드 중심)
- **나의 역할**: 백엔드 개발 - 공개 자료실 및 자료 요청 시스템, 인프라 관리 및 모니터링
- **서비스 이름**: MOCI 3D (My Own Class Initiative 3D)
- **배포 상태**: 실제 서비스 배포 완료 (https://www.mydidimdol.com)

### 프로젝트 배경

디지털 소외계층, 특히 시니어층의 디지털 리터러시 향상을 목표로 멘토-멘티 매칭, AI 챗봇 학습 지원, 교육 자료 공유 등을 제공하는 종합 교육 플랫폼입니다. 카카오톡, 배달의민족, 유튜브 등 일상에서 필요한 디지털 서비스 사용법을 쉽게 배울 수 있도록 돕습니다.

## 기술 스택

### Backend
- **Language**: Java 21
- **Framework**: Spring Boot 3.5.5
- **Security**: Spring Security, JWT, OAuth 2.0
- **ORM**: Spring Data JPA, QueryDSL
- **Database**: MySQL 8.0 (운영), H2 (개발/테스트)
- **File Storage**: AWS S3
- **Real-time**: WebSocket (STOMP), WebRTC
- **AI Integration**: Gemini API (Google)
- **Deployment**: AWS EC2, AWS RDS

### Additional Technologies
- **API Documentation**: SpringDoc (Swagger)
- **Rate Limiting**: Bucket4j
- **Korean NLP**: KOMORAN (형태소 분석)
- **Build Tool**: Gradle
- **CI/CD**: GitHub Actions

### Frontend
- Next.js 14
- React
- TypeScript

## 팀 구성 및 역할

| 팀원 | 역할 | 담당 기능 |
|------|------|-----------|
| 순태열 | Product Owner | AWS S3 파일 업로드, WebRTC 화상 통화, P2P 시그널링 서버 |
| 박영진 | Backend Lead | JWT 기반 로그인/로그아웃, 소셜 로그인 (카카오/구글/네이버), 자동 토큰 갱신, 사용자 정보 관리 |
| 김성철 | AI Engineer | AI 질문/답변 처리, 스트리밍 응답 구현, AWS EC2/RDS 배포, CI/CD 파이프라인 구축 |
| **박태규 (나)** | **Backend Engineer** | **공개 자료실 CRUD, 자료 요청 승인 시스템, 인프라 관리 및 모니터링** |
| 정주신 | Real-time Engineer | WebSocket 실시간 채팅, 멘토-멘티 매칭, 채팅 히스토리 관리 |

## 담당 기능

### 1. 공개 자료실 시스템

교육 자료를 체계적으로 관리하고 공유할 수 있는 자료실 시스템을 개발했습니다.

#### 주요 기능

**자료 관리 (CRUD)**
```text
// 자료 목록 조회 (카테고리별 필터링)
GET /api/v1/archives

// 자료 상세 조회
GET /api/v1/archives/{id}

// 자료 등록 (ADMIN)
POST /api/v1/archives

// 자료 수정 (ADMIN)
PUT /api/v1/archives/{id}

// 자료 삭제 (ADMIN)
DELETE /api/v1/archives/{id}
```

**카테고리 분류**
- 카카오톡
- 배달의민족
- 쿠팡
- KTX
- 유튜브
- 시외버스

각 카테고리별로 교육 자료를 분류하여 사용자가 원하는 주제의 자료를 쉽게 찾을 수 있도록 구현했습니다.

**파일 첨부**
- AWS S3와 연동하여 교육 자료 파일 업로드
- 파일 메타데이터 관리 (파일명, URL, 크기, 타입)
- 다중 파일 업로드 지원

### 2. 자료 요청 및 승인 시스템

사용자가 필요한 교육 자료를 요청하고, 관리자가 검토하여 승인하는 워크플로우를 구현했습니다.

#### 워크플로우

```
멘토의 자료 요청 → 관리자 검토 → 승인/거부
     ↓
승인 시 자료실에 관리자의 교육자료 등록
```

#### API 구현

```text
// 자료 요청 등록
POST /api/v1/archive-requests

// 요청 목록 조회
GET /api/v1/archive-requests

// 요청 상세 조회
GET /api/v1/archive-requests/{requestId}

// 승인/거부 (ADMIN)
PATCH /api/v1/archive-requests/{requestId}
```

**상태 관리**
- `PENDING`: 검토 대기 중
- `APPROVED`: 승인 (자료실 자동 등록)
- `REJECTED`: 거부

#### 승인 프로세스

1. 사용자가 필요한 자료 요청 작성
2. 관리자 페이지에서 요청 목록 확인
3. 관리자가 요청 내용 검토
4. 승인 시: 공개 자료실에 자동으로 등록
5. 거부 시: 요청 상태만 업데이트

### 3. 인프라 관리 및 모니터링

실제 서비스 운영을 위한 인프라 관리와 모니터링을 담당했습니다.

**인프라 구성**
- AWS EC2를 통한 Spring Boot 애플리케이션 호스팅
- AWS RDS (MySQL) 데이터베이스 관리
- AWS S3 파일 저장소 연동
- Nginx 리버스 프록시 설정

**도메인 설정**
- 프론트엔드: `https://www.mydidimdol.com`
- API 서버: `https://api.mydidimdol.com`
- API 문서: `https://api.mydidimdol.com/swagger-ui/index.html`

**모니터링**
- 서버 상태 모니터링
- 로그 분석 및 에러 트래킹
- 데이터베이스 성능 모니터링

## 프로젝트 아키텍처

### 시스템 구성도

```
┌─────────────────┐
│   Frontend      │
│  (Next.js 14)   │
└────────┬────────┘
         │ HTTP/WebSocket
         │
┌────────▼───────────────────────────┐
│  Load Balancer (Nginx)             │
└────────┬───────────────────────────┘
         │
┌────────▼────────┐
│  Spring Boot    │ ◄──────► ┌──────────────┐
│  Application    │          │   AWS S3     │
│                 │          │ File Storage │
│  - REST API     │          └──────────────┘
│  - WebSocket    │
│  - Security     │
└────────┬────────┘
         │
    ┌────┼────┐
    │    │    │
┌───▼──┐ │ ┌──▼──────┐
│MySQL │ │ │ AI API  │
│ RDS  │ │ │(Gemini) │
└──────┘ │ └─────────┘
         │
    ┌────▼──────┐
    │  Redis    │
    │  (예정)   │
    └───────────┘
```

### 도메인 구조

```
src/main/java/com/moci_3d_backend/
├── domain/
│   ├── user/              # 사용자 관리
│   ├── chat/
│   │   ├── mentor/        # 멘토링 채팅
│   │   └── ai/            # AI 챗봇
│   ├── archive/           # 교육 자료실 (내가 담당)
│   │   ├── public_archive/    # 공개 자료실 CRUD
│   │   └── archive_request/   # 자료 요청 시스템
│   ├── fileUpload/        # 파일 업로드
│   └── webRTC/            # 화상 통화
├── global/
│   ├── security/          # 보안 설정
│   ├── webSocket/         # WebSocket 설정
│   ├── config/
│   ├── exception/
│   └── util/
└── external/
    └── ai/                # AI API 연동
```

## 전체 서비스 주요 기능

### 1. 인증 및 사용자 관리
- **일반 로그인**: 전화번호 기반 JWT 인증
- **소셜 로그인**: 카카오, 구글, 네이버 OAuth2 연동
- **자동 토큰 갱신**: Refresh Token을 활용한 무중단 인증
- **디지털 레벨 시스템**: 사용자의 디지털 리터러시 수준 측정 (0~5단계)

### 2. AI 챗봇
- **AI 기반 Q&A**: 디지털 관련 질문에 Gemini AI가 답변
- **스트리밍 응답**: 실시간 스트리밍 방식의 자연스러운 대화
- **Rate Limiting**: Bucket4j를 활용한 API 호출 제한 (분당 10회)
- **대화 저장**: 사용자별 AI 채팅 기록 관리

### 3. 멘토링 채팅
- **1:1 실시간 채팅**: WebSocket(STOMP) 기반
- **멘토-멘티 매칭**: 채팅방 생성 및 관리
- **채팅 히스토리**: 대화 내역 저장 및 조회

### 4. 화상 통화
- **실시간 화상 멘토링**: WebRTC 기반 P2P 연결
- **화면 공유**: 멘토가 화면을 공유하며 설명
- **저지연 통신**: 직접 연결로 빠른 응답

### 5. 파일 관리
- **AWS S3 연동**: 클라우드 기반 파일 저장
- **다중 파일 업로드**: 여러 파일 동시 업로드 지원
- **파일 메타데이터 관리**: 파일명, URL, 크기 등 관리

## 기술적 구현 상세

### 1. QueryDSL 활용

복잡한 검색 조건과 동적 쿼리 작성을 위해 QueryDSL을 활용했습니다.

```java
// 카테고리별 자료 검색 예시
public List<PublicArchive> findByCategory(String category) {
    return queryFactory
        .selectFrom(publicArchive)
        .where(publicArchive.category.eq(category))
        .orderBy(publicArchive.createdAt.desc())
        .fetch();
}
```

**장점**
- 타입 안전한 쿼리 작성
- 컴파일 타임 에러 감지
- 동적 쿼리 작성 용이

### 2. 권한 기반 접근 제어

Spring Security를 활용한 역할 기반 접근 제어를 구현했습니다.

**권한 체계**
```
ADMIN > MENTOR > USER

- ADMIN: 모든 권한 (자료 등록, 요청 승인/거부)
- MENTOR: USER 권한 + 멘토링 제공
- USER: 기본 권한 (자료 조회, 요청 등록)
```

**구현 예시**
```java
@PreAuthorize("hasRole('ADMIN')")
public void approveRequest(Long requestId) {
    // 관리자만 접근 가능
}
```

### 3. 프로파일 기반 환경 분리

개발 환경과 운영 환경을 명확히 분리하여 안정적인 배포를 구현했습니다.

**개발 환경 (dev)**
- H2 인메모리 데이터베이스
- 상세 로그 출력
- CORS: localhost:3000 허용

**운영 환경 (prod)**
- MySQL RDS
- AWS S3 연동
- CORS: www.mydidimdol.com 허용
- HTTPS 필수

## 협업 방식

### GitHub 기반 협업

**워크플로우**
1. Issue 생성 및 담당자 배정
2. 브랜치 생성 및 개발
3. Pull Request 작성
4. 코드 리뷰 (팀원 1명 이상)
5. 머지 및 배포

**코드 리뷰 문화**
- 모든 코드는 최소 1명의 리뷰 필수
- 건설적인 피드백 제공
- 코드 품질 향상에 기여

## 기술적 도전과 해결

### 1. 자료 요청 승인 시 자동 등록

**문제**
- 관리자가 자료 요청을 승인할 때, 공개 자료실에 수동으로 다시 등록해야 하는 번거로움

**해결**
- 승인 시 자동으로 공개 자료실에 등록되도록 로직 구현
- 트랜잭션 관리로 데이터 일관성 보장

```java
@Transactional
public void approveRequest(Long requestId) {
    ArchiveRequest request = findRequest(requestId);
    request.approve();
    
    // 공개 자료실에 자동 등록
    PublicArchive archive = PublicArchive.from(request);
    publicArchiveRepository.save(archive);
}
```

### 2. 파일 업로드와 자료 메타데이터 동기화

**문제**
- 파일 업로드와 자료 정보 저장이 별도로 이루어져 동기화 이슈 발생 가능

**해결**
- 트랜잭션 범위 내에서 파일 업로드와 메타데이터 저장을 함께 처리
- 실패 시 롤백으로 데이터 정합성 유지

### 3. 운영 환경 설정 관리

**문제**
- 민감한 정보(API 키, DB 비밀번호)를 안전하게 관리 필요

**해결**
- `.env` 파일을 통한 환경 변수 관리
- `.gitignore`에 추가하여 Git 커밋 방지
- EC2 서버에 환경 변수 직접 설정

## 배운 점

### 1. 실전 프로젝트 경험

**처음부터 끝까지 완성**
- 기획부터 배포까지 전 과정 경험
- 실제 사용자를 위한 서비스 개발
- 도메인 연결 및 HTTPS 설정

**실사용자 관점의 개발**
- 시니어 사용자를 고려한 UI/UX
- 접근성과 사용성 중시
- 교육 자료의 체계적 분류

### 2. 체계적인 자료 관리 시스템

**워크플로우 설계**
- 사용자 요청 → 관리자 검토 → 승인/거부
- 자동화를 통한 효율성 향상
- 권한 기반 접근 제어

**카테고리 분류**
- 실제 니즈 기반 카테고리 설정
- 확장 가능한 구조 설계

### 3. 인프라 관리 경험

**AWS 실전 활용**
- EC2, RDS, S3 통합 운영
- 도메인 연결 및 SSL 인증서 설정
- 모니터링 및 로그 관리

**안정적인 배포**
- 프로파일 기반 환경 분리
- 무중단 배포 고려
- 에러 대응 및 롤백 전략

### 4. 팀 협업의 중요성

**명확한 역할 분담**
- 각자의 전문 분야에 집중
- 효율적인 작업 분배

**소통과 조율**
- API 명세 공유 및 협의
- 정기적인 진행 상황 공유
- 통합 시 발생하는 이슈 해결

## 아쉬운 점 & 개선 방향

### 아쉬운 점

1. **테스트 코드 부족**
   - 일정 압박으로 단위 테스트 작성 미흡
   - 통합 테스트 부재

2. **검색 기능 미구현**
   - 자료 제목/내용 기반 검색 미구현
   - 태그 시스템 부재

3. **자료 버전 관리 부족**
   - 자료 수정 이력 관리 미흡
   - 이전 버전 조회 불가

### 향후 개선 방향

1. **검색 기능 강화**
   - Elasticsearch 도입 고려
   - 태그 시스템 구축
   - 전문 검색 지원

2. **통계 및 분석**
   - 자료 조회수 추적
   - 인기 자료 분석
   - 사용자 학습 패턴 분석

3. **자동화 확대**
   - 중복 자료 자동 감지
   - 자료 품질 자동 검증
   - 정기적인 자료 업데이트 알림

4. **성능 최적화**
   - Redis 캐싱 적용
   - 이미지 최적화
   - CDN 도입 검토

## 프로젝트 성과

### 정량적 성과
- **실제 서비스 배포**: mydidimdol.com 도메인으로 정식 오픈
- **풀스택 개발**: 프론트엔드-백엔드 통합 완료
- **API 구현**: 50+ REST API 엔드포인트 개발

### 정성적 성과
- **사회적 가치**: 디지털 소외계층을 위한 의미 있는 서비스
- **실전 경험**: 처음부터 끝까지 완성한 프로젝트
- **팀 협업**: 5명 팀원 간 원활한 협업
- **기술 성장**: AWS, Spring Boot, JPA, QueryDSL 실전 활용

## 프로젝트를 마치며

데브코스 과정의 마지막 프로젝트로, 그동안 배운 모든 것을 쏟아부은 의미 있는 시간이었습니다.

특히 **디지털 소외계층을 위한 서비스**라는 점에서 개발자로서 사회에 기여할 수 있다는 보람을 느꼈습니다. 단순히 기술을 구현하는 것을 넘어, 실제 사용자의 니즈를 고민하고 그들의 삶을 개선할 수 있는 서비스를 만드는 경험은 개발자로서 큰 자산이 될 것입니다.

공개 자료실과 자료 요청 시스템을 담당하면서, 사용자와 관리자 모두를 만족시킬 수 있는 **워크플로우 설계의 중요성**을 배웠습니다. 또한 실제 서비스를 배포하고 운영하면서 **인프라 관리와 모니터링**의 중요성을 체감할 수 있었습니다.

1차 프로젝트에서 시작해 4차 최종 프로젝트까지, 점진적으로 성장하며 더 복잡하고 의미 있는 프로젝트를 완성할 수 있었습니다. 이 과정에서 얻은 경험과 지식은 앞으로의 개발 여정에서 큰 밑거름이 될 것입니다.

함께 고생한 MOCI 팀원들에게 감사하며, 앞으로도 사회에 긍정적인 영향을 줄 수 있는 개발자가 되고 싶습니다.

## 링크

- [GitHub Repository](https://github.com/NewplayerKOR/WEB6_8_MOCI_BE)
- [서비스 URL](https://www.mydidimdol.com)
- [API 문서](https://api.mydidimdol.com/swagger-ui/index.html)
- [API 서버](https://api.mydidimdol.com)
