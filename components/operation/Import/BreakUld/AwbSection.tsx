import { DataTable } from "@/components/data-table/data-table";
import { awbColumn } from "@/components/operation/Import/BreakUld/columns";
import { getDataAwb } from "@/lib/operation/Import/BreakUld/data";
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
    id: 'modify',
    label: 'Modify',
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
    id: 'send_fsuarr',
    label: 'Send FSU/ARR',
  },
  {
    id: 'discrepancy',
    label: 'Discrepancy',
  },
]

export default async function AwbSection() {
  const data = await getDataAwb();

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
      <DataTable columns={awbColumn} data={data} hideToolbar />
    </div>
  );
}
