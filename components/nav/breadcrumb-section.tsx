"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { usePathname } from "next/navigation";
import { TSidebarItem } from "./SidebarItem";
import { settingNavigation } from "./data/settingNavigation";
import { defaultNavigation } from "./data/defaultNavigation";
import React from "react";
import { cn } from "@/lib/utils";

const findCurrentPaths = (
  items: TSidebarItem[],
  pathname: string,
  path: { name: string; href: string }[] = []
): { name: string; href: string }[] | null => {
  for (const item of items) {
    // Create a new path array including the current item
    const currentPath = [...path, { name: item.name, href: item.href }];

    // Check if the current item's href matches the pathname
    if (item.href === pathname) {
      return currentPath;
    }

    // If the item has children, search recursively in the children
    if (item.children) {
      const result = findCurrentPaths(item.children, pathname, currentPath);
      if (result) {
        return result;
      }
    }
  }

  // If no match is found in this branch, return null
  return null;
};

const getCurrentPaths = (pathname: string) => {
  let currentPaths: { name: string; href: string }[] = [];
  const navMenus: TSidebarItem[] = [...settingNavigation, ...defaultNavigation];

  // Use the helper function to find the current path
  const result = findCurrentPaths(navMenus, pathname);
  if (result) {
    currentPaths = result;
  }

  return currentPaths;
};

export default function BreadCrumbSection() {
  const pathname = usePathname();

  const currentPaths = getCurrentPaths(pathname);

  return (
    <div className="fixed w-full h-10 flex flex-row items-center px-4 border-b bg-background/90 z-10 backdrop-blur-sm">
      <Breadcrumb>
        <BreadcrumbList>
          {currentPaths.map((path, index) => (
            <React.Fragment key={index}>
              {index !== 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                <BreadcrumbLink
                  className={cn(index === 0 && "text-foreground")}
                  href={path.href}
                >
                  {path.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
