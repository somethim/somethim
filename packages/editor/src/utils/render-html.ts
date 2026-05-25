/**
 * Post-processes serialized editor HTML for static rendering.
 *
 * TipTap's renderHTML can't embed raw HTML string children in DOMOutputSpec,
 * so EditorIconExtension stores SVGs as `data-svg` attributes. This function
 * injects them as actual inner content so they're visible outside the editor.
 * Also injects id attributes on headings for table-of-contents linking.
 */

const slugify = (text: string): string =>
  text
    .replace(/<[^>]+>/g, "")
    .replace(/&[^;]+;/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "section";

export function processEditorHtml(html: string): string {
  const withSvg = html.replace(
    /<span([^>]*?)data-svg="([^"]*)"([^>]*)><\/span>/g,
    (_, before, encodedSvg, after) => {
      const svg = encodedSvg
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      return `<span${before}${after}>${svg}</span>`;
    },
  );

  const used = new Set<string>();
  return withSvg.replace(
    /<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_, level: string, attrs: string, inner: string) => {
      const rawText = inner.replace(/<[^>]+>/g, "").trim();
      const base = slugify(rawText);
      let id = base;
      let suffix = 0;
      while (used.has(id)) id = `${base}-${++suffix}`;
      used.add(id);
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    },
  );
}
