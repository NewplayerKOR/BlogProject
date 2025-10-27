/**
 * 블로그 포스트의 카테고리
 * - 학습내용: 새로 배운 기술이나 개념
 * - 트러블슈팅: 문제 해결 과정
 * - 프로젝트: 진행한 프로젝트
 */
export type PostCategory = '학습내용' | '트러블슈팅' | '프로젝트';

/**
 * 블로그 포스트 메타데이터
 */
export interface PostMetadata {
  title: string;
  date: string;
  category: PostCategory;
  tags: string[];
  description: string;
  thumbnail?: string;
}

/**
 * 블로그 포스트 전체 데이터
 */
export interface Post extends PostMetadata {
  slug: string;
  content: string;
}

/**
 * 포스트 목록용 간단한 데이터
 */
export interface PostSummary {
  slug: string;
  title: string;
  date: string;
  category: PostCategory;
  tags: string[];
  description: string;
  thumbnail?: string;
}
