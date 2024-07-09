"use client"

import { useCallback, useMemo, useState } from "react"
import { PaginationState } from "@tanstack/react-table"

import { useFlightList } from "@/lib/hooks/flight-master/flight-master"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/app/belli/flight-master/components/column"

export default function FlightsDashboardPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const tableState = useCallback(async ({ pagination }: any) => {
    setPagination(pagination)
  }, [])

  const paginationDetails = useMemo(
    () => ({
      page: pagination.pageIndex === 0 ? 1 : pagination.pageIndex + 1,
      page_size: pagination.pageSize,
    }),
    [pagination]
  )

  const { data: flights, isLoading } = useFlightList(paginationDetails)

  const flightsData = flights?.data || []

  return (
    <div style={{ marginTop: '10px' }}>
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
        pageCount={isLoading ? 1 : flights?.total_pages}
        manualPagination={true}
        tableState={tableState}
        className="border-none [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground [&_th]:px-3 [&_th]:py-2 [&_th]:text-foreground"
        menuId="flight-dashboard"
      />
    </div>
  )  
}
