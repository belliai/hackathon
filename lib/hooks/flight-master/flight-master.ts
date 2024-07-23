import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import {
  CreateFlightMasterPayload,
  Flight,
} from "@/types/flight-master/flight-master"
import { useBelliApi } from "@/lib/utils/network"

const route = "flights"

interface FlightParamsProps extends PaginationParams {
  start_date: string
  end_date: string
}

export const fetchFlightList = async (
  belliApi: AxiosInstance,
  params: FlightParamsProps
) => {
  return belliApi
    .get(route, {
      params,
    })
    .then((res) => res.data as APIPaginatedResponse<Flight>)
}

export const useFlightList = (params: FlightParamsProps) => {
  const belliApi = useBelliApi()

  return useQuery({
    queryKey: [route, params],
    queryFn: async () => await fetchFlightList(await belliApi, params),
  })
}

export const createFlight = async (
  belliApi: AxiosInstance,
  data: CreateFlightMasterPayload
) => {
  return belliApi.post(route, data).then((res) => res.data as Flight)
}

export const useCreateFlight = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (data: CreateFlightMasterPayload) =>
      await createFlight(await belliApi, data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const updateFlightTailNumber = async (
  belliApi: AxiosInstance,
  id: string,
  data: { tail_id: string| null, id?: string}
) => {
  return belliApi.put(`${route}/${id}`, data).then((res) => res.data as Flight)
}

export const updateFlight = async (
  belliApi: AxiosInstance,
  id: string,
  data: CreateFlightMasterPayload
) => {
  return belliApi.put(`${route}/${id}`, data).then((res) => res.data as Flight)
}

export const useUpdateFlight = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (data: CreateFlightMasterPayload & { id: string }) => {
      const { id, ...rest } = data
      return await updateFlight(await belliApi, data.id, rest)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}



export const deleteFlight = async (belliApi: AxiosInstance, id: string) => {
  return belliApi.delete(`${route}/${id}`).then((res) => res.data as Flight)
}

export const useDeleteFlight = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (data: { id: string }) =>
      await deleteFlight(await belliApi, data.id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}
