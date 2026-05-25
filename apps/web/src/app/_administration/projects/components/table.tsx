"use client";
import { EditProjectIcon, FileAttachmentIcon } from "@zenncore/icons";
import { cn } from "@zenncore/utils";
import { Button } from "@zenncore/web/components/button";
import {
  DataTable,
  DataTableEmpty,
  DataTablePagination,
  DataTableProvider,
} from "@zenncore/web/components/data-table";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import * as Project from "@/server/app/project";

export const Table = ({ projects }: Table.Props) => {
  return (
    <DataTableProvider rows={projects} columns={columns}>
      <DataTable className={"flex-1"}>
        <DataTableEmpty>
          <div className="flex h-full flex-1 flex-col items-center justify-center p-10">
            <FileAttachmentIcon className="mb-4 size-32 text-foreground-dimmed" />
            <h3 className="mb-1 font-semibold text-2xl">No projects found</h3>
            <p className="text-foreground-dimmed text-sm">
              Get started now by initializing a new project.
            </p>
          </div>
        </DataTableEmpty>
      </DataTable>
      <DataTablePagination />
    </DataTableProvider>
  );
};
export namespace Table {
  export type Props = {
    projects: Project.Type[];
  };
}

type CellContext = {
  row: {
    original: Project.Type;
  };
};
const columns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }: CellContext) => <span>{row.original.title}</span>,
  },
  {
    accessorKey: "subtitle",
    header: "Subtitle",
    cell: ({ row }: CellContext) => row.original.subtitle,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: CellContext) => {
      const [status, setStatus] = useState(row.original.status);

      const handleStatusChange = () => {
        setStatus(status === "draft" ? "published" : "draft");
        Project.setStatus(
          row.original.id,
          status === "draft" ? "published" : "draft",
        );
      };

      return (
        <button
          type="button"
          className={cn(
            "rounded-full px-2 py-1 font-medium text-sm capitalize",
            status === "draft"
              ? "bg-warning/20 text-warning-foreground"
              : "bg-success/20 text-success-foreground",
          )}
          onClick={handleStatusChange}
        >
          {status}
        </button>
      );
    },
  },
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }: CellContext) => (
      <Image
        src={
          row.original.thumbnail
            ? row.original.thumbnail
            : "/images/fallback.png"
        }
        alt={row.original.title}
        width={100}
        height={100}
        className="size-10 rounded-lg object-cover ring-1 ring-accent-foreground/10"
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }: CellContext) =>
      format(row.original.createdAt, "dd/MM/yyyy"),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }: CellContext) =>
      format(row.original.updatedAt, "dd/MM/yyyy"),
  },
  {
    accessorKey: "actions",
    id: "actions",
    header: "Actions",
    cell: ({ row }: CellContext) => (
      <Link href={`/administration/projects/edit/${row.original.id}`}>
        <Button variant="soft" size="icon" color="primary">
          <EditProjectIcon className="size-8" />
        </Button>
      </Link>
    ),
  },
];
