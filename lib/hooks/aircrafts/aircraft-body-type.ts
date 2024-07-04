import { useQuery } from "@tanstack/react-query"

import { belliApi } from "@/lib/utils/network"

const route = "aircraft-body-types"

export const fetchAircraftBodyTypes = async () => {
  return belliApi.get(route).then((res) => res.data as IDName[])
}

export const useAircraftBodyTypes = () => {
  const aircraftBodyTypesRes = useQuery({
    queryKey: [route],
    queryFn: async () => await fetchAircraftBodyTypes(),
  })

  return aircraftBodyTypesRes
}
