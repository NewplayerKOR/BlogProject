export const SITE_CONFIG = {
  name: "박태규",
  role: "Backend Developer",
  koreanRole: "신입 백엔드 개발자",
  github: "https://github.com/NewplayerKOR",
  description:
    "대학 프로젝트에서 발견한 협업의 한계를 네 번의 팀 프로젝트와 개인 커머스 프로젝트에서 직접 확인하며 성장하는 백엔드 개발자 박태규의 포트폴리오입니다.",
} as const;

export const NAV_ITEMS = [
  { label: "소개", href: "/about" },
  { label: "프로젝트", href: "/category/projects" },
  { label: "트러블슈팅", href: "/category/troubleshooting" },
  { label: "학습 기록", href: "/category/learning" },
  { label: "전체 글", href: "/posts" },
] as const;

export const GROWTH_STAGES = [
  {
    label: "발견",
    title: "대학 졸업 작품",
    detail: "협업과 기록의 한계 인식",
  },
  {
    label: "경험",
    title: "데브코스 팀 프로젝트 × 4",
    detail: "API · Git · 팀 리딩 · 배포 협업",
  },
  {
    label: "확장",
    title: "CoffeeProd 개인 프로젝트",
    detail: "실패 흐름 · 트랜잭션 · 데이터 정합성 학습",
  },
] as const;

export const JOURNEY = [
  {
    number: "01",
    title: "협업의 한계를 발견하다",
    description:
      "Git 없이 파일을 공유했던 대학 프로젝트에서 기록과 협업 도구의 필요성을 배웠습니다.",
  },
  {
    number: "02",
    title: "네 번의 팀 프로젝트로 넓히다",
    description:
      "API 구현, 팀 리딩, Git 협업과 클라우드 배포 지원을 경험하며 백엔드의 기본을 익혔습니다.",
  },
  {
    number: "03",
    title: "개인 프로젝트로 깊이를 더하다",
    description:
      "CoffeeProd에서 주문·결제·재고의 실패 흐름을 설계하고 데이터 정합성을 테스트하고 있습니다.",
  },
] as const;

export const FEATURED_PROJECTS = [
  {
    index: "01",
    name: "CoffeeProd",
    label: "개인 커머스 프로젝트",
    problem:
      "주문·결제·취소 과정에서 금액, 재고, 마일리지가 실패 이후에도 일관돼야 했습니다.",
    contribution:
      "주문 생성과 재고·마일리지 변경 흐름을 묶고, 결제 실패 보상과 동시 주문 상황을 분리해 설계하고 테스트하고 있습니다.",
    stack: ["Spring Boot", "JPA", "Transaction", "RDBMS"],
    href: "/about#coffeeprod",
  },
  {
    index: "02",
    name: "디딤돌",
    label: "시니어 디지털 교육 플랫폼",
    problem:
      "프론트엔드 협업과 자료 요청·승인 흐름을 구현하면서 제한된 일정의 배포 요구에도 대응해야 했습니다.",
    contribution:
      "교육자료실과 KOMORAN 기반 검색을 담당하고, Terraform 기반 AWS 환경과 GitHub Actions 구축을 지원했습니다.",
    stack: ["Java", "Spring Boot", "KOMORAN", "AWS"],
    href: "/posts/devcourse-team-final-project",
  },
  {
    index: "03",
    name: "Kotlin 마이그레이션",
    label: "팀 프로젝트 · 팀장",
    problem:
      "마감 국면에 팀원의 작업과 연락이 중단된 상황에서 남은 범위와 일정을 다시 정리해야 했습니다.",
    contribution:
      "수행 가능 여부를 확인해 상황을 공유하고 작업을 재분배했으며, 파일 시스템 마이그레이션과 GCP 배포에 참여했습니다.",
    stack: ["Kotlin", "Spring", "GCP", "Cloud SQL"],
    href: "/posts/devcourse-team-project-third",
  },
] as const;

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
