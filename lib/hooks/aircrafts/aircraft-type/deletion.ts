import { useQuery } from "@tanstack/react-query"

import { useBelliApi } from "@/lib/utils/network"

const route = "aircrafts/deletion-details"

type TailNumber = {
  id: string
  tail_number: string
}

type AircraftVersion = {
  id: string
  version: string
  tail_numbers?: TailNumber[]
}

type AircraftType = {
  id: string
  name: string
  aircraft_versions?: AircraftVersion[]
  tail_numbers?: TailNumber[]
}

type Manufacturer = {
  id: string
  name: string
  aircraft_types?: AircraftType[]
  tail_numbers?: TailNumber[]
}

type Version = {
  id: string
  version: string
  tail_numbers?: TailNumber[]
}

type DeletionInfo = {
  aircraft_type: AircraftType
  manufacturer: Manufacturer
  type: "manufacturer" | "aircraft_type" | "version"
  version: Version
}

export const useDeletionInfo = (params: {
  id?: string
  type?: "manufacturer" | "type" | "version"
}) => {
  const belliApi = useBelliApi()

  return useQuery({
    queryKey: [route, params.id, params.type],
    queryFn: async () => {
      if (!params.id || !params.type) return null
      const instance = await belliApi
      return (
        await instance.get<DeletionInfo>(route, {
          params,
        })
      ).data
    },
  })
}
