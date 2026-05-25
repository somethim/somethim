"use client";

import type { Editor as EditorType } from "@tiptap/core";
import { createContext, useContext } from "react";
import type { Context } from "react";

export const EditorContext: Context<EditorType | null> =
  createContext<EditorType | null>(null);

export function useEditorContext(): EditorType | null {
  return useContext(EditorContext);
}
