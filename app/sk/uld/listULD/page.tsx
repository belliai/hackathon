"use client"

import { useFeatureFlagEnabled } from "posthog-js/react"

import PageContainer from "@/components/layout/PageContainer"
import ListUldInputHeader from "@/components/uld/list-uld-header"
import UldDetailsTable from "@/components/uld/uld-details-table"

export default function ListULD() {
  const flagEnabled = useFeatureFlagEnabled("show-sk-list-uld")

  return (
    <PageContainer className="gap-6 py-8">
      <div className="ml-4 flex w-full justify-between">
        <h2 className="mb-2 text-xl font-semibold">List ULD</h2>
      </div>
      {(flagEnabled && (
        <>
          <ListUldInputHeader />
          <UldDetailsTable />
        </>
      )) || <div>Turn on feature flag to see this page</div>}
    </PageContainer>
  )
}
