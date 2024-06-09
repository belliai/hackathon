import { DataTable } from "@/components/dashboard/dashtable";
import { uldColumn } from "@/components/operation/Delivery/DeliveryCargo/columns";
import { getDataUld } from "@/lib/operation/Delivery/DeliveryCargo/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const BULK_ACTION_LIST = [
  {
    id: 'print',
    label: 'Print UCR',
  },
]

export default async function UldSection() {
  const data = await getDataUld();

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
