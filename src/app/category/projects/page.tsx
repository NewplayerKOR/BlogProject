import type { Metadata } from "next";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import {
  ProjectCaseStudy,
  type ProjectCaseStudyData,
} from "@/components/project/project-case-study";
import { PageIntro } from "@/components/site/page-intro";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "프로젝트",
  description:
    "대학 프로젝트의 협업 한계부터 네 번의 팀 프로젝트와 개인 커머스 프로젝트까지 이어진 성장 과정을 소개합니다.",
};

const PROJECTS: ProjectCaseStudyData[] = [
  {
    index: "01",
    name: "CoffeeProd",
    summary: "주문·결제·재고의 실패 이후 상태까지 학습하는 개인 커머스 프로젝트",
    role: "개인 프로젝트",
    status: "개발 중",
    situation:
      "커머스 기능은 정상 완료뿐 아니라 결제 실패, 취소와 동시 주문에서도 금액·재고·마일리지가 일관돼야 했습니다.",
    action:
      "주문 생성과 재고·마일리지 변경의 트랜잭션 경계를 정리하고 결제 실패 보상과 조건부 재고 업데이트를 설계·테스트하고 있습니다.",
    learning:
      "화면의 완료 상태보다 도메인의 상태 전이와 실패 이후 데이터를 함께 검증해야 한다는 기준을 만들었습니다.",
    technologies: ["Spring Boot", "JPA", "RDBMS", "Transaction"],
    href: "/about#coffeeprod",
  },
  {
    index: "02",
    name: "디딤돌",
    summary: "시니어의 디지털 학습을 돕는 교육 플랫폼",
    role: "백엔드 · 배포 지원",
    status: "팀 프로젝트",
    situation:
      "프론트엔드와 자료 요청·승인 기능을 맞추는 동시에 제한된 일정의 중간 배포와 CI/CD 요구에 대응해야 했습니다.",
    action:
      "교육자료실과 KOMORAN 기반 검색을 담당하고, 배포 담당자와 Terraform 기반 AWS 환경 및 GitHub Actions 구축을 지원했습니다.",
    learning:
      "직군 간 협업에서는 API 범위와 상태를 빠르게 공유하고, 배포 후 운영 상태까지 확인해야 함을 배웠습니다.",
    technologies: ["Java", "Spring Boot", "KOMORAN", "AWS", "Terraform"],
    href: "/posts/devcourse-team-final-project",
  },
  {
    index: "03",
    name: "Kotlin 마이그레이션",
    summary: "기존 Java 프로젝트를 Kotlin과 GCP 환경으로 전환",
    role: "팀장 · 마이그레이션",
    status: "팀 프로젝트",
    situation:
      "마감 직전 팀원의 작업과 연락이 중단되어 남은 기능과 일정을 다시 정리해야 했습니다.",
    action:
      "수행 가능 여부를 확인해 팀과 교육과정 관리자에게 공유하고 작업을 재분배했으며, 파일 시스템 전환과 GCP 배포에 참여했습니다.",
    learning:
      "위기 상황에서는 빠른 사실 확인과 투명한 공유가 팀의 대응 시간을 확보한다는 점을 체감했습니다.",
    technologies: ["Kotlin", "Spring", "GCP", "Cloud SQL", "Cloud Storage"],
    href: "/posts/devcourse-team-project-third",
  },
  {
    index: "04",
    name: "특허바다",
    summary: "이미지·문서 첨부를 지원하는 무형 재산 거래 플랫폼",
    role: "팀장 · 파일 시스템",
    status: "팀 프로젝트",
    situation:
      "첫 팀장 역할에서 제한된 일정 안의 완성과 새로운 기술 학습 사이의 균형을 잡아야 했습니다.",
    action:
      "역할을 조율하고 AWS S3 기반 이미지·문서 첨부 시스템과 백엔드 배포를 담당했습니다.",
    learning:
      "리더십은 결정을 독점하는 일이 아니라 팀이 시도하고 완성할 수 있도록 우선순위를 조율하는 일임을 배웠습니다.",
    technologies: ["Java", "Spring Boot", "AWS S3", "File Upload"],
    href: "/posts/devcourse-team-project-second",
  },
  {
    index: "05",
    name: "카페 주문 시스템",
    summary: "데브코스에서 처음 구현한 주문 CRUD·REST API",
    role: "주문 기능",
    status: "팀 프로젝트",
    situation:
      "짧은 일정 안에서 주문 도메인과 요청·응답 흐름을 구현하며 Git 기반 협업을 처음 경험했습니다.",
    action:
      "주문 엔티티와 DTO, 주문서 저장, 메뉴 조회와 주문 총액 계산 흐름을 구현했습니다.",
    learning:
      "완료하지 못한 배포 과제는 이후 프로젝트에서 직접 배포를 맡아보는 다음 목표가 됐습니다.",
    technologies: ["Java", "Spring Boot", "REST API", "Git"],
    href: "/posts/devcourse-team-project_first",
  },
];

export default function ProjectsPage() {
  return (
    <div className="page-shell pb-24">
      <PageIntro
        eyebrow="Project archive"
        title="프로젝트마다 다음 목표를 만들었습니다."
        description="대학 프로젝트에서 발견한 협업의 한계를 네 번의 팀 프로젝트로 넓히고, 개인 프로젝트에서 실패와 데이터 정합성까지 깊이를 더하고 있습니다."
        count={PROJECTS.length}
      />

      <div>
        {PROJECTS.map((project, index) => (
          <ProjectCaseStudy
            key={project.name}
            project={project}
            showSeparator={index > 0}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Button asChild variant="outline" size="lg">
          <Link href="/posts">
            전체 글 보기
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
