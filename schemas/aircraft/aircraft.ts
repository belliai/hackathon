import { z } from "zod"

export const aircraftTailNumberSchema = z.object({
  id: z.string().optional().or(z.undefined()),
  status_id: z.string().min(1, "required"),
  tail_number: z.string().min(1, "required"),
})

export const aircraftFormSchema = z.object({
  aircraft_tail_numbers: z.array(aircraftTailNumberSchema),
  aircraft_type_id: z.string().min(1, "required"),
  manufacturer_id: z.string().min(1, "required"),
  aft_h: z.string().min(1, "required"),
  aft_w: z.string().min(1, "required"),
  body_type_id: z.string().uuid(),
  bulk: z.string().min(1, "required"),
  bulk_h: z.string().min(1, "required"),
  bulk_w: z.string().min(1, "required"),
  cargo_capacity: z.string().min(1, "required"),
  count: z.number(),
  dimension_unit_id: z.string().min(1, "required"),
  fwd: z.string().min(1, "required"),
  fwd_h: z.string().min(1, "required"),
  fwd_w: z.string().min(1, "required"),
  fwt: z.string().min(1, "required"),
  gl_code_id: z.string().uuid(),
  landing_weight: z.string().min(1, "required"),
  max_bulk_capacity_volume: z.string().min(1, "required"),
  max_bulk_capacity_weight: z.string().min(1, "required"),
  max_dimension_breadth: z.string().min(1, "required"),
  max_dimension_height: z.string().min(1, "required"),
  max_dimension_length: z.string().min(1, "required"),
  max_volume: z.string().min(1, "required"),
  max_zero_fuel_weight: z.string().min(1, "required"),
  mtow: z.string().min(1, "required"),
  passenger_capacity: z.string().min(1, "required"),
  restricted_weight_piece: z.string().min(1, "required"),
  status_id: z.string().uuid(),
  uld_position: z.string().min(1, "required"),
  version_id: z.string().min(1, "required"),
  volume_unit_id: z.string().min(1, "required"),
  weight_unit_id: z.string().min(1, "required"),
})

export type AircraftFormValues = z.infer<typeof aircraftFormSchema>