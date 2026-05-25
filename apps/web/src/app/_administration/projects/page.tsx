import { unwrapResult } from "@zenncore/utils";
import { cacheTag } from "next/cache";
import * as Project from "@/server/app/project";
import { Environment } from "@/server/utils/environment";
import { Create } from "./components/create";
import { Table } from "./components/table";
import { Suspense } from "react";

export default async () => {
  "use cache";
  cacheTag("projects");
  const projects = await unwrapResult(Project.find(Environment.SERVER));

  return (
    <main className="flex size-full flex-1 flex-col gap-4 p-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-bold text-2xl">Projects</h1>
          <p className="text-foreground-dimmed text-sm">
            Manage your projects and their associated data.
          </p>
        </div>
        <Suspense>
          <Create />
        </Suspense>
      </div>
      <Table projects={projects} />
    </main>
  );
};
