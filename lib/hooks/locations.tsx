import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { Location } from "@/types/flight-master/flight-master"
import { useBelliApi } from "@/lib/utils/network"

const route = "locations"

export const fetchLocations = async (belliApi: AxiosInstance) => {
  const { data } = await belliApi.get(`/${route}`)
  return data
}

export const updateLocation = async (
  belliApi: AxiosInstance,
  prop: { id: string; name: string; timezone_id: string }
) => {
  const updateData = { name: prop.name, timezone_id: prop.timezone_id }
  const { data } = await belliApi.put(`/${route}/${prop.id}`, updateData)
  return data
}

export const addLocation = async (
  belliApi: AxiosInstance,
  prop: { name: string; timezone_id: string }
) => {
  const newData = { name: prop.name, timezone_id: prop.timezone_id }
  const { data } = await belliApi.post(`/${route}`, newData)
  return data
}

export const removeLocation = async (
  belliApi: AxiosInstance,
  prop: { id: string }
) => {
  const resp = await belliApi.delete(`/${route}/${prop.id}`)
  return resp
}

export const useLocations = () => {
  const belliApi = useBelliApi()
  return useQuery({
    queryKey: [route],
    queryFn: async () => await fetchLocations(await belliApi),
  })
}

export const useUpdateLocation = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: {
      id: string
      name: string
      timezone_id: string
    }) => await updateLocation(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useAddLocation = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: { name: string; timezone_id: string }) =>
      await addLocation(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useRemoveLocation = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: { id: string }) =>
      await removeLocation(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
    onError: (e) => {
      console.log(e)
    },
  })
}

export const fetchLocationList = async (
  belliApi: AxiosInstance,
  params: PaginationParams
) => {
  const _route = route + "/list"
  const { data } = await belliApi.get<APIPaginatedResponse<Location>>(
    `/${_route}`,
    { params }
  )
  return data
}

export const useLocationList = (params: PaginationParams) => {
  const _route = route + "/list"
  const belliApi = useBelliApi()
  return useQuery({
    queryKey: [_route, params],
    queryFn: async () => await fetchLocationList(await belliApi, params),
    placeholderData: keepPreviousData,
  })
}

export const useLocationSearch = ({ searchTerm }: { searchTerm: string }) => {
  const _route = route + "/search"

  const belliApi = useBelliApi()
  return useQuery({
    queryKey: [_route, searchTerm],
    queryFn: async () => {
      if (!searchTerm) return
      return (await belliApi).get<Location[]>(`${_route}/${searchTerm}`)
    },
    placeholderData: keepPreviousData,
  })
}
