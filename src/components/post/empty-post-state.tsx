import { NotebookPenIcon } from "lucide-react";
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

interface EmptyPostStateProps {
  title: string;
  description: string;
}

export function EmptyPostState({
  title,
  description,
}: EmptyPostStateProps) {
  return (
    <Empty className="border-y border-border py-20">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <NotebookPenIcon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild variant="outline">
          <Link href="/category/projects">프로젝트 기록 먼저 보기</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
