import { DataTable } from "@components/data-table/data-table";
import { unassignedColumn } from "@/components/operation/PlanFlight/FlightPlanning/columns";
import { getData } from "@/lib/operation/PlanFlight/FlightPlanning/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const BULK_ACTION_LIST = [
  {
    id: 'reassign',
    label: 'Reassign',
  },
  {
    id: 'flight_plan',
    label: 'Flight Build Plan',
  },
  {
    id: 'discrepancy',
    label: 'Discrepancy',
  },
]

export default async function UnassinedSection() {
  const data = await getData('unassigned');
  return (
    <div className="flex flex-col mt-5 gap-4">
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
        <DataTable columns={unassignedColumn} data={data} hideToolbar />
      </div>
    </div>
  );
}
