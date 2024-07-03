import { DownloadIcon, ReloadIcon } from "@radix-ui/react-icons"

import { getData } from "@/lib/operation/StockAllocation/data"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/dashboard/dashtable"
import {
  historyColumn,
  stockAllocationColumn,
  stockListColumn,
} from "@/components/operation/StockAllocation/columns"
import FilterSection from "@/components/operation/StockAllocation/FilterSection"
import HistoryFilterSection from "@/components/operation/StockAllocation/HistoryFilterSection"

export default async function StockAlocation() {
  const stockListData = await getData("stock-list")

  return (
    <div className="mt-10 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Stock Allocation</h1>
        <div className="flex gap-4">
          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            <span className="mr-1 h-4 w-4">
              <ReloadIcon />
            </span>
            Refresh
          </Button>
          <Button className="bg-button-primary text-white hover:bg-button-primary/80">
            <span className="mr-1 h-4 w-4">
              <DownloadIcon />
            </span>
            Download
          </Button>
        </div>
      </div>

      <Tabs defaultValue="stocks-list" className="w-full">
        <TabsList>
          <TabsTrigger value="stocks-list">Stocks List</TabsTrigger>
          <TabsTrigger value="stocks-allocation">Stocks Allocation</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="stocks-list" className="flex flex-col gap-4">
          <FilterSection />
          <div className="rounded-lg border-[1px] border-zinc-700 p-5">
            <DataTable columns={stockListColumn} data={stockListData} />
          </div>
        </TabsContent>
        <TabsContent
          value="stocks-allocation"
          className="mt-0 flex flex-col gap-4"
        >
          <FilterSection />
          <div className="rounded-lg border-[1px] border-zinc-700 p-5">
            <DataTable columns={stockAllocationColumn} data={stockListData} />
          </div>
        </TabsContent>
        <TabsContent value="history" className="mt-0 flex flex-col gap-4">
          <HistoryFilterSection />
          <div className="rounded-lg border-[1px] border-zinc-700 p-5">
            <DataTable columns={historyColumn} data={stockListData} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
