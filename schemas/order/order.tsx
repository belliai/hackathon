import { z } from "zod"

export const orderSchema = z.object({
  ID: z.string().optional(),
  amount_due: z.string().min(1),
  activity_logs: z
    .array(
      z
        .object({
          ID: z.string(),
          created_at: z.string(),
          updated_at: z.string(),
          user: z
            .object({
              ID: z.string(),
              name: z.string(),
              email: z.string().email(),
            })
            .optional(),
          action: z.string(),
        })
        .optional()
    )
    .optional()
    .nullable(),
  awb: z.string().min(1),
  bill_to_id: z.string(),
  bill_to_old_name: z.string().optional().nullable(),
  bill_to_name: z.string().optional().nullable(),
  booking_type_id: z.string().min(1),
  ch_weight_kg: z.string(),
  commodity_code_id: z.string().optional(),
  consignee_id: z.string(),
  currency_id: z.string(),
  customer_id: z.string(),
  destination_id: z.string().min(1),
  freight_forwarder_id: z.string(),
  gs_weight_kg: z.string(),
  is_physical: z.boolean().optional(),
  mode: z.string(),
  organization_id: z.string(),
  origin_id: z.string().min(1),
  partner_code_id: z.string().min(1),
  partner_prefix_id: z.string().min(1),
  shipper_details: z
    .array(
      z.object({
        ID: z.string().optional(),
        transport_method_id: z.string().min(1),
        origin_id: z.string().min(1),
        destination_id: z.string().min(1),
        partner_type_id: z.string(),
        partner_code_id: z.string(),
        date: z.union([z.date(), z.string()]),
        flight_code: z.string(),
        allotment_code: z.string(),
        status_id: z.string(),
      })
    )
    .min(1),
  // shipper_details: z.any(),
  payment_mode_id: z.string(),
  rate: z.string(),
  s_freight: z.string(),
  s_rate: z.string(),
  shipper_id: z.string(),
  spot_id: z.string(),
  status_id: z.string(),
  total: z.string(),
  volume_kg: z.string(),
})

export type Order = z.infer<typeof orderSchema>
