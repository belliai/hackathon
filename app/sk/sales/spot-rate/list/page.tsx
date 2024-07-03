"use client";

import { Order, columns } from "@/components/dashboard/columns";
import { getData } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import SpotRateFilters from "@/components/sales/spot-rate/SpotRateFilters"; // Import the new filters component
import SpotRateListDetails from "@/components/sales/spot-rate/SpotRateListDetails";

export default function SpotRateList() {
  return (
    <PageContainer className="py-8 gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Spot Rate Listing</h2>
        <SpotRateFilters />
      </div>
  
      <SpotRateListDetails />
    </PageContainer>
  );
}
