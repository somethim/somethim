"use client";

import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { cn } from "@zenncore/utils";

export namespace Summary {
  export type Props = {
    editor: Editor | null;
    className?: string;
  };
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingEntry = { text: string; pos: number; level: HeadingLevel };

const collectHeaders = (editor: Editor | null): HeadingEntry[] => {
  if (!editor?.state.doc) return [];

  const entries: HeadingEntry[] = [];

  editor.state.doc.descendants((node, pos) => {
    if (node.type.name !== "heading") return;
    const level = (node.attrs as { level?: number }).level;
    if (level == null || level < 1 || level > 6) return;
    entries.push({
      text: node.textContent.trim() || "(Untitled)",
      pos,
      level: level as HeadingLevel,
    });
  });

  return entries;
};

const classList: Record<HeadingLevel, string> = {
  1: "pl-0 font-medium text-foreground-rich",
  2: "pl-3 text-foreground-dimmed",
  3: "pl-6 text-muted-foreground text-xs",
  4: "pl-9 text-muted-foreground text-xs",
  5: "pl-12 text-muted-foreground text-xs",
  6: "pl-12 text-muted-foreground text-xs",
};

export const Summary = ({
  editor,
  className,
}: Summary.Props): React.JSX.Element => {
  const headings = useEditorState({
    editor,
    selector: ({ editor }) => collectHeaders(editor),
  });

  return (
    <aside className={cn("flex w-56 flex-col", className)}>
      <p className="font-semibold text-primary-rich text-sm uppercase tracking-wider">
        Contents
      </p>
      <nav className="mt-3 flex flex-col gap-1" aria-label="Document outline">
        {headings?.map((entry) => (
          <button
            key={entry.pos}
            type="button"
            className={cn(
              "cursor-pointer text-left text-sm transition-colors hover:text-foreground",
              classList[entry.level],
            )}
            onClick={() => {
              editor?.commands.setTextSelection(entry.pos);
              editor?.commands.scrollIntoView();
            }}
          >
            {entry.text}
          </button>
        ))}
      </nav>
    </aside>
  );
};
