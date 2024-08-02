import { useMutation, useQuery } from "@tanstack/react-query"

import { useBelliApi } from "@/lib/utils/network"

const route = "default-measurements"

type Unit = {
  id: string
  is_deleted: boolean
  name: string
  symbol: string
}

type DefaultMeasurement = {
  dimension_unit: Unit
  id: string
  volume_unit: Unit
  weight_unit: Unit
}

export type DefaultMeasurementFormValues = {
  dimension_unit_id: string
  volume_unit_id: string
  weight_unit_id: string
}

export const useDefaultMeasurements = () => {
  const belliApi = useBelliApi()

  return useQuery({
    queryKey: [route],
    queryFn: async () => {
      const instance = await belliApi
      return (await instance.get<DefaultMeasurement>(route)).data
    },
  })
}

export const useUpdateDefaultMeasurements = () => {
  const belliApi = useBelliApi()

  return useMutation({
    mutationKey: [route],
    mutationFn: async (input: DefaultMeasurementFormValues) => {
      const instance = await belliApi
      return (await instance.put<DefaultMeasurement>(route, input)).data
    },
  })
}
