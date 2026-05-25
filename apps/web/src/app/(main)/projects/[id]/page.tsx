import { SummaryForContent } from "@zenncore/editor";
import { unwrapResult } from "@zenncore/utils";
import type { Metadata } from "next";
import { cacheTag } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import * as Project from "@/server/app/project";
import { Environment } from "@/server/utils/environment";
import { Content } from "./_components/content";
import { FastTrackTyresPage } from "./_components/fast-track-tyres-page";

export const generateMetadata = async ({
  params,
}: PageProps<"/projects/[id]">): Promise<Metadata> => {
  const { id } = await params;
  const project = await unwrapResult(Project.get(Environment.SERVER, id));

  if (!project) return {};

  return {
    title: `${project.title} — Mario Vukzaj`,
    description: project.subtitle ?? `${project.title} — a project by Mario Vukzaj.`,
    openGraph: {
      title: `${project.title} — Mario Vukzaj`,
      description:
        project.subtitle ?? `${project.title} — a project by Mario Vukzaj.`,
      images: project.thumbnail ? [{ url: project.thumbnail }] : [],
    },
  };
};

export default async ({ params }: PageProps<"/projects/[id]">) => {
  await connection();
  const { id } = await params;

  if (id === "fast-track-tyres") return <FastTrackTyresPage />;

  const project = await unwrapResult(Project.get(Environment.SERVER, id));

  if (!project) notFound();

  return (
    <main className="size-full overflow-y-auto overflow-x-hidden overscroll-contain scroll-smooth">
      <section className="mx-auto flex max-w-4xl flex-col py-12">
        <div
          className="relative top-0 -left-1/4 aspect-square w-screen -translate-y-2/3 rounded-full opacity-65"
          style={{
            background: project.color,
            filter: "blur(190px)",
          }}
        />
        <h1 className="relative z-20 -mt-[100vw] -mb-8 font-bold font-header text-8xl">
          {project.title}
        </h1>
        <Image
          src={project.thumbnail ?? "/fallback.png"}
          alt={project.title}
          width={1000}
          height={1000}
          className="relative z-10 mb-8 rounded-lg"
        />

        <Content content={project.content} />
      </section>
      <div className="fixed top-[50vh] right-0 z-10 w-56 shrink-0 -translate-y-1/2 pr-4">
        <SummaryForContent
          content={project.content}
          styleList={{ heading: { color: project.color } }}
        />
      </div>
    </main>
  );
};
