"use client"

import { useFlightList } from "@/lib/hooks/flight-master/flight-master"
import { useOrders } from "@/lib/hooks/orders"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/app/belli/flight-master/components/column"
import createActionColumn from "@/app/k360/organize/masters/components/columnItem"

export default function FlightsDashboardPage() {
  const { data: flights, isLoading } = useFlightList({
    page: 1,
    page_size: 10,
  })

  const flightsData = flights?.data || []

  const columnWithActions = [
    ...columns(
      (data) => {},
      (data) => {}
    ),
    createActionColumn({
      items: [],
    }),
  ]

  return (
    <DataTable
      initialPinning={{
        left: [],
        right: ["actions"],
      }}
      columns={columnWithActions}
      data={flightsData}
      pageCount={isLoading ? 1 : flights?.total_pages || 1}
      manualPagination={true}
      className="border-none [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground [&_th]:px-3 [&_th]:py-2 [&_th]:text-foreground"
    />
  )
}
