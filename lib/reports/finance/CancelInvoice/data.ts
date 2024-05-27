import { CancelInvoiceType } from "@/components/reports/finance/CancelInvoice/columns";

export const DUMMY_DATA: CancelInvoiceType[] = [
  {
    awb_number: "AWB12345678",
    agent_code: "AGENT001",
    awb_date: "2023-05-10",
    invoice_number: "INV00001",
    invoice_date: "2023-05-15",
    invoice_amount: "1500.00",
    cancel_by: "admin",
    cancel_date: "2023-05-20"
  },
  {
    awb_number: "AWB87654321",
    agent_code: "AGENT002",
    awb_date: "2023-05-11",
    invoice_number: "INV00002",
    invoice_date: "2023-05-16",
    invoice_amount: "2000.00",
    cancel_by: "admin",
    cancel_date: "2023-05-21"
  },
  {
    awb_number: "AWB12348765",
    agent_code: "AGENT003",
    awb_date: "2023-05-12",
    invoice_number: "INV00003",
    invoice_date: "2023-05-17",
    invoice_amount: "1750.00",
    cancel_by: "admin",
    cancel_date: "2023-05-22"
  },
  {
    awb_number: "AWB87651234",
    agent_code: "AGENT004",
    awb_date: "2023-05-13",
    invoice_number: "INV00004",
    invoice_date: "2023-05-18",
    invoice_amount: "1600.00",
    cancel_by: "admin",
    cancel_date: "2023-05-23"
  },
  {
    awb_number: "AWB12344321",
    agent_code: "AGENT005",
    awb_date: "2023-05-14",
    invoice_number: "INV00005",
    invoice_date: "2023-05-19",
    invoice_amount: "1800.00",
    cancel_by: "admin",
    cancel_date: "2023-05-24"
  },
  {
    awb_number: "AWB87657890",
    agent_code: "AGENT006",
    awb_date: "2023-05-15",
    invoice_number: "INV00006",
    invoice_date: "2023-05-20",
    invoice_amount: "1900.00",
    cancel_by: "admin",
    cancel_date: "2023-05-25"
  },
  {
    awb_number: "AWB12340987",
    agent_code: "AGENT007",
    awb_date: "2023-05-16",
    invoice_number: "INV00007",
    invoice_date: "2023-05-21",
    invoice_amount: "1400.00",
    cancel_by: "admin",
    cancel_date: "2023-05-26"
  },
  {
    awb_number: "AWB87659012",
    agent_code: "AGENT008",
    awb_date: "2023-05-17",
    invoice_number: "INV00008",
    invoice_date: "2023-05-22",
    invoice_amount: "2100.00",
    cancel_by: "admin",
    cancel_date: "2023-05-27"
  },
  {
    awb_number: "AWB12345609",
    agent_code: "AGENT009",
    awb_date: "2023-05-18",
    invoice_number: "INV00009",
    invoice_date: "2023-05-23",
    invoice_amount: "2200.00",
    cancel_by: "admin",
    cancel_date: "2023-05-28"
  },
  {
    awb_number: "AWB87651209",
    agent_code: "AGENT010",
    awb_date: "2023-05-19",
    invoice_number: "INV00010",
    invoice_date: "2023-05-24",
    invoice_amount: "2300.00",
    cancel_by: "admin",
    cancel_date: "2023-05-29"
  }
];

export async function getData() {
  return DUMMY_DATA;
}
