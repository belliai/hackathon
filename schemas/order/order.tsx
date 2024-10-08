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
  booking_type_id: z
    .string()
    .min(1, { message: "Please select Booking Type" })
    .optional(),
  ch_weight_kg: z.string().or(z.number()).optional(),
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
  special_handling_codes: z.array(z.string()).optional(),
  shipper_details: z
    .array(
      z
        .object({
          ID: z.string().optional(),
          transport_method_id: z.string().optional(),
          origin_id: z.string().optional(),
          destination_id: z.string().optional(),
          partner_type_id: z.string().optional(),
          partner_code_id: z.string().optional(),
          date: z.union([z.date(), z.string()]).optional(),
          flight_code: z.string().optional(),
          allotment_code: z.string().optional(),
          status_id: z.string().optional(),
        })
        .optional()
    )
    .optional(),
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
  weight_and_volume_type: z.string().optional(),
  hawb_form: z.object({
    booking_type_id: z.string().optional(),
    partner_prefix_id: z.string().optional(),
    awb: z.string().optional(),
    partner_code_id: z.string().optional(),
    origin_id: z.string().optional(),
    destination_id: z.string().optional(),
    consignor_id: z.string().optional(),
    consignee_id: z.string().optional(),
    weight: z.string().optional(),
    weight_unit: z.string().optional(),
    width: z.string().optional(),
    length: z.string().optional(),
    height: z.string().optional(),
    qty: z.string().or(z.number()).optional(),
    volume: z.string().or(z.number()).optional(),
    volume_unit: z.string().optional(),
    subtotal: z.string().or(z.number()).optional(),
    skid: z.string().or(z.number()).optional(),
  }),
  individual_parcel_form: z.object({
    description: z.string().optional(),
    internal_id: z.string().optional(),
    external_id: z.string().optional(),
    weight: z.string().optional(),
    weight_unit: z.string().optional(),
    volume: z.string().optional(),
    volume_unit: z.string().optional(),
    width: z.string().optional(),
    length: z.string().optional(),
    height: z.string().optional(),
    commodity_code_id: z.string().optional(),
    origin_id: z.string().optional(),
    destination_id: z.string().optional(),
    qty: z.string().or(z.number()).optional(),
    subtotal: z.string().or(z.number()).optional(),
    skid: z.string().or(z.number()).optional(),
  }),
  weight_and_volume_table: z.array(
    z.object({
      id: z.string().optional(),
      qty: z.string().or(z.number()).optional(),
      row_id: z.string().optional(),
      origin: z.string().optional(),
      origin_id: z.string().optional(),
      destination: z.string().optional(),
      destination_id: z.string().optional(),
      width: z.string().optional(),
      length: z.string().optional(),
      height: z.string().optional(),
      subtotal: z.string().optional(),
      skid: z.string().or(z.number()).optional(),
      total: z.string().or(z.number()).optional(),
      type: z.string().optional(),
      external_id: z.string().optional(),
      commodity_code_id: z.string().optional(),
      booking_type_id: z.string().optional(),
      partner_prefix_id: z.string().optional(),
      partner_code_id: z.string().optional(),
      awb: z.string().optional(),
      consignor_id: z.string().optional(),
      consignee_id: z.string().optional(),
    })
  ),
  total_weight: z.string().or(z.number()).optional(),
  total_volume: z.string().or(z.number()).optional(),
  payment_form: z.object({
    payment_method_id: z.string().optional(),
    employee_id: z.string().optional(),
    amount: z.string().optional(),
    transaction_id: z.string().optional(),
    notes: z.string().optional(),
    send_payment_receipt: z.string().optional(),
    payment_type: z.string().optional(),
  }),
  payment_table: z
    .array(
      z
        .object({
          id: z.string().optional(),
          payment_method_id: z.string().optional(),
          payment_method: z.string().optional(),
          employee_id: z.string().optional(),
          employee: z.string().optional(),
          amount: z.string().optional(),
          transaction_id: z.string().optional(),
          payment_type: z.string().optional(),
        })
        .optional()
    )
    .optional(),
  total_paid: z.number().or(z.string()).optional(),
})

export type Order = z.infer<typeof orderSchema>
