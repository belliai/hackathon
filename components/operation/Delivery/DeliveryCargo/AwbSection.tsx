import { getDataAwb } from "@/lib/operation/Delivery/DeliveryCargo/data"
import { DataTable } from "@/components/dashboard/dashtable"
import { awbColumn } from "@/components/operation/Delivery/DeliveryCargo/columns"

export default async function AwbSection() {
  const data = await getDataAwb()

  return (
    <div className="mt-5 flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
      <DataTable columns={awbColumn} data={data} />
    </div>
  )
}
