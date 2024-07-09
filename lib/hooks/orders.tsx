import { Order } from "@/schemas/order/order"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { objectToParams, useBelliApi } from "@/lib/utils/network"

const route = "orders"

export const fetchOrders = async (
  belliApi: AxiosInstance,
  filter: FetchOrdersProps
) => {
  const pagination = {
    page: filter.pagination.pageIndex + 1,
    page_size: filter.pagination.pageSize,
  }
  const queryParams = objectToParams(pagination)

  const { data } = await belliApi.get(`/${route}?${queryParams}`)
  return data
}

export const updateOrder = async (
  belliApi: AxiosInstance,
  prop: Order & { id: string }
) => {
  const filteredOrder = Object.entries(prop)
    .filter(([key, value]) => value)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Order)

  const updateData = filteredOrder

  const { data } = await belliApi.put(`/${route}/${prop.id}`, updateData)
  return data
}

export const addOrder = async (belliApi: AxiosInstance, prop: Order) => {
  const filteredOrder = Object.entries(prop)
    .filter(([key, value]) => value)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Order)

  const newData = filteredOrder
  delete prop.ID

  const { data } = await belliApi.post(`/${route}`, newData)
  return data
}

export const removeOrder = async (
  belliApi: AxiosInstance,
  prop: { id: string }
) => {
  const resp = await belliApi.delete(`/${route}/${prop.id}`)
  return resp
}

type FetchOrdersProps = {
  pagination: {
    pageSize: number
    pageIndex: number
  }
}

export const useOrders = (props: FetchOrdersProps) => {
  const belliApi = useBelliApi()

  return useQuery({
    queryKey: [route, props],
    queryFn: async () => await fetchOrders(await belliApi, props),
  })
}

export const useUpdateOrder = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationFn: async (prop: Order & { id: string }) =>
      await updateOrder(await belliApi, prop),
    onError: (error) => {
      throw Error("Error")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useAddOrder = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationFn: async (prop: Order) => await addOrder(await belliApi, prop),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useRemoveOrder = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationFn: async (prop: { id: string }) =>
      await removeOrder(await belliApi, prop),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}
