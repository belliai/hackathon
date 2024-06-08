import FilterSection from "@/components/operation/Export/EpouchFlight/FilterSection";
import { DataTable } from "@/components/dashboard/dashtable";
import { columns } from "@/components/operation/Export/EpouchFlight/columns";
import { getData } from "@/lib/operation/Export/EpouchFlight/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const BULK_ACTION_LIST = [
  {
    id: 'display',
    label: 'Display',
  },
  {
    id: 'save',
    label: 'Save',
  },
  {
    id: 'delete',
    label: 'Delete',
  },
  {
    id: 'finalize',
    label: 'Finalize',
  },
]

export default async function EpouchFlight() {
  const data = await getData();

  return (
    <div className="flex flex-col gap-4">
      <FilterSection />
      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
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
        <div className="">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
      
    </div>
  );
}
