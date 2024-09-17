import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosInstance } from "axios"
import momentTZ from "moment-timezone"

import { useBelliApi } from "@/lib/utils/network"

const route = "timezones"

type FilterTimezone = {
  page: number
  page_size: number
}

type TimezoneInfo = {
  ID: string
  created_at: string
  updated_at: string
  name: string
  offset: string
  abbreviation: string
}

export const fetchTimeZones = async (
  belliApi: AxiosInstance,
  params?: FilterTimezone
) => {
  const { data } = await belliApi.get<APIPaginatedResponse<TimezoneInfo>>(
    `/${route}`,
    { params }
  )
  return data
}

export const fetchTimeZonesAll = async (belliApi: AxiosInstance) => {
  const { data } = await belliApi.get(`/${route}/all`)
  return data
}

export const updateTimeZone = async (
  belliApi: AxiosInstance,
  prop: { id: string; name: string }
) => {
  const updateData = { name: prop.name }
  const { data } = await belliApi.put(`/${route}/${prop.id}`, updateData)
  return data
}

export const addTimeZone = async (
  belliApi: AxiosInstance,
  prop: { name: string }
) => {
  const newData = { name: prop.name }
  const { data } = await belliApi.post(`/${route}`, newData)
  return data
}

export const removeTimeZone = async (
  belliApi: AxiosInstance,
  prop: { id: string }
) => {
  const resp = await belliApi.delete(`/${route}/${prop.id}`)
  return resp
}

export const useTimeZones = (params?: FilterTimezone) => {
  const belliApi = useBelliApi()
  return useQuery({
    queryKey: [route, params],
    queryFn: async () => await fetchTimeZones(await belliApi, params),
    placeholderData: keepPreviousData,
  })
}

export const useTimeZonesAll = () => {
  const belliApi = useBelliApi()
  return useQuery({
    queryKey: [route],
    queryFn: async () => await fetchTimeZonesAll(await belliApi),
  })
}

export const useUpdateTimeZone = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  const mutation = useMutation({
    mutationFn: async (prop: { id: string; name: string }) =>
      await updateTimeZone(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useAddTimeZone = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  const mutation = useMutation({
    mutationFn: async (prop: { name: string }) =>
      await addTimeZone(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useRemoveTimeZone = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  const mutation = useMutation({
    mutationFn: async (prop: { id: string }) =>
      await removeTimeZone(await belliApi, prop),
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
