import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FEATURED_PROJECTS } from "@/lib/site-config";

export function FeaturedProjects() {
  return (
    <section id="featured-projects" className="scroll-mt-24 py-20 sm:py-28">
      <div className="page-shell">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4">
            <p className="section-kicker">Selected projects</p>
            <h2 className="section-title">프로젝트로 확인한 변화</h2>
          </div>
          <p className="section-copy">
            구현한 기능보다 어떤 한계를 발견했고 다음 선택을 어떻게 바꿨는지에
            초점을 맞췄습니다.
          </p>
        </div>

        <div className="flex flex-col">
          {FEATURED_PROJECTS.map((project, index) => (
            <article key={project.name}>
              {index > 0 ? <Separator /> : null}
              <div className="grid gap-8 py-12 lg:grid-cols-[0.18fr_0.62fr_1.2fr] lg:gap-10 lg:py-16">
                <p className="font-mono text-sm font-semibold text-primary">
                  {project.index}
                </p>

                <div className="flex flex-col gap-4">
                  <p className="technical-label">{project.label}</p>
                  <h3 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                    {project.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((technology) => (
                      <Badge key={technology} variant="secondary">
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid gap-7 sm:grid-cols-2">
                  <div className="flex flex-col gap-3">
                    <p className="technical-label">Problem</p>
                    <p className="text-base leading-8 text-foreground/85">
                      {project.problem}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="technical-label">Contribution</p>
                    <p className="text-base leading-8 text-foreground/85">
                      {project.contribution}
                    </p>
                    <Button
                      asChild
                      variant="link"
                      className="mt-auto h-auto justify-start px-0 py-2"
                    >
                      <Link href={project.href}>
                        상세 기록 읽기
                        <ArrowRightIcon data-icon="inline-end" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-2 flex justify-end">
          <Button asChild variant="outline" size="lg">
            <Link href="/category/projects">
              모든 프로젝트 보기
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
