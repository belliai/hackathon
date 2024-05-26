import { DataTable } from "@/components/dashboard/dashtable";
import { plannedColumn } from "@/components/operation/TruckExport/columns";
import { getData } from "@/lib/operation/TruckExport/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import PlannedSummary from "./PlannedSummary";

const BULK_ACTION_LIST = [
  {
    id: 'offload',
    label: 'Offload',
  },
  {
    id: 'uld',
    label: 'ULD Offload',
  },
  {
    id: 'manifest',
    label: 'Manifest',
  },
  {
    id: 'depart',
    label: 'Depart Fit',
  },
  {
    id: 'reopen',
    label: 'Reopen Fit',
  },
  {
    id: 'send_nfm',
    label: 'Send NFM',
  },
  {
    id: 'send_fwb_fhl',
    label: 'Send FWB/FHL',
  },
  {
    id: 'send_ffm',
    label: 'Send FFM',
  },
  {
    id: 'send_ucm',
    label: 'Send UCM',
  },
  {
    id: 'send_pri',
    label: 'Send PRI',
  },
  {
    id: 'send_fri_frc_frx_fsn',
    label: 'Send FRI/FRC/FRX/FSN',
  },
  {
    id: 'notoc',
    label: 'NOTOC',
  },
  {
    id: 'print_mft',
    label: 'Print MFT',
  },
  {
    id: 'epouch',
    label: 'ePouch (0)',
  },
  {
    id: 'view_cpm',
    label: 'View CPM',
  },
  {
    id: 'send_krt',
    label: 'Send KRT FFM',
  },
  {
    id: 'send_dac',
    label: 'Send DAC FFM',
  },
  {
    id: 'send_xff',
    label: 'Send XFF',
  }
]

export default async function PlannedSection() {
  const data = await getData('planned');
  return (
    <div className="flex flex-col mt-5 gap-4">
      <PlannedSummary />

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
        <DataTable columns={plannedColumn} data={data} />
      </div>
    </div>
  );
}
