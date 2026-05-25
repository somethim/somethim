import type { Extension, NodeViewProps } from "@tiptap/core";
import { Node } from "@tiptap/core";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  useEditorState,
} from "@tiptap/react";
import { cn } from "@zenncore/utils";
import type { JSX } from "react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    insertColumnRow: {
      insertColumnRow: (columnCount?: number) => ReturnType;
    };
    setColumnRow: {
      setColumnRow: () => ReturnType;
    };
  }
}

/**
 * Single column container. Only valid inside ColumnRow.
 * Can contain any block content (paragraph, blockquote, etc.).
 */
const Column: Extension = Node.create({
  name: "column",

  group: "column",

  content: "block+",

  isolating: true,

  parseHTML() {
    return [{ tag: "div[data-column]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      {
        "data-column": "",
        class: "editor-column",
        ...HTMLAttributes,
      },
      0,
    ];
  },
}) as Extension;

function ColumnRowNodeView({
  editor,
  getPos,
  node,
}: NodeViewProps): JSX.Element {
  const selection = useEditorState({
    editor,
    selector: ({ editor: ed }) => ed?.state.selection ?? null,
  });
  const pos = typeof getPos === "function" ? getPos() : undefined;
  const selected =
    editor &&
    selection &&
    typeof pos === "number" &&
    (() => {
      const start = pos;
      const end = pos + node.nodeSize;
      const { from, to } = selection;
      return (from >= start && from < end) || (to > start && to <= end);
    })();

  return (
    <NodeViewWrapper
      as="div"
      className={cn(
        "editor-column-row flex min-w-0 flex-1 gap-2 rounded-md outline-none transition-[box-shadow]",
        "[&>div>div]:flex [&>div>div]:min-w-0 [&>div>div]:flex-1 [&>div>div]:gap-2 [&>div]:flex [&>div]:min-w-0 [&>div]:flex-1 [&>div]:gap-2",
        selected &&
          "[&_.editor-column]:ring-2 [&_.editor-column]:ring-primary [&_.editor-column]:ring-offset-2 [&_.editor-column]:ring-offset-background",
      )}
      data-column-row
    >
      <NodeViewContent />
    </NodeViewWrapper>
  );
}

/**
 * Row of columns – layout node so you can put e.g. three blockquotes side by side.
 * Add this to the editor, then use "Insert row" (or the command) to insert a row
 * with 3 columns; each column can contain block content including blockquotes.
 */
const ColumnRow: Extension = Node.create({
  name: "columnRow",

  group: "block",

  content: "column+",

  addOptions() {
    return {
      HTMLAttributes: {},
      defaultColumnCount: 3,
    };
  },

  addCommands() {
    const defaultColumnCount = this.options.defaultColumnCount;
    const nodeName = this.name;
    return {
      insertColumnRow:
        (columnCount = defaultColumnCount) =>
        ({ chain }) => {
          const columns = Array.from({ length: columnCount }, () => ({
            type: "column",
            content: [{ type: "paragraph" }],
          }));
          return chain()
            .focus()
            .insertContent({ type: "columnRow", content: columns })
            .run();
        },
      setColumnRow:
        () =>
        ({ commands }) =>
          commands.toggleNode(nodeName, "paragraph"),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ColumnRowNodeView, { as: "div" });
  },

  parseHTML() {
    return [{ tag: "div[data-column-row]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { "data-column-row": "", class: "editor-column-row", ...HTMLAttributes },
      0,
    ];
  },
}) as Extension;

export { Column, ColumnRow };
