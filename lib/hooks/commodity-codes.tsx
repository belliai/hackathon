import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { useBelliApi } from "@/lib/utils/network"

const route = "commodity-codes"

export const fetchCommodityCodes = async (belliApi: AxiosInstance) => {
  const { data } = await belliApi.get(`/${route}`)
  return data
}

export const updateCommodityCode = async (
  belliApi: AxiosInstance,
  prop: { id: string; name: string; description: string }
) => {
  const updateData = { name: prop.name, description: prop.description }
  const { data } = await belliApi.put(`/${route}/${prop.id}`, updateData)
  return data
}

export const addCommodityCode = async (
  belliApi: AxiosInstance,
  prop: { name: string; description: string }
) => {
  const newData = { name: prop.name, description: prop.description }
  const { data } = await belliApi.post(`/${route}`, newData)
  return data
}

export const removeCommodityCode = async (
  belliApi: AxiosInstance,
  prop: { id: string }
) => {
  const resp = await belliApi.delete(`/${route}/${prop.id}`)
  return resp
}

export const useCommodityCodes = () => {
  const belliApi = useBelliApi()
  return useQuery({
    queryKey: [route],
    queryFn: async () => await fetchCommodityCodes(await belliApi),
  })
}

export const useUpdateCommodityCode = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  const mutation = useMutation({
    mutationFn: async (prop: {
      id: string
      name: string
      description: string
    }) => await updateCommodityCode(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useAddCommodityCode = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  const mutation = useMutation({
    mutationFn: async (prop: { name: string; description: string }) =>
      await addCommodityCode(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useRemoveCommodityCode = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  const mutation = useMutation({
    mutationFn: async (prop: { id: string }) =>
      await removeCommodityCode(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
    onError: (e) => {
      console.log(e)
    },
  })
  return mutation
}
