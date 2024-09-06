import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import {
  CreateFlightMasterPayload,
  Flight,
  FlightMasterWithRecurring,
  RecurringPayload,
} from "@/types/flight-master/flight-master"
import { useBelliApi } from "@/lib/utils/network"

const route = "flights"
const routeRecurrings = "flights/recurrings"

interface FlightParamsProps extends PaginationParams {
  start_date?: string
  end_date?: string
  sort_by?: string
  sort_dir?: string
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

export const fetchRecurringFlightList = async (
  belliApi: AxiosInstance,
  params: FlightParamsProps
) => {
  return belliApi
    .get(routeRecurrings, {
      params,
    })
    .then((res) => res.data as APIPaginatedResponse<Flight>)
}

export const useRecurringFlightList = (params: FlightParamsProps) => {
  const belliApi = useBelliApi()

  return useQuery({
    queryKey: [routeRecurrings, params],
    queryFn: async () => await fetchRecurringFlightList(await belliApi, params),
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
    mutationFn: async (data: FlightMasterWithRecurring) =>
      await createFlight(await belliApi, data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const updateFlightTailNumber = async (
  belliApi: AxiosInstance,
  id: string,
  data: { tail_id: string | null; id?: string }
) => {
  return belliApi.put(`${route}/${id}`, data).then((res) => res.data as Flight)
}

export const updateFlight = async (
  belliApi: AxiosInstance,
  id: string,
  data: CreateFlightMasterPayload,
  update_mode?: string
) => {
  return belliApi
    .put(
      `${route}/${id}?update_mode=${update_mode ? update_mode : "one"}`,
      data
    )
    .then((res) => res.data as Flight)
}

export const partialUpdate = async (
  belliApi: AxiosInstance,
  id: string,
  data: Partial<CreateFlightMasterPayload>,
) => {
  return belliApi
    .patch(
      `${route}/${id}`,
      data
    )
    .then((res) => res.data as Flight)
}


export const useUpdateFlight = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (data: CreateFlightMasterPayload & { id: string, update_mode?: string }) => {
      const { id, ...rest } = data
      return await updateFlight(await belliApi, data.id, rest)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const usePartialUpdateFlight = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (data: Partial<CreateFlightMasterPayload> & { id: string, update_mode?: string }) => {
      const { id, ...rest } = data
      return await partialUpdate(await belliApi, data.id, rest)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const deleteFlight = async (
  belliApi: AxiosInstance,
  id: string,
  delete_mode?: string
) => {
  return belliApi
    .delete(`${route}/${id}${delete_mode ? `?delete_mode=${delete_mode}` : ""}`)
    .then((res) => res.data as Flight)
}

export const useDeleteFlight = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (data: { id: string; delete_mode?: string }) =>
      await deleteFlight(await belliApi, data.id, data.delete_mode),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const fetchRecurringFlight = async (
  belliApi: AxiosInstance,
  id: string
) => {
  return belliApi
    .get(`${route}/recurrings/${id}`)
    .then((res) => res.data as Flight)
}

export const useRecurringFlight = (id?: string) => {
  const belliApi = useBelliApi()

  return useQuery({
    queryKey: [route, id], // Use undefined if id is not provided
    queryFn: async () => {
      if (!id) {
        return null // Fallback if id is undefined
      }
      return await fetchRecurringFlight(await belliApi, id)
    },
    enabled: !!id, // Disable query if id is undefined
    // Optional: Provide an initial fallback value
    initialData: null, // or undefined, based on your preference
  })
}

export const fetchFlightStatuses = async (belliApi: AxiosInstance) => {
  return belliApi.get(`${route}/statuses`).then((res) => res.data as { id: string, status: string }[])
}

export const useFlightStatuses = () => {
  const belliApi = useBelliApi()

  return useQuery({
    queryKey: [route, "statuses"],
    queryFn: async () => await fetchFlightStatuses(await belliApi),
  })
}
