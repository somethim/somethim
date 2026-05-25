"use client";

import { useEditorState } from "@tiptap/react";
import {
  BlockQuoteIcon,
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  ItalicIcon,
  MinusIcon,
  ParagraphIcon,
  RedoIcon,
  StrikethroughIcon,
  TextColumnsIcon,
  UnderlineIcon,
  UndoIcon,
} from "@zenncore/icons";
import { createSlot, useSlots } from "@zenncore/utils/hooks";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@zenncore/web/components/toolbar";

import {
  startTransition,
  useTransition,
  type ComponentType,
  type ReactNode,
} from "react";
import { useId, useState } from "react";
import { useEditorContext } from "../context/editor-context";

type SlotComponent = ComponentType<{ children?: ReactNode }>;
export const EditorToolbarLeft: SlotComponent = createSlot("EditorToolbarLeft");
export const EditorToolbarRight: SlotComponent =
  createSlot("EditorToolbarRight");

export type EditorToolbarState = {
  italic: boolean;
  bold: boolean;
  underline: boolean;
  strike: boolean;
  heading: { 1: boolean; 2: boolean; 3: boolean };
  paragraph: boolean;
  blockquote: boolean;
  bulletList: boolean;
  column: { 2: boolean; 3: boolean };
  can: { undo: boolean; redo: boolean };
};

const EditorToolbarRoot = ({
  children,
  className,
  onImageUpload,
  classList,
}: EditorToolbar.Props): React.JSX.Element | null => {
  const editor = useEditorContext();
  const fileInputId = useId();

  const [left, right] = useSlots(children, [
    EditorToolbarLeft,
    EditorToolbarRight,
  ] as const) as [ReactNode | null, ReactNode | null];

  const state = useEditorState({
    editor,
    selector: ({ editor }) =>
      editor
        ? ({
            italic: editor.isActive("italic"),
            bold: editor.isActive("bold"),
            underline: editor.isActive("underline"),
            strike: editor.isActive("strike"),
            heading: {
              1: editor.isActive("heading", { level: 1 }),
              2: editor.isActive("heading", { level: 2 }),
              3: editor.isActive("heading", { level: 3 }),
            },
            paragraph: editor.isActive("paragraph"),
            blockquote: editor.isActive("blockquote"),
            bulletList: editor.isActive("bulletList"),
            column: {
              2: editor.isActive("columnRow", { columnCount: 2 }),
              3: editor.isActive("columnRow", { columnCount: 3 }),
            },
            can: {
              undo: editor.can().undo(),
              redo: editor.can().redo(),
            },
          } satisfies EditorToolbarState)
        : null,
  });

  const [isUploading, startUpload] = useTransition();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) =>
    startUpload(async () => {
      const file = event.target.files?.[0];
      event.target.value = "";

      if (!file || !editor || !onImageUpload) return;

      const url = await onImageUpload?.(file);
      editor.chain().focus().setImage({ src: url }).run();
    });

  if (!editor) return null;

  return (
    <div
      className={cn(
        "flex items-start justify-between",
        className,
        classList?.root,
      )}
    >
      {left}

      <TooltipProvider>
        <Toolbar
          className={cn(
            "flex items-center rounded-md border border-accent-foreground/20 bg-background-rich p-1",
            classList?.toolbar,
          )}
        >
          <ToolbarGroup className="flex items-center gap-1">
            <EditorToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={state?.italic}
              description="Toggle italic text"
            >
              <ItalicIcon />
            </EditorToolbarButton>
            <EditorToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={state?.bold}
              description="Toggle bold text"
            >
              <BoldIcon />
            </EditorToolbarButton>
            <EditorToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              active={state?.underline}
              description="Toggle underline text"
            >
              <UnderlineIcon />
            </EditorToolbarButton>
            <EditorToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              active={state?.strike}
              description="Toggle strikethrough text"
            >
              <StrikethroughIcon />
            </EditorToolbarButton>
          </ToolbarGroup>
          <ToolbarSeparator className="h-8 w-0.5 bg-accent-foreground/20" />
          <ToolbarGroup className="flex items-center gap-1">
            <EditorToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              active={state?.heading[1]}
              description="Toggle heading 1"
            >
              <Heading1Icon />
            </EditorToolbarButton>
            <EditorToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              active={state?.heading[2]}
              description="Toggle heading 2"
            >
              <Heading2Icon />
            </EditorToolbarButton>
            <EditorToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              active={state?.heading[3]}
              description="Toggle heading 3"
            >
              <Heading3Icon />
            </EditorToolbarButton>
            <EditorToolbarButton
              onClick={() => editor.chain().focus().setParagraph().run()}
              active={state?.paragraph}
              description="Toggle paragraph"
            >
              <ParagraphIcon />
            </EditorToolbarButton>
          </ToolbarGroup>
          <ToolbarSeparator className="h-8 w-0.5 bg-accent-foreground/20" />
          <ToolbarGroup className="flex items-center gap-1">
            <EditorToolbarButton
              onClick={() => editor.chain().focus().setBlockquote().run()}
              active={state?.blockquote}
              description="Toggle blockquote"
            >
              <BlockQuoteIcon />
            </EditorToolbarButton>
            <EditorToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              active={state?.bulletList}
              description="Toggle bullet list"
            >
              <MinusIcon />
            </EditorToolbarButton>
            <EditorToolbarButton
              onClick={() => editor.chain().focus().insertColumnRow(2).run()}
              active={state?.column[2]}
              description="Insert a column row (2 columns)"
            >
              <TextColumnsIcon />
              <span className="absolute right-1 bottom-0 font-medium">2</span>
            </EditorToolbarButton>
            <EditorToolbarButton
              onClick={() => editor.chain().focus().insertColumnRow(3).run()}
              active={state?.column[3]}
              description="Insert a column row (3 columns)"
            >
              <TextColumnsIcon />
              <span className="absolute right-1 bottom-0 font-medium">3</span>
            </EditorToolbarButton>
            {onImageUpload && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <label
                      htmlFor={fileInputId}
                      className={cn(
                        "relative flex aspect-square size-8 cursor-pointer items-center justify-center rounded p-0",
                        isUploading && "cursor-not-allowed opacity-50",
                      )}
                      aria-label="Upload image"
                    >
                      <input
                        id={fileInputId}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        aria-hidden
                        disabled={isUploading}
                        onChange={handleImageUpload}
                      />
                      <ImageIcon />
                    </label>
                  }
                />
                <TooltipPositioner>
                  <TooltipArrow />
                  <TooltipPopup>Upload image</TooltipPopup>
                </TooltipPositioner>
              </Tooltip>
            )}
          </ToolbarGroup>
          <ToolbarSeparator className="h-8 w-0.5 bg-accent-foreground/20" />
          <ToolbarGroup className="flex items-center gap-1">
            <EditorToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!state?.can.undo}
              description="Undo"
            >
              <UndoIcon />
            </EditorToolbarButton>
            <EditorToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!state?.can.redo}
              description="Redo"
            >
              <RedoIcon />
            </EditorToolbarButton>
          </ToolbarGroup>
        </Toolbar>
      </TooltipProvider>
      {right}
    </div>
  );
};

