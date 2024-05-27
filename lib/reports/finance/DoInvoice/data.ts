import { DoInvoiceType } from "@/components/reports/finance/DoInvoice/columns";

export const DUMMY_DATA: DoInvoiceType[] = [
  {
    origin: "JFK",
    destination: "LAX",
    awb_number: "AWB12345678",
    agent_name: "Agent One",
    agent_code: "AG001",
    invoice_no: "INV001",
    chargeable_weight: "1500 kg",
    payment_collected_mode: "Credit Card",
    created_on: "2023-05-10"
  },
  {
    origin: "LAX",
    destination: "ORD",
    awb_number: "AWB87654321",
    agent_name: "Agent Two",
    agent_code: "AG002",
    invoice_no: "INV002",
    chargeable_weight: "2000 kg",
    payment_collected_mode: "Bank Transfer",
    created_on: "2023-05-11"
  },
  {
    origin: "ORD",
    destination: "DFW",
    awb_number: "AWB12348765",
    agent_name: "Agent Three",
    agent_code: "AG003",
    invoice_no: "INV003",
    chargeable_weight: "1750 kg",
    payment_collected_mode: "Cash",
    created_on: "2023-05-12"
  },
  {
    origin: "DFW",
    destination: "SFO",
    awb_number: "AWB87651234",
    agent_name: "Agent Four",
    agent_code: "AG004",
    invoice_no: "INV004",
    chargeable_weight: "1600 kg",
    payment_collected_mode: "Credit Card",
    created_on: "2023-05-13"
  },
  {
    origin: "SFO",
    destination: "MIA",
    awb_number: "AWB12344321",
    agent_name: "Agent Five",
    agent_code: "AG005",
    invoice_no: "INV005",
    chargeable_weight: "1800 kg",
    payment_collected_mode: "Bank Transfer",
    created_on: "2023-05-14"
  }
];

export async function getData() {
  return DUMMY_DATA;
}
