"use client"

import PageContainer from "@/components/layout/PageContainer";
import CardTransactions from "@/components/accounting/agent/collection/card-transactions";

export default function Cardtransactions() {
  return (
    <PageContainer className="gap-6 py-8">
      <CardTransactions />
    </PageContainer>
  )
}
