"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { DataTable } from "@components/data-table/data-table"
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

import CustomKanban, { Shipment } from "./kanban"
import LoadPlanning from "./load-planning"

const AWBTabsList = ({ tabValue }: { tabValue: string }) => (
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
  const tabParam = searchParams.get("tab")
  const { selectedBooking, setSelectedBooking } = useBookingContext()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"edit" | "create">("create")
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [selectedColumnId, setSelectedColumnId] = useState("")
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [tabValue, setTabValue] = useState("list-view") // If no tabParam, default to list-view

  const {
    isLoading,
    isPending,
    error,
    data: ordersData,
  } = useOrders({ pagination })
  const remove = useRemoveOrder()

  const [cards, setCards] = useState<Shipment[]>(ordersData?.data || [])

  useEffect(() => {
    setCards(ordersData?.data || [])
  }, [ordersData])

  const openModal = (data: OrderRes, columnId: string) => {
    console.error("opening modal from airwaybill", data)
    setSelectedBooking(data)
    setSelectedColumnId(columnId)
    setModalOpen(true)
    if (data) setModalType("edit")
  }

  const onShowDelete = (data: any) => {
    setSelectedBooking(data)
    setDeleteConfirm(true)
  }

  const onOpenChange = useCallback((open: boolean) => {
    setModalOpen(open)
    if (!open) setSelectedColumnId("")
  }, [])

  const onDelete = (data: any) => {
    if (data.ID) remove.mutate({ id: data.ID })
    setSelectedBooking(undefined)
  }

  const tableState = useCallback(async ({ pagination }: any) => {
    setPagination(pagination)
  }, [])

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

  const columnWithActions = columns.map((column) => ({
    ...column,
    cell: ({
      row: { original, getValue },
      column: { id },
    }: {
      row: { original: any; getValue: (id: string) => any }
      column: { id: string }
    }) => {
      const columnValue =
        original.booking_type?.name?.toLowerCase() === "mawb" && id === "hawb"
          ? "567-56789012"
          : original.booking_type?.name?.toLowerCase() === "hawb" &&
              id === "mawb"
            ? "345-34567890"
            : getValue(id)

      return (
        <div onClick={() => openModal(original, id)} className="cursor-pointer">
          {columnValue}
        </div>
      )
    },
  }))

  const memoizedTabsList = useMemo(
    () => <AWBTabsList tabValue={tabValue} />,
    [tabValue]
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
            initialPinning={{
              left: [],
              right: ["actions"],
            }}
            columns={columnWithActions}
            data={isLoading ? [] : ordersData?.data}
            pageCount={isLoading ? 1 : ordersData.total_pages}
            manualPagination={true}
            tableState={tableState}
            className="border-none [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground [&_th]:px-3 [&_th]:py-2 [&_th]:text-foreground"
            menuId="airway-bill-dashboard"
            showToolbarOnlyOnHover={true}
            extraRightComponents={generateButton}
            isCanExport={true}
            onExport={() =>
              onExport({ data: ordersData.data, filename: "AirwaybillsData" })
            }
            extraLeftComponents={memoizedTabsList}
          />
        </TabsContent>
        <TabsContent value="kanban-view" asChild>
          <>
            <div className="flex items-center justify-between gap-2">
              {memoizedTabsList}
              <ActionButtons />
            </div>
            <CustomKanban
              ordersData={ordersData}
              cards={cards}
              setCards={setCards}
            />
          </>
        </TabsContent>
        <TabsContent value="load-planning" asChild>
          <>
            <div className="flex justify-between items-center gap-2">
              {memoizedTabsList}
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
