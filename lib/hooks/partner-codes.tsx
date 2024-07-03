import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { setHeaders } from "../utils/network"

const route = "partner-codes"

const config = {
  headers: setHeaders(),
  baseURL: process.env.NEXT_PUBLIC_API_URL,
}

export const fetchPartnerCodes = async () => {
  const { data } = await axios.get(`/${route}`, config)
  return data
}

export const updatePartnerCode = async (prop: { id: string; name: string }) => {
  const updateData = { name: prop.name }
  const { data } = await axios.put(`/${route}/${prop.id}`, updateData, config)
  return data
}

export const addPartnerCode = async (prop: { name: string }) => {
  const newData = { name: prop.name }
  const { data } = await axios.post(`/${route}`, newData, config)
  return data
}

export const removePartnerCode = async (prop: { id: string }) => {
  const resp = await axios.delete(`/${route}/${prop.id}`, config)
  return resp
}

export const usePartnerCodes = () => {
  return useQuery({
    queryKey: [route],
    queryFn: fetchPartnerCodes,
  })
}

export const useUpdatePartnerCode = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updatePartnerCode,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useAddPartnerCode = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: addPartnerCode,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useRemovePartnerCode = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: removePartnerCode,
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
