import { useState } from "react"

import { usePartnerCodeList } from "@/lib/hooks/partner-codes"
import { DataTable } from "@/components/data-table/data-table"

const PartnerCode = () => {
  const [paginationState, setPaginationState] = useState({
    page: 1,
    page_size: 20,
  })

  const { data: partnerCodes } = usePartnerCodeList(paginationState)
  return (
    <DataTable
      columns={[
        { accessorKey: "name", header: "Code", size: 40 },
        { accessorKey: "description", header: "Name" },
        {
          header: "Visibility",
          accessorFn: () => "Visible",
          size: 60,
        },
        {
          header: "Default",
          accessorFn: () => "No",
          size: 60,
        },
      ]}
      tableState={({ pagination }) => {
        setPaginationState({
          page: pagination ? pagination.pageIndex + 1 : 1,
          page_size: pagination?.pageSize ?? 20,
        })
      }}
      data={partnerCodes?.data ?? []}
      manualPagination
      pageCount={partnerCodes?.total_pages}
    />
  )
}
export default PartnerCode
