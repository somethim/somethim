"use client";

import { Editor, EditorCanvas, EditorToolbar } from "@zenncore/editor";
import { DownloadIcon } from "@zenncore/icons";
import { Button } from "@zenncore/web/components/button";
import { useState, useTransition } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import * as Project from "@/server/app/project";
import { DetailForm } from "./form";

export const Canvas = ({ id, defaultValues }: Canvas.Props) => {
  const { startUpload } = useUploadThing("projects");
  const [pending, startTransition] = useTransition();

  const [content, handleContentChange] = useState<string>(
    defaultValues?.content ?? "",
  );

  return (
    <Editor content={defaultValues?.content} onChange={handleContentChange}>
      <EditorToolbar
        className="pt-4 pr-4"
        onImageUpload={async (file) => {
          const result = await startUpload([file]);
          console.log({ result });

          const url =
            result?.[0]?.ufsUrl ?? result?.[0]?.url ?? "/fallback.png";

          console.log({ url });

          return url;
        }}
        classList={{
          root: "fixed inset-x-0 top-0 isolate z-10 justify-center",
        }}
      >
        <EditorToolbar.Left>
          <DetailForm id={id} defaultValues={defaultValues} />
        </EditorToolbar.Left>
        <EditorToolbar.Right>
          <Button
            variant="default"
            className="absolute top-4 right-4 ml-auto font-medium"
            color="primary"
            disabled={pending}
            onClick={() => {
              startTransition(async () => {
                await Project.draft(id, {
                  content,
                });
              });
            }}
          >
            <DownloadIcon /> Save Project
          </Button>
        </EditorToolbar.Right>
      </EditorToolbar>
      <EditorCanvas classList={{ content: "pt-24" }} />
    </Editor>
  );
};

export namespace Canvas {
  export type Props = {
    id: string;
    defaultValues?: DetailForm.Props["defaultValues"] & { content?: string };
  };
}
