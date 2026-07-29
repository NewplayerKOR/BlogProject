import PostCard from "@/components/post/PostCard";
import type { PostSummary } from "@/types";

interface PostListProps {
  posts: PostSummary[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="flex flex-col gap-10">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
