import { useQuery } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { useBelliApi } from "@/lib/utils/network"

const route = "aircraft-body-types"

export const fetchAircraftBodyTypes = async (belliApi: AxiosInstance) => {
  return belliApi.get(route).then((res) => res.data as IDName[])
}

export const useAircraftBodyTypes = () => {
  const belliApi = useBelliApi()

  const aircraftBodyTypesRes = useQuery({
    queryKey: [route],
    queryFn: async () => await fetchAircraftBodyTypes(await belliApi),
  })

  return aircraftBodyTypesRes
}
