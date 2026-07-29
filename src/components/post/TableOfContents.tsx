"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  variant: "mobile" | "desktop";
}

export default function TableOfContents({ variant }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-article-content] h2, [data-article-content] h3",
      ),
    );

    const nextHeadings = elements
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        text: element.textContent?.trim() ?? "",
        level: Number(element.tagName.slice(1)),
      }));

    const initialStateFrame = window.requestAnimationFrame(() => {
      setHeadings(nextHeadings);
      setActiveId(nextHeadings[0]?.id ?? "");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeading = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visibleHeading?.target.id) {
          setActiveId(visibleHeading.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -70% 0px",
        threshold: [0, 1],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => {
      window.cancelAnimationFrame(initialStateFrame);
      observer.disconnect();
    };
  }, []);

  if (headings.length === 0) {
    return null;
  }

  const list = (
    <ol className="flex flex-col gap-1.5">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            aria-current={activeId === heading.id ? "location" : undefined}
            className={cn(
              "block border-l-2 border-border py-1.5 pr-2 text-sm leading-6 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground",
              heading.level === 3 ? "pl-6" : "pl-3",
              activeId === heading.id &&
                "border-primary font-semibold text-primary",
            )}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );

  if (variant === "mobile") {
    return (
      <details className="mb-10 border-y border-border py-4 xl:hidden">
        <summary className="cursor-pointer font-semibold">이 글의 목차</summary>
        <nav aria-label="글 목차" className="mt-4">
          {list}
        </nav>
      </details>
    );
  }

  return (
    <nav
      aria-label="글 목차"
      className="sticky top-28 hidden max-h-[calc(100svh-9rem)] overflow-y-auto xl:block"
    >
      <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.13em] text-foreground">
        On this page
      </p>
      {list}
    </nav>
  );
}
