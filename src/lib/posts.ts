import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import type { Post, PostSummary, PostCategory } from '@/types';

// 포스트 디렉토리 경로
const postsDirectory = path.join(process.cwd(), 'src/content/posts');

/**
 * 모든 포스트의 요약 정보를 가져옵니다 (하위 폴더 포함)
 */
export function getAllPosts(): PostSummary[] {
  // content/posts 폴더가 없으면 빈 배열 반환
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const allPostsData: PostSummary[] = [];

  // 재귀적으로 모든 하위 폴더 탐색
  function readDirectory(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // 디렉토리면 재귀 호출
        readDirectory(fullPath);
      } else if (entry.name.endsWith('.md')) {
        // .md 파일이면 처리
        const slug = entry.name.replace(/\.md$/, '');
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // gray-matter로 메타데이터 파싱
        const { data } = matter(fileContents);

        allPostsData.push({
          slug,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          category: data.category || '학습내용',
          tags: data.tags || [],
          description: data.description || '',
          thumbnail: data.thumbnail,
        });
      }
    }
  }

  readDirectory(postsDirectory);

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
 * 특정 slug의 포스트 전체 내용을 가져옵니다 (하위 폴더 포함)
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // 모든 하위 폴더에서 파일 찾기
    function findFile(dir: string): string | null {
      if (!fs.existsSync(dir)) {
        return null;
      }

      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          const found = findFile(fullPath);
          if (found) return found;
        } else if (entry.name === `${slug}.md`) {
          return fullPath;
        }
      }

      return null;
    }

    const fullPath = findFile(postsDirectory);
    
    if (!fullPath) {
      console.error(`Post not found: ${slug}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 메타데이터와 콘텐츠 분리
    const { data, content } = matter(fileContents);

    // 마크다운을 HTML로 변환
    // remarkGfm: GitHub Flavored Markdown 지원 (테이블, 취소선 등)
    const processedContent = await remark()
      .use(remarkGfm)
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

  const slugs: string[] = [];

  function readDirectory(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        readDirectory(fullPath);
      } else if (entry.name.endsWith('.md')) {
        slugs.push(entry.name.replace(/\.md$/, ''));
      }
    }
  }

  readDirectory(postsDirectory);

  return slugs;
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
