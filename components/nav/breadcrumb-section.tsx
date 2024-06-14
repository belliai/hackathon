"use client";

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
import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Path, useFavorites } from "./favorites/favorites-provider";
import { k360Navigation } from "./data/k360Navigation";

const findCurrentPaths = (
  items: TSidebarItem[],
  pathname: string,
  path: TSidebarItem[] = []
): TSidebarItem[] | null => {
  for (const item of items) {
    // Create a new path array including the current item
    const currentPath: TSidebarItem[] = [
      ...path,
      { name: item.name, href: item.href, children: undefined },
    ];

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
  let currentPaths: TSidebarItem[] = [];
  const navMenus: TSidebarItem[] = [
    ...settingNavigation,
    ...defaultNavigation,
    ...k360Navigation,
  ];

  // Use the helper function to find the current path
  const result = findCurrentPaths(navMenus, pathname);
  if (result) {
    currentPaths = result;
  }

  return currentPaths;
};

export default function BreadCrumbSection() {
  const pathname = usePathname();
  const { insertPath, isPathFavorited, deletePathByHref, favorites } =
    useFavorites();

  const isFavorited = useMemo(
    () => isPathFavorited(pathname),
    [pathname, favorites, isPathFavorited]
  );

  const currentPaths = getCurrentPaths(pathname);

  return (
    <div className="fixed w-full h-12 flex flex-row items-center gap-4 px-4 border-b bg-background/90 z-10 backdrop-blur-sm">
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
      <Button
        onClick={() => {
          if (isFavorited) {
            deletePathByHref(pathname);
            return;
          }
          insertPath(currentPaths.at(-1) as Path);
        }}
        variant={"ghost"}
        size={"icon"}
        className="h-6 w-6 text-muted-foreground"
      >
        <StarIcon
          className="size-4"
          fill={isFavorited ? "hsl(var(--foreground))" : undefined}
        />
      </Button>
    </div>
  );
}
