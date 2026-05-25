import { unwrapResult } from "@zenncore/utils";
import { notFound } from "next/navigation";
import * as Project from "@/server/app/project";
import { Environment } from "@/server/utils/environment";
import { Canvas } from "./components/canvas";

export default async ({
  params,
}: PageProps<"/administration/projects/edit/[id]">) => {
  "use cache";
  const { id } = await params;
  const project = await unwrapResult(Project.get(Environment.SERVER, id));

  if (!project) notFound();

  return (
    <main className="isolate flex size-full flex-1 flex-col gap-4 overflow-x-hidden">
      <Canvas id={id} defaultValues={project} />
    </main>
  );
};
