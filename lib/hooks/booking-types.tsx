import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { setHeaders } from "../utils/network"

const route = "booking-types"

const config = {
  headers: setHeaders(),
  baseURL: process.env.NEXT_PUBLIC_API_URL,
}

export const fetchBookingTypes = async () => {
  const { data } = await axios.get(`/${route}`, config)
  return data
}

export const updateBookingType = async (prop: { id: string; name: string }) => {
  const updateData = { name: prop.name }
  const { data } = await axios.put(`/${route}/${prop.id}`, updateData, config)
  return data
}

export const addBookingType = async (prop: { name: string }) => {
  const newData = { name: prop.name }
  const { data } = await axios.post(`/${route}`, newData, config)
  return data
}

export const removeBookingType = async (prop: { id: string }) => {
  const resp = await axios.delete(`/${route}/${prop.id}`, config)
  return resp
}

export const useBookingTypes = () => {
  return useQuery({
    queryKey: [route],
    queryFn: fetchBookingTypes,
  })
}

export const useUpdateBookingType = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updateBookingType,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useAddBookingType = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: addBookingType,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useRemoveBookingType = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: removeBookingType,
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
