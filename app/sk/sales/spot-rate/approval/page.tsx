"use client";

import { Order, columns } from "@/components/dashboard/columns";
import { getData } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import SpotRateFilters from "@/components/sales/spot-rate/SpotRateFilters";
import SpotRateDetailsApproval from "@/components/sales/spot-rate/SpotRateApprovalDetails";

export default function SpotRateApproval() {
  return (
    <PageContainer className="py-8 gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Spot Rate Approval/Rejection</h2>
        <SpotRateFilters />
      </div>

      <SpotRateDetailsApproval />
    </PageContainer>
  );
}
