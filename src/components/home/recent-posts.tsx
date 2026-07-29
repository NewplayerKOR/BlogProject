import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import PostCard from "@/components/post/PostCard";
import { Button } from "@/components/ui/button";
import type { PostSummary } from "@/types";

interface RecentPostsProps {
  posts: PostSummary[];
}

export function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <section className="py-20 sm:py-28">
      <div className="page-shell">
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4">
            <p className="section-kicker">Recent notes</p>
            <h2 className="section-title">최근 기록</h2>
          </div>
          <Button asChild variant="link" className="h-auto justify-start px-0">
            <Link href="/posts">
              전체 글 보기
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} compact />
            ))}
          </div>
        ) : (
          <p className="border-y border-border py-12 text-muted-foreground">
            아직 공개된 기록이 없습니다.
          </p>
        )}
      </div>
    </section>
  );
}
