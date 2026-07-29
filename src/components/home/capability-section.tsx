import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

const CAPABILITIES = [
  {
    number: "01",
    title: "데이터 정합성을 고려한 커머스 백엔드",
    description:
      "정상 요청만 보지 않고 주문·결제·재고의 실패와 동시 요청까지 상태 전이로 나눠 설계하고 테스트합니다.",
    href: "/about#coffeeprod",
    linkLabel: "CoffeeProd에서 확인",
  },
  {
    number: "02",
    title: "사실 확인에서 시작하는 협업",
    description:
      "예상하지 못한 상황에서는 수행 가능 여부와 남은 범위를 먼저 확인하고, 팀이 대응할 수 있도록 빠르게 공유합니다.",
    href: "/posts/devcourse-team-project-third",
    linkLabel: "Kotlin 프로젝트 회고",
  },
  {
    number: "03",
    title: "배포와 운영 문제 해결 지원",
    description:
      "AWS·GCP 배포를 경험하고 Terraform과 GitHub Actions 기반 자동화 구축에 참여하며 운영 관점을 넓혔습니다.",
    href: "/posts/devcourse-team-final-project",
    linkLabel: "디딤돌 프로젝트 회고",
  },
] as const;

export function CapabilitySection() {
  return (
    <section className="bg-foreground py-20 text-background sm:py-24">
      <div className="page-shell">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
              How I work
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              경험보다 먼저 보여드릴 수 있는 일하는 기준
            </h2>
          </div>
          <p className="max-w-2xl text-pretty text-base leading-8 text-background/65 lg:justify-self-end lg:text-lg">
            회사 경험은 아직 없지만, 프로젝트에서 마주친 부족함을 다음 행동과
            검증으로 연결해 왔습니다.
          </p>
        </div>

        <ol className="grid border-y border-background/20 lg:grid-cols-3">
          {CAPABILITIES.map((capability) => (
            <li
              key={capability.number}
              className="flex min-h-80 flex-col gap-6 border-b border-background/20 py-8 lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:last-child)]:border-r"
            >
              <span className="font-mono text-sm text-primary">
                {capability.number}
              </span>
              <h3 className="text-2xl font-bold leading-snug tracking-[-0.035em]">
                {capability.title}
              </h3>
              <p className="text-base leading-8 text-background/65">
                {capability.description}
              </p>
              <Link
                href={capability.href}
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-background transition-colors hover:text-primary"
              >
                {capability.linkLabel}
                <ArrowUpRightIcon className="size-4" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
