"use client"

import { useBelliApi } from '@/lib/utils/network'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Column, ColumnResponse, Table } from '@/types/table/columns'

/**
 * Hook used to get columns information from the API, which includes:
 * - Column name
 * - Column order
 * - Column visibility
 */
export function useColumns() {
    const route = 'columns'

    const queryClient = useQueryClient()

    const belli = useBelliApi()

    function useGetColumns(tableName: Table) {
        const query = useQuery({
            queryKey: [route, tableName],
            queryFn: async () => {
                const res = await (await belli).get(route + `/${tableName}`)

                return res.data as ColumnResponse
            }
        })

        return query
    }

    const updateMutation = useMutation({
        mutationKey: [route],
        mutationFn: async (data: { columns: Omit<Column, "column_name">[] },) => {
            const res = data.columns.map(async column => {
                return (await (await belli).patch(route, column)).data
            })

            return await Promise.all(res)
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [route] })
    })

    function useUpdateColumn() {
        return updateMutation
    }

    return {
        useGetColumns,
        useUpdateColumn
    }
}