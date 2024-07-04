import { DataTable } from "@components/data-table/data-table"

import { getData } from "@/lib/operation/Import/Arrive/data"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { awbColumn } from "@/components/operation/Import/Arrive/columns"

const BULK_ACTION_LIST = [
  {
    id: "save_info",
    label: "Save Info",
  },
  {
    id: "arrive",
    label: "Arrive",
  },
  {
    id: "unarrive",
    label: "Un-Arrive",
  },
  {
    id: "reassign",
    label: "Reassign",
  },
  {
    id: "send_fsurcf",
    label: "Send FSU/RCF",
  },
]

export default async function AwbSection() {
  const data = await getData("awb")

  return (
    <div className="mt-5 flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-fit bg-zinc-800 text-white hover:bg-zinc-700">
            Bulk Action
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {BULK_ACTION_LIST.map((bulk) => (
            <DropdownMenuItem key={bulk.id}>{bulk.label}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DataTable columns={awbColumn} data={data} hideToolbar />
    </div>
  )
}
