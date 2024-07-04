"use client"

import { useCallback, useState } from "react"
import { DataTable } from "@components/data-table/data-table"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { DownloadIcon, FilterIcon, RefreshCcwIcon } from "lucide-react"

import { getData } from "@/lib/data"
import { useBookingContext } from "@/components/dashboard/BookingContext"
import { columns, Order } from "@/components/dashboard/columns"
import DelivertyStatus from "@/components/dashboard/delivery-status"
import FilterBar from "@/components/dashboard/filterbar"
import NewOrderModal from "@/components/dashboard/new-order-modal"
import PendingDeliveriesA2A from "@/components/dashboard/pending-deliveries-a2a"
import SummaryBar from "@/components/dashboard/select-summary"
import Stats from "@/components/dashboard/stats"
import PageContainer from "@/components/layout/PageContainer"
import FormSection from "@/components/maintenance/information-table"
import InputHeader from "@/components/maintenance/input-header"

export default function MaintainAWB() {
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
      <InputHeader />
      <FormSection />
    </PageContainer>
  )
}
