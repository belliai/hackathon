"use client"

import PageContainer from "@/components/layout/PageContainer"
import RouteControlNewForm from "@/components/planning/route-control-new"

export default function RouteControlNew() {
  return (
    <PageContainer className="gap-6 py-8">
      <div className="ml-4 flex w-full justify-between">
        <h2 className="mb-2 text-xl font-semibold">Route Control</h2>
      </div>
      <RouteControlNewForm />
    </PageContainer>
  )
}
