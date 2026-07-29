import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PostSummary } from "@/types";

interface PostCardProps {
  post: PostSummary;
  compact?: boolean;
}

export default function PostCard({ post, compact = false }: PostCardProps) {
  const date = new Date(post.date);
  const formattedDate = Number.isNaN(date.getTime())
    ? "날짜 없음"
    : format(date, "yyyy.MM.dd", { locale: ko });

  return (
    <article
      className={cn(
        "group flex h-full flex-col border-t border-border pt-5",
        compact ? "min-h-72" : "min-h-64 sm:grid sm:grid-cols-[0.25fr_0.75fr]",
      )}
    >
      {!compact ? (
        <div className="mb-5 flex items-start justify-between gap-4 sm:mb-0 sm:flex-col sm:justify-start">
          <Badge variant="outline">{post.category}</Badge>
          <time
            dateTime={post.date}
            className="font-mono text-xs text-muted-foreground"
          >
            {formattedDate}
          </time>
        </div>
      ) : null}

      <Link
        href={`/posts/${post.slug}`}
        className="flex h-full flex-col gap-4 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring"
      >
        {post.thumbnail ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-muted">
            <Image
              src={post.thumbnail}
              alt=""
              fill
              sizes={compact ? "(min-width: 1024px) 30vw, 100vw" : "100vw"}
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        ) : null}

        {compact ? (
          <div className="flex items-center justify-between gap-4">
            <Badge variant="outline">{post.category}</Badge>
            <time
              dateTime={post.date}
              className="font-mono text-xs text-muted-foreground"
            >
              {formattedDate}
            </time>
          </div>
        ) : null}

        <div className="flex flex-1 flex-col gap-3">
          <h2
            className={cn(
              "text-balance font-bold tracking-[-0.035em] transition-colors group-hover:text-primary",
              compact ? "text-2xl" : "text-2xl sm:text-3xl",
            )}
          >
            {post.title}
          </h2>
          <p className="line-clamp-3 text-base leading-7 text-muted-foreground">
            {post.description}
          </p>

          {post.tags.length > 0 ? (
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.72rem] text-muted-foreground">
              {post.tags.slice(0, compact ? 3 : 5).map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          ) : null}

          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary">
            기록 읽기
            <ArrowUpRightIcon className="size-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}
