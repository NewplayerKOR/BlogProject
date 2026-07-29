"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant = "default",
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  variant?: "default" | "accent"
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal"
          ? variant === "accent"
            ? "h-1 w-full bg-primary"
            : "h-px w-full"
          : variant === "accent"
            ? "w-1 self-stretch bg-primary"
            : "w-px self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
