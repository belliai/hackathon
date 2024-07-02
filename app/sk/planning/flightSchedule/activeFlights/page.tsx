"use client";

import PageContainer from "@/components/layout/PageContainer";
import ActiveFlight from "@/components/planning/active-flight";

export default function ActiveFlights() {
  return (
    <PageContainer className="py-8 gap-6">
      <div className="flex ml-4 justify-between w-full">
        <h2 className="text-xl font-semibold mb-2">Active Flights</h2>
      </div>
      <ActiveFlight />
    </PageContainer>
  );
}