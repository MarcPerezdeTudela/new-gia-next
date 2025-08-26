"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const gestioMenu: {
  title: string;
  href: string;
  description: string;
}[] = [
  { title: "Beques", href: "/beques", description: "Gestió de beques" },
  {
    title: "Sol·licituds CP",
    href: "/gestio/sol·licituds-cp",
    description: "Gestió de sol·licituds de certificats professionals",
  },
  {
    title: "Memòries de formació",
    href: "/gestio/memories-de-formacio",
    description: "Gestió de les memòries de formació",
  },
];

export const adminMenu: { title: string; href: string; description: string }[] =
  [
    {
      title: "Convocatòries",
      href: "/administracio/convocatories",
      description: "Gestió de les convocatòries formatives",
    },
    {
      title: "Especialitats",
      href: "/administracio/especialitats",
      description: "Gestió de les especialitats formatives",
    },
    {
      title: "Usuaris",
      href: "/administracio/usuaris",
      description: "Gestió dels usuaris de l'aplicació",
    },
    {
      title: "Entitats",
      href: "/administracio/entitats",
      description: "Gestió de les entitats col·laboradores",
    },
    {
      title: "Formadors",
      href: "/administracio/formadors",
      description: "Gestió dels formadors",
    },
  ];

const aplicacioMenu: { title: string; href: string }[] = [
  { title: "Estadístiques", href: "/aplicacio/estadistiques" },
  { title: "Monitor del sistema", href: "/aplicacio/monitor" },
];

function MobileMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[350px] ">
          <SheetHeader>
            <SheetTitle>
              <Link
                href="/"
                className="inline-flex items-center text-xl font-bold italic tracking-tight hover:text-primary transition-colors duration-200"
                onClick={() => setOpen(false)}
              >
                <h1>GIA</h1>
              </Link>
            </SheetTitle>
            <SheetDescription>
              Gestió Integrada d&rsquo;Accions
            </SheetDescription>
          </SheetHeader>
          <Separator className="mb-2" />
          <nav className="flex flex-col gap-4 px-4">
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium py-2 hover:text-primary transition-colors">
                Gestió
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-2 ml-4">
                {gestioMenu.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium py-2 hover:text-primary transition-colors">
                Administració
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-2 ml-4">
                {adminMenu.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>

            <Link
              href="/docs"
              className="py-2 font-medium hover:text-primary hover:bg-accent rounded-md transition-colors"
              onClick={() => setOpen(false)}
            >
              Documentació
            </Link>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium py-2 hover:text-primary transition-colors">
                Aplicació
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-2 ml-4">
                {aplicacioMenu.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function NavMenu() {
  return (
    <>
      <NavigationMenu className="hidden lg:flex" viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                className="mr-6 flex items-center text-xl font-bold italic tracking-tight hover:text-primary transition-colors duration-200"
                href="/"
              >
                <h1>GIA</h1>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Gestió</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:bg-accent transition-colors"
                      href="/gestio/accions"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Accions
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Gestió i consulta d&rsquo;accions formatives i
                        convocatòries.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {gestioMenu.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Administració</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-1 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {adminMenu.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/docs">Documentació</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Aplicació</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-1">
                {aplicacioMenu.map((item) => (
                  <li key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          {item.title}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <MobileMenu />
    </>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
