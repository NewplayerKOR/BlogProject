import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { GrowthMap } from "@/components/home/growth-map";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { JOURNEY, SITE_CONFIG } from "@/lib/site-config";

export function HeroSection() {
  return (
    <section className="page-shell py-10 sm:py-14 lg:py-[5.5rem]">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] lg:gap-10 xl:gap-12">
        <div className="flex min-w-0 flex-col items-start">
          <div className="mb-10 flex flex-col gap-1 sm:mb-16">
            <p className="text-[1.7rem] font-bold tracking-[-0.025em]">
              {SITE_CONFIG.name}
            </p>
            <p className="text-2xl font-semibold text-primary">
              {SITE_CONFIG.koreanRole}
            </p>
          </div>

          <h1 className="max-w-3xl text-balance text-[2.65rem] font-extrabold leading-[1.2] tracking-[-0.075em] sm:text-6xl sm:leading-[1.18] lg:text-[3.35rem]">
            <span className="block lg:whitespace-nowrap">
              부족함을 발견하면,
            </span>
            <span className="block lg:whitespace-nowrap">
              다음 프로젝트에서 직접 확인합니다.
            </span>
          </h1>

          <div className="my-8 w-16 sm:my-10">
            <Separator variant="accent" />
          </div>

          <p className="max-w-2xl text-pretty text-[1.05rem] leading-8 text-foreground/85 sm:text-xl sm:leading-10">
            대학 프로젝트에서 협업과 기록의 한계를 느낀 뒤, 네 번의 팀
            프로젝트로 백엔드 경험을 넓혔습니다. 지금은 개인 프로젝트로
            주문·결제·재고의 실패 흐름과 데이터 정합성을 학습하고 있습니다.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Button
              asChild
              size="lg"
              className="h-12 px-6 text-lg sm:h-14 sm:px-8"
            >
              <Link href="#featured-projects">
                대표 프로젝트 보기
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
            <Button
              asChild
              variant="link"
              size="lg"
              className="h-12 justify-start px-0 text-lg sm:h-14 sm:px-2"
            >
              <Link href="/about">
                성장 과정 읽기
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="lg:-mt-4">
          <GrowthMap />
        </div>
      </div>

      <Separator className="mt-10 lg:mt-12" />
      <ol className="grid gap-0 md:grid-cols-3">
        {JOURNEY.map((item) => (
          <li
            key={item.number}
            className="flex flex-col gap-4 border-b border-border py-8 md:border-b-0 md:px-8 md:first:pl-2 md:last:pr-2 md:[&:not(:last-child)]:border-r"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-2xl font-semibold text-primary">
                {item.number}
              </span>
              <Separator className="w-10" />
            </div>
            <h2 className="text-2xl font-bold tracking-[-0.03em] sm:text-[1.65rem]">
              {item.title}
            </h2>
            <p className="text-base leading-8 text-muted-foreground">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
