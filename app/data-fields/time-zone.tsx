import { useState } from "react"

import { useTimeZones } from "@/lib/hooks/time-zones"
import { DataTable } from "@/components/data-table/data-table"

const TimeZone = () => {
  const [paginationState, setPaginationState] = useState({
    page: 1,
    page_size: 20,
  })

  const { error, data } = useTimeZones(paginationState)

  if (error) return "An error has occurred: " + error.message

  return (
    <DataTable
      columns={[
        { accessorKey: "name", header: "Name" },
        { accessorKey: "abbreviation", header: "Abbreviation" },
        { accessorKey: "offset", header: "Offset" },
      ]}
      tableState={({ pagination }) => {
        setPaginationState({
          page: pagination ? pagination.pageIndex + 1 : 1,
          page_size: pagination?.pageSize ?? 20,
        })
      }}
      data={data?.data ?? []}
      manualPagination
      pageCount={data?.total_pages}
    />
  )
}
export default TimeZone
