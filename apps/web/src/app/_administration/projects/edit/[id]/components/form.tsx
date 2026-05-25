"use client";
import { DownloadIcon, LoaderIcon } from "@zenncore/icons";
import type { Merge } from "@zenncore/utils";
import { Button } from "@zenncore/web/components/button";
import {
  type FormEntries,
  field,
  type GenericForm,
  InferredForm,
} from "@zenncore/web/components/inferred-form";
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@zenncore/web/components/sheet";
import { useState, useTransition } from "react";
import { z } from "zod";
import * as Project from "@/server/app/project";

export const DetailForm = ({ id, defaultValues }: DetailForm.Props) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleSubmit = (data: FormEntries<typeof config>) =>
    startTransition(async () => {
      const result = await Project.draft(id, data);

      if (!result.success) {
        console.error(result.error);
        return;
      }

      setOpen(false);
    });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            type="button"
            className="absolute top-12 left-0 -translate-x-10 rotate-90 rounded-t-lg border border-accent-foreground/20 border-b-0 bg-background-rich px-4 py-2 shadow-black/10 shadow-sm"
          >
            Edit Details
          </button>
        }
      />
      <SheetPopup
        side="left"
        className={"border-transparent bg-transparent shadow-none"}
        classList={{ close: { root: "hidden" } }}
      >
        <button
          type="button"
          className="absolute top-12 -right-7 rotate-90 rounded-t-lg border border-accent-foreground/20 border-b-0 bg-background-rich px-4 py-2 shadow-black/10 shadow-sm"
        >
          Edit Details
        </button>
        <div className="relative flex h-screen w-[calc(100%-(var(--spacing)*12))] flex-col overflow-y-auto overflow-x-visible rounded-l-lg border-accent-foreground/20 border-l bg-background-rich p-4 shadow-lg">
          <SheetHeader>
            <SheetTitle>Add Case Study Details</SheetTitle>
            <SheetDescription>
              Add the details of the case study, including the title,
              description, and thumbnail. These details will be used to create
              the case study and be shown on the case study page.
            </SheetDescription>
          </SheetHeader>
          <InferredForm
            config={config}
            defaultValues={defaultValues as FormEntries<typeof config>}
            onSubmit={handleSubmit}
          >
            <div className="mt-auto flex w-full justify-end">
              <Button type="submit">
                Save{" "}
                {isPending ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  <DownloadIcon />
                )}
              </Button>
            </div>
          </InferredForm>
        </div>
      </SheetPopup>
    </Sheet>
  );
};

const config = {
  title: field({
    shape: "text",
    validator: z.string().min(1),
    label: "Title",
    description: "The title of the detail",
  }),
  description: field({
    shape: "text",
    validator: z.string().min(1),
    label: "Description",
    description: "The description of the detail",
  }),
  thumbnail: field({
    shape: "file",
    validator: z.file().min(1),
    label: "Thumbnail",
    description: "The thumbnail of the detail",
    mode: "single",
  }),
  // @ts-expect-error
  color: field({
    shape: "text",
    validator: z.string().min(1),
    label: "Color",
    description: "The hash color of the detail",
    defaultValue: "#000000",
  }),
} satisfies GenericForm;

export namespace DetailForm {
  export type Props = {
    id: string;
    defaultValues?: Partial<
      Merge<
        FormEntries<typeof config>,
        { thumbnail: string | File | null | undefined }
      >
    >;
  };
}
