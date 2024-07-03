import { useQuery } from "@tanstack/react-query"

import { belliApi } from "@/lib/utils/network"

const route = "aircraft-statuses"

export const fetchAircraftStatuses = async () => {
  return belliApi.get(route).then((res) => res.data as Status[])
}

export const useAircraftStatuses = () => {
  const aircraftStatusesRes = useQuery({
    queryKey: [route],
    queryFn: async () => await fetchAircraftStatuses(),
  })

  return aircraftStatusesRes
}
