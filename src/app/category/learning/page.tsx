import type { Metadata } from "next";

import { EmptyPostState } from "@/components/post/empty-post-state";
import { PostList } from "@/components/post/post-list";
import { PageIntro } from "@/components/site/page-intro";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = {
  title: "학습 기록",
  description: "백엔드 개발 과정에서 학습하고 직접 확인한 내용을 기록합니다.",
};

export default function LearningPage() {
  const posts = getPostsByCategory("학습내용");

  return (
    <div className="page-shell pb-24">
      <PageIntro
        eyebrow="Learning notes"
        title="배운 내용을 직접 확인합니다."
        description="문서를 읽는 데서 끝내지 않고 작은 구현과 테스트로 확인한 내용을 다음 개발의 기준으로 남깁니다."
        count={posts.length}
      />
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <EmptyPostState
          title="학습 기록을 정리하고 있습니다."
          description="프로젝트 안에서 확인한 내용을 우선 정리한 뒤, 반복해서 참고할 수 있는 학습 기록을 공개할 예정입니다."
        />
      )}
    </div>
  );
}
