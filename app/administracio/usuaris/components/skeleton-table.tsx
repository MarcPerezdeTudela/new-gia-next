// skeleton-table.tsx
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonTableProps {
  columns: number;
  rows?: number;
}

export function SkeletonTable({ columns, rows = 5 }: SkeletonTableProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between flex-wrap gap-2 md:gap-0">
        <div className="flex flex-1 items-center gap-2 flex-wrap">
          <Skeleton className="h-8 w-[150px] lg:w-[250px]" />{" "}
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-28" />
        </div>
      </div>
      <div className="overflow-auto rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow>
              {Array.from({ length: columns }).map((_, index) => (
                <TableHead key={index} className="h-12">
                  <Skeleton
                    className={cn(
                      "h-4",
                      index === 0 ? "w-24" : index === 1 ? "w-32" : "w-20"
                    )}
                  />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell key={colIndex} className="h-12">
                    {colIndex === 1 ? (
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ) : colIndex === columns - 1 ? (
                      <Skeleton className="h-8 w-8" />
                    ) : (
                      <Skeleton
                        className={cn(
                          "h-4",
                          colIndex === 0 ? "w-24" : "w-1/2 max-w-[150px]"
                        )}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2">
        <div className="flex gap-4 items-center space-x-6 md:gap-0 lg:space-x-8 flex-wrap">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-[70px]" />
          </div>
          <div className="flex items-center space-x-2 flex-nowrap">
            <Skeleton className="h-4 w-[100px]" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
