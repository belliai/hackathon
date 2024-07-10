import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { useBelliApi } from "@/lib/utils/network"

const route = "statuses"

export const fetchStatuses = async (belliApi: AxiosInstance) => {
  const { data } = await belliApi.get(`/${route}`)
  return data
}

export const updateStatus = async (
  belliApi: AxiosInstance,
  prop: { id: string; name: string }
) => {
  const updateData = { name: prop.name }
  const { data } = await belliApi.put(`/${route}/${prop.id}`, updateData)
  return data
}

export const addStatus = async (
  belliApi: AxiosInstance,
  prop: { name: string }
) => {
  const newData = { name: prop.name }
  const { data } = await belliApi.post(`/${route}`, newData)
  return data
}

export const removeStatus = async (
  belliApi: AxiosInstance,
  prop: { id: string }
) => {
  const resp = await belliApi.delete(`/${route}/${prop.id}`)
  return resp
}

export const useStatuses = () => {
  const belliApi = useBelliApi()
  return useQuery({
    queryKey: [route],
    queryFn: async () => await fetchStatuses(await belliApi),
  })
}

export const useUpdateStatus = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: { id: string; name: string }) =>
      await updateStatus(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useAddStatus = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: { name: string }) =>
      await addStatus(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useRemoveStatus = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: { id: string }) =>
      await removeStatus(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
    onError: (e) => {
      console.log(e)
    },
  })
}
