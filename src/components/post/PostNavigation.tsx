import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import type { PostSummary } from "@/types";

interface PostNavigationProps {
  prevPost?: PostSummary | null;
  nextPost?: PostSummary | null;
}

export default function PostNavigation({
  prevPost,
  nextPost,
}: PostNavigationProps) {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <nav aria-label="이전 글과 다음 글" className="mt-16">
      <Separator />
      <div className="grid gap-8 py-8 sm:grid-cols-2">
        <div>
          {prevPost ? (
            <Link
              href={`/posts/${prevPost.slug}`}
              className="group flex h-full flex-col gap-3 rounded-md py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <ArrowLeftIcon className="size-4" />
                이전 글
              </span>
              <span className="text-lg font-bold leading-7 tracking-[-0.025em] transition-colors group-hover:text-primary">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <p className="py-2 text-sm text-muted-foreground">
              이전 글이 없습니다.
            </p>
          )}
        </div>

        <div className="sm:text-right">
          {nextPost ? (
            <Link
              href={`/posts/${nextPost.slug}`}
              className="group flex h-full flex-col gap-3 rounded-md py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground sm:justify-end">
                다음 글
                <ArrowRightIcon className="size-4" />
              </span>
              <span className="text-lg font-bold leading-7 tracking-[-0.025em] transition-colors group-hover:text-primary">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <p className="py-2 text-sm text-muted-foreground">
              다음 글이 없습니다.
            </p>
          )}
        </div>
      </div>
    </nav>
  );
}
