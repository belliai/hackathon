"use client"

import PageContainer from "@/components/layout/PageContainer"
import ManageCapacityHeader from "@/components/planning/manage-capacity-header"

export default function ManageCapacity() {
  return (
    <PageContainer className="gap-6 py-8">
      <div className="ml-4 flex w-full justify-between">
        <h2 className="mb-2 text-xl font-semibold">Manage Capacity</h2>
      </div>
      <ManageCapacityHeader />
    </PageContainer>
  )
}
