import type { Metadata } from "next";

import { EmptyPostState } from "@/components/post/empty-post-state";
import { PostList } from "@/components/post/post-list";
import { PageIntro } from "@/components/site/page-intro";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = {
  title: "트러블슈팅",
  description: "개발 중 마주친 문제의 원인, 선택한 해결책과 검증 과정을 기록합니다.",
};

export default function TroubleshootingPage() {
  const posts = getPostsByCategory("트러블슈팅");

  return (
    <div className="page-shell pb-24">
      <PageIntro
        eyebrow="Troubleshooting"
        title="문제를 다음 기준으로 남깁니다."
        description="증상만 나열하지 않고 원인, 선택한 해결책, 검증 과정과 남은 한계를 함께 기록합니다."
        count={posts.length}
      />
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <EmptyPostState
          title="정리 중인 문제 해결 기록이 있습니다."
          description="현재는 프로젝트 회고를 먼저 공개하고 있으며, 재현과 검증을 마친 트러블슈팅부터 순서대로 추가할 예정입니다."
        />
      )}
    </div>
  );
}
