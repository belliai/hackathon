import { z } from "zod"

export const orderSchema = z.object({
  ID: z.string().optional(),
  amount_due: z.string().optional(),
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
  awb: z.string().optional(),
  bill_to_id: z.string().optional(),
  bill_to_old_name: z.string().optional().nullable(),
  bill_to_name: z.string().optional().nullable(),
  booking_type_id: z.string().min(1, { message: "Please select Booking Type" }).optional(),
  ch_weight_kg: z.string().optional(),
  commodity_code_id: z.string().optional(),
  consignee_id: z.string().optional(),
  currency_id: z.string().optional(),
  customer_id: z.string().optional(),
  destination_id: z.string().optional(),
  freight_forwarder_id: z.string().optional(),
  gs_weight_kg: z.string().optional(),
  is_physical: z.string().optional(),
  mode: z.string().optional(),
  organization_id: z.string().optional(),
  origin_id: z.string().optional(),
  partner_code_id: z.string().optional(),
  partner_prefix_id: z.string().optional(),
  shipper_details: z
    .array(
      z.object({
        ID: z.string().optional(),
        transport_method_id: z.string().optional(),
        origin_id: z.string().optional(),
        destination_id: z.string().optional(),
        partner_type_id: z.string().optional(),
        partner_code_id: z.string().optional(),
        date: z.union([z.date(), z.string()]),
        flight_code: z.string().optional(),
        allotment_code: z.string().optional(),
        status_id: z.string().optional(),
      })
    )
    ,
  // shipper_details: z.any(),
  payment_mode_id: z.string().optional(),
  rate: z.string().optional(),
  s_freight: z.string().optional(),
  s_rate: z.string().optional(),
  shipper_id: z.string().optional(),
  spot_id: z.string().optional(),
  status_id: z.string().optional(),
  total: z.string().optional(),
  volume_kg: z.string().optional(),
  use_freight_forwarder: z.string().optional(),
})

export type Order = z.infer<typeof orderSchema>
