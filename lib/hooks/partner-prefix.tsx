import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { setHeaders } from "../utils/network"

const route = "partner-prefixes"

const config = {
  headers: setHeaders(),
  baseURL: process.env.NEXT_PUBLIC_API_URL,
}

export const fetchPartnerPrefixes = async () => {
  const { data } = await axios.get(`/${route}`, config)
  return data
}

export const updatePartnerPrefix = async (prop: {
  id: string
  name: string
}) => {
  const updateData = { name: prop.name }
  const { data } = await axios.put(`/${route}/${prop.id}`, updateData, config)
  return data
}

export const addPartnerPrefix = async (prop: { name: string }) => {
  const newData = { name: prop.name }
  const { data } = await axios.post(`/${route}`, newData, config)
  return data
}

export const removePartnerPrefix = async (prop: { id: string }) => {
  const resp = await axios.delete(`/${route}/${prop.id}`, config)
  return resp
}

export const usePartnerPrefixes = () => {
  return useQuery({
    queryKey: [route],
    queryFn: fetchPartnerPrefixes,
  })
}

export const useUpdatePartnerPrefix = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updatePartnerPrefix,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useAddPartnerPrefix = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: addPartnerPrefix,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
  return mutation
}

export const useRemovePartnerPrefix = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: removePartnerPrefix,
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
