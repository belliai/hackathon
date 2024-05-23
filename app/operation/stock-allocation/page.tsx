import FilterSection from "@/components/operation/StockAllocation/FilterSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/dashboard/dashtable";
import { historyColumn, stockAllocationColumn, stockListColumn } from "@/components/operation/StockAllocation/columns";
import { getData } from "@/lib/operation/StockAllocation/data";
import { DownloadIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import HistoryFilterSection from "@/components/operation/StockAllocation/HistoryFilterSection";

export default async function StockAlocation() {
  const stockListData = await getData('stock-list');

  return (
    <div className="flex flex-col mt-10 gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Stock Allocation</h1>
        <div className="flex gap-4">
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <span className="mr-1 h-4 w-4">
              <ReloadIcon />
            </span>
            Refresh
          </Button>
          <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
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
        <TabsContent value="stocks-list">
          <FilterSection />
          <div className=" py-10">
            <DataTable columns={stockListColumn} data={stockListData} />
          </div>
        </TabsContent>
        <TabsContent value="stocks-allocation">
          <FilterSection />
          <div className=" py-10">
            <DataTable columns={stockAllocationColumn} data={stockListData} />
          </div>
        </TabsContent>
        <TabsContent value="history">
          <HistoryFilterSection />
          <div className=" py-10">
            <DataTable columns={historyColumn} data={stockListData} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
    
  );
}
