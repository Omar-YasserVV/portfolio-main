"use client";

import { useEffect } from "react";

export function SyntaxHighlighter() {
  useEffect(() => {
    const highlightCode = () => {
      const codeBlocks = document.querySelectorAll("pre code");

      codeBlocks.forEach((block) => {
        if (block.dataset.highlighted === "true") return;
        if (block.innerHTML.includes("<span")) return; // Skip if already has spans

        const code = block.textContent || "";

        // Only highlight if it's simple code without HTML
        if (code.includes("<") || code.includes("&lt;")) return;

        // Enhanced colorful highlighting
        let highlighted = code
          // Strings first (green)
          .replace(
            /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g,
            '<span style="color: #10b981; font-weight: 500;">$1$2$1</span>'
          )
          // Comments (gray italic)
          .replace(
            /(\/\/.*$)/gm,
            '<span style="color: #6b7280; font-style: italic;">$1</span>'
          )
          .replace(
            /(\/\*[\s\S]*?\*\/)/g,
            '<span style="color: #6b7280; font-style: italic;">$1</span>'
          )
          // Keywords (purple bold)
          .replace(
            /\b(console|const|let|var|function|return|if|else|for|while|class|import|export|from|default|async|await|try|catch|finally|throw|new|this|super|extends|implements|interface|type|enum|namespace|module|declare|public|private|protected|static|readonly|abstract|override|get|set|constructor|destructor|virtual|final|sealed|true|false|null|undefined)\b/g,
            '<span style="color: #8b5cf6; font-weight: 700;">$1</span>'
          )
          // Numbers (orange)
          .replace(
            /\b(\d+\.?\d*)\b/g,
            '<span style="color: #f59e0b; font-weight: 600;">$1</span>'
          )
          // Functions (cyan)
          .replace(
            /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
            '<span style="color: #06b6d4; font-weight: 600;">$1</span>'
          )
          // Operators (yellow)
          .replace(
            /([+\-*/%=<>!&|^~?:;,\.\[\]{}()])/g,
            '<span style="color: #eab308; font-weight: 600;">$1</span>'
          )
          // Properties (light blue)
          .replace(
            /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=:)/g,
            '<span style="color: #3b82f6; font-weight: 500;">$1</span>'
          );

        // Only apply if we actually made changes
        if (highlighted !== code) {
          block.innerHTML = highlighted;
          block.dataset.highlighted = "true";
        }
      });
    };

    const timer = setTimeout(highlightCode, 500);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
