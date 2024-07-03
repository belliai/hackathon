import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { setHeaders } from "../utils/network"

const route = "currencies"

const config = {
  headers: setHeaders(),
  baseURL: process.env.NEXT_PUBLIC_API_URL,
}

export const fetchCurrencies = async () => {
  const { data } = await axios.get(`/${route}`, config)
  return data
}

export const updateCurrency = async (prop: { id: string; name: string }) => {
  const updateData = { name: prop.name }
  const { data } = await axios.put(`/${route}/${prop.id}`, updateData, config)
  return data
}

export const addCurrency = async (prop: { name: string }) => {
  const newData = { name: prop.name }
  const { data } = await axios.post(`/${route}`, newData, config)
  return data
}

export const removeCurrency = async (prop: { id: string }) => {
  const resp = await axios.delete(`/${route}/${prop.id}`, config)
  return resp
}

export const useCurrencies = () => {
  return useQuery({
    queryKey: [route],
    queryFn: fetchCurrencies,
  })
}

export const useUpdateCurrency = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updateCurrency,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useAddCurrency = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: addCurrency,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useRemoveCurrency = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: removeCurrency,
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
