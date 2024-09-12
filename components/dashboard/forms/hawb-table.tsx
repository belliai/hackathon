"use client"

import React from "react"
import { DataTable } from "@components/data-table/data-table"

import { useOrders } from "@/lib/hooks/orders"

const TABLE_COLUMN = [
  { header: "HAWB", accessorKey: "awb" },
  { header: "From", accessorKey: "origin.name" },
  { header: "To", accessorKey: "destination.name" },
  { header: "Weight", accessorKey: "gs_weight_kg" },
  { header: "Volume", accessorKey: "volume_kg" },
  { header: "Total", accessorKey: "total" },
]

const HAWBTable = React.forwardRef<HTMLDivElement, any>((_, ref) => {
  const { data: ordersData } = useOrders({ page: 1, page_size: 99 })

  const hawbData = ordersData?.data
    .flatMap((item) => item.object)
    .filter((item: any) => item.booking_type.name.toLowerCase() === "hawb")

  return (
    <div className="mt-4 flex animate-fade-left flex-col gap-3">
      <DataTable
        columns={TABLE_COLUMN}
        data={hawbData ?? []}
        className="custom-scrollbar max-h-44 max-w-[814px] overflow-y-auto border-none xl:max-h-80 [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground [&_th]:px-3 [&_th]:py-2 [&_th]:text-foreground"
        hidePagination
        hideToolbar
        manualPagination
      />
    </div>
  )
})

HAWBTable.displayName = "HAWBTable"

export default HAWBTable
