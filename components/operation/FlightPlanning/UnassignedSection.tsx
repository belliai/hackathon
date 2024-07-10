import { getData } from "@/lib/operation/FlightPlanning/data"
import { DataTable } from "@/components/data-table/data-table"
import { unassignedColumn } from "@/components/operation/FlightPlanning/columns"

import UnassignedSummary from "./UnassignedSummary"

export default async function UnassinedSection() {
  const data = await getData("unassigned")
  return (
    <div className="mt-5 flex flex-col gap-4">
      <UnassignedSummary />
      <DataTable 
      columns={unassignedColumn} data={data} menuId="flight-planning-unassigned"
      showToolbarOnlyOnHover={true} 
      />
    </div>
  )
}
