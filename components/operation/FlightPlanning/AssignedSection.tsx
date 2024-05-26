import { DataTable } from "@/components/dashboard/dashtable";
import { assignedColumn } from "@/components/operation/FlightPlanning/columns";
import { getData } from "@/lib/operation/FlightPlanning/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AssignedSummary from "./AssignedSummary";

const BULK_ACTION_LIST = [
  {
    id: 'unassign',
    label: 'Unassign',
  },
]

export default async function AssignedSection() {
  const data = await getData('assigned');
  return (
    <div className="flex flex-col mt-5 gap-4">
      <AssignedSummary />
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
        <DataTable columns={assignedColumn} data={data} />
      </div>
    </div>
  );
}
