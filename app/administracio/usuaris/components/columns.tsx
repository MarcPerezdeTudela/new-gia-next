"use client";

import { ColumnDef } from "@tanstack/react-table";
import { rols, accessos } from "../data/data";
import { User } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const getInitials = (name: string) => {
  return (
    name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U"
  );
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "nif",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIF" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        <span className="text-sm">{row.getValue("nif")}</span>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "nom",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Usuari" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3 min-w-0">
        <Avatar>
          <AvatarImage
            className="h-10 w-10 rounded-full"
            src={row.original.avatar}
            alt=""
          />
          <AvatarFallback className="h-10 w-10 rounded-full text-sm font-medium">
            {getInitials(row.original.nom)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm truncate">
            {row.original.nom}
          </span>
          <span className="text-xs text-muted-foreground truncate">
            {row.original.email}
          </span>
        </div>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
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
          <Badge variant="outline">
            {roleData.icon && <roleData.icon className="size-4" />}
            <span>{roleData.label}</span>
          </Badge>
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

      const isActive = accessosData.label.toLowerCase() === "actiu";
      const isInactive = accessosData.label.toLowerCase() === "inactiu";

      return (
        <div className="flex w-[100px] items-center">
          {accessosData.icon && (
            <Badge variant="outline">
              <accessosData.icon
                className={cn(
                  "-ml-0.5 size-4 shrink-0",
                  isActive && "text-emerald-600 dark:text-emerald-500",
                  isInactive && "text-red-600 dark:text-red-500"
                )}
                aria-hidden={true}
              />
              <span>{accessosData.label}</span>
            </Badge>
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
    header: () => (
      <span className="sr-only">Accions disponibles per a cada usuari</span>
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
