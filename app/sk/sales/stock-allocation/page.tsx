"use client";

import { Order, columns } from "@/components/dashboard/columns";
import { getData } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import StockAllocationHeader from "@/components/sales/stock-allocation-header";
import StockAllocationTable from "@/components/sales/stock-allocation-table";
import StockAllocationHistory from "@/components/sales/stock-allocation-history";

export default function AWBStockAllocation() {

  return (
    <PageContainer className="py-8 gap-6">
        <h2 className="text-xl font-semibold mb-2">AWB Stock Allocation</h2>
        <StockAllocationHeader/>
        <StockAllocationTable/>
        <StockAllocationHistory/>
    </PageContainer>
  );
}
