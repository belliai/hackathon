"use client";

import PageContainer from "@/components/layout/PageContainer";
import NewFlight from "@/components/planning/new-flight";

export default function NewFlights() {

  return (
    <PageContainer className="py-8 gap-6">
      <div className="flex ml-4 justify-between w-full">
        <h2 className="text-xl font-semibold mb-2">Create Flight Schedule</h2>
      </div>
      <NewFlight />
    </PageContainer>
  );
}