"use client";

import { processEditorHtml } from "@zenncore/editor";

export const Content = ({ content }: Content.Props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: processEditorHtml(content),
      }}
      className="editor ProseMirror z-10 flex flex-col gap-2"
    />
  );
};

export namespace Content {
  export type Props = {
    content: string;
  };
}
