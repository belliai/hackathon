"use client";

import { Order, columns } from "@/components/dashboard/columns";
import { getData } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import OtherChargesList from "@/components/sales/other-charges-list";

export default function OtherChargeslist() {

  return (
    <PageContainer className="py-8 gap-6">
        <h2 className="text-xl font-semibold mb-2">List Other Charges</h2>
        <OtherChargesList/>
    </PageContainer>
  );
}
