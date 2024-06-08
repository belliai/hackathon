import { DataTable } from "@components/data-table/data-table";
import { plannedColumn } from "@/components/operation/Export/ExportManifest/columns";
import { getData } from "@/lib/operation/Export/ExportManifest/data";
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
    id: 'send_fwb',
    label: 'Send FWB/FHL',
  },
  {
    id: 'send_xffm',
    label: 'Send XFFM',
  },
  {
    id: 'send_xsfu',
    label: 'Send XSFU/DEP',
  },
  {
    id: 'send_fdm',
    label: 'Send FDM',
  },
  {
    id: 'send_fri',
    label: 'Send FRI/FRC/FRX/FSN',
  },
  {
    id: 'notoc',
    label: 'NOTOC',
  },
  {
    id: 'send_mft',
    label: 'Send MFT',
  },
  {
    id: 'export_mft',
    label: 'Export MFT',
  },
  {
    id: 'epouch',
    label: 'ePouch',
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
        <DataTable columns={plannedColumn} data={data} hideToolbar />
      </div>
    </div>
  );
}
