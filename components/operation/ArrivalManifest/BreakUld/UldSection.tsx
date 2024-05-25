import { DataTable } from "@/components/dashboard/dashtable";
import { uldColumn } from "@/components/operation/ArrivalManifest/BreakUld/columns";
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
    id: 'break',
    label: 'Break From ULD',
  },
]

export default async function UldSection() {
  const data = await getData('uld');

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
      <DataTable columns={uldColumn} data={data} />
    </div>
  );
}
