---
title: "[프로그래머스 데브코스 3차 프로젝트] - Kotlin 마이그레이션으로"
date: "2025-11-09"
category: "프로젝트"
tags: ["Kotlin", "Spring Boot", "Java", "마이그레이션", "GCP", "팀장"]
description: "2차 프로젝트를 Kotlin으로 전환하며 새로운 언어와 GCP를 경험한 3차 프로젝트"
---

## 프로젝트 소개

프로그래머스 백엔드 데브코스 6기 8회차 10팀 **'텐션업'**의 3차 프로젝트로, **2차 프로젝트의 Java 코드를 Kotlin으로 전환**하는 마이그레이션 프로젝트를 진행했습니다.

- **프로젝트 기간**: 2025_08_27 - 2025_09_04(9일)
- **팀 구성**: 4명 (백엔드 중심 + 프론트엔드 공동 개발)
- **나의 역할**: 팀장, 백엔드 개발 - 첨부파일 시스템 Kotlin 전환 및 GCP 배포 담당
- **주요 변경사항**: Java → Kotlin

### 프로젝트 배경

2차 프로젝트에서 구축한 특허 거래 플랫폼을 **Kotlin**으로 전환하여 다음과 같은 목표를 달성하고자 했습니다:

1. **새로운 언어 학습**: Kotlin
2. **코드 간결성**: Kotlin의 간결한 문법으로 코드 품질 개선
3. **Null 안정성**: Kotlin의 null 안전성으로 런타임 에러 감소

## 기술 스택

### Backend
- **Language**: Kotlin (Java → Kotlin 전환)
- **Framework**: Spring Boot 3.x
- **Security**: Spring Security, JWT
- **ORM**: Spring Data JPA
- **Database**: MySQL
- **File Storage**: Google Cloud Storage (AWS S3 → GCS 전환)
- **Real-time**: WebSocket, Redis Pub/Sub
- **Deployment**: Google Cloud Platform (GCP), Docker

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Vercel (배포)

## 팀 구성 및 역할

| 팀원 | 역할 |
|------|------|
| **박태규 (나)** | **팀장, 백엔드 개발 (첨부파일 시스템, 백엔드 배포)** |
| 김윤수 | 백엔드 개발 (거래), GitHub 관리 |
| 석희성 | 백엔드 개발 (채팅), 프론트엔드 배포 |
| 임홍담 | 백엔드 개발 (회원/인증) |

**참고**: 김선우 팀원이 중도 이탈하여 4명으로 프로젝트 진행

## 담당 기능

### 1. 팀장 역할 (지속)
- 프로젝트 일정 관리 및 스프린트 운영
- 팀원 간 작업 분배 및 조율
- Kotlin 학습 지원 및 코드 리뷰

### 2. 첨부파일 시스템 Kotlin 전환

#### Java → Kotlin 마이그레이션

**Before (Java)**
```java
@Service
public class FileService {
    private final AmazonS3 s3Client;
    private final FileRepository fileRepository;
    
    public FileService(AmazonS3 s3Client, FileRepository fileRepository) {
        this.s3Client = s3Client;
        this.fileRepository = fileRepository;
    }
    
    public FileDto uploadFile(MultipartFile file, Long postId) {
        validateFile(file);
        String s3Url = uploadToS3(file);
        FileEntity fileEntity = saveFileMetadata(s3Url, postId);
        return FileDto.from(fileEntity);
    }
}
```

**After (Kotlin)**
```kotlin
@Service
class FileService(
    private val storageClient: Storage,
    private val fileRepository: FileRepository
) {
    fun uploadFile(file: MultipartFile, postId: Long): FileDto {
        validateFile(file)
        val gcsUrl = uploadToGCS(file)
        val fileEntity = saveFileMetadata(gcsUrl, postId)
        return FileDto.from(fileEntity)
    }
}
```

**주요 개선 사항**
- 생성자 주입이 더 간결해짐
- Null 안전성 강화 (Nullable 타입 명시)
- 불필요한 세미콜론 제거
- `val`/`var` 키워드로 명확한 불변성 표현

