"use client"

import { useCallback, useState } from "react"
import { DownloadIcon, FilterIcon, RefreshCcwIcon } from "lucide-react"

import { getData } from "@/lib/data"
import { useBookingContext } from "@/components/dashboard/BookingContext"
import { columns, Order } from "@/components/dashboard/columns"
import PageContainer from "@/components/layout/PageContainer"
import ListUcrInputHeader from "@/components/uld/list-ucr-header"
import UcrDetailsTable from "@/components/uld/ucr-details-table"

export default function listUCR() {
  return (
    <PageContainer className="gap-6 py-8">
      <ListUcrInputHeader />
      <UcrDetailsTable />
    </PageContainer>
  )
}
