import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { Aircraft, CreateAircraftRequest } from "@/types/aircraft/aircraft"
import { useBelliApi } from "@/lib/utils/network"

export const route = "aircrafts"

export const fetchAircrafts = async (
  belliApi: AxiosInstance,
  params: PaginationParams
) => {
  return belliApi
    .get(route, {
      params,
    })
    .then((res) => res.data as APIPaginatedResponse<Aircraft>)
}

export const useAircrafts = (params: PaginationParams) => {
  const belliApi = useBelliApi()

  return useQuery({
    queryKey: [route],
    queryFn: async () => await fetchAircrafts(await belliApi, params),
  })
}

export const createAircraft = async (
  belliApi: AxiosInstance,
  data: CreateAircraftRequest
) => {
  return belliApi.post(route, data).then((res) => res.data as Aircraft)
}

export const useCreateAircraft = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (data: CreateAircraftRequest) =>
      await createAircraft(await belliApi, data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const updateAircraft = async (
  belliApi: AxiosInstance,
  id: string,
  data: CreateAircraftRequest
) => {
  return belliApi
    .put(`${route}/${id}`, data)
    .then((res) => res.data as Aircraft)
}

export const useUpdateAircraft = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (data: CreateAircraftRequest & { id: string }) => {
      const { id, ...rest } = data
      return await updateAircraft(await belliApi, data.id, rest)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const deleteAircaft = async (belliApi: AxiosInstance, id: string) => {
  return belliApi.delete(`${route}/${id}`).then((res) => res.data as Aircraft)
}

export const useDeleteAircraft = () => {
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
