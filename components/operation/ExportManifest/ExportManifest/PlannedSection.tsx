import { DataTable } from "@/components/dashboard/dashtable";
import { plannedColumn } from "@/components/operation/ExportManifest/ExportManifest/columns";
import { getData } from "@/lib/operation/ExportManifest/ExportManifest/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import SummarySection from "./SummarySection";

const BULK_ACTION_LIST = [
  {
    id: 'pffload',
    label: 'Offload',
  },
  {
    id: 'uld_offload',
    label: 'ULD Offload',
  },
  {
    id: 'manifest',
    label: 'Manifest',
  },
  {
    id: 'depart_flt',
    label: 'Depart Flt',
  },
  {
    id: 'reopen_flt',
    label: 'Reopen Flt',
  },
  {
    id: 'print_mft',
    label: 'Print MFT',
  },
  {
    id: 'epouch',
    label: 'EPouch',
  },
  {
    id: 'send_nfm',
    label: 'Send NFM',
  },
  {
    id: 'send_fwb',
    label: 'Send FWB/FHL',
  },
  {
    id: 'send_ffm',
    label: 'Send FFM',
  },
  {
    id: 'notoc',
    label: 'NOTOC',
  },
]

export default async function PlannedSection() {
  const data = await getData('planned');
  return (
    <div className="flex flex-col mt-5 gap-4">
      <SummarySection />
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
