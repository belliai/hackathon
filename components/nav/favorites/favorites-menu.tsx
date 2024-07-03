"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import SidebarItem from "../SidebarItem";
import {
  ChevronRight,
  FolderPlusIcon,
  GripVerticalIcon,
  StarIcon,
  XIcon,
} from "lucide-react";
import {
  Folder,
  Path,
  isFolder,
  isPath,
  useFavorites,
} from "./favorites-provider";
import FavoriteFolderItem from "./favorite-folder-item";
import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { getIconByHref } from "../data/operationsNavigation";

export default function FavoritesMenu() {
  const {
    favorites,
    setFavorites,
    insertFolder,
    deletePathByHref,
    findItemById,
    findParentById,
  } = useFavorites();

  const [openFolders, setOpenFolders] = useState<string[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const activeItem = findItemById(active.id as string);
    if (!activeItem || isFolder(activeItem)) return;

    const overItem = findItemById(over?.id as string);
    const overParent = findParentById(over?.id as string);

    console.log({ overItem, overParent });

    // If active item is dragged over the root level
    if (!overParent && overItem && !isFolder(overItem)) {
      setFavorites((prev) => {
        const next = [...prev];
        const activeParent = findParentById(active.id as string);

        if (activeParent) {
          // Remove active item from its parent
          const activeParentIndex = next.findIndex(
            (item) => item.id === activeParent.id
          );
          activeParent.children = activeParent.children.filter(
            (item) => item.id !== active.id
          );
          next[activeParentIndex] = activeParent;
        } else {
          // Remove active item from root level
          next.splice(
            next.findIndex((item) => item.id === active.id),
            1
          );
        }

        // Add active item to the root level
        next.push(activeItem);
        return next;
      });
    } else if (overItem && isFolder(overItem)) {
      console.log("tes");

      setFavorites((prev) => {
        const next = [...prev];
        const activeParent = findParentById(active.id as string);

        if (activeParent) {
          // Remove active item from its parent
          const activeParentIndex = next.findIndex(
            (item) => item.id === activeParent.id
          );
          activeParent.children = activeParent.children.filter(
            (item) => item.id !== active.id
          );
          next[activeParentIndex] = activeParent;
        } else {
          // Remove active item from root level
          next.splice(
            next.findIndex((item) => item.id === active.id),
            1
          );
        }

        // Add active item to the new parent
        const overIndex = next.findIndex((item) => item.id === overItem.id);
        overItem.children.push(activeItem);
        next[overIndex] = overItem;

        return next;
      });
    }
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setFavorites((prev) => {
        const next = [...prev];
        const activeItem = findItemById(active.id as string);
        const overItem = findItemById(over?.id as string);

        if (!activeItem) return prev;

        const activeParent = findParentById(active.id as string);
        const overParent = findParentById(over?.id as string);

        if (activeParent && overParent && activeParent.id === overParent.id) {
          // Move within the same parent
          const parentIndex = next.findIndex(
            (item) => item.id === activeParent.id
          );
          activeParent.children = arrayMove(
            activeParent.children,
            activeParent.children.findIndex((item) => item.id === active.id),
            activeParent.children.findIndex((item) => item.id === over?.id)
          );
          next[parentIndex] = activeParent;
        } else {
          if (activeParent) {
            // Remove active item from its current parent
            const activeParentIndex = next.findIndex(
              (item) => item.id === activeParent.id
            );
            activeParent.children = activeParent.children.filter(
              (item) => item.id !== active.id
            );
            next[activeParentIndex] = activeParent;
          } else {
            // Remove active item from root level
            next.splice(
              next.findIndex((item) => item.id === active.id),
              1
            );
          }

          if (overParent && isPath(activeItem)) {
            // Add active item to the new parent
            const overParentIndex = next.findIndex(
              (item) => item.id === overParent.id
            );
            overParent.children.splice(
              overParent.children.findIndex((item) => item.id === over?.id),
              0,
              activeItem
            );
            next[overParentIndex] = overParent;
          } else {
            // Add active item to the root level
            next.splice(
              next.findIndex((item) => item.id === over?.id),
              0,
              activeItem
            );
          }
        }

        return next;
      });
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      sensors={sensors}
    >
      <Accordion
        type="single"
        collapsible
        defaultValue="favorites"
        className="space-y-1"
      >
        <AccordionItem className="border-b-0" value="favorites">
          <AccordionTrigger
            customarrow={<></>}
            className="border-b-0 py-2 px-[5px] text-xs text-muted-foreground hover:no-underline justify-between gap-2 [&[data-state=open]>div>svg]:rotate-90 [&[data-state=open]>svg]:rotate-0"
          >
            <div className="inline-flex items-center gap-2">
              <span>Favorites</span>
              <ChevronRight className="h-3 w-3 shrink-0 transition-transform duration-200 text-muted-foreground" />
            </div>
            <FolderPlusIcon
              onClick={(e) => {
                e.stopPropagation();
                insertFolder("New Folder");
              }}
              className="size-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            />
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <SortableContext
              items={favorites}
              strategy={verticalListSortingStrategy}
            >
              <Accordion
                type="multiple"
                className="space-y-1"
                value={openFolders}
                onValueChange={setOpenFolders}
              >
                {favorites.map((item) => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    deletePathByHref={deletePathByHref}
                    openFolders={openFolders}
                  />
                ))}
              </Accordion>
            </SortableContext>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </DndContext>
  );
}

interface SortableItemProps {
  item: Folder | Path;
  deletePathByHref: (href: string) => void;
  openFolders: string[];
}

export const SortableItem: React.FC<SortableItemProps> = ({
  item,
  deletePathByHref,
  openFolders,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 30 : undefined,
  };

  if (isFolder(item)) {
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <FavoriteFolderItem
          item={item}
          active={openFolders.includes(item.id)}
        />
      </div>
    );
  }

  if (isPath(item)) {
    const itemIcon =  getIconByHref(item.href)
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="group relative h-fit w-full !overflow-visible"
      >
        <GripVerticalIcon className="size-4 opacity-0 text-muted transition-opacity group-hover:opacity-100 absolute -left-4 top-1/2 -translate-y-1/2" />
        <SidebarItem
          item={{ ...item, icon: itemIcon ?? StarIcon }}
          active={false}
          disabled={isDragging}
        />

        <XIcon
          role="button"
          onClick={(e) => {
            e.stopPropagation();
            deletePathByHref(item.href);
          }}
          className="size-3 text-foreground opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 right-1.5 -translate-y-1/2"
        />
      </div>
    );
  }

  return null;
};
