"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiGithub as GithubIcon } from "react-icons/si";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/site-config";

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="page-shell flex h-[4.75rem] items-center justify-between gap-6">
        <Link
          href="/"
          className="shrink-0 text-[0.95rem] font-bold tracking-[-0.025em] text-foreground sm:text-[1.35rem]"
          aria-label="박태규 포트폴리오 홈"
        >
          {SITE_CONFIG.name}
          <span className="mx-2 text-muted-foreground" aria-hidden="true">
            /
          </span>
          <span className="font-semibold">{SITE_CONFIG.role}</span>
        </Link>

        <nav aria-label="주요 메뉴" className="hidden items-center gap-10 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isCurrentPath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "border-b-2 border-transparent py-2 text-[1.05rem] font-semibold transition-colors hover:text-primary",
                  active && "border-primary text-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex"
              >
                <a
                  href={SITE_CONFIG.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="박태규 GitHub 새 탭에서 열기"
                >
                  <GithubIcon className="size-5" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">GitHub</TooltipContent>
          </Tooltip>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="메뉴 열기"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm">
              <SheetHeader className="border-b border-border px-6 py-6">
                <SheetTitle>메뉴</SheetTitle>
                <SheetDescription>
                  프로젝트와 문제 해결 기록을 살펴보세요.
                </SheetDescription>
              </SheetHeader>

              <nav
                aria-label="모바일 주요 메뉴"
                className="flex flex-col gap-1 px-4 py-5"
              >
                {NAV_ITEMS.map((item) => {
                  const active = isCurrentPath(pathname, item.href);

                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-12 items-center border-l-2 border-transparent px-4 text-base font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                          active &&
                            "border-primary bg-accent text-accent-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>

              <div className="mt-auto border-t border-border p-4">
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a
                    href={SITE_CONFIG.github}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <GithubIcon data-icon="inline-start" />
                    GitHub에서 코드 보기
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
