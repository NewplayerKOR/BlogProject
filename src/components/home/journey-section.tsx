import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const MILESTONES = [
  {
    period: "University",
    title: "협업과 기록의 빈틈을 발견",
    description:
      "외부 데이터를 수집해 서비스 데이터로 연결했지만, 파일 단위 공유로 변경 이력과 개인 기여를 남기지 못했습니다.",
  },
  {
    period: "Devcourse 01–02",
    title: "Git 협업과 첫 팀 리딩",
    description:
      "주문 API를 구현하고 첫 팀장을 맡아 역할 조율, S3 파일 업로드와 백엔드 배포를 경험했습니다.",
  },
  {
    period: "Devcourse 03–04",
    title: "위기 대응과 직군 간 협업",
    description:
      "팀원 이탈에 대응하고 Kotlin·GCP를 경험했으며, 프론트엔드 협업과 AWS 배포 자동화 구축을 지원했습니다.",
  },
  {
    period: "Now",
    title: "실패 이후의 데이터까지 학습",
    description:
      "개인 프로젝트 CoffeeProd에서 주문·결제·재고의 실패 흐름과 트랜잭션 경계를 설계하고 있습니다.",
  },
] as const;

export function JourneySection() {
  return (
    <section className="bg-muted/55 py-20 sm:py-28">
      <div className="page-shell">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="flex flex-col items-start gap-5 lg:sticky lg:top-32 lg:self-start">
            <p className="section-kicker">Growth narrative</p>
            <h2 className="section-title">부족함을 다음 행동으로 바꾼 과정</h2>
            <p className="section-copy">
              한 번에 완성된 역량이 아니라 프로젝트마다 확인한 한계를 다음
              프로젝트의 목표로 삼았습니다.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-2">
              <Link href="/about">
                자기소개 전체 보기
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
          </div>

          <ol className="flex flex-col">
            {MILESTONES.map((milestone, index) => (
              <li key={milestone.period}>
                {index > 0 ? <Separator /> : null}
                <div className="grid gap-4 py-8 sm:grid-cols-[0.28fr_0.72fr] sm:gap-8 sm:py-10">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                    {milestone.period}
                  </p>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-bold tracking-[-0.035em]">
                      {milestone.title}
                    </h3>
                    <p className="text-base leading-8 text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
