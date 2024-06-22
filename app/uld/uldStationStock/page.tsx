"use client";

import PageContainer from "@/components/layout/PageContainer";
import UldStationStock from "@/components/uld/uld-station-stock";
import ULDStationSummary from "@/components/uld/uld-station-summary";

export default function uldStockManagement() {

  return (
    <PageContainer className="py-8 gap-6">
      <div className="flex ml-4 justify-between w-full">
        <h2 className="text-xl font-semibold mb-2">Station ULD Stock</h2>
      </div>
      <UldStationStock/>
      <ULDStationSummary/>
    </PageContainer>
  );
}
