"use client";

import PageContainer from "@/components/layout/PageContainer";
import FlightLoadPlan from "@/components/planning/flight-load-plan-list";

export default function FlightLoadPlanList() {
  return (
    <PageContainer className="py-8 gap-6">
      <div className="flex ml-4 justify-between w-full">
        <h2 className="text-xl font-semibold mb-2">Flight Load Plan List</h2>
      </div>
      <FlightLoadPlan />
    </PageContainer>
  );
}