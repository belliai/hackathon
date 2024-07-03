"use client";

import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import CrudTable from "./components/crud-table";

import CrudCurrency from "./currency";
import CrudPartnerType from "./partner-type";
import CrudTransportMethod from "./transport-method";
import CrudPaymentMode from "./payment-mode";
import CrudLocation from "./location";
import CrudStatus from "./status";
import CrudPartnerCode from "./partner-code";
import CrudPartnerPrefix from "./partner-prefix";
import CrudBookingType from "./booking-type";
import CrudCommodityCode from "./commodity-code";

export default function Page() {
  return (
    <PageContainer className="gap-6">
      <CrudBookingType />
      <CrudPartnerPrefix />
      <CrudPartnerCode />
      <CrudStatus />
      <CrudLocation />
      <CrudCommodityCode />
      <CrudPaymentMode />
      <CrudTransportMethod />
      <CrudPartnerType />
      <CrudCurrency />
    </PageContainer>
  );
}
