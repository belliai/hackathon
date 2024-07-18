import { useQuery } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { AircraftTypeList } from "@/types/aircraft/aircraft"
import { useBelliApi } from "@/lib/utils/network"

const route = "aircrafts/types"

export const fetchAircraftTypes = async (belliApi: AxiosInstance) => {
  return belliApi.get(route).then((res) => res.data as AircraftTypeList[])
}

export const useAircraftTypes = () => {
  const belliApi = useBelliApi()

  const aircraftTypesRes = useQuery({
    queryKey: [route],
    queryFn: async () => await fetchAircraftTypes(await belliApi),
  })

  return aircraftTypesRes
}
