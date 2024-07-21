import { z } from "zod"

export const companyFormSchema = z.object({
  // general info
  company_code: z.string().min(1, "Required"),
  company_name: z.string().min(1, "Required"),
  company_type: z.string().min(1, "Required"),
  iata_agent_code: z.string().min(1, "Required"),
  sap_customer_code: z.string().min(1, "Required"),
  // address book
  addresses: z.array(
    z.object({
      street_address: z.string(),
      address_2: z.string(),
      city: z.string(),
      state: z.string(),
      postal_code: z.string(),
      country: z.string(),
      status: z.enum([
        "default_billing",
        "default_shipping",
        "default_receiving",
      ]),
    })
  ),
  // billing details
  valid_from: z.string().min(1, "Required"),
  valid_to: z.string().min(1, "Required"),
  participation_type: z.string().min(1, "Required"),
  stock_controller: z.string().min(1, "Required"),
  stock_controller_code: z.string().min(1, "Required"),
  bill_to: z.string().min(1, "Required"),
  billing_controller_code: z.string().min(1).optional(),
  gl_code: z.string().min(1).optional(),
  bill_type: z.string().min(1, "Required"),
  credit_controller: z.string().min(1, "Required"),
  credit_controller_code: z.string().min(1, "Required"),
  commission: z.number().optional(),
  incentive: z.number().optional(),
  currency_id: z.string().min(1, "Required"),
  agent_type: z.string().min(1, "Required"),
  deal_pli: z.string().min(1).optional(),
  invoice_due: z.number().min(1, "Required"),
  pp: z.string().min(1).optional(),
  default_pay_mode: z.string().min(1).optional(),
  is_foc: z.string().min(1).optional(),
  validate_credit: z.string().min(1).optional(),
  is_active: z.string().min(1, "Required"),
  rateline_preference: z.string().min(1, "Required"),
  is_po_mail: z.string().min(1).optional(),
  is_bonded: z.string().min(1).optional(),
  auto_allocate_stock: z.string().min(1).optional(),
  autoGenerateInvoice: z.string().min(1).optional(),
  participate_in_cass: z.string().min(1).optional(),
  billing_on_gross: z.string().min(1).optional(),
  is_charter: z.string().min(1).optional(),
  is_walkin: z.string().min(1).optional(),
  sr_number_required: z.string().min(1).optional(),
  select_allow_paymode: z.string().min(1).optional(),
  allowed_payment_id: z.string().min(1).optional(),
})

export type CompanyFormValues = z.infer<typeof companyFormSchema>
