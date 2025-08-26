"use client";

import { ColumnDef } from "@tanstack/react-table";
import { rols, accessos } from "../data/data";
import { User } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "nif",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIF" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">
        {
          <span className="text-sm px-1 py-0.5 tracking-wide">
            {row.getValue("nif")}
          </span>
        }
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nom",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nom" />
    ),
    cell: ({ row }) => (
      <div className="w-[250px] flex items-center gap-1">
        <Avatar>
          <AvatarImage
            className="h-8 w-8 rounded-full"
            src={row.original.avatar}
            alt={row.getValue("nom")}
          />
          <AvatarFallback className="h-8 w-8 rounded-full text-xs">
            GI
          </AvatarFallback>
        </Avatar>
        <span className="ml-2 text-sm font-medium truncate">
          {row.getValue("nom")}
        </span>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>{row.getValue("email")}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{row.getValue("email")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "empresa",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Empresa" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue("empresa")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "rol",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rol" />
    ),
    cell: ({ row }) => {
      const roleData = rols.find((rols) => rols.value === row.getValue("rol"));

      if (!roleData) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center gap-2">
          {roleData.icon && (
            <roleData.icon className="text-muted-foreground size-4" />
          )}
          <span>{roleData.label}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "access",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Accés" />
    ),
    cell: ({ row }) => {
      const accessosData = accessos.find(
        (accessos) => accessos.value === row.getValue("access")
      );

      if (!accessosData) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {accessosData.icon && (
            <div className="flex items-center gap-2">
              <accessosData.icon className="size-4 text-muted-foreground" />
              <span>{accessosData.label}</span>
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "accions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
