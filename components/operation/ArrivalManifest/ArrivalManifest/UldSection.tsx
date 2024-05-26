import { DataTable } from "@/components/dashboard/dashtable";
import { uldColumn } from "@/components/operation/ArrivalManifest/ArrivalManifest/columns";
import { getData } from "@/lib/operation/ArrivalManifest/ArrivalManifest/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const BULK_ACTION_LIST = [
  {
    id: 'arrive',
    label: 'Arrive',
  },
  {
    id: 'unarrive',
    label: 'Un Arrive',
  },
  {
    id: 'break_uld',
    label: 'Break ULD',
  },
  {
    id: 'save_info',
    label: 'Save Info',
  },
  {
    id: 'reassign',
    label: 'Reassign',
  },
  {
    id: 'close_flight',
    label: 'Close Flight',
  },
  {
    id: 'reopen_flight',
    label: 'Reopen Flight',
  },
  {
    id: 'print_manifest',
    label: 'Print Manifest',
  },
  {
    id: 'epouch',
    label: 'Epouch',
  },
]

export default async function UldSection() {
  const data = await getData('uld');

  return (
    <div className="flex flex-col mt-5 gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white w-fit">
              Bulk Action
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {BULK_ACTION_LIST.map((bulk) => (
            <DropdownMenuItem key={bulk.id}>
              {bulk.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DataTable columns={uldColumn} data={data} />
    </div>
  );
}
