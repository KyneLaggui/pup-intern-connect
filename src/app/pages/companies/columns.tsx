"use client";

import { Tag } from "@/app/custom_components/Tag";
import { Button } from "@/components/ui/button";
import { ColumnDef, useReactTable } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  status: string;
  company_name: string;
  email: string;
  no_of_employees: number;
  date: string;
};

const statusVariantMap = {
  Approved: "static-success",
  Pending: "static-warning",
  Cancelled: "static-destructive",
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          ID
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Tag
          variant={statusVariantMap[user.status]}
          // state="active"
          size="sm"
          className={`cursor-default`}
        >
          {user.status}
        </Tag>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "company_name",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center gap-1 cursor-pointer hover:text-red-500"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Company
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "no_of_employees",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center gap-1 cursor-pointer hover:text-red-500"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          No. of Employees
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center gap-1 cursor-pointer hover:text-red-500"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Date
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
        </p>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "evaluation",
    header: "Evaluation",
    cell: ({ row }) => {
      return (
        <Button variant="secondary" size="sm">
          View
        </Button>
      );
    },
  },
];
