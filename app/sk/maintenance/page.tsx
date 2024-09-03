"use client"

import { useCallback, useState } from "react"

import { Order } from "@/types/orders"
import { getData } from "@/lib/data"
import { useBookingContext } from "@/components/dashboard/BookingContext"
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
