import { AgentPerformanceType } from "@/components/reports/Standard/AgentPerformance/columns"

export const DUMMY_DATA: AgentPerformanceType[] = [
  {
    agent_name: "John Doe",
    agent_no: "A123",
    date_from: "2024-01-01",
    date_to: "2024-06-30",
    billing_currency: "USD",
    freight_revenue: "50000",
    commission: "5000",
    invoice_tax: "700",
    total_no_of_awb: "100",
    total_awb_fee: "1000",
    total_cca_fee: "200",
  },
  {
    agent_name: "Jane Smith",
    agent_no: "B456",
    date_from: "2024-02-01",
    date_to: "2024-05-31",
    billing_currency: "EUR",
    freight_revenue: "45000",
    commission: "4500",
    invoice_tax: "600",
    total_no_of_awb: "90",
    total_awb_fee: "900",
    total_cca_fee: "180",
  },
  {
    agent_name: "Alice Johnson",
    agent_no: "C789",
    date_from: "2024-03-01",
    date_to: "2024-04-30",
    billing_currency: "GBP",
    freight_revenue: "60000",
    commission: "6000",
    invoice_tax: "800",
    total_no_of_awb: "120",
    total_awb_fee: "1200",
    total_cca_fee: "240",
  },
]

export async function getData() {
  return DUMMY_DATA
}
