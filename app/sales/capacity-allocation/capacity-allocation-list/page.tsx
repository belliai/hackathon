"use client";

import { Order, columns } from "@/components/dashboard/columns";
import { getData } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import CapacityAllocationList from "@/components/sales/capacity-allocation-list";

export default function CapacityAllocationlist() {

  return (
    <PageContainer className="py-8 gap-6">
        <h2 className="text-xl font-semibold mb-2">List Capacity Allocation</h2>
        <CapacityAllocationList/>
    </PageContainer>
  );
}
