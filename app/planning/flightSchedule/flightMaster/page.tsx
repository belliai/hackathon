"use client";

import PageContainer from "@/components/layout/PageContainer";
import FlightMaster from "@/components/planning/flight-schedule-master";

export default function flightMaster() {

  return (
    <PageContainer className="py-8 gap-6">
      <div className="flex ml-4 justify-between w-full">
        <h2 className="text-xl font-semibold mb-2">Flight Schedule List</h2>
      </div>
      <FlightMaster />
    </PageContainer>
  );
}
