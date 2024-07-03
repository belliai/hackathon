import { error } from "console"
import { Order } from "@/schemas/order/order"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { objectToParams, setHeaders } from "../utils/network"

const route = "orders"

const config = {
  headers: setHeaders(),
  baseURL: process.env.NEXT_PUBLIC_API_URL,
}

export const fetchOrders = async (filter: FetchOrdersProps) => {
  const pagination = {
    page: filter.pagination.pageIndex + 1,
    page_size: filter.pagination.pageSize,
  }
  const queryParams = objectToParams(pagination)

  const { data } = await axios.get(`/${route}?${queryParams}`, config)
  return data
}

export const updateOrder = async (prop: Order & { id: string }) => {
  const filteredOrder = Object.entries(prop)
    .filter(([key, value]) => value)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Order)

  const updateData = filteredOrder

  const { data } = await axios.put(`/${route}/${prop.id}`, updateData, config)
  return data
}

export const addOrder = async (prop: Order) => {
  const filteredOrder = Object.entries(prop)
    .filter(([key, value]) => value)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Order)

  const newData = filteredOrder
  delete prop.ID
  const { data } = await axios.post(`/${route}`, newData, config)
  return data
}

export const removeOrder = async (prop: { id: string }) => {
  const resp = await axios.delete(`/${route}/${prop.id}`, config)
  return resp
}

type FetchOrdersProps = {
  pagination: {
    pageSize: number
    pageIndex: number
  }
}
export const useOrders = (props: FetchOrdersProps) => {
  return useQuery({
    queryKey: [route, props],
    queryFn: () => fetchOrders(props),
  })
}

export const useUpdateOrder = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updateOrder,

    onError: (error) => {
      throw Error("Error")
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useAddOrder = () => {
  const queryClient = useQueryClient()
  const mutation: any = useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useRemoveOrder = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: removeOrder,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}
