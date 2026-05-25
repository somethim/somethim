"use client";

import Image from "@tiptap/extension-image";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn, type ClassList } from "@zenncore/utils";
import { Column, ColumnRow } from "../extensions/column-row";
import { EditorIconExtension } from "../extensions/editor-icon";
import { EditorContext } from "../context/editor-context";
import type { JSX, ReactNode } from "react";

export { EditorToolbarButton } from "./toolbar";

const EditorRoot = (props: Editor.Props): JSX.Element => {
  const { children, classList } = props;

  const editor = useEditor({
    extensions: [
      EditorIconExtension,
      StarterKit,
      Image.configure({
        resize: {
          enabled: true,
          directions: ["bottom-right", "bottom-left", "top-right", "top-left"],
          minWidth: 80,
          minHeight: 80,
          alwaysPreserveAspectRatio: true,
        },
      }),
      Column,
      ColumnRow,
    ],
    content: props.content ?? "",
    immediatelyRender: false,
    onUpdate: ({ editor: ed }) => {
      props.onChange?.(ed.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "editor mx-auto size-full min-h-[200dvh] max-w-4xl rounded-lg border border-accent-foreground/20 bg-background-rich p-4 shadow-sm",
          classList?.editor,
        ),
      },
    },
  });

  return (
    <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
  );
};

export namespace Editor {
  export type ClassListKey = "root" | "editor";
  export type Props = {
    children?: ReactNode;
    classList?: ClassList<ClassListKey>;
    /** Initial HTML content. */
    content?: string;
    /** Called when editor content changes. Passes current HTML. */
    onChange?: (html: string) => void;
  };
}

export const Editor: (props: Editor.Props) => JSX.Element = EditorRoot;
