"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { accessos, rols } from "../data/data";
import { userSchema } from "../data/schema";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onAccessChange?: (userId: string, newAccess: string) => void;
  onRoleChange?: (userId: string, newRole: string) => void;
  onDelete?: (userId: string) => void;
}

export function DataTableRowActions<TData>({
  row,
  onAccessChange,
  onRoleChange,
  onDelete,
}: DataTableRowActionsProps<TData>) {
  const user = userSchema.parse(row.original);

  const handleAccessChange = (newAccess: string) => {
    if (onAccessChange && user.id) {
      onAccessChange(user.id, newAccess);
      toast.success("Nivell d'accés actualitzat correctament");
    }
  };

  const handleRoleChange = (newRole: string) => {
    if (onRoleChange && user.id) {
      onRoleChange(user.id, newRole);
      toast.success("Rol d'usuari actualitzat correctament");
    }
  };

  const handleDelete = () => {
    if (onDelete && user.id) {
      onDelete(user.id);
      toast.success("Usuari eliminat correctament");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="data-[state=open]:bg-muted size-8"
          aria-label={`Obrir menú d'accions per a ${user.nom}`}
          aria-expanded={false}
          aria-haspopup="menu"
        >
          <MoreHorizontal aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Editar</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Rols</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={user.rol}
              onValueChange={handleRoleChange}
            >
              {rols.map((rol) => (
                <DropdownMenuRadioItem key={rol.value} value={rol.value}>
                  {rol.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Accés</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={user.access}
              onValueChange={handleAccessChange}
            >
              {accessos.map((access) => (
                <DropdownMenuRadioItem key={access.value} value={access.value}>
                  {access.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              variant="destructive"
              onSelect={(e) => e.preventDefault()}
            >
              Esborrar
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar l&rsquo;eliminació</AlertDialogTitle>
              <AlertDialogDescription>
                Aquesta acció no es pot desfer. Això suposarà l&rsquo;eliminació
                permanent del usuari i tota la seva informació relacionada del
                nostre sistema.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel·lar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
