"use client"

import { useCallback, useState } from "react"
import { DataTable } from "@components/data-table/data-table"
import { DownloadIcon, FilterIcon, RefreshCcwIcon } from "lucide-react"

import { getData } from "@/lib/data"
import BarGraph from "@/components/dashboard/bar-graph-wpm"
import { BookingCount } from "@/components/dashboard/booking-count"
import { useBookingContext } from "@/components/dashboard/BookingContext"
import { columns, Order } from "@/components/dashboard/columns"
import FilterBar from "@/components/dashboard/filterbar"
import NewOrderModal from "@/components/dashboard/new-order-modal"
import Stats from "@/components/dashboard/stats"
import PageContainer from "@/components/layout/PageContainer"

export default function WPM() {
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

  const handleSelect = (option: string) => {
    console.log("Selected option:", option)
  }

  return (
    <PageContainer className="gap-6 py-8">
      <BarGraph onSelect={handleSelect} />
      <div className="ml-4 flex w-full justify-between">
        <h2 className="mb-2 text-xl font-semibold">A2A Bookings Count</h2>
        <h2 className="mb-2 text-xl font-semibold">D2D Bookings Count</h2>
      </div>
      <div className="ml-4 flex">
        <BookingCount />
        <BookingCount />
      </div>
      <NewOrderModal open={modalOpen} onOpenChange={onOpenChange} />
    </PageContainer>
  )
}
