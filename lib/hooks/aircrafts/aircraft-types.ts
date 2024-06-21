import { belliApi } from "@/lib/utils/network"
import { useQuery } from "@tanstack/react-query"

const route = 'aircrafts/types'

export const fetchAircraftTypes = async () => {
    return belliApi.get(route).then(res => res.data as AircraftTypeList[])
}

export const useAircraftTypes = () => {
    const aircraftTypesRes = useQuery({
        queryKey: [route],
        queryFn: async () => await fetchAircraftTypes(),
    })

    return aircraftTypesRes
}