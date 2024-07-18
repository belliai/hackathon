import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useBelliApi } from "@/lib/utils/network"

const route = "aircraft-types"

type TypeResponse = { id: string; name: string }[]

export const useAircraftTypes = (manufacturer_id?: string) => {
  const belliApi = useBelliApi()

  return useQuery({
    queryKey: [route, manufacturer_id],
    queryFn: async () => {
      if (!manufacturer_id) return []
      const instance = await belliApi
      return (
        await instance.get<TypeResponse>(
          `${route}/manufacturer/${manufacturer_id}`
        )
      ).data
    },
  })
}

export const useUpsertAircraftTypes = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (params: {
      id?: string
      name: string
      aircraft_manufacturer_id: string
    }) => {
      const { id, name, aircraft_manufacturer_id } = params
      const instance = await belliApi
      return instance({
        method: id ? "put" : "post",
        url: id ? `${route}/${id}` : route,
        data: { name: name, aircraft_manufacturer_id },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [route], exact: false })
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
      queryClient.invalidateQueries({ queryKey: [route], exact: false })
    },
  })
}
