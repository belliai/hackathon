import { useQuery } from "@tanstack/react-query"

import { belliApi } from "@/lib/utils/network"

const route = "units"

interface FetchUnitParams {
  category: UnitCategory
}

export const fetchUnits = async (params: FetchUnitParams) => {
  return belliApi
    .get(route, {
      params,
    })
    .then((res) => res.data as Unit[])
}

export const useUnits = (params: FetchUnitParams) => {
  const unitsRes = useQuery({
    queryKey: [route, params.category],
    queryFn: async () => await fetchUnits(params),
  })

  return unitsRes
}
