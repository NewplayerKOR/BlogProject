import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { Post, PostSummary, PostCategory } from '@/types';

// 포스트 디렉토리 경로
const postsDirectory = path.join(process.cwd(), 'src/content/posts');

/**
 * 모든 포스트의 요약 정보를 가져옵니다
 */
export function getAllPosts(): PostSummary[] {
  // content/posts 폴더가 없으면 빈 배열 반환
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // 파일명에서 .md 제거하여 slug 생성
      const slug = fileName.replace(/\.md$/, '');

      // 파일 내용 읽기
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // gray-matter로 메타데이터 파싱
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        category: data.category || '학습내용',
        tags: data.tags || [],
        description: data.description || '',
        thumbnail: data.thumbnail,
      } as PostSummary;
    });

  // 날짜순으로 정렬 (최신순)
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * 특정 카테고리의 포스트만 가져옵니다
 */
export function getPostsByCategory(category: PostCategory): PostSummary[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

/**
 * 특정 slug의 포스트 전체 내용을 가져옵니다
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 메타데이터와 콘텐츠 분리
    const { data, content } = matter(fileContents);

    // 마크다운을 HTML로 변환
    // prism.js 형식의 코드 블록을 위해 클래스 추가
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      category: data.category || '학습내용',
      tags: data.tags || [],
      description: data.description || '',
      thumbnail: data.thumbnail,
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * 모든 포스트의 slug 목록을 가져옵니다 (동적 라우팅용)
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

/**
 * 특정 포스트의 이전 글과 다음 글을 가져옵니다
 */
export function getAdjacentPosts(currentSlug: string): {
  prevPost: PostSummary | null;
  nextPost: PostSummary | null;
} {
  const allPosts = getAllPosts(); // 이미 날짜순으로 정렬됨 (최신순)
  const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null };
  }

  // 최신순 정렬이므로:
  // - nextPost는 현재보다 이전 인덱스 (더 최신 글)
  // - prevPost는 현재보다 다음 인덱스 (더 오래된 글)
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return { prevPost, nextPost };
}
