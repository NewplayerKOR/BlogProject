import type { Metadata } from "next";

import { EmptyPostState } from "@/components/post/empty-post-state";
import { PostList } from "@/components/post/post-list";
import { PageIntro } from "@/components/site/page-intro";
import { Separator } from "@/components/ui/separator";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "전체 글",
  description: "프로젝트, 트러블슈팅과 학습 기록 전체를 확인합니다.",
};

export default function AllPostsPage() {
  const posts = getAllPosts();
  const groupedPosts = posts.reduce((groups, post) => {
    const group = groups.get(post.category) ?? [];
    group.push(post);
    groups.set(post.category, group);
    return groups;
  }, new Map<string, typeof posts>());

  return (
    <div className="page-shell pb-24">
      <PageIntro
        eyebrow="Writing archive"
        title="개발 과정을 기록합니다."
        description="프로젝트에서 내린 선택과 배운 점을 공개하고, 다음 개발에서 다시 참고할 수 있는 기록으로 남깁니다."
        count={posts.length}
      />

      {posts.length > 0 ? (
        <div className="flex flex-col gap-16">
          {Array.from(groupedPosts.entries()).map(
            ([category, categoryPosts], index) => (
              <section key={category}>
                {index > 0 ? <Separator className="mb-14" /> : null}
                <div className="grid gap-8 lg:grid-cols-[0.28fr_0.72fr] lg:gap-14">
                  <div>
                    <h2 className="text-2xl font-bold tracking-[-0.035em]">
                      {category}
                    </h2>
                    <p className="mt-2 font-mono text-xs text-muted-foreground">
                      {String(categoryPosts.length).padStart(2, "0")} notes
                    </p>
                  </div>
                  <PostList posts={categoryPosts} />
                </div>
              </section>
            ),
          )}
        </div>
      ) : (
        <EmptyPostState
          title="아직 공개된 글이 없습니다."
          description="검증을 마친 프로젝트와 문제 해결 기록부터 차례로 공개할 예정입니다."
        />
      )}
    </div>
  );
}