#### AWS S3 → Google Cloud Storage 전환

**변경 사항**
- AWS SDK → Google Cloud Storage Client Library
- Bucket 설정 및 권한 관리 방식 변경
- URL 생성 방식 변경 (Presigned URL → Signed URL)

**GCS 업로드 구현**
```kotlin
fun uploadToGCS(file: MultipartFile): String {
    val blobId = BlobId.of(bucketName, generateFileName(file))
    val blobInfo = BlobInfo.newBuilder(blobId)
        .setContentType(file.contentType)
        .build()
    
    storage.create(blobInfo, file.bytes)
    return generatePublicUrl(blobId)
}
```

### 3. GCP 배포

#### 배포 구성
- **Compute Engine**: Spring Boot 애플리케이션 호스팅
- **Cloud SQL**: MySQL 데이터베이스
- **Cloud Storage**: 파일 저장소
- **Cloud Memorystore**: Redis (채팅)

#### 배포 과정
1. GCP 프로젝트 생성 및 API 활성화
2. Service Account 생성 및 권한 설정
3. Cloud SQL 인스턴스 생성
4. Compute Engine VM 설정
5. Docker 이미지 빌드 및 배포
6. Nginx 리버스 프록시 설정

## 프로젝트 아키텍처

### 시스템 구성도

```
┌─────────────────┐    HTTPS     ┌─────────────────┐
│   Frontend      │ ◄──────────► │   Nginx         │
│   (Vercel)      │              │ (Reverse Proxy) │
└─────────────────┘              └─────────────────┘
                                          │
                                          ▼
              ┌───────────────────────────────────────┐
              │   Spring Boot (Kotlin) - GCP VM       │
              │  ┌──────────────────────────────┐     │
              │  │  API Gateway                 │     │
              │  └──────────────────────────────┘     │
              │            │                          │
              │  ┌─────────┴───────────────────┐     │
              │  │  Member  │ Post │ File      │     │
              │  │  Service │ Svc  │ Service   │     │
              │  └─────────┬───────────────────┘     │
              └────────────┼──────────────────────────┘
                           │
               ┌───────────┴──────────┐
               │                      │
          ┌────▼────┐           ┌────▼────┐
          │Cloud SQL│           │   GCS   │
          │ (MySQL) │           │ (Files) │
          └─────────┘           └─────────┘
               │
          ┌────▼────┐
          │  Redis  │
          │(Memstore)│
          └─────────┘
```

### 도메인 구조 (Kotlin)

```
backend/src/main/kotlin/com/tensionup/
├── domain/
│   ├── member/         # 회원 관리
│   ├── post/           # 게시판
│   ├── file/           # 첨부파일 (내가 담당)
│   ├── trade/          # 거래
│   └── chat/           # 채팅
├── global/             # 공통 설정
│   ├── config/         # GCS, Security 등
│   ├── exception/      # 예외 처리
│   └── util/           # 유틸리티
└── TensionUpApplication.kt
```

## Kotlin으로 전환하며 배운 점

### 1. Kotlin의 장점

**Null 안전성**
```kotlin
// Nullable 타입 명시
var fileName: String? = null

// Safe Call
val length = fileName?.length

// Elvis 연산자
val name = fileName ?: "default.txt"

// Null이 아님을 보장
val notNullName = fileName!!
```

**데이터 클래스**
```kotlin
// 간결한 DTO 정의
data class FileDto(
    val id: Long,
    val fileName: String,
    val fileUrl: String,
    val fileSize: Long
)

// 자동으로 equals(), hashCode(), toString() 생성
```

**확장 함수**
```kotlin
// MultipartFile 확장 함수
fun MultipartFile.validateSize(maxSize: Long) {
    if (this.size > maxSize) {
        throw IllegalArgumentException("파일 크기 초과")
    }
}

// 사용
file.validateSize(10 * 1024 * 1024) // 10MB
```

**스코프 함수**
```kotlin
// apply
val fileEntity = FileEntity().apply {
    this.fileName = file.originalFilename
    this.fileSize = file.size
    this.postId = postId
}

// let
file?.let { uploadToGCS(it) }
```

