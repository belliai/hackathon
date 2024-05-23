import { DataTable } from "@/components/dashboard/dashtable";
import { awbColumn, uldColumn } from "@/components/operation/TruckExport/columns";
import { getData } from "@/lib/operation/TruckExport/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlannedSummary from "./PlannedSummary";

const BULK_ACTION_LIST = [
  {
    id: 'add_to_manifest',
    label: 'Add To Manifest',
  },
  {
    id: 'reassign',
    label: 'Reassign',
  },
]

export default async function UnplannedSection() {
  const uldData = await getData('uld');
  const awbData = await getData('awb');

  return (
    <div className="flex flex-col mt-5 gap-4">
      <PlannedSummary />
      
      <Tabs defaultValue="ULD" className="w-full">
        <div className="flex justify-between">
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
          <TabsList>
            <TabsTrigger value="ULD">ULD</TabsTrigger>
            <TabsTrigger value="AWB">AWB</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="ULD">
          <DataTable columns={uldColumn} data={uldData} />
        </TabsContent>
        <TabsContent value="AWB">
          <DataTable columns={awbColumn} data={awbData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
