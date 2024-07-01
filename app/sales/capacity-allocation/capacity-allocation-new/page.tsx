"use client";

import { Order, columns } from "@/components/dashboard/columns";
import { getData } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import CapacityAllocationNew from "@/components/sales/capacity-allocation-new";

export default function CapacityAllocationnew() {

  return (
    <PageContainer className="py-8 gap-6">
        <h2 className="text-xl font-semibold mb-2">New Capacity Allocation</h2>
        <CapacityAllocationNew/>
    </PageContainer>
  );
}
