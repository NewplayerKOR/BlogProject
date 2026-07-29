"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="page-shell py-24 text-center">
      <p className="section-kicker">Unexpected error</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.05em] sm:text-5xl">
        페이지를 불러오지 못했습니다.
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
        잠시 후 다시 시도해 주세요. 같은 문제가 반복되면 GitHub를 통해 알려
        주세요.
      </p>
      <Button onClick={reset} size="lg" className="mt-8">
        다시 시도
      </Button>
    </div>
  );
}
