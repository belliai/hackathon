import { useQuery } from "@tanstack/react-query"

import { useBelliApi } from "../utils/network"

export const useGeneralSearch = ({
  searchTerm,
  basePath,
}: {
  searchTerm: string
  basePath: string
}) => {
  const belliApi = useBelliApi()
  const dynamicPath = `${basePath}/search/${searchTerm}`

  return useQuery({
    queryKey: [dynamicPath, searchTerm],
    queryFn: async () => {
      if (!searchTerm) return []
      const response = (await belliApi).get<any[]>(dynamicPath);
      return (await response).data;
     // return (await belliApi).get<any[]>(dynamicPath)
    },
    placeholderData: [],
  })
}
