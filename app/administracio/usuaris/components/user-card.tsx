import { Card, CardContent } from "@/components/ui/card";
import { accessos, rols } from "../data/data";
import { User } from "../data/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableRowActions } from "./data-table-row-actions";
import { Row } from "@tanstack/react-table";
import { Building2, IdCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const UserCard = ({
  user,
  onAccessChange,
  onRoleChange,
  onDelete,
}: {
  user: User;
  onAccessChange: (userId: string, newAccess: string) => void;
  onRoleChange: (userId: string, newRole: string) => void;
  onDelete: (userId: string) => void;
}) => {
  const roleData = rols.find((rol) => rol.value === user.rol);
  const accessData = accessos.find((access) => access.value === user.access);

  const isActive = accessData?.label.toLowerCase() === "actiu";
  const isInactive = accessData?.label.toLowerCase() === "inactiu";

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

  const accessTextColor = isActive
    ? "text-green-600 dark:text-green-400"
    : isInactive
    ? "text-red-600 dark:text-red-400"
    : "text-gray-700 dark:text-gray-300";

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Avatar className="size-8 flex-shrink-0">
                <AvatarImage src={user.avatar} alt={`Avatar de ${user.nom}`} />
                <AvatarFallback className="text-sm font-medium">
                  {getInitials(user.nom)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-medium text-sm truncate">{user.nom}</span>
                <span className="text-xs text-muted-foreground truncate">
                  {user.email}
                </span>
              </div>
              <div className="flex-shrink-0">
                <DataTableRowActions
                  row={{ original: user } as Row<User>}
                  onAccessChange={onAccessChange}
                  onRoleChange={onRoleChange}
                  onDelete={onDelete}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {roleData && (
              <Badge variant="outline">
                <div className="flex items-center gap-1.5">
                  {roleData.icon && <roleData.icon className="size-3" />}
                  <span className="text-xs">{roleData.label}</span>
                </div>
              </Badge>
            )}
            {accessData && (
              <div className="flex items-center gap-1.5">
                <Badge variant="outline">
                  {accessData.icon && (
                    <accessData.icon className={`size-3 ${accessTextColor}`} />
                  )}
                  <span className={`text-xs ${accessTextColor}`}>
                    {accessData.label}
                  </span>
                </Badge>
              </div>
            )}
            {user.nif && (
              <Badge variant="outline">
                <div className="flex items-center gap-1">
                  <IdCard className=" size-3" aria-hidden="true" />
                  <span className="text-xs">{user.nif}</span>
                </div>
              </Badge>
            )}
            {user.empresa && (
              <Badge variant="outline">
                <div className="flex items-center min-w-0 flex-1 gap-1.5">
                  <Building2
                    className="inline size-3 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-xs">{user.empresa}</span>
                </div>
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
