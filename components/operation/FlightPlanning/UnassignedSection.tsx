import { DataTable } from "@/components/dashboard/dashtable";
import { unassignedColumn } from "@/components/operation/FlightPlanning/columns";
import { getData } from "@/lib/operation/FlightPlanning/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import UnassignedSummary from "./UnassignedSummary";

const BULK_ACTION_LIST = [
  {
    id: 'reassign',
    label: 'Reassign',
  },
  {
    id: 'flight_plan',
    label: 'Flight Build Plan',
  },
]

export default async function UnassinedSection() {
  const data = await getData('unassigned');
  return (
    <div className="flex flex-col mt-5 gap-4">
      <UnassignedSummary />
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
      <DataTable columns={unassignedColumn} data={data} />
    </div>
  );
}
