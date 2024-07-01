"use client";

import { Order, columns } from "@/components/dashboard/columns";
import { getData } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import RateLineList from "@/components/sales/rate-line-list";

export default function RateLinelist() {

  return (
    <PageContainer className="py-8 gap-6">
        <h2 className="text-xl font-semibold mb-2">List Rate Line</h2>
        <RateLineList/>
    </PageContainer>
  );
}
