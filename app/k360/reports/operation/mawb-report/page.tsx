import { DataTable } from "@components/data-table/data-table"

import { getData } from "@/lib/reports/operation/MawbReport/data"
import { columns } from "@/components/reports/operation/MawbReport/columns"
import FilterSection from "@/components/reports/operation/MawbReport/FilterSection"

export default async function MawbReport() {
  const data = await getData()

  return (
    <div className="flex flex-col gap-5">
      <FilterSection />
      <div className="rounded-lg border-[1px] border-zinc-700 p-5">
        <DataTable columns={columns} data={data} hideToolbar />
      </div>
    </div>
  )
}