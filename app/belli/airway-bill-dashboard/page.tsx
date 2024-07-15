"use client"

import { useCallback, useState } from "react"
import { DataTable } from "@components/data-table/data-table"
import { ClientSideSuspense } from "@liveblocks/react/suspense"
import { PaginationState } from "@tanstack/react-table"
import { Loader } from "lucide-react"

import { getData } from "@/lib/data"
import { useOrders, useRemoveOrder } from "@/lib/hooks/orders"
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
import { useBookingContext } from "@/components/dashboard/BookingContext"
import { columns, Order } from "@/components/dashboard/columns"
import NewOrderModal from "@/components/dashboard/new-order-modal"
import LiveCursorHoc from "@/components/liveblocks/live-cursor-hoc"
import createActionColumn from "@/app/k360/organize/masters/components/columnItem"

export default function Home() {
  const data = getData()
  const { selectedBooking, setSelectedBooking } = useBookingContext()
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const {
    isLoading,
    isPending,
    error,
    data: ordersData,
  } = useOrders({ pagination })
  const remove = useRemoveOrder()



  const openModal = (data: Order) => {
    setSelectedBooking(data)
    setModalOpen(true)
  }

  const onShowDelete = (data: any) => {
    setSelectedBooking(data)
    setDeleteConfirm(true)
  }

  const onOpenChange = useCallback((open: boolean) => {
    setModalOpen(open)
  }, [])

  const onDelete = (data: any) => {
    if (data.ID) remove.mutate({ id: data.ID })
    setSelectedBooking(undefined)
  }

  const tableState = useCallback(async ({ pagination }: any) => {
    setPagination(pagination)
  }, [])

  const columnWithActions = [...columns]

  return (
    <div>
      <ClientSideSuspense
        fallback={
          <></>
        }
      >
        <LiveCursorHoc />
      </ClientSideSuspense>
      <DataTable
        initialPinning={{
          left: [],
          right: ["actions"],
        }}
        columns={columnWithActions}
        onRowClick={openModal}
        data={isLoading ? [] : ordersData.data}
        pageCount={isLoading ? 1 : ordersData.total_pages}
        manualPagination={true}
        tableState={tableState}
        className="border-none [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground [&_th]:px-3 [&_th]:py-2 [&_th]:text-foreground"
        menuId="airway-bill-dashboard"
        showToolbarOnlyOnHover={true}
      />
      <NewOrderModal open={modalOpen} onOpenChange={onOpenChange} mode="edit" />
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
