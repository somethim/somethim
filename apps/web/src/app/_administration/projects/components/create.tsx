"use client";
import { LoaderIcon, PlusIcon } from "@zenncore/icons";
import { Button } from "@zenncore/web/components/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import * as Project from "@/server/app/project";

export const Create = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCreate = async () =>
    startTransition(async () => {
      const result = await Project.init();
      if (!result.success) return;

      result.data.id;

      router.push(`/administration/projects/edit/${result.data.id}`);
    });

  return (
    <Button onClick={handleCreate} disabled={isPending}>
      {isPending ? <LoaderIcon className="animate-spin" /> : <PlusIcon />}
      Create Project
    </Button>
  );
};
