"use client"

import { useCallback, useState } from "react"
import { DownloadIcon, FilterIcon, RefreshCcwIcon } from "lucide-react"

import { getData } from "@/lib/data"
import { useBookingContext } from "@/components/dashboard/BookingContext"
import { columns, Order } from "@/components/dashboard/columns"
import PageContainer from "@/components/layout/PageContainer"
import UldDetailsForm from "@/components/uld/uld-details-form"

export default function listULD() {
  return (
    <PageContainer className="gap-6 py-8">
      <div className="ml-4 flex w-full justify-between">
        <h2 className="mb-2 text-xl font-semibold">ULD Details</h2>
      </div>
      <UldDetailsForm />
    </PageContainer>
  )
}
