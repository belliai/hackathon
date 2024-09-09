import { useState } from "react"

import { FilterData } from "@/types/table/filters"

export type UseTableStateProps = {
  initialPagination?: PaginationParams
  initialSort?: SortParams
  initialSearch?: string
  initialFilters?: FilterData[]
}

export const useTableState = ({
  initialPagination = { page: 1, page_size: 20 }, // default values
  initialSort,
  initialSearch,
  initialFilters = [],
}: UseTableStateProps) => {
  const [pagination, setPagination] =
    useState<PaginationParams>(initialPagination)

  const [sort, setSort] = useState<SortParams | undefined>(initialSort)

  const [search, setSearch] = useState<string | undefined>(initialSearch)

  const [filters, setFilters] = useState<FilterData[]>(initialFilters)

  const onSortToggle = (columnName: string) => {
    setSort((prevSort) => {
      // If currently sorting by this column in descending order, reset to undefined
      if (prevSort?.sort_by === columnName && prevSort.sort_dir === "desc") {
        return undefined
      }

      // If currently sorting by this column, toggle between ascending and descending
      if (prevSort?.sort_by === columnName) {
        return {
          sort_by: columnName,
          sort_dir: prevSort.sort_dir === "asc" ? "desc" : "asc",
        }
      }

      // If not currently sorting by this column, start with ascending order
      return {
        sort_by: columnName,
        sort_dir: "asc",
      }
    })
  }

  const onSearchChange = (search: string) => {
    setSearch(!!search ? search : undefined)
  }

  const onPageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }))
  }

  const onPageSizeChange = (page_size: number) => {
    setPagination((prev) => ({ ...prev, page_size }))
  }

  return {
    pagination,
    filters,
    search,
    sort,
    onPageChange,
    onPageSizeChange,
    onFiltersChange: setFilters,
    onSearchChange,
    onSortToggle,
  }
}

export type TableStateHandlers = Omit<
  ReturnType<typeof useTableState>,
  "pagination" | "search"
>
