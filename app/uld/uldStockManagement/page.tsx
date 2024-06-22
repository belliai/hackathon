"use client";

import PageContainer from "@/components/layout/PageContainer";
import UldStockTable from "@/components/uld/uld-stock-table";
import UldStockTableFilter from "@/components/uld/uld-stock-table-filter";

export default function uldStockManagement() {

  return (
    <PageContainer className="py-8 gap-6">
      <div className="flex ml-4 justify-between w-full">
        <h2 className="text-xl font-semibold mb-2">ULD Stock</h2>
      </div>
      <UldStockTable />
      <UldStockTableFilter/>
    </PageContainer>
  );
}
