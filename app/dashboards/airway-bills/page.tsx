"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { DataTable } from "@components/data-table-v2/data-table"
import { ClientSideSuspense } from "@liveblocks/react/suspense"
import { PlusIcon } from "@radix-ui/react-icons"
import { PaginationState } from "@tanstack/react-table"
import {
  BoxesIcon,
  CogIcon,
  EyeIcon,
  HomeIcon,
  ListFilterIcon,
  SearchIcon,
  SquareKanbanIcon,
} from "lucide-react"

import { Order as OrderRes } from "@/types/orders"
import { useOrders, useRemoveOrder } from "@/lib/hooks/orders"
import { useTableState } from "@/lib/hooks/tables/table-state"
import { onExport } from "@/lib/utils/export"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBookingContext } from "@/components/dashboard/BookingContext"
import { columns } from "@/components/dashboard/columns"
import NewOrderSideModal from "@/components/dashboard/new-order-side-modal"
import LiveCursorHoc from "@/components/liveblocks/live-cursor-hoc"

import CustomKanban from "./kanban"
import LoadPlanning from "./load-planning"

const AWBTabsList = () => (
  <TabsList className="gap-2 bg-transparent p-0">
    <TabsTrigger
      className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
      value="list-view"
    >
      <HomeIcon className="mr-2 size-4" />
      List View
    </TabsTrigger>
    <TabsTrigger
      className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
      value="kanban-view"
    >
      <SquareKanbanIcon className="mr-2 size-4" />
      Kanban View
    </TabsTrigger>
    <TabsTrigger
      className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
      value="load-planning"
    >
      <BoxesIcon className="mr-2 size-4" />
      Load Planning
    </TabsTrigger>
  </TabsList>
)

export default function Home() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { selectedBooking, setSelectedBooking } = useBookingContext()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"edit" | "create">("create")
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [selectedColumnId, setSelectedColumnId] = useState("")

  const [tabValue, setTabValue] = useState("list-view") // If no tabParam, default to list-view

  const remove = useRemoveOrder()

  const tableStateProps = useTableState({})
  const { pagination, sort } = tableStateProps

  const { data: ordersData, refetch } = useOrders({ ...pagination, ...sort })

  const openModal = (data: OrderRes, columnId: string) => {
    console.error("opening modal from airwaybill", data)
    setSelectedBooking(data)
    setSelectedColumnId(columnId)
    setModalOpen(true)
    if (data) setModalType("edit")
  }

  const onOpenChange = useCallback((open: boolean) => {
    setModalOpen(open)
    if (!open) setSelectedColumnId("")
  }, [])

  const onDelete = (data: any) => {
    if (data.ID) remove.mutate({ id: data.ID })
    setSelectedBooking(undefined)
  }

  const generateButton = (
    <Button
      size={"sm"}
      variant={"button-primary"}
      className="p-2 text-xs"
      onClick={() => {
        setModalOpen(true)
        setModalType("create")
      }}
      style={{ fontSize: "0.875rem" }}
    >
      <PlusIcon className="mr-2 size-4" />
      New Order
    </Button>
  )

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const setSearchParams = (key: string, value: string) => {
    router.push(pathname + "?" + createQueryString(key, value))
  }

  const ActionButtons = () => (
    <div
      className="ml-auto flex items-center gap-2"
      style={{ marginRight: "-7.5px" }}
    >
      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8 opacity-75 hover:opacity-100"
      >
        <ListFilterIcon className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8 opacity-75 hover:opacity-100"
      >
        <SearchIcon className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8 opacity-75 hover:opacity-100"
      >
        <EyeIcon className="h-4 w-4" />
      </Button>
      {generateButton}
    </div>
  )

  return (
    <div>
      <ClientSideSuspense fallback={<></>}>
        <LiveCursorHoc />
      </ClientSideSuspense>
      <Tabs value={tabValue} onValueChange={setTabValue} className="space-y-4">
        <TabsContent value="list-view" asChild>
          <DataTable
            data={ordersData}
            onCellClick={(row, col) => openModal(row, col.real_column_name)}
            extraLeftComponents={<AWBTabsList />}
            extraRightComponents={generateButton}
            onRefetchData={refetch}
            tableKey="dashboard_airway_bills"
            {...tableStateProps}
          />
        </TabsContent>
        <TabsContent value="kanban-view" asChild>
          <>
            <div className="flex items-center justify-between gap-2">
              {<AWBTabsList />}
              <ActionButtons />
            </div>
            <CustomKanban />
          </>
        </TabsContent>
        <TabsContent value="load-planning" asChild>
          <>
            <div className="flex items-center justify-between gap-2">
              {<AWBTabsList />}
              <ActionButtons />
            </div>
            <LoadPlanning />
          </>
        </TabsContent>
      </Tabs>
      <NewOrderSideModal
        onOpenChange={onOpenChange}
        open={modalOpen}
        mode={modalType}
        selectedColumnId={selectedColumnId}
      />
      <AlertDialog open={deleteConfirm} onOpenChange={setDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the order
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(selectedBooking)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
