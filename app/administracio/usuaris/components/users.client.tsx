"use client";

import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { User } from "../data/schema";
import { SkeletonTable } from "./skeleton-table";
import { toast } from "sonner";

interface UsersClientProps {
  initialUsers: User[];
}

export function UsersClient({ initialUsers }: UsersClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsInitialLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUsers(initialUsers);
      } catch (error) {
        toast.error("Error carregant les dades");
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchData();
  }, [initialUsers]);

  const handleDataChange = (updatedData: User[]) => {
    setUsers(updatedData);
    toast.success("Dades actualitzades correctament");
  };

  return (
    <>
      {isInitialLoading && (
        <div className="sr-only" aria-live="polite">
          Carregant dades...
        </div>
      )}
      {isInitialLoading ? (
        <SkeletonTable columns={columns.length} rows={25} />
      ) : (
        <DataTable
          data={users}
          columns={columns}
          onDataChange={handleDataChange}
        />
      )}
    </>
  );
}
