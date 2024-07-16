import { useQuery } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { useBelliApi } from "@/lib/utils/network"

const route = "aircraft-statuses"

export const fetchAircraftStatuses = async (belliApi: AxiosInstance) => {
  return belliApi.get(route).then((res) => res.data as IDName[])
}

export const useAircraftStatuses = () => {
  const belliApi = useBelliApi()

  const aircraftStatusesRes = useQuery({
    queryKey: [route],
    queryFn: async () => await fetchAircraftStatuses(await belliApi),
  })

  return aircraftStatusesRes
}
