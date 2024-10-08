import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useBelliApi } from "@/lib/utils/network"

const route = "aircraft-manufacturers"

type ManufacturerResponse = { id: string; name: string }[]

export const useAircraftManufacturers = () => {
  const belliApi = useBelliApi()

  return useQuery({
    queryKey: [route],
    queryFn: async () => {
      const instance = await belliApi
      return (await instance.get<ManufacturerResponse>(route)).data
    },
  })
}

export const useUpsertAircraftManufacturers = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (params: { ID?: string; name: string }) => {
      const instance = await belliApi
      return await instance({
        method: params.ID ? "put" : "post",
        url: params.ID ? `${route}/${params.ID}` : route,
        data: { name: params.name },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useDeleteAircraftManufacturers = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (id: string) => {
      const instance = await belliApi
      return instance.delete(`${route}/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}
