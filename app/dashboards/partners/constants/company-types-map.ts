import { Company } from "@/types/partner/company"

export const companyTypeLabelMap: Record<Company["type"], string> = {
  forwarder: "Freight Forwarder",
  consignee: "Consignee (Receiver)",
  consignor: "Consignor (Sender)",
}
