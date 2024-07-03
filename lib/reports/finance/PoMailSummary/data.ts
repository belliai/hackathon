import { PoMailSummaryType } from "@/components/reports/finance/PoMailSummary/columns"

export const DUMMY_DATA: PoMailSummaryType[] = [
  {
    agent_code: "AG001",
    invoice_no: "INV001",
    invoice_date: "2023-05-10",
    type_of_mail: "Express",
    total_weight_in_kg: "150 kg",
  },
  {
    agent_code: "AG002",
    invoice_no: "INV002",
    invoice_date: "2023-05-11",
    type_of_mail: "Priority",
    total_weight_in_kg: "200 kg",
  },
  {
    agent_code: "AG003",
    invoice_no: "INV003",
    invoice_date: "2023-05-12",
    type_of_mail: "Standard",
    total_weight_in_kg: "175 kg",
  },
  {
    agent_code: "AG004",
    invoice_no: "INV004",
    invoice_date: "2023-05-13",
    type_of_mail: "Express",
    total_weight_in_kg: "160 kg",
  },
  {
    agent_code: "AG005",
    invoice_no: "INV005",
    invoice_date: "2023-05-14",
    type_of_mail: "Priority",
    total_weight_in_kg: "180 kg",
  },
  {
    agent_code: "AG006",
    invoice_no: "INV006",
    invoice_date: "2023-05-15",
    type_of_mail: "Standard",
    total_weight_in_kg: "190 kg",
  },
  {
    agent_code: "AG007",
    invoice_no: "INV007",
    invoice_date: "2023-05-16",
    type_of_mail: "Express",
    total_weight_in_kg: "140 kg",
  },
  {
    agent_code: "AG008",
    invoice_no: "INV008",
    invoice_date: "2023-05-17",
    type_of_mail: "Priority",
    total_weight_in_kg: "210 kg",
  },
  {
    agent_code: "AG009",
    invoice_no: "INV009",
    invoice_date: "2023-05-18",
    type_of_mail: "Standard",
    total_weight_in_kg: "220 kg",
  },
  {
    agent_code: "AG010",
    invoice_no: "INV010",
    invoice_date: "2023-05-19",
    type_of_mail: "Express",
    total_weight_in_kg: "230 kg",
  },
]

export async function getData() {
  return DUMMY_DATA
}
