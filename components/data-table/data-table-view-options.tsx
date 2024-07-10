"use client"

import { HTMLAttributes, ReactNode, useState } from "react"
import { Button } from "@components/ui/button"
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  UseSortableArguments,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { Column, Table, VisibilityState } from "@tanstack/react-table"
import { EyeIcon, EyeOffIcon, GripVerticalIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { Popover, PopoverContent } from "../ui/popover"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
  children: ReactNode
  buttonClassName?: HTMLDivElement["className"]
  showHideAll?: boolean
  showShowAll?: boolean
  initialVisibility?: VisibilityState
  onOpenChange: (open: boolean) => void
}

export function DataTableViewOptions<TData>({
  table,
  ...props
}: DataTableViewOptionsProps<TData>) {
  const columns = table.getAllColumns().filter((col) => Boolean(col.accessorFn))

  const activeColumns = columns.filter(
    (column) => column.getIsVisible() === true
  )
  const hiddenColumns = columns.filter(
    (column) => column.getIsVisible() === false
  )

  const [sections, setSections] = useState<{
    [key: string]: Column<TData, unknown>[]
  }>({
    active: activeColumns,
    hidden: hiddenColumns,
  })

  function resetColumnVisibility() {
    table.setColumnVisibility(props.initialVisibility ?? {})

    const defaultVisibleSections = columns.filter(
      (column) => props.initialVisibility?.[column.id] !== false
    )

    const defaultHiddenSections = columns.filter(
      (column) => props.initialVisibility?.[column.id] === false
    )

    setSections({
      active: defaultVisibleSections,
      hidden: defaultHiddenSections,
    })
  }

  const [activeColumnId, setActiveColumndId] = useState<null | string>(null)

  const sensors = useSensors(
    useSensor(ExtendedPointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveColumndId(active.id as string)
  }

  const onHideColumn = (col: Column<TData, unknown>) => {
    console.log(col)

    setSections((sections) => {
      const activeIndex = sections.active.findIndex(
        (column) => column.id === col.id
      )

      if (activeIndex === -1) {
        return sections
      }

      const newActive = sections.active.filter((column) => column.id !== col.id)
      const newHidden = [...sections.hidden, col]

      col.toggleVisibility(false)

      return {
        ...sections,
        active: newActive,
        hidden: newHidden,
      }
    })
  }

  const onShowColumn = (col: Column<TData, unknown>) => {
    setSections((sections) => {
      const hiddenIndex = sections.hidden.findIndex(
        (column) => column.id === col.id
      )

      if (hiddenIndex === -1) {
        return sections
      }

      const newHidden = sections.hidden.filter((column) => column.id !== col.id)
      const newActive = [...sections.active, col]

      // Update the column visibility in the table
      col.toggleVisibility(true)

      return {
        ...sections,
        active: newActive,
        hidden: newHidden,
      }
    })
  }

  const onHideAllColumn = () => {
    setSections((sections) => {
      return {
        active: [],
        hidden: [...sections["active"], ...sections["hidden"]],
      }
    })
    table.toggleAllColumnsVisible(false)
  }

  const onShowAllColumn = () => {
    setSections((sections) => {
      return {
        active: [...sections["active"], ...sections["hidden"]],
        hidden: [],
      }
    })
    table.toggleAllColumnsVisible(true)
  }

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const activeContainer = findSectionContainer(sections, active.id as string)
    const overContainer = findSectionContainer(sections, over?.id as string)

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return
    }

    setSections((section) => {
      const activeItems = section[activeContainer]
      const overItems = section[overContainer]

      const activeIndex = activeItems.findIndex((item) => item.id === active.id)
      const overIndex = overItems.findIndex((item) => item.id !== over?.id)

      return {
        ...section,
        [activeContainer]: [
          ...section[activeContainer].filter((item) => item.id !== active.id),
        ],
        [overContainer]: [
          ...section[overContainer].slice(0, overIndex),
          sections[activeContainer][activeIndex],
          ...section[overContainer].slice(
            overIndex,
            section[overContainer].length
          ),
        ],
      }
    })
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeContainer = findSectionContainer(sections, active.id as string)
    const overContainer = findSectionContainer(sections, over?.id as string)

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return
    }

    const activeIndex = sections[activeContainer].findIndex(
      (col) => col.id === active.id
    )
    const overIndex = sections[overContainer].findIndex(
      (col) => col.id === over?.id
    )

    console.log({ activeContainer, overContainer })

    table
      .getColumn(active.id as string)
      ?.toggleVisibility(overContainer === "hidden" ? false : true)

    if (activeIndex !== overIndex) {
      setSections((section) => {
        const newOrder = arrayMove(
          section[overContainer],
          activeIndex,
          overIndex
        )
        table.setColumnOrder(newOrder.map((col) => col.id))
        return {
          ...section,
          [overContainer]: newOrder,
        }
      })
    }

    setActiveColumndId(null)
  }

  return (
    <Popover onOpenChange={props.onOpenChange}>
      <PopoverTrigger asChild>{props.children}</PopoverTrigger>
      <PopoverContent align="end" className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search for a column" />
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <CommandList className="custom-scrollbar">
              <CommandEmpty>No column found.</CommandEmpty>
              <SortableContext
                id={"active"}
                items={sections.active}
                strategy={verticalListSortingStrategy}
              >
                <CommandGroup>
                  <div className="flex h-fit flex-row items-center justify-between px-2 py-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Active Columns
                    </span>
                    {props.showHideAll && (
                      <Button
                        onClick={onHideAllColumn}
                        variant={"link"}
                        className="h-fit px-0 py-0 text-xs text-button-primary transition-colors hover:no-underline"
                      >
                        Hide All
                      </Button>
                    )}
                  </div>
                  {sections.active.map((column) => (
                    <Draggable key={column.id} args={{ id: column.id }}>
                      <CommandItem
                        key={column.id}
                        value={
                          typeof column?.columnDef?.header === "function"
                            ? (column?.columnDef?.header as () => string)()
                            : String(column.columnDef.header)
                        }
                        className={cn(
                          "flex flex-row items-center justify-between",
                          !column.getCanHide() && "hidden"
                        )}
                      >
                        <div className="flex flex-row items-center gap-2">
                          <GripVerticalIcon className="size-4 text-muted-foreground" />
                          {typeof column?.columnDef?.header === "function"
                            ? (column?.columnDef?.header as () => string)()
                            : String(column.columnDef.header)}
                        </div>
                        <button
                          data-no-dnd="true"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            onHideColumn(column)
                          }}
                        >
                          <EyeIcon className="z-50 size-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground" />
                        </button>
                      </CommandItem>
                    </Draggable>
                  ))}
                </CommandGroup>
              </SortableContext>
              <SortableContext
                id={"hidden"}
                items={sections.hidden}
                strategy={verticalListSortingStrategy}
              >
                <CommandGroup>
                  <div className="flex h-fit flex-row items-center justify-between px-2 py-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Hidden Columns
                    </span>
                    {props.showShowAll && (
                      <Button
                        onClick={onShowAllColumn}
                        variant={"link"}
                        className="h-fit px-0 py-0 text-xs text-button-primary transition-colors hover:no-underline"
                      >
                        Show All
                      </Button>
                    )}
                  </div>
                  {sections.hidden.map((column) => (
                    <Draggable key={column.id} args={{ id: column.id }}>
                      <CommandItem
                        key={column.id}
                        value={
                          typeof column?.columnDef?.header === "function"
                            ? (column?.columnDef?.header as () => string)()
                            : String(column.columnDef.header)
                        }
                        className="flex flex-row items-center justify-between"
                      >
                        <div className="flex flex-row items-center gap-2">
                          <GripVerticalIcon className="size-4 text-muted-foreground" />
                          {typeof column?.columnDef?.header === "function"
                            ? (column?.columnDef?.header as () => string)()
                            : String(column.columnDef.header)}
                        </div>
                        <button
                          data-no-dnd="true"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            onShowColumn(column)
                          }}
                        >
                          <EyeOffIcon className="z-50 size-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground" />
                        </button>
                      </CommandItem>
                    </Draggable>
                  ))}
                  <div className="px-2 py-1">
                    <Button
                      variant={"link"}
                      className="h-fit px-0 py-0 text-xs text-button-primary transition-colors hover:no-underline"
                      onClick={resetColumnVisibility}
                    >
                      Reset Columns to Default
                    </Button>
                  </div>
                </CommandGroup>
              </SortableContext>
            </CommandList>
          </DndContext>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function Draggable({
  children,
  args,
  ...props
}: HTMLAttributes<HTMLDivElement> & { args: UseSortableArguments }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable(args)

  const style = {
    transform: transform ? `translate3d(0, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 30 : undefined,
  }

  return (
    <div
      draggable
      ref={setNodeRef}
      style={style}
      {...props}
      className={cn(
        "h-full w-full hover:cursor-grab active:cursor-grabbing",
        props.className
      )}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  )
}

function findSectionContainer<TData>(
  sections: { [key: string]: Column<TData, unknown>[] },
  id: string
) {
  if (id in sections) {
    return id
  }

  const container = Object.keys(sections).find((key) =>
    sections[key].find((item) => item.id === id)
  )
  return container
}

export class ExtendedPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: "onPointerDown" as const,
      handler: ({ nativeEvent: event }: { nativeEvent: PointerEvent }) => {
        return shouldHandleEvent(event.target as HTMLElement)
      },
    },
  ]
}

function shouldHandleEvent(element: HTMLElement | null) {
  let cur = element

  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false
    }
    cur = cur.parentElement
  }

  return true
}
