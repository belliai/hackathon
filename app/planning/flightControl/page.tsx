"use client";

import PageContainer from "@/components/layout/PageContainer";
import FlightControlHeader from "@/components/planning/flight-control";

export default function FlightControl() {
  return (
    <PageContainer className="py-8 gap-6">
      <div className="flex ml-4 justify-between w-full">
        <h2 className="text-xl font-semibold mb-2">Flight Control</h2>
      </div>
      <FlightControlHeader />
      
    </PageContainer>
  );
}