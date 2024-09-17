import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { useBelliApi } from "@/lib/utils/network"

const route = "partner-prefixes"

export const fetchPartnerPrefixes = async (belliApi: AxiosInstance) => {
  const { data } = await belliApi.get(`/${route}`)
  return data
}

export const updatePartnerPrefix = async (
  belliApi: AxiosInstance,
  prop: { id: string; name: string }
) => {
  const updateData = { name: prop.name }
  const { data } = await belliApi.put(`/${route}/${prop.id}`, updateData)
  return data
}

export const addPartnerPrefix = async (
  belliApi: AxiosInstance,
  prop: { name: string }
) => {
  const newData = { name: prop.name }
  const { data } = await belliApi.post(`/${route}`, newData)
  return data
}

export const removePartnerPrefix = async (
  belliApi: AxiosInstance,
  prop: { id: string }
) => {
  const resp = await belliApi.delete(`/${route}/${prop.id}`)
  return resp
}

export const usePartnerPrefixes = () => {
  const belliApi = useBelliApi()
  return useQuery({
    queryKey: [route],
    queryFn: async () => await fetchPartnerPrefixes(await belliApi),
  })
}

export const useUpdatePartnerPrefix = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: { id: string; name: string }) =>
      await updatePartnerPrefix(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useAddPartnerPrefix = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: { name: string }) =>
      await addPartnerPrefix(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useRemovePartnerPrefix = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: { id: string }) =>
      await removePartnerPrefix(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
    onError: (e) => {
      console.log(e)
    },
  })
}

type PartnerPrefix = {
  id: string
  name: string
}

export const fetchPartnerPrefixList = async (
  belliApi: AxiosInstance,
  params: PaginationParams
) => {
  const _route = route + "/list"
  const { data } = await belliApi.get<APIPaginatedResponse<PartnerPrefix>>(
    `/${_route}`,
    { params }
  )
  return data
}

export const usePartnerPrefixList = (params: PaginationParams) => {
  const _route = route + "/list"
  const belliApi = useBelliApi()
  return useQuery({
    queryKey: [_route, params],
    queryFn: async () => await fetchPartnerPrefixList(await belliApi, params),
    placeholderData: keepPreviousData,
  })
}
