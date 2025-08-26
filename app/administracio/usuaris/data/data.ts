import {
  UserStar,
  User,
  GraduationCap,
  BriefcaseBusiness,
  Check,
  Wrench,
  X,
} from "lucide-react";

export enum Rol {
  Admin = "admin",
  Gestor = "gestor",
  Tecnic = "tecnic",
  Usuari = "usuari",
  Estudiant = "estudiant",
}
export enum Access {
  Active = "actiu",
  Inactive = "inactiu",
}
export type Data = {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const rols: Data[] = [
  {
    value: Rol.Admin,
    label: "Admin",
    icon: UserStar,
  },
  {
    value: Rol.Gestor,
    label: "Gestor",
    icon: BriefcaseBusiness,
  },
  {
    value: Rol.Tecnic,
    label: "Tècnic",
    icon: Wrench,
  },
  {
    value: Rol.Usuari,
    label: "Usuari",
    icon: User,
  },
  {
    value: Rol.Estudiant,
    label: "Estudiant",
    icon: GraduationCap,
  },
];

export const accessos: Data[] = [
  {
    value: Access.Active,
    label: "Actiu",
    icon: Check,
  },
  {
    value: Access.Inactive,
    label: "Inactiu",
    icon: X,
  },
];
