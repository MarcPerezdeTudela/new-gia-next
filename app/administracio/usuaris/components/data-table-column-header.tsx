import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const sortState = column.getIsSorted();

  const getSortStateText = () => {
    switch (sortState) {
      case "asc":
        return "ascendent";
      case "desc":
        return "descendent";
      default:
        return "sense ordre";
    }
  };

  const getSortButtonLabel = () => {
    const currentState = getSortStateText();
    return `Ordenar columna ${title}. Estat actual: ${currentState}`;
  };

  const ariaSort: "ascending" | "descending" | "none" =
    sortState === "asc"
      ? "ascending"
      : sortState === "desc"
      ? "descending"
      : "none";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent -ml-3 h-8"
            aria-label={getSortButtonLabel()}
            aria-sort={ariaSort}
            aria-expanded={false}
            aria-haspopup="menu"
          >
            <span>{title}</span>
            {sortState === "desc" ? (
              <ArrowDown className="ml-1 h-4 w-4" aria-hidden="true" />
            ) : sortState === "asc" ? (
              <ArrowUp className="ml-1 h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronsUpDown className="ml-1 h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" role="menu">
          <DropdownMenuItem
            onClick={() => column.toggleSorting(false)}
            role="menuitem"
          >
            <ArrowUp className="mr-2 h-4 w-4" aria-hidden="true" />
            Ascendent
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => column.toggleSorting(true)}
            role="menuitem"
          >
            <ArrowDown className="mr-2 h-4 w-4" aria-hidden="true" />
            Descendent
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => column.clearSorting()}
            role="menuitem"
          >
            <ChevronsUpDown className="mr-2 h-4 w-4" aria-hidden="true" />
            Restablir
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => column.toggleVisibility(false)}
            role="menuitem"
          >
            <EyeOff className="mr-2 h-4 w-4" aria-hidden="true" />
            Amagar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
