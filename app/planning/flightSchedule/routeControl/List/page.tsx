"use client";

import PageContainer from "@/components/layout/PageContainer";
import RouteControlListHeader from "@/components/planning/route-control-list";

export default function RouteControlList() {
  return (
    <PageContainer className="py-8 gap-6">
      <div className="flex ml-4 justify-between w-full">
        <h2 className="text-xl font-semibold mb-2">Route Control</h2>
      </div>
      <RouteControlListHeader />
      <div className="flex ml-4 justify-between w-full">
        <h2 className="text-xl font-semibold mb-2">Route Control Details</h2>
      </div>
    </PageContainer>
  );
}