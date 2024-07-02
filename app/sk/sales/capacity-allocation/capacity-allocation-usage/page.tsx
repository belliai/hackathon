"use client";

import { Order, columns } from "@/components/dashboard/columns";
import { getData } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import CapacityAllocationUsage from "@/components/sales/capacity-allocation-usage";

export default function CapacityAllocationusage() {

  return (
    <PageContainer className="py-8 gap-6">
        <h2 className="text-xl font-semibold mb-2">Capacity Allocation Usage</h2>
        <CapacityAllocationUsage/>
    </PageContainer>
  );
}
