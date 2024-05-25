import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  item: any;
}

export default function SidebarItem({ item }: SidebarItemProps) {
  return (
    <li key={item.name}>
      {item.children ? (
        <Accordion type="single" collapsible>
          <AccordionItem value={item.name} className="border-none">
            <AccordionTrigger
              className={cn(
                item.current
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                "group flex justify-between items-center gap-x-3 rounded-md p-2 text-lg font-semibold leading-6 hover:no-underline"
              )}
            >
              <div className="flex items-center gap-x-2.5 text-lg">
                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                {item.name}
              </div>
            </AccordionTrigger>
            <AccordionContent className="relative pb-0">
              <span className="top-0 left-5 w-[1px] h-full bg-zinc-700 absolute" />
              {item.children.map((childMenu: any) => {
                if (childMenu?.submenus) {
                  return (
                    <Accordion
                      type="single"
                      collapsible
                      key={childMenu.name}
                      className="relative"
                    >
                      <AccordionItem
                        value={childMenu.name}
                        className="border-none ml-9"
                      >
                        <AccordionTrigger
                          className={cn(
                            childMenu.current
                              ? "bg-zinc-800 text-white"
                              : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                            "group flex justify-between items-center gap-x-3 rounded-md p-2 text-lg font-semibold leading-6 hover:no-underline"
                          )}
                        >
                          <div className="flex items-center gap-x-3">
                            {childMenu.name}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="relative pb-0">
                          <span className="top-0 left-5 w-[1px] h-full bg-zinc-700 absolute" />
                          {childMenu.submenus.map((submenu: any) => (
                            <Link
                              key={submenu.name}
                              href={submenu.href}
                              className={cn(
                                submenu.current
                                  ? "bg-zinc-800 text-white"
                                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                                "group flex justify-between items-center gap-x-3 rounded-md p-2 ml-9 text-lg font-semibold leading-6"
                              )}
                            >
                              {submenu?.submenus ? (
                                <DropdownMenu>
                                  <DropdownMenuTrigger
                                    asChild
                                    className="w-full"
                                  >
                                    <div className="flex items-center justify-between gap-x-3">
                                      {submenu.name}
                                      <ChevronRightIcon
                                        className="h-4 w-4 text-zinc-400"
                                        aria-hidden="true"
                                      />
                                    </div>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    side="right"
                                    align="start"
                                  >
                                    {submenu.submenus.map((subsubmenu: any) => (
                                      <DropdownMenuItem
                                        key={subsubmenu.name}
                                        className="cursor-pointer"
                                        asChild
                                      >
                                        <Link href={subsubmenu.href}>
                                          {subsubmenu.name}
                                        </Link>
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              ) : (
                                <div className="flex items-center gap-x-3">
                                  {submenu.name}
                                </div>
                              )}
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                }

                return (
                  <Link
                    key={childMenu.name}
                    href={childMenu.href}
                    className={cn(
                      childMenu.current
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                      "group flex justify-between items-center gap-x-3 rounded-md p-2 text-lg font-semibold leading-6 ml-9"
                    )}
                  >
                    <div className="flex items-center gap-x-3 text-lg">
                      {childMenu.name}
                    </div>
                  </Link>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <Link
          href={item.href}
          className={cn(
            item.current
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
            "group flex justify-between items-center gap-x-3 rounded-md p-2 text-lg font-semibold leading-6"
          )}
        >
          <div className="flex items-center gap-x-2.5 text-lg">
            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
            {item.name}
          </div>
        </Link>
      )}
    </li>
  );
}
