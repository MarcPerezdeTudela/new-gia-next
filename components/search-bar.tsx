"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { gestioMenu, adminMenu } from "./nav-menu";
import { useRouter } from "next/navigation";
const commandItems = [
  ...gestioMenu,
  ...adminMenu,
  { title: "Documentació", href: "/docs" },
].sort((a, b) => a.title.localeCompare(b.title));

export function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="flex h-8 w-full min-w-[15px] justify-around rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center w-full gap-1">
          <Search className="h-4 w-4" />
          <span>Buscar...</span>
        </div>
        <div className="pointer-events-none hidden select-none items-center gap-1 font-mono text-[12px] font-medium text-muted-foreground md:flex">
          <kbd className="flex items-center justify-center h-5 px-1.5 border rounded bg-background">
            ⌘
          </kbd>
          <kbd className="flex items-center justify-center h-5 px-1.5 border rounded bg-background">
            k
          </kbd>
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Escriu una comanda o cerca..." />
        <CommandList className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <CommandEmpty>No s&rsquo;han trobat resultats.</CommandEmpty>
          <CommandGroup heading="Seccions">
            {commandItems.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => {
                  runCommand(() => router.push(item.href as string));
                }}
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
