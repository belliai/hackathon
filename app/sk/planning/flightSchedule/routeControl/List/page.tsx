"use client"

import PageContainer from "@/components/layout/PageContainer"
import RouteControlListHeader from "@/components/planning/route-control-list"

export default function RouteControlList() {
  return (
    <PageContainer className="gap-6 py-8">
      <div className="ml-4 flex w-full justify-between">
        <h2 className="mb-2 text-xl font-semibold">Route Control</h2>
      </div>
      <RouteControlListHeader />
      <div className="ml-4 flex w-full justify-between">
        <h2 className="mb-2 text-xl font-semibold">Route Control Details</h2>
      </div>
    </PageContainer>
  )
}
