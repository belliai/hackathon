import { TailNumberFormValues } from "@/schemas/aircraft/tail-numbers"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { TailNumber } from "@/types/aircraft/tail-number"
import { useBelliApi } from "@/lib/utils/network"

const route = "aircrafts/tails"

export const fetchTailNumbers = async (
  belliApi: AxiosInstance,
  params: PaginationParams
) => {
  return belliApi
    .get(route, {
      params,
    })
    .then((res) => res.data as APIPaginatedResponse<TailNumber>)
}

export const useTailNumbers = (params: PaginationParams) => {
  const belliApi = useBelliApi()

  return useQuery({
    queryKey: [route],
    queryFn: async () => await fetchTailNumbers(await belliApi, params),
  })
}

export const createTailNumber = async (
  belliApi: AxiosInstance,
  data: TailNumberFormValues
) => {
  return belliApi
    .post(`aircraft/${data.aircraft_id}/tail`, data)
    .then((res) => res.data as TailNumber)
}

export const useCreateTailNumber = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (data: TailNumberFormValues) =>
      await createTailNumber(await belliApi, data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const updateTailNumber = async (
  belliApi: AxiosInstance,
  id: string,
  data: TailNumberFormValues
) => {
  return belliApi
    .put(`${route}/${id}`, data)
    .then((res) => res.data as TailNumber)
}

export const useUpdateTailNumber = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (data: TailNumberFormValues & { id: string }) => {
      const { id, ...rest } = data
      return await updateTailNumber(await belliApi, data.id, rest)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const deleteAircaft = async (belliApi: AxiosInstance, id: string) => {
  return belliApi.delete(`${route}/${id}`).then((res) => res.data as TailNumber)
}

export const useDeleteTailNumber = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (data: { id: string }) =>
      await deleteAircaft(await belliApi, data.id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}
