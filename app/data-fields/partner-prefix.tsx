import { useState } from "react"

import { usePartnerPrefixList } from "@/lib/hooks/partner-prefix"
import { DataTable } from "@/components/data-table/data-table"

const PartnerPrefix = () => {
  const [paginationState, setPaginationState] = useState({
    page: 1,
    page_size: 20,
  })

  const { data: partnerPrefixes } = usePartnerPrefixList(paginationState)

  return (
    <DataTable
      columns={[
        { accessorKey: "name", header: "Name" },
        {
          accessorKey: "visibility",
          header: "Visibility",
          accessorFn: () => "Visible",
        },
        {
          accessorKey: "is_default",
          header: "Default",
          accessorFn: () => "No",
        },
      ]}
      tableState={({ pagination }) => {
        setPaginationState({
          page: pagination ? pagination.pageIndex + 1 : 1,
          page_size: pagination?.pageSize ?? 20,
        })
      }}
      data={partnerPrefixes?.data ?? []}
      manualPagination
      pageCount={partnerPrefixes?.total_pages}
    />
  )
}
export default PartnerPrefix
