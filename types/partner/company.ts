export type Company = {
  id: string
  companyCode: string
  companyName: string
  peopleCount: number
  type: "forwarder" | "consignor" | "consignee"
  address: string
}
