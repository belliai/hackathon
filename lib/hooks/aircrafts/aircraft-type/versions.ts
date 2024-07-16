import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useBelliApi } from "@/lib/utils/network"

const route = "aircraft-versions"

type VersionResponse = { id: string; version: string }[]

export const useAircraftVersions = (aircraft_type_id?: string) => {
  const belliApi = useBelliApi()

  return useQuery({
    queryKey: [route, aircraft_type_id],
    queryFn: async () => {
      if (!aircraft_type_id) return []
      const instance = await belliApi
      return (
        await instance.get<VersionResponse>(
          `${route}/aircraft-type/${aircraft_type_id}`
        )
      ).data
    },
  })
}

export const useUpsertAircraftVersions = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (params: {
      id?: string
      version: string
      aircraft_type_id: string
    }) => {
      const { id, version, aircraft_type_id } = params
      const instance = await belliApi
      return instance({
        method: id ? "put" : "post",
        url: id ? `${route}/${id}` : route,
        data: { version, aircraft_type_id },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [route], exact: false })
    },
  })
}

export const useDeleteAircraftVersions = () => {
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