export namespace EditorToolbar {
  export type ClassListKey = "root" | "toolbar";
  export type Props = {
    children?: ReactNode;
    className?: string;
    onImageUpload?: (file: File) => Promise<string>;
    classList?: ClassList<ClassListKey>;
  };
}

export interface EditorToolbarComponent {
  (props: EditorToolbar.Props): React.JSX.Element | null;
  Left: typeof EditorToolbarLeft;
  Right: typeof EditorToolbarRight;
}

EditorToolbarRoot.Left = EditorToolbarLeft;
EditorToolbarRoot.Right = EditorToolbarRight;

export const EditorToolbar = EditorToolbarRoot as EditorToolbarComponent;

import { cn, type ClassList } from "@zenncore/utils";
import { ToolbarButton } from "@zenncore/web/components/toolbar";
import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "@zenncore/web/components/tooltip";

export const EditorToolbarButton = ({
  onClick,
  active,
  children,
  disabled,
  description,
}: EditorToolbarButton.Props): React.JSX.Element => (
  <Tooltip>
    <TooltipTrigger
      render={
        <ToolbarButton
          type="button"
          onClick={onClick}
          className={cn(
            "relative aspect-square size-8 p-0",
            active && "!text-primary bg-primary-rich/10",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {children}
        </ToolbarButton>
      }
    />
    {description && (
      <TooltipPositioner>
        <TooltipArrow />
        <TooltipPopup>{description}</TooltipPopup>
      </TooltipPositioner>
    )}
  </Tooltip>
);

export namespace EditorToolbarButton {
  export type Props = {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    disabled?: boolean;
    description?: string;
  };
}
