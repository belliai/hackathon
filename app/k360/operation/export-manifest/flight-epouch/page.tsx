import { getData } from "@/lib/operation/ExportManifest/FlightEpouch/data"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/dashboard/dashtable"
import { columns } from "@/components/operation/ExportManifest/FlightEpouch/columns"
import FilterSection from "@/components/operation/ExportManifest/FlightEpouch/FilterSection"

const BULK_ACTION_LIST = [
  {
    id: "save",
    label: "Save",
  },
  {
    id: "delete",
    label: "Delete",
  },
]

export default async function FlightEpouch() {
  const data = await getData()

  return (
    <div className="flex flex-col gap-4">
      <FilterSection />
      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
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
        <div className="">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  )
}
