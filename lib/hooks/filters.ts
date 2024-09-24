import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useBelliApi } from "../utils/network"
import { AxiosInstance } from "axios";
import { FiltersRequest, FiltersResponse } from "@/types/table/filters";

const route = "filters"

export const saveFilters = async (
  belliApi: AxiosInstance,
  prop: FiltersRequest
) => {
  const newData = prop
  const { data } = await belliApi.post(`/${route}`, newData)
  return data 
}


export const useSaveFilters = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: FiltersRequest) =>
      await saveFilters(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}


export const fetchFilters = async (belliApi: AxiosInstance, tableKey : string) => {
  const { data } = await belliApi.get(`/${route}/${tableKey}`)
  return data 
}


export const useGetFilters = (tableKey: string) => {
  const belliApi = useBelliApi()
  return useQuery({
    queryKey: [route, tableKey],
    queryFn: async () => await fetchFilters(await belliApi, tableKey),
  })
}