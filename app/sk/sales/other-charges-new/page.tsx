"use client"

import { Order, columns } from "@/components/dashboard/columns";
import { getData } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import OtherChargesNew from "@/components/sales/other-charges-new";

export default function OtherChargesnew() {
  return (
    <PageContainer className="gap-6 py-8">
      <h2 className="mb-2 text-xl font-semibold">Other Charges</h2>
      <OtherChargesNew />
    </PageContainer>
  )
}
