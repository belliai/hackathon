import { getData } from "@/lib/operation/FlightPlanning/data"
import { DataTable } from "@/components/data-table/data-table"
import { cartColumn } from "@/components/operation/FlightPlanning/columns"

export default async function CartLoadSection() {
  const data = await getData("cart")
  return (
    <DataTable columns={cartColumn} data={data} />
  )
}
