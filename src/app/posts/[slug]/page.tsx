import type { Metadata } from "next";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CodeCopyEnhancer } from "@/components/post/code-copy-enhancer";
import PostNavigation from "@/components/post/PostNavigation";
import TableOfContents from "@/components/post/TableOfContents";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  getAdjacentPosts,
  getAllPostSlugs,
  getPostBySlug,
} from "@/lib/posts";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "글을 찾을 수 없습니다",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { prevPost, nextPost } = getAdjacentPosts(slug);
  const date = new Date(post.date);
  const formattedDate = Number.isNaN(date.getTime())
    ? "날짜 없음"
    : format(date, "yyyy년 MM월 dd일", { locale: ko });

  return (
    <div className="page-shell py-10 sm:py-14">
      <Breadcrumb className="mb-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">홈</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/posts">전체 글</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{post.category}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-12 xl:grid-cols-[minmax(0,48rem)_16rem] xl:justify-center xl:gap-20">
        <article className="min-w-0">
          <header className="mb-10 sm:mb-14">
            <Badge variant="outline">{post.category}</Badge>
            <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.18] tracking-[-0.05em] sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              {post.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
              <time dateTime={post.date}>{formattedDate}</time>
              {post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs">
                  {post.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              ) : null}
            </div>
            <Separator className="mt-9" />
          </header>

          <TableOfContents variant="mobile" />

          <div
            data-article-content
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <CodeCopyEnhancer />

          {post.tags.length > 0 ? (
            <footer className="mt-14">
              <Separator className="mb-7" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </footer>
          ) : null}

          <PostNavigation prevPost={prevPost} nextPost={nextPost} />
        </article>

        <aside className="hidden xl:block">
          <TableOfContents variant="desktop" />
        </aside>
      </div>
    </div>
  );
}
