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

const HAWBTable = React.forwardRef<HTMLDivElement, any>(
  (_, ref) => {
    const { data: ordersData } = useOrders({ pagination: { pageIndex: 0, pageSize: 20 }})
    
    const hawbData = ordersData.data.filter((item: any) => item.booking_type.name.toLowerCase() === 'hawb')

    return (
      <div className="flex flex-col gap-3 mt-4 animate-fade-left">
        <DataTable
          columns={TABLE_COLUMN}
          data={hawbData}
          className="border-none [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground [&_th]:px-3 [&_th]:py-2 [&_th]:text-foreground max-h-44 xl:max-h-80 overflow-y-auto custom-scrollbar max-w-[814px]"
          hidePagination
          hideToolbar
          manualPagination
        />
      </div>
    )
  }
)

HAWBTable.displayName = "HAWBTable"

export default HAWBTable
