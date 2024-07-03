import { DataTable } from "@components/data-table/data-table"

import { getData } from "@/lib/operation/Export/ExportSummary/data"
import { columns } from "@/components/operation/Export/ExportSummary/columns"
import FilterSection from "@/components/operation/Export/ExportSummary/FilterSection"

export default async function ExportSummary() {
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
