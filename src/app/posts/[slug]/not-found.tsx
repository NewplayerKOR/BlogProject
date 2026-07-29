import { FileQuestionIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function NotFound() {
  return (
    <div className="page-shell py-24">
      <Empty className="border-y border-border py-20">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileQuestionIcon />
          </EmptyMedia>
          <EmptyTitle>글을 찾을 수 없습니다.</EmptyTitle>
          <EmptyDescription>
            요청한 글이 없거나 주소가 변경됐습니다.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/posts">전체 글로 돌아가기</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
