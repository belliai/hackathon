import { DataTable } from "@components/data-table/data-table"

import { getData } from "@/lib/operation/TruckExport/data"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  awbColumn,
  uldColumn,
} from "@/components/operation/TruckExport/columns"

import SummarySection from "./SummarySection"

const BULK_ACTION_LIST = [
  {
    id: "add_to_manifest",
    label: "Add To Manifest",
  },
  {
    id: "reassign",
    label: "Reassign",
  },
  {
    id: "return",
    label: "Return",
  },
]

export default async function UnplannedSection() {
  const uldData = await getData("uld")
  const awbData = await getData("awb")

  return (
    <div className="mt-5 flex flex-col gap-4">
      <SummarySection />

      <Tabs
        defaultValue="ULD"
        className="w-full rounded-lg border-[1px] border-zinc-700 p-5"
      >
        <div className="flex justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-fit bg-zinc-800 text-white hover:bg-zinc-700">
                Bulk Action
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {BULK_ACTION_LIST.map((bulk) => (
                <DropdownMenuItem key={bulk.id}>{bulk.label}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <TabsList>
            <TabsTrigger value="ULD">ULD</TabsTrigger>
            <TabsTrigger value="AWB">AWB</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="ULD">
          <DataTable columns={uldColumn} data={uldData} hideToolbar />
        </TabsContent>
        <TabsContent value="AWB">
          <DataTable columns={awbColumn} data={awbData} hideToolbar />
        </TabsContent>
      </Tabs>
    </div>
  )
}
