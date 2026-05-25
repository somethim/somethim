import type { MetadataRoute } from "next";
import { eq } from "drizzle-orm";
import { schema } from "@/server/database";
import * as Project from "@/server/app/project";
import { Environment } from "@/server/utils/environment";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result = await Project.find(Environment.SERVER, {
    where: eq(schema.project.status, "published"),
  });

  const projectEntries: MetadataRoute.Sitemap = result.success
    ? result.data.map((project) => ({
        url: `https://mariovukzaj.com/projects/${project.id}`,
        lastModified: project.updatedAt ?? project.createdAt,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
    : [];

  return [
    {
      url: "https://mariovukzaj.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectEntries,
  ];
}
