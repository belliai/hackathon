import { useQuery } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { useBelliApi } from "@/lib/utils/network"

const route = "units"

interface FetchUnitParams {
  category: UnitCategory
}

export const fetchUnits = async (
  belliApi: AxiosInstance,
  params: FetchUnitParams
) => {
  return belliApi
    .get(route, {
      params,
    })
    .then((res) => res.data as Unit[])
}

export const useUnits = (params: FetchUnitParams) => {
  const belliApi = useBelliApi()

  const unitsRes = useQuery({
    queryKey: [route, params.category],
    queryFn: async () => await fetchUnits(await belliApi, params),
  })

  return unitsRes
}
