import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

import { userSchema } from "./data/schema";
import { UsersClient } from "./components/users.client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbEllipsis,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

async function getUsers() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/administracio/usuaris/data/users.json")
  );

  const users = JSON.parse(data.toString());

  return z.array(userSchema).parse(users);
}

export default async function Usuaris() {
  const users = await getUsers();
  return (
    <div className="flex h-full flex-1 flex-col gap-8 ">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Inici</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Administració</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Usuaris</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">Usuaris</h2>
          <p className="text-muted-foreground">
            Gestiona els usuaris del sistema
          </p>
        </div>
      </div>
      <UsersClient initialUsers={users} />
    </div>
  );
}
