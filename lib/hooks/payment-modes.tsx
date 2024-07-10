import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { useBelliApi } from "@/lib/utils/network"

const route = "payment-modes"

export const fetchPaymentModes = async (belliApi: AxiosInstance) => {
  const { data } = await belliApi.get(`/${route}`)
  return data
}

export const updatePaymentMode = async (
  belliApi: AxiosInstance,
  prop: { id: string; name: string }
) => {
  const updateData = { name: prop.name }
  const { data } = await belliApi.put(`/${route}/${prop.id}`, updateData)
  return data
}

export const addPaymentMode = async (
  belliApi: AxiosInstance,
  prop: { name: string }
) => {
  const newData = { name: prop.name }
  const { data } = await belliApi.post(`/${route}`, newData)
  return data
}

export const removePaymentMode = async (
  belliApi: AxiosInstance,
  prop: { id: string }
) => {
  const resp = await belliApi.delete(`/${route}/${prop.id}`)
  return resp
}

export const usePaymentModes = () => {
  const belliApi = useBelliApi()
  return useQuery({
    queryKey: [route],
    queryFn: async () => await fetchPaymentModes(await belliApi),
  })
}

export const useUpdatePaymentMode = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: { id: string; name: string }) =>
      await updatePaymentMode(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useAddPaymentMode = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: { name: string }) =>
      await addPaymentMode(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useRemovePaymentMode = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: { id: string }) =>
      await removePaymentMode(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
    onError: (e) => {
      console.log(e)
    },
  })
}
