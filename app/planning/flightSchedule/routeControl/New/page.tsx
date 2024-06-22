"use client";

import PageContainer from "@/components/layout/PageContainer";
import RouteControlNewForm from "@/components/planning/route-control-new";

export default function RouteControlNew() {
  return (
    <PageContainer className="py-8 gap-6">
      <div className="flex ml-4 justify-between w-full">
        <h2 className="text-xl font-semibold mb-2">Route Control</h2>
      </div>
      <RouteControlNewForm />
    </PageContainer>
  );
}