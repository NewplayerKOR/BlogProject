import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { SiGithub as GithubIcon } from "react-icons/si";

import { Separator } from "@/components/ui/separator";
import { SITE_CONFIG } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <div className="page-shell">
        <Separator />
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold tracking-[-0.025em]">
              믿고 맡길 수 있는 개발자가 되겠습니다.
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              문제를 기록하고, 다음 프로젝트에서 더 나은 선택을 확인합니다.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm font-semibold">
            <Link href="/posts" className="transition-colors hover:text-primary">
              전체 글
            </Link>
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <GithubIcon className="size-4" />
              GitHub
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          </div>
        </div>
        <p className="pb-8 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
          © {new Date().getFullYear()} {SITE_CONFIG.name}. Built as a learning
          archive.
        </p>
      </div>
    </footer>
  );
}
