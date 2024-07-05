import { getData } from "@/lib/operation/FlightPlanning/data"
import { DataTable } from "@/components/data-table/data-table"
import { assignedColumn } from "@/components/operation/FlightPlanning/columns"

import AssignedSummary from "./AssignedSummary"

export default async function AssignedSection() {
  const data = await getData("assigned")
  return (
    <div className="mt-5 flex flex-col gap-4">
      <AssignedSummary />
      <DataTable columns={assignedColumn} data={data} />
    </div>
  )
}
