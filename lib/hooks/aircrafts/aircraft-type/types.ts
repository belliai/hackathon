import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useBelliApi } from "@/lib/utils/network"

const route = "aircraft-types"

type TypeResponse = { ID: string; name: string }[]

export const useAircraftTypes = () => {
  const belliApi = useBelliApi()

  return useQuery({
    queryKey: [route],
    queryFn: async () => {
      const instance = await belliApi
      return (await instance.get<TypeResponse>(route)).data
    },
  })
}

export const useUpsertAircraftTypes = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (params: { ID?: string; name: string }) => {
      const instance = await belliApi
      return instance({
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

export const useDeleteAircraftTypes = () => {
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
