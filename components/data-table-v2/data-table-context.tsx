import { createContext, PropsWithChildren, useContext } from "react"

import { ColumnResponse, Table as TableKeys } from "@/types/table/columns"
import { TableStateHandlers } from "@/lib/hooks/tables/table-state"

type DataTableContextType = {
  tableKey: TableKeys
  columns?: ColumnResponse
  onRefetchData: () => void
} & TableStateHandlers

const DataTableContext = createContext<DataTableContextType>({
  tableKey: "dashboard_flights",
  columns: {
    visible_columns: [],
    non_visible_columns: [],
  },
  filters: [],
  sort: undefined,
  onFiltersChange: () => {},
  onRefetchData: () => {},
  onPageChange: () => {},
  onPageSizeChange: () => {},
  onSearchChange: () => {},
  onSortToggle: () => {},
})

export function DataTableContextProvider(
  props: DataTableContextType & PropsWithChildren
) {
  return (
    <DataTableContext.Provider
      value={{
        ...props,
      }}
    >
      {props.children}
    </DataTableContext.Provider>
  )
}

export const useDataTableContext = () => {
  return useContext(DataTableContext)
}
