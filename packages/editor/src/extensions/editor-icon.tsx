"use client";

import type { Extension, NodeViewProps } from "@tiptap/core";
import { mergeAttributes, Node } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    insertEditorIcon: {
      insertEditorIcon: (attrs: { svg: string }) => ReturnType;
    };
  }
}

const EditorIconNodeView = ({ node }: NodeViewProps) => {
  const svg = (node.attrs as { svg?: string | null }).svg;
  if (svg) {
    return (
      <NodeViewWrapper
        as="span"
        className="inline-flex align-middle [&_svg]:size-5 [&_svg]:shrink-0"
        contentEditable={false}
        data-editor-icon
        data-icon-type="svg"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SVG comes from trusted internal icon definitions
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }
  return (
    <NodeViewWrapper
      as="span"
      className="inline-flex size-5 items-center justify-center rounded border border-accent-foreground/30 border-dashed text-muted-foreground text-xs"
      contentEditable={false}
      data-editor-icon
      data-icon-type="fallback"
    >
      —
    </NodeViewWrapper>
  );
};

export const EditorIconExtension: Extension = Node.create({
  name: "editorIcon",

  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      name: {
        default: null,
        parseHTML: (el) => el.getAttribute("data-name"),
        renderHTML: (attrs) =>
          // @ts-expect-error - attrs is an object with a name property
          ({ "data-name": attrs.name }),
      },
      svg: {
        default: null,
        parseHTML: (el) => el.querySelector("svg")?.outerHTML,
        renderHTML: (attrs) =>
          // @ts-expect-error - attrs is an object with a svg property
          ({ "data-svg": attrs.svg }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-editor-icon]",
        getAttrs: (el) => {
          const span = el as HTMLElement;
          const dataSvg = span.getAttribute("data-svg");
          if (dataSvg) return { svg: dataSvg.replace(/&quot;/g, '"') };
          const svgChild = span.querySelector("svg");
          if (svgChild) return { svg: svgChild.outerHTML };
          const name = span.getAttribute("data-name");
          return name ? { name } : {};
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const { name, svg } = node.attrs as { name?: string | null; svg?: string | null };
    const attrs: Record<string, string> = {
      "data-editor-icon": "",
      class: "editor-inline-icon",
      ...(name ? { "data-name": name } : {}),
      ...(svg ? { "data-svg": svg } : {}),
    };
    return ["span", mergeAttributes(attrs, HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(EditorIconNodeView, { as: "span" });
  },

  addCommands() {
    return {
      insertEditorIcon:
        (attrs: { svg: string }) =>
        ({ chain }) =>
          chain().focus().insertContent({ type: this.name, attrs }).run(),
    };
  },

  addProseMirrorPlugins() {
    const type = this.type;
    const svgRegex = /<svg[\s\S]*?<\/svg>/i;
    return [
      new Plugin({
        props: {
          handlePaste(view, event) {
            const clipboardData = event.clipboardData;
            if (!clipboardData) return false;

            let svgString: string | null = null;
            const html = clipboardData.getData("text/html");
            if (html) {
              const match = html.match(svgRegex);
              svgString = match ? match[0].trim() : null;
            }
            if (!svgString) {
              const plain = clipboardData.getData("text/plain");
              if (
                plain &&
                (plain.trimStart().startsWith("<svg") || svgRegex.test(plain))
              ) {
                const match = plain.match(svgRegex);
                svgString = match ? match[0].trim() : null;
              }
            }
            if (!svgString) return false;

            const node = type.create({ svg: svgString });
            const { from, to } = view.state.selection;
            const tr = view.state.tr.replaceWith(from, to, node);
            view.dispatch(tr);
            return true;
          },
        },
      }),
    ];
  },
}) as Extension;
