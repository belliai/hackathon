import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { useBelliApi } from "@/lib/utils/network"
import { getTooltipContents } from "../contentful"

const route = "partner-codes"

export const fetchPartnerCodes = async (belliApi: AxiosInstance) => {
  const { data } = await belliApi.get(`/${route}`)
  return data
}

export const updatePartnerCode = async (
  belliApi: AxiosInstance,
  prop: { id: string; name: string }
) => {
  const updateData = { name: prop.name }
  const { data } = await belliApi.put(`/${route}/${prop.id}`, updateData)
  return data
}

export const addPartnerCode = async (
  belliApi: AxiosInstance,
  prop: { name: string }
) => {
  const newData = { name: prop.name }
  const { data } = await belliApi.post(`/${route}`, newData)
  return data
}

export const removePartnerCode = async (
  belliApi: AxiosInstance,
  prop: { id: string }
) => {
  const resp = await belliApi.delete(`/${route}/${prop.id}`)
  return resp
}

export const usePartnerCodes = () => {
  const belliApi = useBelliApi()
  
  const getData = useQuery({
    queryKey: [route],
    queryFn: async () => await fetchPartnerCodes(await belliApi),
  })

  const tooltips = getTooltipContents();
  
  const additionalData = getData?.data?.map((item: { name: string }) => {
    const partnerCodeDesc = tooltips.find((list) => list.id === `airline-code-${item.name.toLowerCase()}`);
    return {
      ...item,
      description: partnerCodeDesc?.content || '',
    };
  }) || [];

  return { ...getData, data: [ ...additionalData ]};
}

export const useUpdatePartnerCode = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: { id: string; name: string }) =>
      await updatePartnerCode(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useAddPartnerCode = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: { name: string }) =>
      await addPartnerCode(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useRemovePartnerCode = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  return useMutation({
    mutationFn: async (prop: { id: string }) =>
      await removePartnerCode(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
    onError: (e) => {
      console.log(e)
    },
  })
}
