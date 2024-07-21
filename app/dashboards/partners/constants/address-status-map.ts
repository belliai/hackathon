import { CompanyFormValues } from "@/schemas/partners/company"

export const addressStatusLabelMap: Record<
  CompanyFormValues["addresses"][0]["status"],
  string
> = {
  default_billing: "Default Billing",
  default_receiving: "Default Receiving",
  default_shipping: "Default Shipping",
}
