"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { rols, accessos } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-end justify-between flex-wrap gap-2 md:gap-0">
      <div className="flex flex-1 items-center gap-2 flex-wrap">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Input
                placeholder="Cercar..."
                value={table.getState().globalFilter ?? ""}
                onChange={(event) => table.setGlobalFilter(event.target.value)}
                className="h-8 w-[150px] lg:w-[250px]"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Cerca per nom, email o rol</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {table.getColumn("access") && (
          <DataTableFacetedFilter
            column={table.getColumn("access")}
            title="Accés"
            options={accessos}
          />
        )}
        {table.getColumn("rol") && (
          <DataTableFacetedFilter
            column={table.getColumn("rol")}
            title="Rol"
            options={rols}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <Button size="sm">Nou Usuari</Button>
      </div>
    </div>
  );
}
