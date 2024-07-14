import { AircraftFormValues } from "@/schemas/aircraft/aircraft"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { getCurrentTimestamp } from "@/lib/utils/date-utils"
import { useBelliApi } from "@/lib/utils/network"

const route = "aircrafts/default"

type AircraftDefaults = {
  id: string
  created_at: string
  updated_at: string
  mtow: string | null
  max_zero_fuel_weight: string | null
  passenger_capacity: string | null
  uld_position: string | null
  landing_weight: string | null
  cargo_capacity: string | null
  max_bulk_capacity_weight: string | null
  max_bulk_capacity_volume: string | null
  max_volume: string | null
  restricted_weight_piece: string | null
  max_dimension_length: string | null
  max_dimension_breadth: string | null
  max_dimension_height: string | null
  aft_h: string | null
  aft_w: string | null
  fwd_h: string | null
  fwd_w: string | null
  bulk_h: string | null
  bulk_w: string | null
  fwt: string | null
  fwd: string | null
  bulk: string | null
}

export const useAircraftDefaultsQuery = () => {
  const belliApi = useBelliApi()

  return useQuery({
    queryKey: [route],
    queryFn: async () => {
      const instance = await belliApi
      return (await instance.get<AircraftDefaults>(route)).data
    },
  })
}

export const useUpdateAircraftDefaults = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (body: AircraftFormValues) => {
      const instance = await belliApi
      return instance.put(route, convertToAircraftDefaultsData(body))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useResetAircraftDefaults = () => {
  const queryClient = useQueryClient()
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (i) => {
      const instance = await belliApi
      return instance.post(`${route}/reset`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [route] })
    },
  })
}

export const useAircraftDefaults = () => {
  const { data: aircraftDefaults } = useAircraftDefaultsQuery()
  const { mutateAsync: updateAircraftDefaults } = useUpdateAircraftDefaults()
  const { mutateAsync: resetAirccraftDefaults } = useResetAircraftDefaults()

  return { aircraftDefaults, updateAircraftDefaults, resetAirccraftDefaults }
}

function convertToAircraftDefaultsData(
  rawData: AircraftFormValues
): AircraftDefaults {
  return {
    id: rawData.version || "",
    created_at: getCurrentTimestamp(),
    updated_at: getCurrentTimestamp(),
    mtow: rawData.mtow || null,
    max_zero_fuel_weight: rawData.max_zero_fuel_weight || null,
    passenger_capacity: rawData.passenger_capacity || null,
    uld_position: rawData.uld_position || null,
    landing_weight: rawData.landing_weight || null,
    cargo_capacity: rawData.cargo_capacity || null,
    max_bulk_capacity_weight: rawData.max_bulk_capacity_weight || null,
    max_bulk_capacity_volume: rawData.max_bulk_capacity_volume || null,
    max_volume: rawData.max_volume || null,
    restricted_weight_piece: rawData.restricted_weight_piece || null,
    max_dimension_length: rawData.max_dimension_length || null,
    max_dimension_breadth: rawData.max_dimension_breadth || null,
    max_dimension_height: rawData.max_dimension_height || null,
    aft_h: rawData.aft_h || null,
    aft_w: rawData.aft_w || null,
    fwd_h: rawData.fwd_h || null,
    fwd_w: rawData.fwd_w || null,
    bulk_h: rawData.bulk_h || null,
    bulk_w: rawData.bulk_w || null,
    fwt: rawData.fwt || null,
    fwd: rawData.fwd || null,
    bulk: rawData.bulk || null,
  }
}
