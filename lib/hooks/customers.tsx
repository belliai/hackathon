import { Customer } from "@/schemas/customer"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { useBelliApi } from "@/lib/utils/network"

const route = "customers"

export const fetchCustomers = async (belliApi: AxiosInstance) => {
  const { data } = await belliApi.get(`/${route}`)
  return data
}

export const updateCustomer = async (
  belliApi: AxiosInstance,
  prop: Partial<Customer> & { id: string }
) => {
  const filteredCustomer = Object.entries(prop)
    .filter(([key, value]) => value)
    .reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {} as Partial<Customer>
    )

  const updateData = filteredCustomer
  const { data } = await belliApi.put(`/${route}/${prop.id}`, updateData)
  return data
}

export const addCustomer = async (belliApi: AxiosInstance, prop: Customer) => {
  const filteredCustomer = Object.entries(prop)
    .filter(([key, value]) => value)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Customer)

  const newData = filteredCustomer
  delete prop.ID

  const { data } = await belliApi.post(`/${route}`, newData)
  return data
}

export const removeCustomer = async (
  belliApi: AxiosInstance,
  prop: { id: string }
) => {
  const resp = await belliApi.delete(`/${route}/${prop.id}`)
  return resp
}

export const useCustomers = () => {
  const belliApi = useBelliApi()

  return useQuery({
    queryKey: [route],
    queryFn: async () => await fetchCustomers(await belliApi),
  })
}

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationFn: async (prop: Partial<Customer> & { id: string }) =>
      await updateCustomer(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useAddCustomer = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationFn: async (prop: Customer) =>
      await addCustomer(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useRemoveCustomer = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationFn: async (prop: { id: string }) =>
      await removeCustomer(await belliApi, prop),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [route] })
    },
    onError: (e) => {
      console.log(e)
    },
  })
}