### 2. Java에서 Kotlin으로의 전환 과정

**어려웠던 점**
- 새로운 문법 학습 곡선
- Spring Boot와 Kotlin 통합 시 설정 차이
- JPA Entity에서 `open` 키워드 필요
- Java 라이브러리와의 호환성 확인

**해결 방법**
- Kotlin 공식 문서 및 레퍼런스 학습
- IntelliJ의 Java to Kotlin 자동 변환 활용
- 팀원들과 코드 리뷰를 통한 상호 학습
- Spring Boot + Kotlin 공식 가이드 참고

### 3. GCP 경험

**AWS와의 차이점**
- Service Account 기반 인증 (vs IAM)
- Cloud Storage (vs S3)
- Cloud SQL (vs RDS)
- Compute Engine (vs EC2)

**GCP의 장점**
- 통합된 콘솔 UI
- 간편한 Service Account 관리
- BigQuery 등 데이터 분석 도구 연동 가능

**어려웠던 점**
- AWS에 익숙해서 GCP 개념 이해 필요
- Signed URL 생성 방식 차이
- 권한 설정 방식 차이

## 주요 기능 (2차 프로젝트와 동일)

### 회원 관리
- 일반 회원가입 및 소셜 로그인
- JWT 기반 인증
- 마이페이지 관리

### 게시판
- 특허 게시글 CRUD
- 찜 기능
- 검색 및 필터링

### 파일 관리 (내가 담당)
- GCS 기반 파일 업로드/다운로드
- 프로필 이미지 관리
- 파일 메타데이터 관리

### 거래
- 거래 내역 관리
- 거래 상태 추적

### 채팅
- WebSocket 실시간 채팅
- Redis Pub/Sub 메시징

## 협업 방식

### GitHub 기반 협업

**워크플로우**
1. Issue 생성
2. Assignee 지정
3. 개발 시작
4. PR 생성
5. 코드 리뷰 (CodeRabbit + 팀원 1명)
6. PR 머지

**네이밍 규칙**
- Issue: `[분류] 작업 제목`
- Branch: `{분류}#{이슈 번호}`
- Commit: `{분류} : 커밋 내용`

**라벨 분류**
- `design`, `feat`, `fix`, `refactor`, `chore`

## 기술적 도전

### 1. Kotlin + JPA 설정

**문제**
- JPA Entity에서 `open` 키워드 필요
- 기본 생성자 필요

**해결**
```kotlin
// build.gradle.kts
plugins {
    kotlin("plugin.jpa") version "1.9.0"
    kotlin("plugin.allopen") version "1.9.0"
}

allOpen {
    annotation("jakarta.persistence.Entity")
    annotation("jakarta.persistence.MappedSuperclass")
}
```

### 2. GCS 인증 설정

**문제**
- Service Account JSON 키 관리
- 로컬 개발 환경과 배포 환경의 인증 차이

**해결**
- 환경 변수로 Service Account 키 경로 관리
- `GOOGLE_APPLICATION_CREDENTIALS` 환경 변수 설정

```kotlin
@Configuration
class GCSConfig {
    @Bean
    fun storage(): Storage {
        return StorageOptions.getDefaultInstance().service
    }
}
```

### 3. Nullable 타입 처리

**문제**
- Java 라이브러리와 Kotlin의 Null 안전성 충돌

**해결**
- Platform Type 이해
- `!!` 연산자보다 `?.let` 활용
- 적절한 기본값 제공

```kotlin
// Bad
val fileName = file.originalFilename!!

// Good
val fileName = file.originalFilename ?: "unknown.file"
```

## 프로젝트 성과

### 정량적 성과
- **Java → Kotlin 전환 완료**: 전체 백엔드 코드 마이그레이션
- **코드 라인 수 감소**: 약 20-30% 감소 (Kotlin의 간결성)
- **GCP 배포 완료**: 실제 서비스 배포

