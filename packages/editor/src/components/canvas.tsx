"use client";

import { EditorContent } from "@tiptap/react";
import { type ClassList, cn } from "@zenncore/utils";
import type { JSX } from "react";
import { useEditorContext } from "../context/editor-context";
import { Summary } from "./summary";

export const EditorCanvas = ({
  children,
  ...props
}: EditorCanvas.Props): JSX.Element | null => {
  const editor = useEditorContext();
  const { classList } = props;

  if (!editor) return null;

  return (
    <div className="relative min-h-0 flex-1 px-4">
      <div className="relative mx-auto h-full max-w-4xl">
        <EditorContent
          editor={editor}
          className={cn(
            "relative mb-20 min-h-[calc(100dvh+12rem)]",
            classList?.content,
          )}
        >
          {children}
        </EditorContent>
      </div>
      <Summary
        editor={editor}
        className={cn(
          "fixed top-[50vh] right-0 z-10 w-56 shrink-0 -translate-y-1/2 pr-4",
          classList?.summary,
        )}
      />
    </div>
  );
};

export namespace EditorCanvas {
  export type ClassListKey = "content" | "summary";
  export type Props = {
    classList?: ClassList<ClassListKey>;
    children?: React.ReactNode;
  };
}
