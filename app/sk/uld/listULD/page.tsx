"use client"

import { useCallback, useState } from "react"
import { DownloadIcon, FilterIcon, RefreshCcwIcon } from "lucide-react"

import { getData } from "@/lib/data"
import { useBookingContext } from "@/components/dashboard/BookingContext"
import { columns, Order } from "@/components/dashboard/columns"
import PageContainer from "@/components/layout/PageContainer"
import ListUldInputHeader from "@/components/uld/list-uld-header"
import UldDetailsTable from "@/components/uld/uld-details-table"

export default function listULD() {
  return (
    <PageContainer className="gap-6 py-8">
      <div className="ml-4 flex w-full justify-between">
        <h2 className="mb-2 text-xl font-semibold">List ULD</h2>
      </div>
      <ListUldInputHeader />
      <UldDetailsTable />
    </PageContainer>
  )
}
