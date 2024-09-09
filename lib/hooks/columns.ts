"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Column, ColumnResponse, Table } from "@/types/table/columns"
import { useBelliApi } from "@/lib/utils/network"

/**
 * Hook used to get columns information from the API, which includes:
 * - Column name
 * - Column order
 * - Column visibility
 */
export function useColumns() {
  const route = "columns"

  const queryClient = useQueryClient()

  const belli = useBelliApi()

  function useGetColumns(tableName: Table) {
    const query = useQuery({
      queryKey: [route, tableName],
      queryFn: async () => {
        const res = await (await belli).get(route + `/${tableName}`)

        return res.data as ColumnResponse
      },
    })

    return query
  }

  function useUpdateSingleColumn() {
    return useMutation({
      mutationFn: async (column: Omit<Column, "column_name">) =>
        await (
          await (await belli).patch(route, column)
        ).data,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [route] }),
    })
  }

  function useUpdateColumn() {
    const updateMutation = useMutation({
      mutationKey: [route],
      mutationFn: async (data: { columns: Omit<Column, "column_name">[] }) => {
        const res = data.columns.map(async (column) => {
          return (await (await belli).patch(route, column)).data
        })

        return await Promise.all(res)
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [route] }),
    })

    return updateMutation
  }

  /**
   * Resets the columns configuration of a given table to the default configuration set in the admin organization
   * @param tableName
   */
  function useResetColumns(tableName: string) {
    const resetMutation = useMutation({
      mutationKey: [route, tableName],
      mutationFn: async (data: { tableName: string }) => {
        const res = await (await belli).post(route + `/reset/${data.tableName}`)

        return res.data
      },
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: [route, tableName] }),
    })

    return resetMutation
  }

  return {
    useGetColumns,
    useUpdateSingleColumn,
    useUpdateColumn,
    useResetColumns,
  }
}
