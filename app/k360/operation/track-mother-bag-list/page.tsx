import { getData } from "@/lib/operation/TrackMotherBagList/data"
import { DataTable } from "@/components/dashboard/dashtable"
import { columns } from "@/components/operation/TrackMotherBagList/columns"
import FilterSection from "@/components/operation/TrackMotherBagList/FilterSection"

export default async function TrackMotherBagList() {
  const data = await getData()

  return (
    <div className="flex flex-col gap-4">
      <FilterSection />
      <div className="rounded-lg border-[1px] border-zinc-700 p-5">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
