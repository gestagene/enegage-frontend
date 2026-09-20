import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "dompurify";
import { useMemo } from "react";
import type { JSONContent } from "@tiptap/core";

const readOnlyExtensions = [
  StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
];

export function RichTextContent({
  content,
}: {
  content: JSONContent | string | null;
}) {
  const safeHtml = useMemo(() => {
    if (!content) return "";
    const json = typeof content === "string" ? JSON.parse(content) : content;
    const html = generateHTML(json, readOnlyExtensions);
    return DOMPurify.sanitize(html);
  }, [content]);

  if (!content) return null;

  return (
    <div
      className="rte-content"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
