"use client";

import PageContainer from "@/components/layout/PageContainer";
import ManageCapacityHeader from "@/components/planning/manage-capacity-header";

export default function ManageCapacity() {
  return (
    <PageContainer className="py-8 gap-6">
      <div className="flex ml-4 justify-between w-full">
        <h2 className="text-xl font-semibold mb-2">Manage Capacity</h2>
      </div>
      <ManageCapacityHeader />
      
    </PageContainer>
  );
}