"use client";

import { Order, columns } from "@/components/dashboard/columns";
import { getData } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import OtherChargesNew from "@/components/sales/other-charges-new";

export default function OtherChargesnew() {

  return (
    <PageContainer className="py-8 gap-6">
        <h2 className="text-xl font-semibold mb-2">Other Charges</h2>
        <OtherChargesNew/>
    </PageContainer>
  );
}