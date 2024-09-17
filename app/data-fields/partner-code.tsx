import { useInfiniteQuery } from "@tanstack/react-query"
import { EyeIcon } from "lucide-react"

import { fetchPartnerCodeList } from "@/lib/hooks/partner-codes"
import { useBelliApi } from "@/lib/utils/network"

import CrudTiledView from "./components/crud-tiled-view"

const PartnerCode = () => {
  const belliApi = useBelliApi()

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["partner-prefixes/list"],
    queryFn: async ({ pageParam }) => {
      console.log({ pageParam })

      return fetchPartnerCodeList(await belliApi, {
        page: pageParam,
        page_size: 50,
      })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.current_page + 1
      if (nextPage > lastPage.total_pages) return undefined
      return nextPage
    },
  })

  return (
    <CrudTiledView
      height={500}
      title="Partner Code"
      rowRenderer={(item) => (
        <div className="inline-flex w-full items-center justify-between">
          <div className="inline-flex items-center gap-4">
            <span className="w-10 tabular-nums">{item.name}</span>
            <span className="font-normal text-muted-foreground">
              {item.description}
            </span>
          </div>
          <EyeIcon className="size-4 text-muted-foreground" />
        </div>
      )}
      identifier="id"
      disableCrud={true}
      onEndReached={() => !isFetchingNextPage && fetchNextPage()}
      data={data?.pages.flatMap((page) => page.data) ?? []}
    />
  )
}
export default PartnerCode
