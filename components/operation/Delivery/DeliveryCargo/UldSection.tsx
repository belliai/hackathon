import { getDataUld } from "@/lib/operation/Delivery/DeliveryCargo/data"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/dashboard/dashtable"
import { uldColumn } from "@/components/operation/Delivery/DeliveryCargo/columns"

const BULK_ACTION_LIST = [
  {
    id: "print",
    label: "Print UCR",
  },
]

export default async function UldSection() {
  const data = await getDataUld()

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
      <DataTable columns={uldColumn} data={data} />
    </div>
  )
}
