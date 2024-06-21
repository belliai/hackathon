import { z } from "zod";

export const aircraftTailNumberSchema = z.object({
    id: z.string().optional().or(z.undefined()),
    status_id: z.string().min(1),
    tail_number: z.string().min(1),
});

export const aircraftFormSchema = z.object({
    aircraft_tail_numbers: z.array(aircraftTailNumberSchema),
    aircraft_type: z.string().min(1),
    manufacturer: z.string().min(1),
    aft_h: z.string().min(1),
    aft_w: z.string().min(1),
    body_type_id: z.string().min(1),
    bulk: z.string().min(1),
    bulk_cubic_id: z.string().min(1),
    bulk_h: z.string().min(1),
    bulk_unit_id: z.string().min(1),
    bulk_w: z.string().min(1),
    cargo_capacity: z.string().min(1),
    cargo_capacity_unit_id: z.string().min(1),
    count: z.string().min(1),
    fwd: z.string().min(1),
    fwd_h: z.string().min(1),
    fwd_w: z.string().min(1),
    fwt: z.string().min(1),
    gl_code_id: z.string().min(1),
    landing_weight: z.string().min(1),
    landing_weight_unit_id: z.string().min(1),
    max_bulk_capacity_volume: z.string().min(1),
    max_bulk_capacity_volume_unit_id: z.string().min(1),
    max_bulk_capacity_weight: z.string().min(1),
    max_bulk_capacity_weight_unit_id: z.string().min(1),
    max_dimension_breadth: z.string().min(1),
    max_dimension_height: z.string().min(1),
    max_dimension_length: z.string().min(1),
    max_dimension_unit_id: z.string().min(1),
    max_volume: z.string().min(1),
    max_volume_unit_id: z.string().min(1),
    max_zero_fuel_weight: z.string().min(1),
    max_zero_fuel_weight_unit_id: z.string().min(1),
    mtow: z.string().min(1),
    mtow_unit_id: z.string().min(1),
    passenger_capacity: z.string().min(1),
    restricted_weight_piece: z.string().min(1),
    restricted_weight_piece_unit_id: z.string().min(1),
    status_id: z.string().min(1),
    uld_position: z.string().min(1),
    version: z.string().min(1)
});

export type AircraftFormValues = z.infer<typeof aircraftFormSchema>;