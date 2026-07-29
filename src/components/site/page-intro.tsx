import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  count?: number;
}

export function PageIntro({
  eyebrow,
  title,
  description,
  count,
}: PageIntroProps) {
  return (
    <header className="pb-12 pt-14 sm:pb-16 sm:pt-20">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div className="flex flex-col gap-4">
          <p className="section-kicker">{eyebrow}</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-[-0.05em] sm:text-6xl">
            {title}
          </h1>
        </div>
        <div className="flex flex-col items-start gap-5 lg:items-end">
          <p className="max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg lg:text-right">
            {description}
          </p>
          {typeof count === "number" ? (
            <Badge variant="outline">총 {count}개의 기록</Badge>
          ) : null}
        </div>
      </div>
      <Separator className="mt-12 sm:mt-16" />
    </header>
  );
}
