import { ReactNode, useEffect, useState } from "react"
import { TabsTrigger } from "@radix-ui/react-tabs"
import { ColumnDef } from "@tanstack/react-table"
import { Delete, DeleteIcon, Edit, PlusIcon, Trash } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList } from "../ui/tabs"
import { DataTable, DataTableProps } from "./data-table"

type View = {
  id: number
  name: string
  columnOrder?: string[]
}

interface DataViewsProps<TData, TValue> extends DataTableProps<TData, TValue> {
  initialViews?: View[] // Optional prop to initialize views
}

interface RenameInputProps {
  onSave: (val: string) => void // New prop for saving the value
  value: string
}

const RenameInput = ({ value: initialValue, onSave }: RenameInputProps) => {
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState(initialValue)

  const handleSave = () => {
    onSave(value)
    setEdit(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave()
    }
  }

  if (edit)
    return (
      <Input
        className="h-7 text-xs"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        //onBlur={handleSave} // Save when input loses focus
        autoFocus
      />
    )

  return (
    <Button
      className="gap-2 text-xs"
      variant={"ghost"}
      onClick={() => setEdit(true)}
    >
      <Edit size={14} />
      Rename
    </Button>
  )
}

interface ContextMenuWrapperProps<TData, TValue> {
  children: ReactNode
  view: View
  onChangeView?: (id: number, value: any, identifier: string) => void
  onDeleteView?: (id: number) => void
}

const ContextMenuWrapper = <TData, TValue>({
  children,
  view,
  onChangeView,
  onDeleteView,
}: ContextMenuWrapperProps<TData, TValue>) => {
  const [value, setValue] = useState(view.name)

  const handleSave = (newValue: any) => {
    setValue(newValue)

    onChangeView?.(view.id, newValue, "name")
  }

  return (
    <ContextMenu modal>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="bg-zinc-900">
        <ContextMenuItem
          onSelect={(e) => e.preventDefault()}
          className="gap-2 p-0 text-xs"
        >
          <RenameInput value={value} onSave={handleSave} />
        </ContextMenuItem>
        <ContextMenuItem
          onSelect={(e) => e.preventDefault()}
          className="gap-2 p-0 text-xs"
        >
          <Button
            disabled={view.id === 1}
            className="gap-2 text-xs hover:text-red-800"
            variant={"ghost"}
            onClick={() => onDeleteView?.(view.id)}
          >
            <Trash size={14} /> Delete
          </Button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

const DataViews = <TData, TValue>({
  columns,
  data,
  initialViews = [{ id: 1, name: "Default" }],
  ...props
}: DataViewsProps<TData, TValue>) => {
  const [views, setViews] = useState<View[]>(initialViews)
  const [currentView, setCurrentView] = useState<View>(initialViews[0])

  const handleAddView = () => {
    const newView: View = {
      id: views.length + 1,
      name: `Default ${views.length}`,
    }
    setViews((prevViews) => [...prevViews, newView])
    setCurrentView(newView)
  }

  const handleChangeView = (id: number, value: any, identifier: string) => {
    setViews((prevViews) =>
      prevViews.map((view) =>
        view.id === id ? { ...view, [identifier]: value } : view
      )
    )
  }

  const handleDeleteView = (id: number) => {
    setViews((prevViews) => {
      const latestView = prevViews.filter((view) => view.id != id)
      setCurrentView(latestView[latestView.length - 1])
      return latestView
    })
  }

  const onOrderChange = (orders: string[]) => {
    if (currentView) {
      handleChangeView(currentView.id, orders, "columnOrder")
    }
  }

  return (
    <div>
      <Tabs
        value={String(currentView?.id)}
        onValueChange={(val) =>
          setCurrentView(views.find((view) => view.name === val)!)
        }
        className="grow"
      >
        {views.map((view) => (
          <TabsContent value={String(view.id)} key={view.id}>
            <DataTable
              {...props}
              key={view.id}
              columns={columns}
              data={data}
              showToolbarOnlyOnHover={true}
              extraLeftComponents={
                <TabsList className="gap-2 bg-transparent p-0">
                  {views.map((view) => (
                    <TabsTrigger value={view.name} key={view.id}>
                      <ContextMenuWrapper
                        view={view}
                        onChangeView={handleChangeView}
                        onDeleteView={handleDeleteView}
                      >
                        <Button
                          className={cn(
                            "p-2 text-xs",
                            currentView?.id === view.id && "bg-zinc-800"
                          )}
                          variant={"ghost"}
                          onClick={() => setCurrentView(view)}
                        >
                          {view.name}
                        </Button>
                      </ContextMenuWrapper>
                    </TabsTrigger>
                  ))}
                  <Button
                    onClick={handleAddView}
                    className="px-2"
                    variant="secondary"
                  >
                    <PlusIcon size={14} />
                  </Button>
                </TabsList>
              }
              initialColumnOrder={view.columnOrder ?? undefined}
              onOrderChange={onOrderChange}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default DataViews
