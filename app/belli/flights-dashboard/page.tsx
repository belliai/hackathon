"use client"

import { useFlightList } from "@/lib/hooks/flight-master/flight-master"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/app/belli/flight-master/components/column"

export default function FlightsDashboardPage() {
  const { data: flights, isLoading } = useFlightList({
    page: 1,
    page_size: 10,
  })

  const flightsData = flights?.data || []

  return (
    <DataTable
      initialPinning={{
        left: [],
        right: ["actions"],
      }}
      columns={columns(
        (data) => {},
        (data) => {}
      )}
      initialVisibility={{
        updated_at: false,
        updated_by: false,
        created_at: false,
        sector: false,
      }}
      data={flightsData}
      pageCount={isLoading ? 1 : flights?.total_pages || 1}
      manualPagination={true}
      className="border-none [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground [&_th]:px-3 [&_th]:py-2 [&_th]:text-foreground"
    />
  )
}
