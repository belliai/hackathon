import { DataTable } from "@components/data-table/data-table";
import { uldColumn } from "@/components/operation/Import/Arrive/columns";
import { getData } from "@/lib/operation/Import/Arrive/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const BULK_ACTION_LIST = [
  {
    id: 'save_info',
    label: 'Save Info',
  },
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
    id: 'reassign',
    label: 'Reassign',
  },
  {
    id: 'send_fsurcf',
    label: 'Send FSU/RCF',
  },
  {
    id: 'send_xfsurcf',
    label: 'Send XFSU/RCF',
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
      <DataTable columns={uldColumn} data={data} hideToolbar />
    </div>
  );
}
