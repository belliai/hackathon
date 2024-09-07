import { ReactNode, useEffect, useRef, useState } from "react"
import { TabsTrigger } from "@radix-ui/react-tabs"
import { ColumnDef } from "@tanstack/react-table"
import { Delete, DeleteIcon, Edit, PlusIcon, Trash } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
} from "../ui/alert-dialog"
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
  const inputRef = useRef<HTMLInputElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const handleSave = () => {
    if (value.trim()) {
      onSave(value);
    }
    setEdit(false);
  }

  const handleCancel = () => {
    setValue(initialValue); // Revert to the original value
    setEdit(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }

    // Stop the keydown event from propagating to the parent
    e.stopPropagation();
  };

  
  useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.focus();
    }

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (wrapperRef.current?.contains(e.target as Node)) {
        // Mouse is inside the wrapper
        return;
      }

      // Mouse is outside the wrapper; input should stay focused
      if (edit) {
        // Prevent focus loss due to mouse movement
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    if (edit) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [edit]);

  const handleMouseOver = () => {
    if (edit && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div ref={wrapperRef}
    onMouseOver={handleMouseOver}
    >
      {edit ? (
        <Input
          ref={inputRef}
          className="h-7 text-xs"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <Button
          className="gap-2 text-xs"
          variant={"ghost"}
          onClick={() => setEdit(true)}
        >
          <Edit size={14} />
          Rename
        </Button>
      )}
    </div>
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
  const [deleteWarningOpen, setDeleteWarningOpen] = useState(false)
  const [contextMenuOpen, setContextMenuOpen] = useState(false);


  const handleSave = (newValue: any) => {
    setValue(newValue)
    onChangeView?.(view.id, newValue, "name")
  }

  return (
    <ContextMenu  modal={deleteWarningOpen ? false : true}>
      <ContextMenuTrigger >{children}</ContextMenuTrigger>
      <ContextMenuContent
        className="bg-zinc-900"
        onKeyDown={(e)=>e.preventDefault()}
      >
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
            className=" items-start gap-2 text-xs hover:text-red-800 hover:bg-transparent"
            variant={"ghost"}
            onClick={() => setDeleteWarningOpen(true)}
          >
            <Trash size={14} /> Delete
          </Button>
        </ContextMenuItem>
      </ContextMenuContent>
      <AlertDialog
        open={deleteWarningOpen}
        onOpenChange={(isOpen) => {
          setDeleteWarningOpen(isOpen)
          if (!isOpen) {
            // Ensure pointer-events are reset when the dialog closes
            document.body.style.pointerEvents = "auto"
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure want to delete this view?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant={"button-primary"}
              onClick={async () => {
                try {
                  onDeleteView?.(view.id)
                  setDeleteWarningOpen(false)
                } catch (e) {
                  console.log(e)
                }
              }}
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
                            "h-8 gap-0 rounded-md p-2 text-xs",
                            currentView?.id === view.id &&
                              "border-[#fb5727] border-opacity-15 bg-[#fb5727] bg-opacity-5 text-button-primary hover:bg-[#fb5727] hover:bg-opacity-20 hover:text-button-primary"
                          )}
                          variant={"outline"}
                          onClick={() => setCurrentView(view)}
                        >
                          {view.name}
                        </Button>
                      </ContextMenuWrapper>
                    </TabsTrigger>
                  ))}
                  <Button
                    onClick={handleAddView}
                    size={"icon"}
                    className="h-8 w-8 px-2"
                    variant="outline"
                  >
                    <PlusIcon className="h-4 w-4" />
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
