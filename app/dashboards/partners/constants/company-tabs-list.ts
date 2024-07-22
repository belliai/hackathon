import { CompanyFormValues } from "@/schemas/partners/company"
import {
  InfoIcon,
  LucideIcon,
  MapPinnedIcon,
  ReceiptTextIcon,
} from "lucide-react"
import { Path } from "react-hook-form"

export type CompanyFormTabs =
  | "general-info"
  | "address-book"
  | "billing-details"

type Fields = Path<CompanyFormValues>[]

export const companyFormTabsList: {
  value: CompanyFormTabs
  label: string
  icon: LucideIcon
  validationFields: Fields
}[] = [
  {
    value: "general-info",
    label: "General Info",
    icon: InfoIcon,
    validationFields: [
      "company_code",
      "company_name",
      "company_type",
      "iata_agent_code",
      "sap_customer_code",
    ],
  },
  {
    value: "address-book",
    label: "Address Book",
    icon: MapPinnedIcon,
    validationFields: ["addresses"],
  },
  {
    value: "billing-details",
    label: "Billing Details",
    icon: ReceiptTextIcon,
    validationFields: [
      "valid_from",
      "valid_to",
      "participation_type",
      "stock_controller",
      "stock_controller_code",
      "bill_to",
      "billing_controller_code",
      "gl_code",
      "bill_type",
      "credit_controller",
      "credit_controller_code",
      "commission",
      "incentive",
      "currency_id",
      "agent_type",
      "deal_pli",
      "invoice_due",
      "pp",
      "default_pay_mode",
      "is_foc",
      "validate_credit",
      "is_active",
      "rateline_preference",
      "is_po_mail",
      "is_bonded",
      "auto_allocate_stock",
      "autoGenerateInvoice",
      "participate_in_cass",
      "billing_on_gross",
      "is_charter",
      "is_walkin",
      "sr_number_required",
      "select_allow_paymode",
      "allowed_payment_id",
    ],
  },
]
