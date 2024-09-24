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
import { FilterData, FiltersResponse, LogicalOperator } from "@/types/table/filters"
import { TableStateHandlers } from "@/lib/hooks/tables/table-state"

type DataTableContextType = {
  tableKey: TableKeys
  columns?: ColumnResponse
  logical_operator: LogicalOperator
  onRefetchData: () => Promise<any>
} & TableStateHandlers

const DataTableContext = createContext<
  DataTableContextType & {
    setColumns: Dispatch<SetStateAction<ColumnResponse>>
    setLogicalOperator: Dispatch<SetStateAction<LogicalOperator>>
    columns: ColumnResponse
    logical_operator: LogicalOperator
  }
>({
  tableKey: "dashboard_flights",
  columns: {
    visible_columns: [],
    non_visible_columns: [],
  },
  filters: [],
  logical_operator: "AND",
  sort: undefined,
  setColumns: () => {},
  setLogicalOperator: () => {},
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

  const [logicalOperator,setLogicalOperator] = useState<LogicalOperator>("AND")
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
        logical_operator:logicalOperator,
        setLogicalOperator
      }}
    >
      {props.children}
    </DataTableContext.Provider>
  )
}

export const useDataTableContext = () => {
  return useContext(DataTableContext)
}
