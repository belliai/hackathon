import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react"

import { ColumnResponse, Table as TableKeys } from "@/types/table/columns"
import { TableStateHandlers } from "@/lib/hooks/tables/table-state"

type DataTableContextType = {
  tableKey: TableKeys
  columns?: ColumnResponse
  onRefetchData: () => Promise<any>
} & TableStateHandlers

const DataTableContext = createContext<
  DataTableContextType & {
    setColumns: Dispatch<SetStateAction<ColumnResponse>>
    columns: ColumnResponse
  }
>({
  tableKey: "dashboard_flights",
  columns: {
    visible_columns: [],
    non_visible_columns: [],
  },
  filters: [],
  sort: undefined,
  setColumns: () => {},
  onFiltersChange: () => {},
  onRefetchData: () => new Promise(() => {}),
  onPageChange: () => {},
  onPageSizeChange: () => {},
  onSearchChange: () => {},
  onSortToggle: () => {},
})

export function DataTableContextProvider(
  props: DataTableContextType & PropsWithChildren
) {
  const [columns, setColumns] = useState<ColumnResponse>(
    props.columns ?? {
      visible_columns: [],
      non_visible_columns: [],
      sticky_columns: [],
    }
  )

  useEffect(() => {
    props.columns && setColumns(props.columns)
  }, [props.columns])

  return (
    <DataTableContext.Provider
      value={{
        ...props,
        columns,
        setColumns,
      }}
    >
      {props.children}
    </DataTableContext.Provider>
  )
}

export const useDataTableContext = () => {
  return useContext(DataTableContext)
}
