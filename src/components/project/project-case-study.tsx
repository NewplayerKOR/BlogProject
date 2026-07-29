import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface ProjectCaseStudyData {
  index: string;
  name: string;
  summary: string;
  role: string;
  status: string;
  situation: string;
  action: string;
  learning: string;
  technologies: string[];
  href: string;
}

interface ProjectCaseStudyProps {
  project: ProjectCaseStudyData;
  showSeparator?: boolean;
}

export function ProjectCaseStudy({
  project,
  showSeparator = true,
}: ProjectCaseStudyProps) {
  return (
    <article>
      {showSeparator ? <Separator /> : null}
      <div className="grid gap-8 py-12 lg:grid-cols-[0.18fr_0.52fr_1.3fr] lg:gap-10 lg:py-16">
        <p className="font-mono text-sm font-semibold text-primary">
          {project.index}
        </p>

        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{project.status}</Badge>
            <Badge variant="secondary">{project.role}</Badge>
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
            {project.name}
          </h2>
          <p className="text-base leading-7 text-muted-foreground">
            {project.summary}
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.7rem] text-muted-foreground">
            {project.technologies.map((technology) => (
              <span key={technology}>#{technology}</span>
            ))}
          </div>
        </div>

        <div className="grid gap-7 sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <p className="technical-label">Situation</p>
            <p className="text-sm leading-7 text-foreground/85 sm:text-base">
              {project.situation}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="technical-label">Action</p>
            <p className="text-sm leading-7 text-foreground/85 sm:text-base">
              {project.action}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="technical-label">Learning</p>
            <p className="text-sm leading-7 text-foreground/85 sm:text-base">
              {project.learning}
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
  );
}
