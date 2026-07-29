import {
  BookOpenTextIcon,
  CoffeeIcon,
  UsersRoundIcon,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GROWTH_STAGES } from "@/lib/site-config";

const STAGE_ICONS: LucideIcon[] = [
  BookOpenTextIcon,
  UsersRoundIcon,
  CoffeeIcon,
];

export function GrowthMap() {
  return (
    <div className="border border-foreground/70 bg-card p-5 sm:p-8 lg:p-12">
      <div className="mb-10 flex flex-col gap-1 lg:mb-12">
        <p className="font-mono text-base font-semibold uppercase tracking-[0.08em]">
          Project Growth Map
        </p>
        <p className="technical-label">Learning through projects</p>
      </div>

      <ol className="mx-auto flex max-w-md flex-col">
        {GROWTH_STAGES.map((stage, index) => {
          const Icon = STAGE_ICONS[index];

          return (
            <li key={stage.title}>
              <div className="grid grid-cols-[4.5rem_1fr] items-center gap-5 sm:grid-cols-[6rem_1fr] sm:gap-7">
                <div className="flex size-[4.5rem] items-center justify-center rounded-full border border-foreground/75 sm:size-24">
                  <Icon className="size-8 stroke-[1.35] sm:size-9" />
                </div>
                <div className="flex flex-col gap-2">
                  <Badge variant="outline">{stage.label}</Badge>
                  <div>
                    <h2 className="text-xl font-bold tracking-[-0.025em] sm:text-2xl">
                      {stage.title}
                    </h2>
                    <p className="mt-1 text-base leading-7 text-muted-foreground sm:text-lg">
                      {stage.detail}
                    </p>
                  </div>
                </div>
              </div>

              {index < GROWTH_STAGES.length - 1 ? (
                <div className="ml-[2.2rem] flex h-10 justify-center sm:ml-12 sm:h-[4.5rem]">
                  <Separator orientation="vertical" />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
