import React, { createContext, useContext, useMemo } from "react"
import type { CSSProperties, PropsWithChildren } from "react"
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"

import { cn } from "@/lib/utils"
import { TableRow } from "@/components/ui/table"

interface Props {
  id: UniqueIdentifier
}

interface Context {
  attributes: Record<string, any>
  listeners: DraggableSyntheticListeners
  ref(node: HTMLElement | null): void
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
})

export function SortableRow({
  children,
  id,
  ...props
}: PropsWithChildren<Props & React.HTMLAttributes<HTMLTableRowElement>>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id })
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  )
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <SortableItemContext.Provider value={context}>
      <TableRow
        {...props}
        className={cn(props.className, "SortableItem")}
        ref={setNodeRef}
        style={style}
      >
        {children}
      </TableRow>
    </SortableItemContext.Provider>
  )
}

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext)

  return (
    <button className="cursor-move" {...attributes} {...listeners} ref={ref}>
      <GripVertical size={16} />
    </button>
  )
}
