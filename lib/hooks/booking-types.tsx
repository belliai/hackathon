import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { useBelliApi } from "@/lib/utils/network"
import { getTooltipContents } from "../contentful"

const route = "booking-types"

export const fetchBookingTypes = async (belliApi: AxiosInstance) => {
  const { data } = await belliApi.get(`/${route}`)
  return data
}

export const updateBookingType = async (
  belliApi: AxiosInstance,
  prop: { id: string; name: string }
) => {
  const updateData = { name: prop.name }
  const { data } = await belliApi.put(`/${route}/${prop.id}`, updateData)
  return data
}

export const addBookingType = async (
  belliApi: AxiosInstance,
  prop: { name: string }
) => {
  const newData = { name: prop.name }
  const { data } = await belliApi.post(`/${route}`, newData)
  return data
}

export const removeBookingType = async (
  belliApi: AxiosInstance,
  prop: { id: string }
) => {
  const resp = await belliApi.delete(`/${route}/${prop.id}`)
  return resp
}

export const useBookingTypes = () => {
  const belliApi = useBelliApi()
  const getData = useQuery({
    queryKey: [route],
    queryFn: async () => await fetchBookingTypes(await belliApi),
  })

  const tooltips = getTooltipContents();
  const additionalData = getData?.data?.map((item: { name: string }) => {
    const bookingTypeTooltip = tooltips.find((list) => list.id === `booking-type-${item.name.toLowerCase()}`);
    const bookingTypeDescTooltip = tooltips.find((list) => list.id === `booking-type-${item.name.toLowerCase()}-desc`);
    return {
      ...item,
      description: bookingTypeDescTooltip?.content || '',
      booking_type: bookingTypeTooltip?.content || '',
    };
  }) || [];

  return { ...getData, data: [ ...additionalData ]};
}

export const useUpdateBookingType = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  const mutation = useMutation({
    mutationFn: async (prop: { id: string; name: string }) =>
      await updateBookingType(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useAddBookingType = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  const mutation = useMutation({
    mutationFn: async (prop: { name: string }) =>
      await addBookingType(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useRemoveBookingType = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()
  const mutation = useMutation({
    mutationFn: async (prop: { id: string }) =>
      await removeBookingType(await belliApi, prop),
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
