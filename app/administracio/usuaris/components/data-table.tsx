"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTableRowActions } from "./data-table-row-actions";
import { User } from "../data/schema";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDataChange?: (updatedData: TData[]) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onDataChange,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [tableData, setTableData] = React.useState<TData[]>(data);

  React.useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleAccessChange = React.useCallback(
    (userId: string, newAccess: string) => {
      const updatedData = tableData.map((item) => {
        const user = item as User;
        if (user.id === userId) {
          return { ...user, access: newAccess } as TData;
        }
        return item;
      });
      setTableData(updatedData);
      onDataChange?.(updatedData);
    },
    [tableData, onDataChange]
  );

  const handleRoleChange = React.useCallback(
    (userId: string, newRole: string) => {
      const updatedData = tableData.map((item) => {
        const user = item as User;
        if (user.id === userId) {
          return { ...user, rol: newRole } as TData;
        }
        return item;
      });
      setTableData(updatedData);
      onDataChange?.(updatedData);
    },
    [tableData, onDataChange]
  );

  const handleDeleteSelected = React.useCallback(
    (userId: string) => {
      const updatedData = tableData.filter((item) => {
        const user = item as User;
        return user.id !== userId;
      });
      setTableData(updatedData);
      onDataChange?.(updatedData);
    },
    [tableData, onDataChange]
  );

  const globalFilterFn = React.useCallback(
    (row: Row<unknown>, columnId: string, value: string) => {
      const searchColumns = ["nif", "nom", "empresa"];
      const searchValue = value.toLowerCase();

      const matchesColumns = searchColumns.some((column) => {
        const cellValue = row.getValue(column);
        return cellValue?.toString().toLowerCase().includes(searchValue);
      });

      const matchesEmail = (row.original as User)?.email
        ?.toString()
        .toLowerCase()
        .includes(searchValue);

      return matchesColumns || matchesEmail;
    },
    []
  );

  const columnsWithHandlers = React.useMemo(() => {
    return columns.map((column) => {
      if (column.id === "accions") {
        return {
          ...column,
          cell: (cellContext: { row: Row<TData> }) => (
            <DataTableRowActions
              row={cellContext.row}
              onAccessChange={handleAccessChange}
              onRoleChange={handleRoleChange}
              onDelete={handleDeleteSelected}
            />
          ),
        };
      }
      return column;
    });
  }, [columns, handleAccessChange, handleRoleChange, handleDeleteSelected]);

  const table = useReactTable({
    data: tableData,
    columns: columnsWithHandlers,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 25,
      },
      columnPinning: { right: ["accions"] },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn: globalFilterFn,
  });

  return (
    <div className="flex flex-col gap-4">
      <DataTableToolbar table={table} />
      <div className="relative overflow-auto rounded-md border">
        <Table
          role="table"
          aria-label="Taula d'usuaris amb funcions d'ordenació i filtratge"
        >
          <caption className="sr-only">
            Taula que mostra {table.getRowCount()} usuaris amb opcions per
            ordenar, filtrar i gestionar cada registre
          </caption>
          <TableHeader className="sticky top-0 z-10 bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={
                      header.column.getIsPinned()
                        ? "sticky right-0 z-10 bg-background"
                        : ""
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.getIsPinned()
                          ? "sticky right-0 z-10 bg-background"
                          : ""
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sense resultats.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
