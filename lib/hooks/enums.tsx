import { useQuery } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

import { useBelliApi } from "@/lib/utils/network"

const route = "enums"

interface FetchEnumsParams {
  category: EnumsCategory
}

export const fetchEnums = async (
  belliApi: AxiosInstance,
  params: FetchEnumsParams
) => {
  return belliApi
    .get(route, {
      params,
    })
    .then((res) => res.data as Enums[])
}

export const useEnums = (params: FetchEnumsParams) => {
  const belliApi = useBelliApi()

  const enumsRes = useQuery({
    queryKey: [route, params.category],
    queryFn: async () => await fetchEnums(await belliApi, params),
  })

  return enumsRes
}
