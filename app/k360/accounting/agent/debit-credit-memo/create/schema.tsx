import { z } from "zod"

export const invoiceSchema = z.object({
  invoiceNo: z.string().min(1),
  awbNo: z.string(),
  prefix: z.string(),
  payMode: z.string(),
  invoiceDate: z.string(),
  CCANumber: z.string(),
  invoiceStatus: z.string(),
  dateOfAWBIssue: z.string(),
  agentCode: z.string(),
  origin: z.string(),
  destination: z.string(),
  airlineCode: z.string(),
  weightUnit: z.string(),

  currency: z.string(),
  commodityCode: z.string(),
  weightCharges: z.string(),
  collect: z.number(),
  commision: z.number(),
  incentive: z.number(),
  netAmount: z.number(),
  TDSCommission: z.number(),
  STCommission: z.number(),
  totalPayable: z.number(),
  totalOtherChargeAgent: z.number(),
  totalOtherChargeAirline: z.number(),
  tax: z.number(),
  total: z.number(),
  remarks: z.string(),
})

export type Invoice = z.infer<typeof invoiceSchema>
