import { belliApi } from "@/lib/utils/network"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

const route = 'aircrafts'

export const fetchAircrafts = async (params: PaginationParams) => {
    return belliApi.get(route, {
        params
    }).then(res => res.data as APIPaginatedResponse<Aircraft>)
}

export const useAircrafts = (params: PaginationParams) => {
    return useQuery({
        queryKey: [route],
        queryFn: async () => await fetchAircrafts(params),
    })
}

export const createAircraft = async (data: CreateAircraftRequest) => {
    return belliApi.post(route, data).then(res => res.data as Aircraft)
}

export const useCreateAircraft = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [route],
        mutationFn: async (data: CreateAircraftRequest) => await createAircraft(data),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [route] })
        }
    })
}

export const updateAircraft = async (id: string, data: CreateAircraftRequest) => {
    return belliApi.put(`${route}/${id}`, data).then(res => res.data as Aircraft)
}

export const useUpdateAircraft = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [route],
        mutationFn: async (data: CreateAircraftRequest & { id: string }) => {
            const { id, ...rest
            } = data
            return await updateAircraft(data.id, rest)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [route] })
        }
    })
}

export const deleteAircaft = async (id: string) => {
    return belliApi.delete(`${route}/${id}`).then(res => res.data as Aircraft)
}

export const useDeleteAircraft = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [route],
        mutationFn: async (data: { id: string }) => await deleteAircaft(data.id),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [route] })
        }
    })
}