import { getData } from "@/lib/operation/FlightPlanning/data"
import { DataTable } from "@/components/data-table/data-table"
import { uldColumn } from "@/components/operation/FlightPlanning/columns"

export default async function UldLoadSection() {
  const data = await getData("uld")
  return (
    <DataTable columns={uldColumn} data={data} />
  )
}
