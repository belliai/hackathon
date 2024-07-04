"use client"
import PageContainer from "@/components/layout/PageContainer";
import UploadAwb from "@/components/accounting/agent/collection/upload-awb";

export default function uploadawb() {
  return (
    <PageContainer className="gap-6 py-8">
      <UploadAwb />
    </PageContainer>
  )
}
