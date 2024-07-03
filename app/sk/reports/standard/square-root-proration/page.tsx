import { DataTable } from "@components/data-table/data-table"

import { getData } from "@/lib/reports/Standard/SquareRootProration/data"
import { columns } from "@/components/reports/Standard/SquareRootProration/columns"
import FilterSection from "@/components/reports/Standard/SquareRootProration/FilterSection"

export default async function SquareRootProration() {
  const data = await getData()

  return (
    <div className="flex flex-col gap-4">
      <FilterSection />
      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="">
          <DataTable columns={columns} data={data} hideToolbar />
        </div>
      </div>
    </div>
  )
}
