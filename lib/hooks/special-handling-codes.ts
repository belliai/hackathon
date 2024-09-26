import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { useBelliApi } from "@/lib/utils/network"

export type SpecialHandlingCode = {
  id: string
  code: string
  label: string
  fee: number
  formatted_fee: string
}

const route = "special-handling-codes"

export const fetchSpecialHandlingCodes = async (
  belliApi: AxiosInstance,
  params: PaginationParams
) => {
  const { data } = await belliApi.get<
    APIPaginatedResponse<SpecialHandlingCode>
  >(`/${route}`)
  return data
}

export const updateSpecialHandlingCode = async (
  belliApi: AxiosInstance,
  payload: Omit<SpecialHandlingCode, "formatted_fee">
) => {
  const res = await belliApi.put(`/${route}/${payload.id}`, payload)
  return res.data
}

export const createSpecialHandlingCode = async (
  belliApi: AxiosInstance,
  payload: Omit<SpecialHandlingCode, "formatted_fee" | "id">
) => {
  const res = await belliApi.post(`/${route}`, payload)
  return res.data
}

export const deleteSpecialHandlingCode = async (
  belliApi: AxiosInstance,
  id: string
) => {
  const res = await belliApi.delete(`/${route}/${id}`)
  return res.data
}

export const useSpecialHandlingCodes = (params: PaginationParams) => {
  const belliApi = useBelliApi()
  return useQuery({
    queryKey: [route, params],
    queryFn: async () =>
      await fetchSpecialHandlingCodes(await belliApi, params),
  })
}

export const useUpdateSpecialHandlingCode = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  const mutation = useMutation({
    mutationFn: async (prop: Omit<SpecialHandlingCode, "formatted_fee">) =>
      await updateSpecialHandlingCode(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useCreateSpecialHandlingCode = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  const mutation = useMutation({
    mutationFn: async (
      prop: Omit<SpecialHandlingCode, "formatted_fee" | "id">
    ) => await createSpecialHandlingCode(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useDeleteSpecialHandlingCode = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  const mutation = useMutation({
    mutationFn: async (id: string) =>
      await deleteSpecialHandlingCode(await belliApi, id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}