### 정성적 성과
- **새로운 언어 습득**: Kotlin 문법 및 특징 학습
- **클라우드 경험 확장**: AWS와 GCP 비교 경험
- **팀 리딩 지속**: 3차 연속 팀장 역할 수행
- **코드 품질 개선**: Null 안전성 및 간결성 향상

## 배운 점

### 1. 언어 마이그레이션 경험

**준비 과정**
- 새로운 언어에 대한 충분한 학습 시간 필요
- 기존 코드 구조 파악 중요
- 점진적 전환 vs 전체 전환 전략 결정

**마이그레이션 전략**
- 도메인별로 순차적 전환
- 테스트 코드 우선 작성
- 기존 API 스펙 유지

### 2. Kotlin의 실용성

**생산성 향상**
- 보일러플레이트 코드 감소
- Null 안전성으로 런타임 에러 방지
- 함수형 프로그래밍 스타일 지원

**Spring Boot와의 호환성**
- Spring Boot는 Kotlin을 First-class로 지원
- 설정 파일을 Kotlin DSL로 작성 가능
- JPA, Spring Security 등 주요 라이브러리 호환

### 3. 멀티 클라우드 이해

**AWS vs GCP**
- 각 클라우드의 철학과 강점 이해
- 서비스 간 매핑 (S3 ↔ GCS, RDS ↔ Cloud SQL)
- 벤더 종속성 최소화 설계의 중요성

**마이그레이션 포인트**
- Storage API 추상화 필요성
- 환경별 설정 분리
- 비용 최적화 고려

### 4. 팀장으로서의 지속적 성장

**3차 연속 팀장 경험**
- 익숙해진 프로세스 운영
- 팀원 변화 대응 (중도 이탈)
- 학습 곡선 관리 (새로운 언어)

## 아쉬운 점 & 개선 방향

### 아쉬운 점

1. **학습 시간 부족**
   - Kotlin 고급 기능 활용 미흡
   - Coroutine 미적용

2. **테스트 코드 미비**
   - 마이그레이션 후 테스트 보강 필요
   - Kotlin 테스트 프레임워크 미활용

3. **성능 측정 부족**
   - Java vs Kotlin 성능 비교 미실시
   - GCS vs S3 성능 비교 부족

### 향후 개선 방향

1. **Kotlin 고급 기능 활용**
   - Coroutine으로 비동기 처리
   - Flow를 활용한 리액티브 프로그래밍
   - DSL 작성

2. **테스트 강화**
   - Kotest 활용
   - MockK를 통한 모킹
   - 통합 테스트 작성

3. **성능 최적화**
   - 쿼리 최적화
   - 캐싱 전략 개선
   - 비동기 파일 업로드

## 마치며

3차 프로젝트는 2차 프로젝트의 연장선이면서도, **새로운 언어(Kotlin)**와 **새로운 클라우드(GCP)**를 경험하는 도전적인 프로젝트였습니다.

Kotlin으로 전환하면서 코드가 더 간결하고 안전해졌으며, Null 안전성 덕분에 런타임 에러를 사전에 방지할 수 있었습니다. GCP로 전환하면서 AWS만 알던 시야를 넓힐 수 있었고, 멀티 클라우드 환경에 대한 이해도를 높일 수 있었습니다.

3번 연속 팀장을 맡으면서 리더십과 프로젝트 관리 능력이 향상되었고, 팀원 중도 이탈이라는 예상치 못한 상황에서도 프로젝트를 성공적으로 완수할 수 있었습니다.

이번 경험을 통해 **새로운 기술을 빠르게 학습하고 적용하는 능력**과 **변화에 유연하게 대응하는 자세**를 배울 수 있었습니다. 앞으로도 지속적으로 새로운 기술을 탐구하고, 실전 프로젝트에 적용하는 개발자가 되고 싶습니다.

## 링크

- [GitHub Repository](https://github.com/prgrms-be-devcourse/NBE6-8-3-Team10)
- [Kotlin 공식 문서](https://kotlinlang.org/docs/home.html)
- [Spring Boot + Kotlin 가이드](https://spring.io/guides/tutorials/spring-boot-kotlin/)
