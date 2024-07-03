"use client"

import PageContainer from "@/components/layout/PageContainer"
import PageHeader from "@/components/layout/PageHeader"

import CrudBookingType from "./booking-type"
import CrudCommodityCode from "./commodity-code"
import CrudTable from "./components/crud-table"
import CrudCurrency from "./currency"
import CrudLocation from "./location"
import CrudPartnerCode from "./partner-code"
import CrudPartnerPrefix from "./partner-prefix"
import CrudPartnerType from "./partner-type"
import CrudPaymentMode from "./payment-mode"
import CrudStatus from "./status"
import CrudTransportMethod from "./transport-method"

export default function Page() {
  return (
    <PageContainer className="gap-6">
      <PageHeader title="Booking Modal Configuration" />
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
  )
}
