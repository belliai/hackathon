export type Company = {
  id: string
  company_code: string
  company_name: string
  people_count: number
  type: "forwarder" | "consignor" | "consignee"
  address: string
}
