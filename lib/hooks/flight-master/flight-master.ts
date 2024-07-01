import { belliApi } from "@/lib/utils/network";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const route = 'flights'

export const fetchFlightList = async (params: PaginationParams) => {
    return belliApi.get(route, {
        params
    }).then(res => res.data as APIPaginatedResponse<Flight>)
}

export const useFlightList = (params: PaginationParams) => {
    return useQuery({
        queryKey: [route],
        queryFn: async () => await fetchFlightList(params),
    })
}

export const createFlight = async (data: CreateFlightMasterPayload) => {
    return belliApi.post(route, data).then(res => res.data as Flight)
}

export const useCreateFlight = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [route],
        mutationFn: async (data: CreateFlightMasterPayload) => await createFlight(data),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [route] })
        }
    })
}

export const updateFlight = async (id: string, data: CreateFlightMasterPayload) => {
    return belliApi.put(`${route}/${id}`, data).then(res => res.data as Flight)
}

export const useUpdateFlight = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [route],
        mutationFn: async (data: CreateFlightMasterPayload & { id: string }) => {
            const { id, ...rest
            } = data
            return await updateFlight(data.id, rest)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [route] })
        }
    })
}

export const deleteFlight = async (id: string) => {
    return belliApi.delete(`${route}/${id}`).then(res => res.data as Flight)
}

export const useDeleteFlight = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [route],
        mutationFn: async (data: { id: string }) => await deleteFlight(data.id),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [route] })
        }
    })
}