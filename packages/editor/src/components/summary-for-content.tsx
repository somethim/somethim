"use client";

import { cn, type ClassList } from "@zenncore/utils";
import { processEditorHtml } from "../utils/render-html";

type StyleList<Keys extends string> = Partial<Record<Keys, React.CSSProperties>>;

export namespace SummaryForContent {
  export type ClassListKey = "root" | "heading" | `${HeadingLevel}`;
  export type Props = {
    content: string;
    className?: string;
    classList?: ClassList<ClassListKey>;
    styleList?: StyleList<ClassListKey>;
  };
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingEntry = { id: string; text: string; level: HeadingLevel };

const extractHeadings = (html: string): HeadingEntry[] => {
  const processed = processEditorHtml(html);
  const regex = /<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi;
  const entries: HeadingEntry[] = [];
  let match = regex.exec(processed);
  while (match !== null) {
    const level = match[1] ?? "";
    const attrs = match[2] ?? "";
    const inner = match[3] ?? "";
    const idMatch = attrs.match(/\bid="([^"]*)"/);
    const id = idMatch?.[1] ?? `heading-${entries.length}`;
    const text = inner.replace(/<[^>]+>/g, "").trim() || "(Untitled)";
    entries.push({
      id,
      text,
      level: Number.parseInt(level, 10) as HeadingLevel,
    });
    match = regex.exec(processed);
  }
  return entries;
};

const h: Record<HeadingLevel, string> = {
  1: "pl-0 font-medium text-foreground-rich",
  2: "pl-3 text-foreground-dimmed",
  3: "pl-6 text-muted-foreground text-xs",
  4: "pl-9 text-muted-foreground text-xs",
  5: "pl-12 text-muted-foreground text-xs",
  6: "pl-12 text-muted-foreground text-xs",
};

export const SummaryForContent = ({
  content,
  className,
  classList,
  styleList,
}: SummaryForContent.Props): React.JSX.Element => {
  const headings = extractHeadings(content);

  return (
    <aside
      className={cn("flex w-56 flex-col", classList?.root, className)}
      style={styleList?.root}
    >
      <p
        className={cn(
          "font-semibold text-primary-rich text-sm uppercase tracking-wider",
          classList?.heading,
        )}
        style={styleList?.heading}
      >
        Contents
      </p>
      <nav className="mt-3 flex flex-col gap-1" aria-label="Document outline">
        {headings.map((entry) => (
          <a
            key={entry.id}
            href={`#${entry.id}`}
            className={cn(
              "cursor-pointer text-left text-sm transition-colors hover:text-foreground",
              h[entry.level],
              classList?.heading,
            )}
            style={styleList?.[entry.level]}
          >
            {entry.text}
          </a>
        ))}
      </nav>
    </aside>
  );
};
