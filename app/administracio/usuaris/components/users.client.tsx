"use client";

import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { User } from "../data/schema";

interface UsersClientProps {
  initialUsers: User[];
}

export function UsersClient({ initialUsers }: UsersClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleDataChange = (updatedData: User[]) => {
    setUsers(updatedData);
  };

  return (
    <DataTable data={users} columns={columns} onDataChange={handleDataChange} />
  );
}
