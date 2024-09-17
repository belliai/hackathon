import { useInfiniteQuery } from "@tanstack/react-query"
import { EyeIcon } from "lucide-react"

import { fetchPartnerPrefixList } from "@/lib/hooks/partner-prefix"
import { useBelliApi } from "@/lib/utils/network"

import CrudTiledView from "./components/crud-tiled-view"

const PartnerPrefix = () => {
  const belliApi = useBelliApi()

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["partner-prefixes/list"],
    queryFn: async ({ pageParam }) => {
      console.log({ pageParam })

      return fetchPartnerPrefixList(await belliApi, {
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
      title="Partner Prefix"
      rowRenderer={(item) => (
        <div className="inline-flex w-full grid-cols-3 items-center justify-between">
          <span className="tabular-nums">{item.name}</span>
          <EyeIcon className="size-4 text-muted-foreground" />
        </div>
      )}
      identifier="id"
      disableCrud={true}
      onEndReached={() => !isFetchingNextPage && fetchNextPage()}
      data={data?.pages.flatMap((page) => page.data) ?? []}
    />
    // <DataTable
    //   columns={[
    //     { accessorKey: "name", header: "Name" },
    //     {
    //       accessorKey: "visibility",
    //       header: "Visibility",
    //       accessorFn: () => "Visible",
    //     },
    //     {
    //       accessorKey: "is_default",
    //       header: "Default",
    //       accessorFn: () => "No",
    //     },
    //   ]}
    //   tableState={({ pagination }) => {
    //     setPaginationState({
    //       page: pagination ? pagination.pageIndex + 1 : 1,
    //       page_size: pagination?.pageSize ?? 20,
    //     })
    //   }}
    //   data={partnerPrefixes?.data ?? []}
    //   manualPagination
    //   pageCount={partnerPrefixes?.total_pages}
    // />
  )
}
export default PartnerPrefix
