"use client";

import { useEffect } from "react";

export function CodeCopyEnhancer() {
  useEffect(() => {
    const article = document.querySelector<HTMLElement>(
      "[data-article-content]",
    );

    if (!article) {
      return;
    }

    const buttons: HTMLButtonElement[] = [];

    article.querySelectorAll<HTMLPreElement>("pre").forEach((pre) => {
      if (pre.querySelector("[data-code-copy]")) {
        return;
      }

      const code = pre.querySelector("code");
      if (!code) {
        return;
      }

      const button = document.createElement("button");
      button.type = "button";
      button.dataset.codeCopy = "true";
      button.className = "code-copy-button";
      button.textContent = "복사";
      button.setAttribute("aria-label", "코드 복사");

      const copyCode = async () => {
        await navigator.clipboard.writeText(code.textContent ?? "");
        button.textContent = "복사됨";
        window.setTimeout(() => {
          button.textContent = "복사";
        }, 1600);
      };

      button.addEventListener("click", copyCode);
      pre.prepend(button);
      buttons.push(button);
    });

    return () => {
      buttons.forEach((button) => button.remove());
    };
  }, []);

  return null;
}
