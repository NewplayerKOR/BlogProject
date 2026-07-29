import type { Metadata } from "next";
import { ArrowUpRightIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import { SiGithub as GithubIcon } from "react-icons/si";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "소개",
  description:
    "부족함을 프로젝트의 다음 목표로 바꾸며 성장해 온 신입 백엔드 개발자 박태규의 자기소개입니다.",
};

const WORKING_PRINCIPLES = [
  {
    title: "사실을 먼저 확인합니다",
    description:
      "예상하지 못한 상황에서는 낙관적으로 기다리기보다 수행 가능 여부와 남은 범위를 먼저 확인합니다.",
  },
  {
    title: "팀이 대응할 수 있게 공유합니다",
    description:
      "문제를 혼자 붙잡기보다 현재 상태와 우선순위를 투명하게 공유해 팀의 대응 시간을 확보합니다.",
  },
  {
    title: "과정을 다음 기준으로 남깁니다",
    description:
      "문제의 원인, 선택한 해결책, 검증 과정을 기록해 다음 프로젝트의 출발점으로 삼습니다.",
  },
] as const;

const TECH_AREAS = [
  {
    area: "Java · Spring",
    purpose: "주문·결제·회원 정책을 구현한 주력 백엔드 스택",
    evidence: "CoffeeProd, 데브코스 팀 프로젝트",
  },
  {
    area: "JPA · RDBMS",
    purpose: "트랜잭션 경계와 데이터 정합성을 다룬 경험",
    evidence: "CoffeeProd 주문·재고·마일리지 흐름",
  },
  {
    area: "AWS · GCP",
    purpose: "팀 프로젝트 배포와 운영 문제 대응 경험",
    evidence: "디딤돌, Kotlin 마이그레이션",
  },
  {
    area: "Terraform · GitHub Actions",
    purpose: "인프라·배포 자동화 공동 구축에 참여",
    evidence: "디딤돌 배포 지원",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="page-shell py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="flex items-center gap-5 lg:flex-col lg:items-start">
            <Avatar className="size-24 sm:size-28">
              <AvatarImage
                src="https://pub-8645696b761c495498795a6b2b48c318.r2.dev/ProfileImage/DrawProfile.png"
                alt="박태규 프로필"
              />
              <AvatarFallback>박태규</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-bold tracking-[-0.035em]">
                {SITE_CONFIG.name}
              </p>
              <p className="font-semibold text-primary">
                {SITE_CONFIG.koreanRole}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-7">
            <p className="section-kicker">About me</p>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.2] tracking-[-0.05em] sm:text-6xl">
              부족함을 숨기기보다,
              <br />
              다음 행동으로 바꿉니다.
            </h1>
            <p className="max-w-3xl text-pretty text-lg leading-9 text-foreground/80">
              대학 졸업 작품에서 협업과 기록의 빈틈을 발견했습니다. 이후
              프로그래머스 백엔드 데브코스의 네 번의 팀 프로젝트에서 Git 협업,
              API 구현, 팀 리딩, 클라우드 배포를 경험했고, 지금은 개인
              프로젝트로 실패 이후의 데이터까지 학습하고 있습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/55 py-20 sm:py-28">
        <div className="page-shell grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="flex flex-col gap-4">
            <p className="section-kicker">Why backend</p>
            <h2 className="section-title">결과보다 과정을 설명할 기록이 없었습니다.</h2>
          </div>
          <div className="flex flex-col gap-6 text-lg leading-9 text-foreground/80">
            <p>
              대학에서는 공공데이터와 지도 기반 데이터를 수집·가공해 MariaDB로
              연결했습니다. 처음으로 개발다운 몰입을 느꼈지만 Git 없이 파일을
              공유해 변경 이력과 개인 기여를 충분히 남기지 못했습니다.
            </p>
            <p>
              졸업 후 포트폴리오를 쓰려다 그 한계를 다시 마주했습니다. 이를
              막연한 불안으로 남겨두지 않고 백엔드 교육과정에 참여해 팀 프로젝트를
              반복하며 경험과 기록 방식을 함께 바꿨습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell py-20 sm:py-28">
        <div className="mb-12 flex flex-col gap-4">
          <p className="section-kicker">Working principles</p>
          <h2 className="section-title">프로젝트에서 만든 세 가지 기준</h2>
        </div>
        <ol className="grid border-y border-border lg:grid-cols-3">
          {WORKING_PRINCIPLES.map((principle, index) => (
            <li
              key={principle.title}
              className="flex min-h-72 flex-col gap-6 border-b border-border py-8 lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:last-child)]:border-r"
            >
              <span className="font-mono text-sm text-primary">
                0{index + 1}
              </span>
              <h3 className="text-2xl font-bold tracking-[-0.035em]">
                {principle.title}
              </h3>
              <p className="text-base leading-8 text-muted-foreground">
                {principle.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-foreground py-20 text-background sm:py-28">
        <div className="page-shell grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
              Technology with evidence
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-[-0.04em] sm:text-5xl">
              기술 이름보다 사용한 목적을 설명합니다.
            </h2>
          </div>

          <div className="flex flex-col">
            {TECH_AREAS.map((item, index) => (
              <div key={item.area}>
                {index > 0 ? (
                  <Separator className="bg-background/20" />
                ) : null}
                <div className="grid gap-4 py-7 sm:grid-cols-[0.35fr_0.65fr] sm:gap-8">
                  <h3 className="text-lg font-bold">{item.area}</h3>
                  <div className="flex flex-col gap-2">
                    <p className="leading-7 text-background/80">
                      {item.purpose}
                    </p>
                    <p className="font-mono text-xs leading-6 text-background/50">
                      {item.evidence}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="coffeeprod" className="page-shell scroll-mt-24 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="flex flex-col items-start gap-5">
            <Badge variant="outline">현재 개발 중</Badge>
            <h2 className="section-title">CoffeeProd</h2>
            <p className="section-copy">
              교육에서 충분히 깊게 다루지 못했던 커머스의 실패 흐름을 개인
              프로젝트에서 직접 설계하고 있습니다.
            </p>
          </div>

          <div className="flex flex-col gap-7">
            {[
              "주문 생성·재고 차감·마일리지 차감의 트랜잭션 경계",
              "결제 실패 시 보상 흐름과 회원 상태별 정책",
              "조건부 업데이트를 통한 동시 주문 상황 검토",
              "문제 원인과 검증 과정을 다음 개발 기준으로 기록",
            ].map((item) => (
              <div key={item} className="flex items-start gap-4">
                <CheckIcon className="mt-1 size-5 shrink-0 text-primary" />
                <p className="text-lg leading-8 text-foreground/85">{item}</p>
              </div>
            ))}

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a
                  href={SITE_CONFIG.github}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <GithubIcon data-icon="inline-start" />
                  GitHub 프로필 보기
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/category/projects">팀 프로젝트 기록 보기</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
