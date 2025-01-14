import { List, Plus, Edit, Trash } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function NavBar() {
  return (
    <NavigationMenu className="max-w-full w-full justify-start mb-6">
      <NavigationMenuList className="space-x-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <List className="mr-2" />
            Clientes
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px]">
              <ListItem href="#" title="Ver Lista">
                <List className="inline-block mr-2" />
                Visualizar todos os clientes cadastrados
              </ListItem>
              <ListItem href="#" title="Cadastrar">
                <Plus className="inline-block mr-2" />
                Adicionar novo cliente
              </ListItem>
              <ListItem href="#" title="Editar">
                <Edit className="inline-block mr-2" />
                Modificar informações de clientes
              </ListItem>
              <ListItem href="#" title="Excluir">
                <Trash className="inline-block mr-2" />
                Remover clientes do sistema
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}