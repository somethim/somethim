"use server";
import { type Merge, removeUndefinedEntries } from "@zenncore/utils";
import { updateTag } from "next/cache";
import { schema } from "../database";
import { withContext } from "../utils/context";
import { Environment } from "../utils/environment";
import { type Document, repository } from "../utils/repository";

export const { get, paginate, create, update, destroy, exists, count, find } =
  repository(schema.project);

export type Type = Document<typeof schema.project>;

export const draft = withContext(
  async (ctx, id: string, data: Partial<Merge<Type, { thumbnail: File }>>) => {
    const thumbnail = data.thumbnail
      ? await ctx.storage.upload("thumbnails", {
          files: [data.thumbnail],
        })
      : undefined;

    if (thumbnail && !thumbnail.success) return thumbnail;

    const payload = removeUndefinedEntries({
      title: data.title,
      subtitle: data.subtitle,
      thumbnail: thumbnail?.data[0]?.ufsUrl,
      color: data.color ?? "#000000",
      content: data.content,
      status: "draft" as const,
    });

    return await update(Environment.SERVER, id, payload);
  },
);

export const init = withContext(async () => {
  const result = await create(Environment.SERVER, {
    title: "<unset>",
    subtitle: "<unset>",
    color: "#000000",
    content: "<unset>",
    status: "draft",
  });
  if (!result.success) return result;

  updateTag("projects");
  return result;
});

export const setStatus = withContext(
  async (_, id: string, status: "draft" | "published" | "archived") => {
    const result = await update(Environment.SERVER, id, { status });
    if (!result.success) return result;

    updateTag("projects");
    return result;
  },
);
