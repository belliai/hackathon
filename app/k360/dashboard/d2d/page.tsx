"use client"

import { useCallback, useState } from "react"
import { DataTable } from "@components/data-table/data-table"
import { DownloadIcon, FilterIcon, RefreshCcwIcon } from "lucide-react"

import { getData } from "@/lib/data"
import { useBookingContext } from "@/components/dashboard/BookingContext"
import { columns, Order } from "@/components/dashboard/columns"
import DelivertyStatus from "@/components/dashboard/delivery-status"
import FilterBar from "@/components/dashboard/filterbar"
import NewOrderModal from "@/components/dashboard/new-order-modal"
import PendingDeliveriesD2D from "@/components/dashboard/pending-deliveries-d2d"
import SummaryBar from "@/components/dashboard/select-summary"
import Stats from "@/components/dashboard/stats"
import PageContainer from "@/components/layout/PageContainer"

export default function D2D() {
  const data = getData()
  const { setSelectedBooking } = useBookingContext()
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (data: Order) => {
    setSelectedBooking(data)
    setModalOpen(true)
  }

  const onOpenChange = useCallback((open: boolean) => {
    setModalOpen(open)
  }, [])

  return (
    <PageContainer className="gap-6 py-8">
      <SummaryBar
        onTypeChange={(type: string) => {
          //handle change of type
        }}
        onDateButtonClick={(date: string) => {
          // handle date selection
        }}
      />
      <DelivertyStatus />
      <Stats />
      <div>
        <PendingDeliveriesD2D />
      </div>
      <NewOrderModal open={modalOpen} onOpenChange={onOpenChange} />
    </PageContainer>
  )
}
