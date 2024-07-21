import { CompanyFormValues } from "@/schemas/partners/company"

export const companyFormDefaultValues: CompanyFormValues = {
  // general info
  company_code: "",
  company_name: "",
  company_type: "",
  iata_agent_code: "",
  sap_customer_code: "",
  // address book
  addresses: [
    {
      street_address: "",
      address_2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      status: "default_billing", // setting a default status
    },
  ],
  // billing details
  valid_from: "",
  valid_to: "",
  participation_type: "",
  stock_controller: "",
  stock_controller_code: "",
  bill_to: "",
  billing_controller_code: "", // optional fields can be empty
  gl_code: "", // optional fields can be empty
  bill_type: "",
  credit_controller: "",
  credit_controller_code: "",
  commission: 0, // optional fields can have default numeric values
  incentive: 0, // optional fields can have default numeric values
  currency_id: "",
  agent_type: "",
  deal_pli: "", // optional fields can be empty
  invoice_due: 1, // required numeric field should have a minimum value
  pp: "", // optional fields can be empty
  default_pay_mode: "", // optional fields can be empty
  is_foc: "", // optional fields can be empty
  validate_credit: "", // optional fields can be empty
  is_active: "",
  rateline_preference: "",
  is_po_mail: "", // optional fields can be empty
  is_bonded: "", // optional fields can be empty
  auto_allocate_stock: "", // optional fields can be empty
  autoGenerateInvoice: "", // optional fields can be empty
  participate_in_cass: "", // optional fields can be empty
  billing_on_gross: "", // optional fields can be empty
  is_charter: "", // optional fields can be empty
  is_walkin: "", // optional fields can be empty
  sr_number_required: "", // optional fields can be empty
  select_allow_paymode: "", // optional fields can be empty
  allowed_payment_id: "", // optional fields can be empty
}
