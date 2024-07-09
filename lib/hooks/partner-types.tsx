import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { useBelliApi } from "@/lib/utils/network"

const route = "partner-types"

export const fetchPartnerTypes = async (belliApi: AxiosInstance) => {
  const { data } = await belliApi.get(`/${route}`)
  return data
}

export const updatePartnerType = async (
  belliApi: AxiosInstance,
  prop: { id: string; name: string }
) => {
  const updateData = { name: prop.name }
  const { data } = await belliApi.put(`/${route}/${prop.id}`, updateData)
  return data
}

export const addPartnerType = async (
  belliApi: AxiosInstance,
  prop: { name: string }
) => {
  const newData = { name: prop.name }
  const { data } = await belliApi.post(`/${route}`, newData)
  return data
}

export const removePartnerType = async (
  belliApi: AxiosInstance,
  prop: { id: string }
) => {
  const resp = await belliApi.delete(`/${route}/${prop.id}`)
  return resp
}

export const usePartnerTypes = () => {
  const belliApi = useBelliApi()
  return useQuery({
    queryKey: [route],
    queryFn: async () => await fetchPartnerTypes(await belliApi),
  })
}

export const useUpdatePartnerType = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: { id: string; name: string }) =>
      await updatePartnerType(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useAddPartnerType = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: { name: string }) =>
      await addPartnerType(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useRemovePartnerType = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: { id: string }) =>
      await removePartnerType(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
    onError: (e) => {
      console.log(e)
    },
  })
}
