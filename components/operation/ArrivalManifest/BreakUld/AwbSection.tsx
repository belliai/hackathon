import { DataTable } from "@/components/dashboard/dashtable";
import { awbColumn } from "@/components/operation/ArrivalManifest/BreakUld/columns";
import { getData } from "@/lib/operation/ArrivalManifest/BreakUld/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const BULK_ACTION_LIST = [
  {
    id: 'save',
    label: 'Save',
  },
  {
    id: 'send_fsu_rcf',
    label: 'Send FSU/RCF',
  },
  {
    id: 'send_fsu_arr',
    label: 'Send FSU/ARR',
  },
  {
    id: 'discrepancy',
    label: 'Discrepancy',
  },
]

export default async function AwbSection() {
  const data = await getData('awb');

  return (
    <div className="flex flex-col mt-5 gap-4">
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
      <DataTable columns={awbColumn} data={data} />
    </div>
  );
}