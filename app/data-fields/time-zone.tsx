import { useCallback, useMemo, useState } from "react"
import { PaginationState } from "@tanstack/react-table"

import {
  useAddTimeZone,
  useRemoveTimeZone,
  useTimeZones,
  useUpdateTimeZone,
} from "@/lib/hooks/time-zones"

import CrudTable from "./components/crud-table"

const TimeZone = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const paginationDetails = useMemo(
    () => ({
      page: pagination.pageIndex === 0 ? 1 : pagination.pageIndex + 1,
      page_size: pagination.pageSize,
    }),
    [pagination]
  )

  const tableState = useCallback(async ({ pagination }: any) => {
    setPagination(pagination)
  }, [])

  const { isLoading, isPending, error, data } = useTimeZones({
    ...paginationDetails,
  })
  const update = useUpdateTimeZone()
  const add = useAddTimeZone()
  const remove = useRemoveTimeZone()

  if (error) return "An error has occurred: " + error.message

  const tableProps = {
    pageCount:  data?.total_pages,
    manualPagination: true,
    tableState,
    hidePagination: false
  }

  return (
    <CrudTable
      {...tableProps}
      isLoading={isLoading || isPending}
      title="Time Zone"
      columns={[
        { accessorKey: "option", header: "Name" },
        { accessorKey: "abbreviation", header: "Abbreviation" },
        { accessorKey: "offset", header: "Offset" },
      ]}
      form={[
        { name: "id", type: "hidden" },
        { name: "option", type: "text", label: "Time Zone" },
        { name: "abbreviation", type: "text", label: "Abbreviation" },
        { name: "offset", type: "text", label: "Abbreviation" },
      ]}
      data={
        data &&
        data.data?.map((item: any) => ({
          option: item.name,
          id: item.ID,
          abbreviation: item.abbreviation,
          offset: item.offset,
        }))
      }
      onSave={(data) => {
        // configure logic for add or edit, for edit the id will be zero
        const { id, option } = data
        if (id) {
          update.mutate({ id, name: option })
        } else {
          add.mutate({ name: option })
        }
      }}
      onDelete={(data) => {
        // configure logic for delete
        if (data.id) {
          remove.mutate({ id: data.id })
        }
      }}
    />
  )
}
export default TimeZone
